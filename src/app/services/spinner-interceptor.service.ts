import { Injectable } from '@angular/core'
import { HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http'
import { finalize } from 'rxjs/operators'

import { SpinnerHandlerService } from './spinner-handler.service'

@Injectable()
export class SpinnerInterceptorService implements HttpInterceptor {
  constructor(public spinnerHandler: SpinnerHandlerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    this.spinnerHandler.handleRequest('plus')
    return next.handle(request).pipe(finalize(() => this.spinnerHandler.handleRequest('minus')))
  }
}
