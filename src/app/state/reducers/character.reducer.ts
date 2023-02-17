import { createReducer, on } from '@ngrx/store'
import { EntityState, createEntityAdapter } from '@ngrx/entity'
import { CharacterActions } from '../actions'

export interface Character {
  id: string
  name: string
  height: string
  mass: string
  hair_color: string
  skin_color: string
  eye_color: string
  birth_year: string
  gender: string
  homeworld: string
  films: string[]
  species: string[]
  vehicles: string[]
  starships: string[]
  created: string
  edited: string
  url: string
}

export type CharacterState = EntityState<Character>

export const characterAdapter = createEntityAdapter<Character>({
  selectId: (character) => character.id,
})

const initialState = characterAdapter.getInitialState()

export const characterReducer = createReducer<CharacterState>(
  initialState,
  on(CharacterActions.aCharacterIsLoadedSuccessfully, (state, { data }) =>
    characterAdapter.addOne(data, state),
  ),
)
