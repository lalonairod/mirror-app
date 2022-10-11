import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  character: string = ''
  character$!: Observable<any>

  constructor(public apiService: ApiService) { 
    console.log('Constructor');
    
    this.character$ = this.apiService.searchRickAndMorty('Morty').pipe(
      tap(console.log)
    )
  }

  ngOnInit(): void { }

  searchCharacter(){
    this.character$ = this.apiService.searchRickAndMorty(this.character).pipe(
      tap(console.log)
    )
  }

}
