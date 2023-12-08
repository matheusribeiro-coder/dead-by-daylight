import { Routes } from '@angular/router';
import { HomeComponent } from './pages';

export const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  component: HomeComponent
},
{
  path: 'characters',
  loadComponent: () => import('./pages/characters/characters.component').then(c => c.CharactersComponent)
}];
