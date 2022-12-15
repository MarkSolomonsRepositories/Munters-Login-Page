import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user-service.service';


@Component({
  selector: 'app-loggedinpage',
  templateUrl: './loggedinpage.component.html',
  styleUrls: ['./loggedinpage.component.css']
})
export class LoggedinpageComponent implements OnInit {

  constructor(private http: HttpClient,private route: ActivatedRoute,private userService:UserService) { }
  user:any = null;
  LoggedInLanguage:any;
  LanguageDirection='ltr';
  currentLanguage=''
  windowLocation=window.location.origin + '/weatherApp'

  getUserFromLocal():any{
    let userLocal=localStorage.getItem('userDetails');
    if(userLocal!==null){
      return JSON.parse(userLocal);
    }
    return null;
  }
  ngOnInit(): void {
    // console.log(email)
    this.user = this.getUserFromLocal();
    this.updateLanguageLoggedInPage()

  }
  updateLanguageLoggedInPage(){
    this.LoggedInLanguage = this.userService.getCurrentLanguageLocal();
    if(this.LoggedInLanguage.Language == 'Language'){
      this.LanguageDirection='ltr';
      this.currentLanguage = 'English'
    }
    else{
      this.LanguageDirection='rtl';
      this.currentLanguage = 'Hebrew'
    }
  }



}
