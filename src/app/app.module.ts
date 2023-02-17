import { NgModule, isDevMode } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { EffectsModule } from '@ngrx/effects'
import { StoreRouterConnectingModule } from '@ngrx/router-store'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HomeComponent } from './components/home/home.component'
import { FilmDetailsComponent } from './components/film-details/film-details.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { reducers, metaReducers } from './state/reducers'
import { Effects } from './state/effects'
import { DataService } from './services/data.service'
import { CharacterDetailsComponent } from './components/character-details/character-details.component'
import { FilmNameByIdPipe } from './pipes/film-name-by-id.pipe'
import { CharacterNameByIdPipe } from './pipes/character-name-by-id.pipe'
import { FilmPosterPipe } from './pipes/film-poster.pipe'
import { SpinnerInterceptorService } from './services/spinner-interceptor.service'
import { LoadingIndicatorComponent } from './components/loading-indicator/loading-indicator.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FilmDetailsComponent,
    CharacterDetailsComponent,
    FilmNameByIdPipe,
    CharacterNameByIdPipe,
    FilmPosterPipe,
    LoadingIndicatorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatProgressBarModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({ logOnly: !isDevMode() }),
    EffectsModule.forRoot([Effects]),
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [
    DataService,
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
