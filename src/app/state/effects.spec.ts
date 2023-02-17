import { of, throwError } from 'rxjs'
import { marbles } from 'rxjs-marbles/jest'
import { Actions } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { DataService } from '../services/data.service'
import { Effects } from './effects'
import 'jasmine'
import { FilmActions } from './actions'

describe('Effects', () => {
  let effects: Effects
  let actions$: Actions
  let dataService: jasmine.SpyObj<DataService>
  let store: jasmine.SpyObj<Store>

  beforeEach(() => {
    actions$ = new Actions(of({ type: 'dummy-action' }))
    dataService = jasmine.createSpyObj<DataService>(['getAllFilms', 'getFilm', 'getCharacter'])
    store = jasmine.createSpyObj<Store>(['select'])
    // @ts-ignore
    effects = new Effects(actions$, dataService, store)
  })

  it('should create the Effects service', () => {
    expect(effects).toBeTruthy()
  })

  describe('navigatedTo$', () => {
    it(
      'should emit the path from the latest ROUTER_NAVIGATION action',
      marbles((m) => {
        actions$ = m.hot('--a--', { a: { type: '[Router] Navigation', payload: { event: {} } } })
        m.expect(effects.navigatedTo$).toBeObservable(m.cold('--a--', { a: '' }))
      }),
    )
  })

  describe('navigatedToHomePage$', () => {
    it(
      'should dispatch a loadingOfAllFilmsIsRequested action when the user navigates to the homepage',
      marbles((m) => {
        const expectedAction = FilmActions.loadingOfAllFilmsIsRequested()
        m.expect(effects.navigatedToHomePage$).toBeObservable(
          m.cold('--a--', { a: expectedAction }),
        )
      }),
    )
  })

  describe('loadAllFilms$', () => {
    it(
      'should dispatch an allFilmsAreLoadedSuccessfully action with the correct data when the loadingOfAllFilmsIsRequested action is dispatched',
      marbles((m) => {
        const response = { results: [{ title: 'film1' }, { title: 'film2' }] }
        const expectedAction = FilmActions.allFilmsAreLoadedSuccessfully({
          // @ts-ignore
          data: [{ title: 'film1' }, { title: 'film2' }],
        })

        // @ts-ignore
        dataService.getAllFilms.and.returnValue(of(response))
        m.expect(effects.loadAllFilms$).toBeObservable(m.cold('--a--', { a: expectedAction }))
      }),
    )

    it(
      'should dispatch an empty action when the loadingOfAllFilmsIsRequested action results in an error',
      marbles((m) => {
        dataService.getAllFilms.and.returnValue(throwError(new Error('some error')))
        m.expect(effects.loadAllFilms$).toBeObservable(m.cold('--|'))
      }),
    )
  })
})
