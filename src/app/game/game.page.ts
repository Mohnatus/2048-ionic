import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  size = 4;
  
  scores = 0;
  current = 0;

  restart():void {
    console.log('restart')
  }

  showRules():void {
    console.log('show rules')
  }
}

