import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { FormBuilder, FormGroup, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  imports: [MatIconModule, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent  implements OnInit {
  @Output() eventEmitter = new EventEmitter<void>()
  loginForm: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private _authService: AuthService, private fb: FormBuilder) {
    this.loginForm = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    console.log("aqui")
    if(this.loginForm.valid) {
      const formValue = this.loginForm.value
      this._authService
        .login(formValue.username, formValue.password)
        // .login('kaizen', '123')
        .subscribe(auth => {
          if(auth.success) {
            this.router.navigate(['/home']);
          } else {
            console.log("error")
          }
        })
    } else {
      console.log("error")
    }
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const code = params['code']; // O código de autorização estará nesse parâmetro
      if(code) {

      }
      console.log('Authorization Code:', code);
    });
  }


  facebookLogin() {
    this.authLogin('facebook')
  }

  googleLogin() {
    this.authLogin('google')
  }

  githubLogin() {
    this.authLogin('github')
  }

  private authLogin(kc_idp_hint: string) {
    const authUrl = `${environment.keycloakUri}/realms/${environment.realms}/protocol/openid-connect/auth?client_id=${environment.client_id}&redirect_uri=${environment.keycloakRedirect}&response_type=code&scope=openid&state=xyz123&kc_idp_hint=${kc_idp_hint}`;
    console.log(authUrl)
    window.location.href = authUrl;
  }


  toggleAuth() {
    this.eventEmitter.emit()
  }

  private getCodeFromUrl(url: string): string | null {
    const urlParams = new URLSearchParams(new URL(url).search);
    return urlParams.get('code');
  }
}
