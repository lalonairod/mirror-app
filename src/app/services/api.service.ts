import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import StorageHelper from '../libs/helpers/storage.helper';
import { ApiEndpoints } from '../utils/apiendpoints.class';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( private http : HttpClient) { }

  login( username : string, password : string ): Observable<any>{
    return this.http.post('http://ec2-18-116-97-69.us-east-2.compute.amazonaws.com:4001/api/login', 
    { username, password });
  }

  refreshToken(){
    return this.http.post('http://ec2-18-116-97-69.us-east-2.compute.amazonaws.com:4001/api/refresh', {
      session: StorageHelper.getItem('session')
    })
  }

  searchDrink( name : string ) : Observable<any>{
    return this.http.post('http://ec2-18-116-97-69.us-east-2.compute.amazonaws.com:4001/mirror/drink',
    {
      "endpoint": `json/v1/1/search.php?s=${name}`
    })
  }

  searchRickAndMorty(character: string){
    return this.http.post(environment.URL + ApiEndpoints.RICK_MORTY,
      {
        endpoint: `character/?name=${character}`
      })
  }

}
