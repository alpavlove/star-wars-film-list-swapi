import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { CharacterActions } from '../../state/actions'
import { selectActiveCharacter } from '../../state/selectors/character.selectors'

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
})
export class CharacterDetailsComponent implements OnInit {
  character$ = this.store.select(selectActiveCharacter)

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(CharacterActions.loadingOfAMissingCharacterIsRequested())
  }
}
