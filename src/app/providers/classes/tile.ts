import { Cell } from './cell';

export class Tile {
  defaultValue = 2;

  x:number;
  y:number;

  value:number;

  previousPosition = null;
  mergedFrom = null;

  constructor(position, value) {
    this.x = position.x;
    this.y = position.y;

    this.value = value || this.defaultValue;
  }

  savePosition():void {
    this.previousPosition = new Cell(this.x, this.y);
  }

  updatePosition(position:Cell):void {
    this.x = position.x;
    this.y = position.y;
  }
};