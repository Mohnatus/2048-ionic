import { Component, Input, OnInit } from '@angular/core';

import { InputManager } from '../providers/input.manager';

@Component({
  selector: 'game-playground',
  templateUrl: 'game.playground.html',
  styleUrls: ['game.playground.scss'],
  providers: [ InputManager ]
})
export class GamePlayground {
  @Input() size: number;

  field;

  constructor(
    private inputManager: InputManager
  ) {}

  ngOnInit() {
    this.field = [];
    for (let y = 0; y < this.size; y++) {
      this.field[y] = [];
      for (let x = 0; x < this.size; x++) {
        this.field[y][x] = x;
      }
    }

    this.inputManager.init(document.querySelector('.playground'));
    this.inputManager.on(
      this.inputManager.events.move,
      (data) => this.move(data.direction)
    )
  }

  move(direction):void {
    console.log('move to', direction)
  }

}
