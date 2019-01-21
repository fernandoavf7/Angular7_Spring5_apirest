import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
  styleUrls: ['./directiva.component.css']
})
export class DirectivaComponent {

  listaCurso:string[] = ["TypeScript","JavaScript","Java SE","Angular","C#"];
  habilitar:boolean = false;

  //void cuando no retorna nada
  onSetHabilitar():void{
    this.habilitar = (this.habilitar==true)?false: true;
  }

  constructor(){

  }
}
