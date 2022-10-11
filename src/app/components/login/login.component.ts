import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import StorageHelper from 'src/app/libs/helpers/storage.helper';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{

  username : string = "";
  password : string = "";

  constructor( private apiService : ApiService, private route : Router) { }

  onClick(){
    this.apiService.login(this.username, this.password).subscribe(
      {
        next : (res) => {
          StorageHelper.setItem('session', res);
          this.route.navigate(['index']);
        }
      });
  }

}
