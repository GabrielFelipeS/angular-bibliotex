import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-callback',
  imports: [],
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.scss'
})
export class CallbackComponent {
 constructor(private activateRoute: ActivatedRoute, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe(params => {
      const code = params['code'];
      if(!code) {
        this.router.navigate(['/login']);
      }

      console.log('Authorization Code:', code);

      this.authService
        .authTokenWithCode(code)
        .subscribe(auth => {
          if (auth.success) {
            this.router.navigate(['/home']);
          } else {
            this.router.navigate(['/login']);
          }
        });
    });
  }
}
