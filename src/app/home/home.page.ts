import { Component, ViewChild } from '@angular/core';

import { GamePage } from '../game/game.page';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  root = GamePage;

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
