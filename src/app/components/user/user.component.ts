import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CouchService } from 'src/app/sercices/couch.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  title = 'validationpointer';
 
  @ViewChild('nameInput') nameInput!: ElementRef;
  @ViewChild('mailInput') mailInput!: ElementRef;

  isUserNameError: boolean = false;
  isMailError: boolean = false;
  userData: any[] = [];
  newUserId!: string;
  userFrom!: FormGroup;

  constructor(public fb: FormBuilder, private snackBar: MatSnackBar, private router: Router, public service: CouchService) {

    this.userFrom = this.fb.group({
      userId: [''],
      userName: ['', [Validators.required]],
      mail: ['', [Validators.required]],
      type: ['user'],
      activeStatus: [true],
    });
  }

  ngOnInit(): void {
    this.readUser();
  }

  createUser() {  // to a create user data 
    this.service.createUser({ _id: "user_2_" + uuidv4() ,data: this.userFrom.value }).subscribe((res: any) => {
      console.log(res);
      this.router.navigateByUrl('userlist');
    });
  }

  readUser() {
    this.service.readUser().subscribe((res: any) => {
      console.log(res);
      this.userData = res.rows.map((user: any) => user.doc)
      this.userIdGeneration();
    })
  }

  focusMailInput() {
    if (this.mailInput && this.mailInput.nativeElement) {
      this.mailInput.nativeElement.focus();
      this.mailInput.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      this.mailInput.nativeElement.classList.add('focused-element');
    }
  }

  focusNameInput() {
    if (this.nameInput && this.nameInput.nativeElement) {
      this.nameInput.nativeElement.focus();
      this.nameInput.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      this.nameInput.nativeElement.classList.add('focused-element');
    }
  }

  validation(drawer: any) {

    this.isMailError = false;
    this.isUserNameError = false;

    if (this.userFrom.valid) {
      this.snackBar.open("User Saved Successfully", 'Okey', {
        duration: 2500,
      });
      drawer._animationState = 'void';
      this.createUser();
    } else {
      console.log(drawer._animationState);

      drawer._animationState = 'open';
    }
    if (this.userFrom.get('userName')?.errors?.['required']) {
      this.isUserNameError = true;
    } 
    if (this.userFrom.get('mail')?.errors?.['required']) {
      this.isMailError = true;
    }
  }

  userIdGeneration() { // to generate user id
    if (this.userData.length === 0) {
      this.userFrom.patchValue({ userId: "USER_1" });
    }
    if (this.userData.length > 0) {
      const lastUser = this.userData[this.userData.length - 1];
      const lastUserID = lastUser.data.userId;
      const lastDigits = lastUserID.slice(5);
      const incrementedValue = Number(lastDigits) + 1;
      this.newUserId = "USER_" + String(incrementedValue);
      this.userFrom.patchValue({ userId: this.newUserId });
    }
  }
}

