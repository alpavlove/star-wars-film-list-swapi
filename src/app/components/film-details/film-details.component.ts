import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { FilmActions } from '../../state/actions'
import { selectActiveFilm } from '../../state/selectors/film.selectors'

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
})
export class FilmDetailsComponent implements OnInit {
  film$ = this.store.select(selectActiveFilm)

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(FilmActions.loadingOfAMissingFilmIsRequested())
  }
}
