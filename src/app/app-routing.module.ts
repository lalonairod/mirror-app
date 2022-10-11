import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path : '',
    pathMatch : 'full',
    redirectTo : 'login'
  },
  {
    path : 'login',
    component : LoginComponent
  },
  {
    path : 'index',
    component : IndexComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
