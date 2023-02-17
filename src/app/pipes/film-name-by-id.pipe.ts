import { Pipe, PipeTransform } from '@angular/core'
import { Store } from '@ngrx/store'
import { selectFilmEntities } from '../state/selectors/film.selectors'
import { map } from 'rxjs'

@Pipe({
  name: 'filmNameById',
})
export class FilmNameByIdPipe implements PipeTransform {
  constructor(private store: Store) {}
  transform(value: string) {
    return this.store.select(selectFilmEntities).pipe(map((films) => films?.[value]?.title))
  }
}
