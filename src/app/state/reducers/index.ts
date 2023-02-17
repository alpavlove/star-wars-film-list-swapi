import { isDevMode } from '@angular/core'
import { ActionReducerMap, MetaReducer } from '@ngrx/store'
import { routerReducer, RouterReducerState } from '@ngrx/router-store'
import { filmReducer, FilmState } from './film.reducer'
import { characterReducer, CharacterState } from './character.reducer'

export interface State {
  router: RouterReducerState
  film: FilmState
  character: CharacterState
}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer,
  film: filmReducer,
  character: characterReducer,
}

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : []
