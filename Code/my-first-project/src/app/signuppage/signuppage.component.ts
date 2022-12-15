import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../user-service.service';


@Component({
  selector: 'app-signuppage',
  templateUrl: './signuppage.component.html',
  styleUrls: ['./signuppage.component.css']
})
export class SignuppageComponent implements OnInit {
  text = "";


  errors = {
    email: false,
    password: false,
    username: false,
    confPassword: false
  }
  SignUpLanguage:any;
  LanguageDirection='ltr';
  email = '';
  password = '';
  username = '';
  confPassword = '';
  isDatabaseAuthentic = true;
  currentLanguage = ''

  constructor(private http: HttpClient,private router: Router,private userService:UserService) {
  }

  ngOnInit(): void {
    this.updateLanguageSignUpPage()
  }
  updateLanguageSignUpPage(){
    this.SignUpLanguage = this.userService.getCurrentLanguageLocal();
    if(this.SignUpLanguage.Language == 'Language'){
      this.LanguageDirection='ltr';
      this.currentLanguage = 'English'
    }
    else{
      this.LanguageDirection='rtl';
      this.currentLanguage = 'Hebrew'
    }
  }




  isInvalidEmail() {
    let d = ''
    for(let x of String(this.email)){
      if(x=='@' || x=='.'){
        d = d + x
      }
    }

    if(String(this.email).length === 0 || d !== "@.") return true;
    return false;
  }
  isInvalidPassword () {
    return String(this.password).length < 6;
  }
  isInvalidUsername() {
    return String(this.username).length === 0;
  }
  isInvalidconfPassword(){
    return this.password !== this.confPassword;
  }

  submit() {
    this.errors = {
      email: this.isInvalidEmail(),
      password: this.isInvalidPassword(),
      username: this.isInvalidUsername(),
      confPassword: this.isInvalidconfPassword()
    };

    let hasValidationErrors = false;
    for(const field of Object.values(this.errors)) {
      if (field) {
        hasValidationErrors = true;
        break;
      }
    }

    if(hasValidationErrors == false){

        this.http.post<any>(window.location.origin + '/api/auth/signup',{
          email: this.email,
          username: this.username,
          password: this.password
        }).subscribe(data => {
                if(data == null){
                  this.isDatabaseAuthentic = false;
                }
                else{
                  this.userService.saveUserLoginLocal(data);
                  this.router.navigateByUrl('/loggedinpage');
                }
          })
    }
  }
}
