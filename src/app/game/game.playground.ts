import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';

import { InputService } from '../providers/input.service';

@Component({
  selector: 'game-playground',
  templateUrl: 'game.playground.html',
  styleUrls: ['game.playground.scss'],
  providers: [ InputService ]
})
export class GamePlayground {
  @Input() size: number;

  @ViewChild("field")
  field: ElementRef;

  grid = [];

  constructor(
    private inputService: InputService
  ) {}

  ngOnInit() {
    for (let y = 0; y < this.size; y++) {
      this.grid[y] = [];
      for (let x = 0; x < this.size; x++) {
        this.grid[y][x] = x;
      }
    }

    this.inputService.init(this.field.nativeElement);
    this.inputService.on(
      this.inputService.events.move,
      (data) => this.move(data.direction)
    )
  }

  move(direction):void {
    console.log('move to', direction)
  }

}
