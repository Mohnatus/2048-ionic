import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'home', 
    pathMatch: 'full' 
  },
  { 
    path: 'home', 
    loadChildren: './home/home.module#HomePageModule' 
  },
  {
    path: 'game',
    loadChildren: './game/game.module#GamePageModule'
  },
  { 
    path: 'rules', 
    loadChildren: './rules/rules.module#RulesPageModule' 
  },
  { 
    path: 'settings', 
    loadChildren: './settings/settings.module#SettingsPageModule' 
  },
  { 
    path: 'stats', 
    loadChildren: './stats/stats.module#StatsPageModule' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
