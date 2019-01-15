import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  menu = [
    {
      'text': 'Начать игру',
      'link': '/game/new'
    },{
      'text': 'Статистика',
      'link': '/stats'
    },{
      'text': 'Настройки',
      'link': '/settings'
    },{
      'text': 'Правила',
      'link': '/rules'
    }
  ]
}
