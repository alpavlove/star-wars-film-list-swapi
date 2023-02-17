import { createActionGroup, emptyProps, props, union } from '@ngrx/store'
import { Character } from './reducers/character.reducer'
import { Film } from './reducers/film.reducer'

export const FilmActions = createActionGroup({
  source: 'Film',
  events: {
    'Loading of all films is requested': emptyProps(),
    'All films are loaded successfully': props<{ data: Film[] }>(),
    'Loading of a film is requested': props<{ data: string }>(),
    'Loading of a missing film is requested': emptyProps(),
    'A film is loaded successfully': props<{ data: Film }>(),
  },
})

const FilmActionsTypes = union(FilmActions)

export type FilmActions = typeof FilmActionsTypes

export const CharacterActions = createActionGroup({
  source: 'Film',
  events: {
    'Loading of a character is requested': props<{ data: string }>(),
    'Loading of a missing character is requested': emptyProps(),
    'A character is loaded successfully': props<{ data: Character }>(),
  },
})

const CharacterActionsTypes = union(CharacterActions)

export type CharacterActions = typeof CharacterActionsTypes
