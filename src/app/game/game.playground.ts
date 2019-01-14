import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'game-playground',
  templateUrl: 'game.playground.html',
  styleUrls: ['game.playground.scss'],
})
export class GamePlayground {
  @Input() size: number;

  field;

  ngOnInit() {
    this.field = [];
    for (let y = 0; y < this.size; y++) {
      this.field[y] = [];
      for (let x = 0; x < this.size; x++) {
        this.field[y][x] = x;
      }
    }
  }
}
