import { Component, input, signal, InputSignal, Input, HostBinding, HostListener, OnInit } from '@angular/core';
import { SignInComponent } from "./sign-in/sign-in.component";
import { animate, group, keyframes, query, state, style, transition, trigger } from '@angular/animations';
import { SignUpComponent } from "./sign-up/sign-up.component";

@Component({
  selector: 'app-login',
  imports: [SignInComponent, SignUpComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  animations: [
    trigger('login-auth',[
      transition(':enter', [
        style({ width: 0, opacity: 0.5 }),
        group([
          animate(
            '750ms ease-in-out',
              style({ width: '50%', opacity: 1, offset: 1 })
          ),

        ])

      ]),
      transition(':leave', [
        style({ width: '50%', opacity: 1 }),
        animate(
          '500ms ease-in-out',
            style({ width: 0, opacity: 0.5, offset: 1 })
        )
      ])
    ]),

    trigger('register-auth',[
      transition(':enter', [
        style({ width: 0, opacity: 0.25 }),
        animate(
          '750ms ease-in-out',
            style({ width: '50%', opacity: 1, offset: 1 })
        )
      ]),
      transition(':leave', [
        style({ width: '50%', opacity: 1 }),
        animate(
          '500ms ease-in-out',
            style({ width: 0, opacity: 0.25, offset: 1 })
        )
      ])
    ])
  ]
})
export class LoginComponent implements OnInit{

  @HostBinding('@.disabled') disableAnimations = true;

  @Input() isLogin = signal(true);

  ngOnInit(): void {
    this.toggleDisableAnimations()
  }

  get isNotLogin() {
    return !this.isLogin()
  }

  toggleAuth() {
    this.isLogin.update(toggle => !toggle);
  }

  @HostListener('window:resize', [])
  toggleDisableAnimations() {
    this.disableAnimations = window.innerWidth <= 750;
  }
}


