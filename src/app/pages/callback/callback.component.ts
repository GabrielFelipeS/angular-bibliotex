import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-callback',
  imports: [],
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.scss'
})
export class CallbackComponent {
 constructor(private activateRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe(params => {
      const code = params['code']; // O código de autorização estará nesse parâmetro
      if(code) {

      } else {

      }
      console.log('Authorization Code:', code);
      this.router.navigate(['/login']);
    });
  }
}
