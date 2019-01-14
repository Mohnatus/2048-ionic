import { Component, Input, OnInit, ViewChild, ElementRef, ViewEncapsulation  } from '@angular/core';

import { InputService } from '../providers/input.service';
import { GridService } from '../providers/grid.service';
import { HTMLService } from '../providers/html.service';

@Component({
  selector: 'game-playground',
  templateUrl: 'game.playground.html',
  styleUrls: ['game.playground.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ InputService, GridService, HTMLService ]
})
export class GamePlayground {
  @Input() size: number;

  @ViewChild("field")
  field: ElementRef;

  @ViewChild("tiles")
  tilesContainer: ElementRef;

  grid = [];

  constructor(
    private inputService: InputService,
    private gridService: GridService
  ) {}

  ngOnInit() {
    this.gridService.init(
      this.size, 
      this.tilesContainer.nativeElement
    );
    this.grid = this.gridService.getField();

    this.inputService.init(this.field.nativeElement);
    this.inputService.on(
      this.inputService.events.move,
      (data) => this.move(data.direction)
    )
  }

  move(direction):void {
    if (this.isTerminated()) {
      return;
    }
    this.gridService.move(direction);
  }

  isTerminated():boolean {
    return false;
  }

}
