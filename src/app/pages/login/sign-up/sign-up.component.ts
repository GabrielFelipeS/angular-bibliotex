import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  imports: [],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  @Output() eventEmitter = new EventEmitter<void>()

  toggleAuth() {
    this.eventEmitter.emit()
  }
}
