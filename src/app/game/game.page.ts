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

  //isSaved = false;
  fromParam = { from: '/game' };
  size = 4;
  
  scores = 0;
  current = 0;
  best:number = 0;

  isSaved = false;
  private querySubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private storage: Storage
  ) {
    this.querySubscription = route.queryParams.subscribe(
      (queryParam: any) => {
        console.log(123, queryParam, queryParam['type'])
        this.isSaved = queryParam['type'] == 'saved';
      }
    );
  }

  ngOnInit(){}


  start(data:any | null):void {
    

    console.log('start', data)
    if (data) {
      this.scores = data.scores;
      this.playground.start(data.cells);
    } else {
      this.scores = 0;
      this.playground.start(null);
    }

  }

  restart():void {
    this.start(null);
  }

  saveGame(game) {
    this.storage.set('game', game);
  }

  getSavedGame(callback) {
    this.storage.get('game').then(val => {
      callback(val);
    })
  }
}