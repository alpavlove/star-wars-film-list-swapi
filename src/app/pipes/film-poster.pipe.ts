import { Pipe, PipeTransform } from '@angular/core'
import { filmPosters } from '../services/data.service'

@Pipe({
  name: 'filmPoster',
})
export class FilmPosterPipe implements PipeTransform {
  transform(id: string) {
    return filmPosters[id as keyof typeof filmPosters]
  }
}
