import { Tile } from './classes/tile';
import { Grid } from './classes/grid';

export class HTMLService {
  container;
  className = 'tile';
  mergedClass = 'tile_merged';
  newClass = 'tile_new';
  valueAttr = 'data-value';
  rowAttr = 'data-row';
  colAttr = 'data-col';
  
  actuate(grid:Grid) {
    console.log('actuate', grid);
    
    window.requestAnimationFrame(() => {
      
      this.clear();
      
      grid.cells.forEach(column => {
        column.forEach(cell => {
          if (cell) {
            this.addTile(cell);
          }
        }) 
      })
    });
  }

  clear():void {
    console.log(this.container)
    while (this.container.firstChild) {
      console.log(this.container.firstChild)
      this.container.removeChild(this.container.firstChild);
    }
  }

  addTile(tile:Tile):void {
    // создать элемент тайла
    let wrapper:any = document.createElement('div');

    let tileClasses = [this.className]; // массив классов
    // присваивание через classlist вызывает мигание, поэтому setAttribute

    // устанавливаем значение
    wrapper.setAttribute(this.valueAttr, tile.value);

    // позиция тайла
    let position = tile.previousPosition || { x: tile.x, y: tile.y };
    // установить исходную позицию, если есть
    
    this.setTilePositionData(wrapper, position);

    this.setTileClasses(wrapper, tileClasses);
    

    if (tile.previousPosition) {
      // перемещение но новую позицию
      window.requestAnimationFrame(() => {
        position = { x: tile.x, y: tile.y }
        this.setTileClasses(wrapper, tileClasses)
        
        this.setTilePositionData(wrapper, position);
        
      });

    } else if (tile.mergedFrom) {
      tileClasses.push(this.mergedClass);
      this.setTileClasses(wrapper, tileClasses);
      // отрендерить объединенные тайлы
      tile.mergedFrom.forEach(merged => {
        this.addTile(merged);
      });
    } else {
      tileClasses.push(this.newClass);
      this.setTileClasses(wrapper, tileClasses);
    }

    this.container.appendChild(wrapper);
  }

  setTilePositionData(element:any, position:any):void {
    
    position = {
      x: position.x + 1,
      y: position.y + 1
    };
    element.setAttribute(this.rowAttr, position.y);
    element.setAttribute(this.colAttr, position.x);
  }

  setTileClasses(element:any, classes:string[]):void {
    element.setAttribute("class", classes.join(" "));
  }
}