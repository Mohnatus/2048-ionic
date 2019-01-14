import { Component, ViewChild } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  size = 4;
  
  scores = 0;
  current = 0;

  


  restart():void {
    console.log('restart')
  }

  showRules():void {
    console.log('show rules')
  }
}
