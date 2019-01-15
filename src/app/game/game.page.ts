import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  

  constructor(
    private activateRoute: ActivatedRoute,
    private storage: Storage
  ) {
    this.isSaved = activateRoute.snapshot.params['type'] == 'saved';
  }

  ngOnInit() {
  }

  isSaved = false;

  size = 4;
  
  scores = 0;
  current = 0;
  best = 0;

  restart():void {
    console.log('restart')
  }

  showRules():void {
    console.log('show rules')
  }

  
  

  saveGame() {
    this.storage.set('test', 'testvalue');
  }

  getSavedGame() {
    this.storage.get('test').then((val) => {
      console.log('test storage value is', val);
    });
  }
}