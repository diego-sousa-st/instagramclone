import { Injectable } from '@angular/core';
import { Usuario } from '../acesso/model/usuario.model';

// importando firebase
import * as firebase from 'firebase'
import { Router } from '@angular/router';

@Injectable()
export class AutenticacaoService {

	private KEY_TOKEN_ID: string = 'tokenId';

	public tokenId: string;

	constructor(private routerService: Router) {

		let token = localStorage.getItem(this.KEY_TOKEN_ID);

		if(token) {

			this.tokenId = JSON.parse(token);

		}

	}

	public cadastrarUsuario(user:Usuario):Promise<any> {

		// método para criar usuario no firebase usando o metodo de autenticação por email e senha
		return firebase.auth().createUserWithEmailAndPassword(user.email,user.senha)
			.then((resposta:any) => {

				// transforma a string para base64 - atob() transforma de base64 para string normal
				let emailBase64 = btoa(user.email);

				// deletando a senha do usuario
				delete user.senha;

				// registrando dados complementares do usuario no path email na base 64
				firebase.database().ref(`usuario_detalhe/${emailBase64}`)
					.set(user);

			})
			// .catch((error:Error) => {

			// 	return error;

			// });

	}

	public realizarLogin(loginDTO:any):void {

		firebase.auth().signInWithEmailAndPassword(loginDTO.email,loginDTO.senha)
			.then((resposta:any) => {

				// metodo usado para pegar o idToken apos ele ser retornado apos o processo de autenticacao
				firebase.auth().currentUser.getIdToken()
					.then((idToken: string) => {

						this.tokenId = idToken;

						//setando o localStorage
						localStorage.setItem(this.KEY_TOKEN_ID,JSON.stringify(this.tokenId));

						// forçando a mudança de rota
						this.routerService.navigate(['home']);

					});

			})
			.catch((error:any) => {

				console.log(error);

			});

	}

	// somente isso nao dá certo, porque ao atualizar a página, o serviço tem refresh e perdemos o tokenId.
	// Precisamos usar o localStorage
	public isAuthenticated(): boolean {

		let authenticated = this.tokenId !== undefined ? true : false;

		if(!authenticated) {

			this.redirectToLogin();

		}

		return authenticated;

	}

	public redirectToLogin():void {

		this.routerService.navigate(['']);

	}

	public logout(): void{

		firebase.auth().signOut()
			.then(() => {

				this.tokenId = undefined;
				localStorage.removeItem(this.KEY_TOKEN_ID);

				// roteando para o login
				this.routerService.navigate(['']);

			});

	}

}
