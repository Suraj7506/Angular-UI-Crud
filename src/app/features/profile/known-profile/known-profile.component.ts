import { Component, OnInit, ViewChild } from '@angular/core';
import { Profile, ProfileService } from 'src/app/core/services/profile.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatSort, MatSortable } from '@angular/material/sort';

@Component({
  selector: 'app-known-profile',
  templateUrl: './known-profile.component.html',
  styleUrls: ['./known-profile.component.scss'],
})
export class KnownProfileComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'description',
    'locations',
    'edit',
    'delete',
  ];
  dataSource = new MatTableDataSource<Profile>([]);
  totalProfiles = 0;
  pageSize = 5;
  currentPage = 0;

  showPanel = false;
  isEditMode = false;
  profileForm: Profile = {
    name: '',
    description: '',
    locations: [],
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
    'South Africa',
  ];

  selectedPlaces: string[] = [];

  availableSearchText: string = '';
  selectedSearchText: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public userRole?: string;

  constructor(
    private profileService: ProfileService,
    private toastrService: ToastrService,
    private authService: AuthService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.userRole = this.authService.getUser()?.role;
    this.loadProfiles();
  }

  loadProfiles(): void {
    this.profileService.getProfiles().subscribe((profiles) => {
      console.log(profiles, '2');
      this.totalProfiles = profiles.length;
      const sortedProfiles = profiles
        .slice()
        .sort((a: any, b: any) => (b.id ?? 0) - (a.id ?? 0));
      this.dataSource.data = sortedProfiles.slice(
        this.currentPage * this.pageSize,
        (this.currentPage + 1) * this.pageSize
      );
      console.log(profiles);
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadProfiles();
  }

  openAddProfilePanel(): void {
    this.resetForm();
    this.isEditMode = false;
    this.showPanel = true;
  }

  Logout(): void {
    this.authService.logout();
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  openEditProfilePanel(profile: Profile): void {
    this.profileForm = { ...profile };
    this.selectedPlaces = profile.locations ? [...profile.locations] : [];
    this.availablePlaces = this.availablePlaces.filter(
      (place) => !this.selectedPlaces.includes(place)
    );
    this.isEditMode = true;
    this.showPanel = true;
  }

  closeAddProfilePanel(): void {
    this.showPanel = false;
    this.resetForm();
  }

  addPlace(place: string): void {
    this.selectedPlaces.push(place);
    this.availablePlaces = this.availablePlaces.filter((p) => p !== place);
  }

  removePlace(place: string): void {
    this.availablePlaces.push(place);
    this.selectedPlaces = this.selectedPlaces.filter((p) => p !== place);
  }

  submitProfile(): void {
    this.profileForm.locations = [...this.selectedPlaces];
    if (this.isEditMode && this.profileForm.id) {
      this.profileService.updateProfile(this.profileForm).subscribe(() => {
        this.loadProfiles();
        this.toastrService.success('Profile Updated Successfully');
        this.closeAddProfilePanel();
      });
    } else {
      this.profileForm.id = String(this.totalProfiles + 1);
      this.profileService.addProfile(this.profileForm).subscribe(() => {
      this.loadProfiles();
      this.toastrService.success('Profile Added Successfully');
      this.closeAddProfilePanel();
      });
    }
  }

  get filteredAvailablePlaces(): string[] {
    return this.availablePlaces.filter((place) =>
      place.toLowerCase().includes(this.availableSearchText.toLowerCase())
    );
  }

  get filteredSelectedPlaces(): string[] {
    return this.selectedPlaces.filter((place) =>
      place.toLowerCase().includes(this.selectedSearchText.toLowerCase())
    );
  }

  deleteProfile(id?: number): void {
    if (id) {
      this.profileService.deleteProfile(id).subscribe(() => {
        this.toastrService.success('Profile Deleted Successfully');
        this.loadProfiles();
      });
    }
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
