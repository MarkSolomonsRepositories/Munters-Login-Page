import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }


  saveUserLoginLocal(userObject:any){
    localStorage.setItem('userDetails',JSON.stringify(userObject));
  }
  saveCurrentLanguageLocal(userObject:any){
    localStorage.setItem('currentLanguage',JSON.stringify(userObject));
  }

  getCurrentLanguageLocal(){
    return JSON.parse(localStorage.getItem('currentLanguage')||'');
  }


}
