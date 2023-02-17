import { createFeatureSelector, createSelector } from '@ngrx/store'
import { selectRouteParams } from './router.selectors'
import { filmAdapter, FilmState } from '../reducers/film.reducer'

export const filmFeatureSelector = createFeatureSelector<FilmState>('film')

const { selectEntities, selectAll } = filmAdapter.getSelectors()

export const selectFilmEntities = createSelector(filmFeatureSelector, selectEntities)

export const selectFilms = createSelector(filmFeatureSelector, selectAll)

export const selectActiveFilm = createSelector(
  selectFilmEntities,
  selectRouteParams,
  (films, params) => (params?.['filmId'] ? films[params['filmId']] : undefined),
)
