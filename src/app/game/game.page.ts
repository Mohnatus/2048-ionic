import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import { Storage } from '@ionic/storage';

import { GamePlayground } from './game.playground';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  @ViewChild(GamePlayground)
  playground: GamePlayground;

  fromParam = { from: '/game' };
  size = 4;
  
  scores = 0;
  current = 0;
  best:number = 0;

  private querySubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private storage: Storage
  ) {
    
  }

  ngOnInit(){
    console.log('PAGE INIT')
    this.querySubscription = this.route.queryParams.subscribe(
      (queryParam: any) => {
        
        this.onRouteChange(queryParam['type'] == 'saved');
      }
    );
  }

  onRouteChange(isSaved){
    console.log('PAGE ONROUTE CHANGE')
    
    if (isSaved) {
      console.log('взять сохраненную')
      this.getSavedGame(gameData => this.start(gameData));
    } else {
      console.log('начать новую')
      this.start(this.getEmptyGameData());
    }
  }


  start(data:any):void {
    console.log('start', data)
    this.scores = data.scores || 0;
    this.playground.start(data.cells);
  }

  restart():void {
    this.start(this.getEmptyGameData());
  }

  finishGame():void {
    let game = this.playground.getCells();
    this.saveGame(game);
  }

  saveGame(game:any) {
    game = JSON.stringify(game);
    this.storage.set('game', game);
  }

  getSavedGame(callback:any) {
    this.storage.get('game').then(val => {
      val = JSON.parse(val) || this.getEmptyGameData();
      callback(val);
    })
  }

  getEmptyGameData():any {
    return {
      scores: 0,
      cells: []
    }
  }
}