import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  imports: [MatIconModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent  implements OnInit {
  @Output() eventEmitter = new EventEmitter<void>()

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const code = params['code']; // O código de autorização estará nesse parâmetro
      if(code) {

      }
      console.log('Authorization Code:', code);
    });
  }

  googleLogin() {
    const authUrl = 'http://localhost:7080/realms/bibliotex/protocol/openid-connect/auth?client_id=bibliotex-cc&redirect_uri=http://localhost:4200/login&response_type=code&scope=openid&state=xyz123&kc_idp_hint=google';
    window.location.href = 'https://google.com';
  }

  githubLogin() {
    console.log("Github")
  }

  openLoginWindow() {
    const authUrl = 'http://localhost:7080/realms/bibliotex/protocol/openid-connect/auth?client_id=bibliotex-cc&redirect_uri=http://localhost:4200/login&response_type=code&scope=openid&state=xyz123&kc_idp_hint=google';

    // Abrir a janela pop-up
    const width = 600;
    const height = 600;
    const left = (window.innerWidth / 2) - (width / 2);  // Centrar na tela
    const top = (window.innerHeight / 2) - (height / 2); // Centrar na tela

    const popup = window.open(authUrl, 'Login', `width=${width},height=${height},top=${top},left=${left}`);

    // Verificar quando a janela pop-up for fechada ou redirecionada
    const checkPopupClosed = setInterval(() => {
      if (popup && popup.closed) {
        clearInterval(checkPopupClosed);
        // Aqui você pode fazer algo, como verificar se o login foi bem-sucedido
        console.log('Pop-up fechado');
      }

      if (popup && popup.location.href.includes('callback')) {
        const url = popup.location.href;
        const code = this.getCodeFromUrl(url);
        if (code) {
          // Aqui você pode fazer algo com o código (ou token) recebido, por exemplo, trocá-lo por um access_token
          console.log('Código recebido:', code);
        }
      }
    }, 1000);

  }

  toggleAuth() {
    this.eventEmitter.emit()
  }

  private getCodeFromUrl(url: string): string | null {
    const urlParams = new URLSearchParams(new URL(url).search);
    return urlParams.get('code');
  }
}
