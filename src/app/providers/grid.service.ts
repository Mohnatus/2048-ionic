import { Injectable } from '@angular/core';

import { Cell } from './classes/cell';
import { Tile } from './classes/tile';
import { Grid } from './classes/grid';

import { HTMLService } from './html.service';
import { directions } from './directions';

@Injectable()
export class GridService {
  directions:any;

  size;
  field:any[] = [];
  grid:Grid;
  vectors:any = {};

  startTiles = 2;
  maxValue = 2048;

  constructor(
    private htmlService: HTMLService
  ) {}

  init(size:number, container) {
    console.log('GRID INIT')
    this.size = size;
    for (let y = 0; y < this.size; y++) {
      this.field[y] = [];
      for (let x = 0; x < this.size; x++) {
        this.field[y][x] = null;
      }
    }

    this.directions = directions;
    this.htmlService.container = container;

    this.vectors[directions.left] = { x: -1, y: 0 };
    this.vectors[directions.right] = { x: 1, y: 0 };
    this.vectors[directions.up] = { x: 0, y: -1 };
    this.vectors[directions.down] = { x: 0, y: 1 };

    this.grid = new Grid(this.size); // создаем сетку
  }

  start(savedGrid:any[]):void {
    console.log('GRID START')
    if (savedGrid.length)
      this.grid.load(savedGrid); // загружаем сохраненную сетку
    else {
      this.grid.clear();
      this.addStartTiles(); // добавляем стартовые тайлы
    }
    
    this.actuate();
  }

  // получить базовую сетку поля
  getField():any[] {
    return this.field;
  }

  getCells():any[] {
    return this.grid.cells;
  }

  // добавить начальные тайлы
  addStartTiles():void {
    for (let i = 0; i < this.startTiles; i++) {
      this.addRandomTile();
    }
  }

  // добавить тайл на случайную позицию
  addRandomTile():void {
    if (this.grid.hasAvailableCells()) {
      let value:number = this.getStartTileValue();
      let position:Cell = this.grid.getRandomAvailableCell();
      let tile:Tile = new Tile(position, value);

      this.grid.insertTile(tile);
    }
  }

  // сгенерировать значение для нового тайла (2 или 4)
  getStartTileValue():number {
    return Math.random() < 0.9 ? 2 : 4;
  }

  isMoveAvailable():boolean {
    return this.grid.hasAvailableCells() || this.hasAvailableTileMatches();
  }

  // есть ли возможные слияния тайлов
  hasAvailableTileMatches():boolean {
    let tile:Tile;

    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        tile = this.grid.getCellContent(new Cell(x, y));

        if (tile) {
          this.directions.forEach(direction => {
            let vector = this.vectors[direction];
            let cell = new Cell(
              x + vector.x,
              y + vector.y
            );

            let other = this.grid.getCellContent(cell);

            if (other && other.value == tile.value) {
              return true; // тайлы могут быть слиты
            }
          })
        }
      }
    }

    return false;
  }

  showGrid():void {
    for(let y = 0; y < this.size; y++) {
      let string = '';
      for (let x = 0; x < this.size; x++) {
        string += this.grid.cells[y][x] ? '*' : '-';
      }
      console.log(string);
    }
  }

  // передвинуть тайлы в направлении direction
  move(direction:number):void {
    let cell:Cell, tile:any;

    let vector:object = this.vectors[direction];
    let traversals:any = this.buildTraversals(vector);
    let moved:boolean = false;

    this.prepareTiles();

    // повернуть сетку в нужном направлении и передвинуть тайлы
    traversals.y.forEach(y => {
      traversals.x.forEach(x => {

        cell = new Cell(x, y);
        tile = this.grid.getCellContent(cell);

        if (tile) {
          
          let positions:any = this.findFarthestPosition(cell, vector);
          let next:any = this.grid.getCellContent(positions.next);

       

          // только одно слияние на ряд
          if (
            next && 
            next.value == tile.value &&
            !next.mergedFrom
          ) {
            
            let merged = new Tile(positions.next, tile.value * 2);
            merged.mergedFrom = [ tile, next ];

            this.grid.insertTile(merged);
            this.grid.removeTile(tile);

            tile.updatePosition(positions.next);

            if (merged.value == this.maxValue) {

            }
          } else {
            this.moveTile(tile, positions.farthest);
          }

          if (!this.positionsEqual(cell, tile)) {
            moved = true;
          }
        } 
      })
    })

    if (moved) {
      this.addRandomTile();

      if (!this.isMoveAvailable()) {
        // game over
      }

      this.actuate();
    }
  }

  // передвинуть тайл
  moveTile(tile:Tile, cell:Cell):void {
    this.grid.cells[tile.y][tile.x] = null
    this.grid.cells[cell.y][cell.x] = tile;
    tile.updatePosition(cell);
  }

  buildTraversals(vector:any):any {
    let traversals:any = {
      x: [],
      y: []
    };

    for(let pos = 0; pos < this.size; pos++) {
      traversals.x.push(pos);
      traversals.y.push(pos);
    }

    if (vector.x === 1) traversals.x = traversals.x.reverse();
    if (vector.y === 1) traversals.y = traversals.y.reverse();

    return traversals;
  }

  // сохранить текущую позицию
  // удалить информацию о слияниях
  prepareTiles():void {
    this.grid.eachCell((x:number, y:number, tile:Tile) => {
      if (tile) {
        tile.mergedFrom = null;
        tile.savePosition();
      }
    })
  }

  findFarthestPosition(cell:Cell, vector:any):object {
    let previous:any;

    do {
      previous = cell;
      cell = new Cell(
        previous.x + vector.x,
        previous.y + vector.y
      )
    } while(
      this.grid.isWithinBounds(cell) &&
      this.grid.isAvailableCell(cell)
    )
    return {
      farthest: previous,
      next: cell // для проверки нужно ли слияние
    };
  }

  positionsEqual(first:any, second:any):boolean {
    return first.x === second.x && first.y === second.y;
  }

  actuate():void {
    this.htmlService.actuate(this.grid);
  }
}