import { Component, OnInit, ViewChild } from '@angular/core';
import { Profile, ProfileService } from 'src/app/core/services/profile.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  displayedColumns: string[] = ['name', 'description', 'locations', 'edit', 'delete'];
  dataSource = new MatTableDataSource<Profile>([]);
  totalProfiles = 0;
  pageSize = 5;
  currentPage = 0;
  public userRole?: string;

  showPanel = false;
  isEditMode = false;
  profileForm: Profile = {
    name: '',
    description: '',
    locations: []
  };

 availablePlaces: string[] = [
  'United States',
  'India',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'Japan',
  'Brazil',
  'United Kingdom',
  'South Africa'
];

  selectedPlaces: string[] = [];
  availableSearchText: string = '';
selectedSearchText: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private profileService: ProfileService,private authService: AuthService,
    private toastrService: ToastrService,) { }

ngOnInit(): void {
  this.userRole = this.authService.getUser()?.role;
  this.displayedColumns = ['name', 'description', 'locations'];
  if (this.userRole === 'admin') {
    this.displayedColumns.push('edit', 'delete');
  }

  this.loadProfiles();
}

  Logout(): void {
    this.authService.logout();
  }

  loadProfiles(): void {
    this.profileService.getProfiles().subscribe(profiles => {
      console.log(profiles,'1');
      this.totalProfiles = profiles.length;
      const sortedProfiles = profiles.slice().sort((a:any, b:any) => (b.id ?? 0) - (a.id ?? 0));
      this.dataSource.data = sortedProfiles.slice(this.currentPage * this.pageSize, (this.currentPage + 1) * this.pageSize);
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadProfiles();
  }

  openEditProfilePanel(profile: Profile): void {
    this.profileForm = { ...profile };
    this.selectedPlaces = profile.locations ? [...profile.locations] : [];
    this.availablePlaces = this.availablePlaces.filter(place => !this.selectedPlaces.includes(place));
    this.isEditMode = true;
    this.showPanel = true;
  }

  closeEditProfilePanel(): void {
    this.showPanel = false;
    this.resetForm();
  }

addPlace(place: string): void {
  if (!this.selectedPlaces.includes(place)) {
    this.selectedPlaces.push(place);
    this.availablePlaces = this.availablePlaces.filter(p => p !== place);
  }
}


removePlace(place: string): void {
  if (!this.availablePlaces.includes(place)) {
    this.availablePlaces.push(place);
    this.selectedPlaces = this.selectedPlaces.filter(p => p !== place);
  }
}

  submitProfile(): void {
    this.profileForm.locations = [...this.selectedPlaces];
    if (this.isEditMode && this.profileForm.id) {
      this.profileService.updateProfile(this.profileForm).subscribe(() => {
        this.loadProfiles();
        this.toastrService.success("Profile Updated Successfully")
        this.closeEditProfilePanel();
      });
    }
  }

  deleteProfile(id?: number): void {
    if (id) {
      this.profileService.deleteProfile(id).subscribe(() => {
        this.toastrService.success("Profile Deleted Successfully")
        this.loadProfiles();
      });
    }
  }

  filteredAvailablePlaces(): string[] {
  return this.availablePlaces.filter(place =>
    place.toLowerCase().includes(this.availableSearchText.toLowerCase())
  );
}

filteredSelectedPlaces(): string[] {
  return this.selectedPlaces.filter(place =>
    place.toLowerCase().includes(this.selectedSearchText.toLowerCase())
  );
}

  resetForm(): void {
    this.profileForm = {
      name: '',
      description: '',
      locations: [],
    };
    this.selectedPlaces = [];
    this.availablePlaces = [
      'United States',
      'India',
      'Canada',
      'Australia',
      'Germany',
      'France',
      'Japan',
      'Brazil',
      'United Kingdom',
      'South Africa',
    ];
  }
}
