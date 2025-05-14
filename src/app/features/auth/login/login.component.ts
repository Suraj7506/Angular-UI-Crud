import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

 username = '';
  password = '';
  errorMessage = '';
  selectedTab = 'hrAdmin';
  mobileNumber = '';
otp: string[] = new Array(6).fill('');
  otpSent = false;
  otpDigits = Array(6).fill(0);

  constructor(private auth: AuthService, private router: Router, private toastrService: ToastrService,
) {}

ngOnInit(): void {
    localStorage.clear();
}

onLogin(): void {
    const success = this.auth.login(this.username, this.password);
    if (success) {
      this.toastrService.success("Login Successfully");
      this.router.navigate(['/users']);
    } else {
      this.toastrService.error('Invalid username or password');
      this.errorMessage = 'Invalid username or password';
    }
  }

  onSendOtp(): void {
    if (this.mobileNumber.length === 10) {
      this.toastrService.success('OTP sent to ' + this.mobileNumber);
      this.otpSent = true;
    } else {
      this.toastrService.error('Please enter a valid 10-digit number');
    }
  }

onVerifyOtp(): void {
  const enteredOtp = this.otp.join('');
  if (enteredOtp === '999999') {
    const vendorUser = { username: this.mobileNumber, role: 'user' };
    this.auth.setUser(vendorUser);
    this.toastrService.success('OTP verified successfully');
    this.router.navigate(['/users']);
  } else {
    this.toastrService.error('Invalid OTP');
  }
}

switchTab(tab: string): void {
  this.selectedTab = tab;
  this.username = '';
  this.password = '';
  this.mobileNumber = '';
  this.otpSent = false;
  this.otp = ['', '', '', '', '', ''];
}

moveToNext(event: any, index: number): void {
  const input = event.target;
  const value = input.value;

  if (value.length > 1) {
    input.value = value.charAt(value.length - 1);
  }

  if (value && index < this.otpDigits.length - 1) {
    const nextInput = input.parentElement.children[index + 1];
    if (nextInput) nextInput.focus();
  } else if (!value && index > 0 && event.inputType === 'deleteContentBackward') {
    const prevInput = input.parentElement.children[index - 1];
    if (prevInput) prevInput.focus();
  }
}

}
