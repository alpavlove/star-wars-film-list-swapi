import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { combineLatestWith, EMPTY, switchMap, take, filter, map, mergeMap, catchError } from 'rxjs'
import { ROUTER_NAVIGATION } from '@ngrx/router-store'
import { Store } from '@ngrx/store'

import { DataService } from '../services/data.service'
import { selectActiveCharacter, selectCharacterEntities } from './selectors/character.selectors'
import { selectCurrentRoute, selectRouteParams } from './selectors/router.selectors'
import { selectActiveFilm, selectFilmEntities } from './selectors/film.selectors'
import { FilmActions, CharacterActions } from './actions'
import { processCharacter, processFilm } from './utilities'

@Injectable()
export class Effects {
  navigatedTo$ = this.actions$.pipe(
    ofType(ROUTER_NAVIGATION),
    switchMap(() => this.store.select(selectCurrentRoute)),
    map((route) => route.routeConfig.path),
  )

  navigatedToHomePage$ = createEffect(() =>
    this.navigatedTo$.pipe(
      filter((path) => path === ''),
      take(1),
      map(() => FilmActions.loadingOfAllFilmsIsRequested()),
    ),
  )

  loadAllFilms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FilmActions.loadingOfAllFilmsIsRequested.type),
      mergeMap(() =>
        this.dataService.getAllFilms().pipe(
          map((response) =>
            FilmActions.allFilmsAreLoadedSuccessfully({
              data: response.results.map(processFilm),
            }),
          ),
          catchError(() => EMPTY),
        ),
      ),
    ),
  )

  loadAFilm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FilmActions.loadingOfAFilmIsRequested.type),
      mergeMap((action) =>
        this.dataService.getFilm(action.data).pipe(
          map(processFilm),
          map((film) => FilmActions.aFilmIsLoadedSuccessfully({ data: film })),
          catchError(() => EMPTY),
        ),
      ),
    ),
  )

  loadAMissingFilm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FilmActions.loadingOfAMissingFilmIsRequested.type),
      switchMap(() => this.store.select(selectActiveFilm).pipe(take(1))),
      filter((film) => !film),
      mergeMap(() =>
        this.store.select(selectRouteParams).pipe(
          take(1),
          mergeMap(({ filmId }) =>
            this.dataService.getFilm(filmId).pipe(
              map(processFilm),
              map((film) => FilmActions.aFilmIsLoadedSuccessfully({ data: film })),
              catchError(() => EMPTY),
            ),
          ),
        ),
      ),
    ),
  )

  loadFilmCharacters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FilmActions.loadingOfAMissingFilmIsRequested.type),
      switchMap(() =>
        this.store
          .select(selectActiveFilm)
          .pipe(
            filter(Boolean),
            combineLatestWith(this.store.select(selectCharacterEntities)),
            take(1),
          ),
      ),
      mergeMap(([film, loadedCharacters]) =>
        film.characters
          .filter((id) => !loadedCharacters[id])
          .map((id) => CharacterActions.loadingOfACharacterIsRequested({ data: id })),
      ),
    ),
  )

  loadACharacter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CharacterActions.loadingOfACharacterIsRequested.type),
      mergeMap((action) =>
        this.dataService.getCharacter(action.data).pipe(
          map(processCharacter),
          map((character) => CharacterActions.aCharacterIsLoadedSuccessfully({ data: character })),
          catchError(() => EMPTY),
        ),
      ),
    ),
  )

  loadAMissingCharacter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CharacterActions.loadingOfAMissingCharacterIsRequested),
      switchMap(() => this.store.select(selectActiveCharacter).pipe(take(1))),
      filter((character) => !character),
      mergeMap(() =>
        this.store.select(selectRouteParams).pipe(
          take(1),
          mergeMap(({ characterId }) =>
            this.dataService.getCharacter(characterId).pipe(
              map(processCharacter),
              map((character) =>
                CharacterActions.aCharacterIsLoadedSuccessfully({ data: character }),
              ),
              catchError(() => EMPTY),
            ),
          ),
        ),
      ),
    ),
  )

  loadCharacterFilms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CharacterActions.loadingOfAMissingCharacterIsRequested.type),
      switchMap(() =>
        this.store
          .select(selectActiveCharacter)
          .pipe(filter(Boolean), combineLatestWith(this.store.select(selectFilmEntities)), take(1)),
      ),
      mergeMap(([character, loadedFilms]) =>
        character.films
          .filter((id) => !loadedFilms[id])
          .map((id) => FilmActions.loadingOfAFilmIsRequested({ data: id })),
      ),
    ),
  )

  constructor(
    private actions$: Actions<FilmActions | CharacterActions>,
    private dataService: DataService,
    private store: Store,
  ) {}
}
