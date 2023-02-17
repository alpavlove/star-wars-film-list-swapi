import { Component } from '@angular/core'
import { selectFilms } from '../../state/selectors/film.selectors'
import { Store } from '@ngrx/store'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  films$ = this.store.select(selectFilms)

  constructor(private store: Store) {}
}
