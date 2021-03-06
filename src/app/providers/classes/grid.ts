import { Cell } from './cell';
import { Tile } from './tile';

export class Grid {
  size;
  cells:any[];

  constructor(size) {
    this.size = size;
    this.cells = this.getEmptyState();
  }

  getEmptyState():any[] {
    let cells:any[] = [];

    for (let y = 0; y < this.size; y++) {
      cells[y] = [];
      for (let x = 0; x < this.size; x++) {
        cells[y].push(null);
      }
    }

    return cells;
  }

  getCellContent(cell:Cell):any {
    if (this.isWithinBounds(cell)) {
      return this.cells[cell.y][cell.x]
    } else {
      return null;
    }
  }

  hasAvailableCells():boolean {
    return this.getAvailableCells().length > 0;
  }

  getAvailableCells():any[] {
    let cells:any[] = [];

    this.eachCell((x, y, tile) => {
      if (!tile) {
        cells.push(new Cell(x, y));
      }
    });

    return cells;
  }

  getRandomAvailableCell():any {
    let cells:any[] = this.getAvailableCells();

    if (cells.length) {
      return cells[Math.floor(Math.random() * cells.length)];
    }
  }

  insertTile(tile:Tile):void {
    this.cells[tile.y][tile.x] = tile;
  }

  clear():void {
    console.log(1, this.cells)
    this.cells.forEach((row, y) => {
      console.log(2, row)
      row.forEach((col, x) => {
        console.log(3, col)
        this.cells[y][x] = null;
      })
    })
  }

  load(cells:any):void {
    if (cells)
      this.cells = cells;
  }

  removeTile(tile:Tile):void {
    this.cells[tile.y][tile.x] = null;
  }

  eachCell(callback:any):void {
    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        callback(x, y, this.cells[y][x]);
      }
    }
  }

  isWithinBounds(cell:Cell):boolean {
    return cell.x >= 0 && cell.x < this.size && cell.y >=0 && cell.y < this.size;
  }

  isAvailableCell(cell:Cell):boolean {
    return !this.getCellContent(cell);
  }
};