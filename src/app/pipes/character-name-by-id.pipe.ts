import { Pipe, PipeTransform } from '@angular/core'
import { Store } from '@ngrx/store'
import { selectCharacterEntities } from '../state/selectors/character.selectors'
import { map } from 'rxjs'

@Pipe({
  name: 'characterNameById',
})
export class CharacterNameByIdPipe implements PipeTransform {
  constructor(private store: Store) {}
  transform(value: string) {
    return this.store
      .select(selectCharacterEntities)
      .pipe(map((characters) => characters?.[value]?.name))
  }
}
