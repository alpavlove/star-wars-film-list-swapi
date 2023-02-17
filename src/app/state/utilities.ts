import { Film } from './reducers/film.reducer'
import { Character } from './reducers/character.reducer'

export function getEntityId(url: string) {
  return url.split('/').slice(-2)[0]
}

export function processEntityUrls<T>(entity: T, keys: (keyof T)[]) {
  return keys.reduce((acc, key) => {
    const value = entity[key]
    return {
      ...acc,
      [key]: Array.isArray(value) ? value.map(getEntityId) : value,
    }
  }, entity)
}

export function processEntity<T extends { url: string }>(entity: T, keys: (keyof T)[]) {
  return {
    ...processEntityUrls(entity, keys),
    id: getEntityId(entity.url),
  }
}

export function processFilm(film: Film) {
  return processEntity(film, ['characters', 'planets', 'starships', 'vehicles', 'species'])
}

export function processCharacter(character: Character) {
  return processEntity(character, ['films', 'starships', 'vehicles', 'species'])
}
