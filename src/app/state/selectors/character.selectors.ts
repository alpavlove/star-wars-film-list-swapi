import { createFeatureSelector, createSelector } from '@ngrx/store'
import { selectRouteParams } from './router.selectors'
import { characterAdapter, CharacterState } from '../reducers/character.reducer'

export const characterFeatureSelector = createFeatureSelector<CharacterState>('character')

const { selectEntities } = characterAdapter.getSelectors()

export const selectCharacterEntities = createSelector(characterFeatureSelector, selectEntities)

export const selectActiveCharacter = createSelector(
  selectCharacterEntities,
  selectRouteParams,
  (characters, { characterId }) => characters[characterId],
)
