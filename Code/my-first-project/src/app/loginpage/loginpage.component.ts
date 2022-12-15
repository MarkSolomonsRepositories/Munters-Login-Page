import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../user-service.service';



@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})


export class LoginpageComponent implements OnInit {
  errors = {
    email: false,
    password: false,
  }
  email = '';
  password = '';
  isDatabaseAuthentic = true;
  Language='English';
  LanguageDirection='ltr';
  LoginLanguage:any;

  constructor(private http: HttpClient,private router: Router,private userService:UserService) { }

  ngOnInit(): void {
    this.updateLanguageLocalStorage()
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
  switchLanguage(){
    if(this.Language=='English'){
      this.Language='Hebrew'
      this.LanguageDirection='rtl';
    }
    else{
      this.Language='English'
      this.LanguageDirection='ltr';
    }
    this.updateLanguageLocalStorage()
  }
  updateLanguageLocalStorage(){
    this.http.post<any>(window.location.origin + '/api/auth/languageUpdate',{
      Language: this.Language
    }).subscribe((data) => {
            console.log(data)
            this.userService.saveCurrentLanguageLocal(data);
            this.updateLanguageLoginPage()
        })
  }
  updateLanguageLoginPage(){
    this.LoginLanguage = this.userService.getCurrentLanguageLocal();
  }

  submit() {
    this.errors = {
      email: this.isInvalidEmail(),
      password: this.isInvalidPassword()
    };

    let hasValidationErrors = false;
    for(const field of Object.values(this.errors)) {
      if (field) {
        hasValidationErrors = true;
        break;
      }
    }

    if(hasValidationErrors == false){
      this.http.post<any>(window.location.origin + '/api/auth/login',{
        email: this.email,
        password: this.password
      }).subscribe((data) => {
              if(data!==null){
                this.userService.saveUserLoginLocal(data);
                this.router.navigateByUrl('/loggedinpage');
              }
              else{this.isDatabaseAuthentic = false}
          })
    }
  }
}



