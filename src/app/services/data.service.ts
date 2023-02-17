import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Film } from '../state/reducers/film.reducer'
import { Character } from '../state/reducers/character.reducer'

interface SwapiCollectionResponse<T> {
  count: number
  next: string
  previous: string
  results: T[]
}

const apiUrl = 'https://swapi.dev/api'
const imagesUrl = 'https://static.wikia.nocookie.net/starwars/images'

export const filmPosters = {
  '1': `${imagesUrl}/0/06/Star_Wars_Style_A_poster_1977.jpg`,
  '2': `${imagesUrl}/e/e4/Empire_strikes_back_old.jpg`,
  '3': `${imagesUrl}/b/b2/ReturnOfTheJediPoster1983.jpg`,
  '4': `${imagesUrl}/7/75/EPI_TPM_poster.png`,
  '5': `${imagesUrl}/d/dd/Attack-Clones-Poster.jpg`,
  '6': `${imagesUrl}/e/e7/EPIII_RotS_poster.png`,
}

@Injectable()
export class DataService {
  constructor(private http: HttpClient) {}

  getAllFilms() {
    return this.http.get<SwapiCollectionResponse<Film>>(`${apiUrl}/films/`)
  }

  getFilm(id: string) {
    return this.http.get<Film>(`${apiUrl}/films/${id}/`)
  }

  getCharacter(id: string) {
    return this.http.get<Character>(`${apiUrl}/people/${id}/`)
  }
}
