import { createReducer, on } from '@ngrx/store'
import { EntityState, createEntityAdapter } from '@ngrx/entity'
import { FilmActions } from '../actions'

export interface Film {
  id: string
  title: string
  episode_id: number
  opening_crawl: string
  director: string
  producer: string
  release_date: string
  characters: string[]
  planets: string[]
  starships: string[]
  vehicles: string[]
  species: string[]
  created: string
  edited: string
  url: string
}

export type FilmState = EntityState<Film>

export const filmAdapter = createEntityAdapter<Film>({
  selectId: (film) => film.id,
  sortComparer: (film1, film2) => film1.episode_id - film2.episode_id,
})

const initialState = filmAdapter.getInitialState()

export const filmReducer = createReducer<FilmState>(
  initialState,
  on(FilmActions.allFilmsAreLoadedSuccessfully, (state, { data }) =>
    filmAdapter.addMany(data, state),
  ),
  on(FilmActions.aFilmIsLoadedSuccessfully, (state, { data }) => filmAdapter.addOne(data, state)),
)
