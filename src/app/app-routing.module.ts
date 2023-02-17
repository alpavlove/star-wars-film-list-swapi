import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './components/home/home.component'
import { FilmDetailsComponent } from './components/film-details/film-details.component'
import { CharacterDetailsComponent } from './components/character-details/character-details.component'

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'films/:filmId',
    component: FilmDetailsComponent,
  },
  {
    path: 'films/:filmId/characters/:characterId',
    component: CharacterDetailsComponent,
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
