import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginpageComponent } from './loginpage/loginpage.component';
import { SignuppageComponent } from './signuppage/signuppage.component';
import { LoggedinpageComponent } from './loggedinpage/loggedinpage.component';


const routes: Routes = [
  { path: '', component: LoginpageComponent },
  { path: 'loginpage', component: LoginpageComponent },
  { path: 'signuppage', component: SignuppageComponent },
  { path: 'loggedinpage', component: LoggedinpageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


