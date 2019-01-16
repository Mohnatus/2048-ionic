import { Component, Input, OnInit, ViewChild, ElementRef, ViewEncapsulation  } from '@angular/core';

import { InputService } from '../providers/input.service';
import { GridService } from '../providers/grid.service';
import { HTMLService } from '../providers/html.service';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'game-playground',
  templateUrl: 'game.playground.html',
  styleUrls: ['game.playground.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ InputService, GridService, HTMLService ]
})
export class GamePlayground {
  @Input() size: number;
  @Input() isSaved: boolean;

  @ViewChild("field")
  field: ElementRef;

  @ViewChild("tiles")
  tilesContainer: ElementRef;

  grid:any = [];
  moveTriggered = false;

  constructor(
    private inputService: InputService,
    private gridService: GridService,
    private storage: Storage
  ) {}

  ngOnInit() {
    console.log('PLAYGROUND INIT')
    this.gridService.init(
      this.size, 
      this.tilesContainer.nativeElement
    );
    this.grid = this.gridService.getField();

    this.inputService.init(this.field.nativeElement);
  }

  start(cells:any[]):void {
    console.log('PLAYGROUND START')
    this.gridService.start(cells);

    if (!this.moveTriggered) {
      this.moveTriggered = true;
      this.inputService.on(
        this.inputService.events.move,
        (data) => this.move(data.direction)
      );
    }
    
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

  getCells():any[] {
    return this.gridService.getCells();
  }

}
