import { Component } from '@angular/core'
import { SpinnerHandlerService } from '../../services/spinner-handler.service'

@Component({
  selector: 'app-loading-indicator',
  templateUrl: './loading-indicator.component.html',
})
export class LoadingIndicatorComponent {
  showSpinner$ = this.spinnerHandler.showSpinner$

  constructor(private spinnerHandler: SpinnerHandlerService) {}
}
