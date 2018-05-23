import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

// models
import { Usuario } from '../model/usuario.model'

//Services
import { AutenticacaoService } from '../../services/autenticacao.service';

@Component({
	selector: 'app-cadastro',
	templateUrl: './cadastro.component.html',
	styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

	@Output()
	public changePanel: EventEmitter<string> = new EventEmitter<string>();


	public formulario: FormGroup = new FormGroup({
		'email': new FormControl(null),
		'nomeCompleto': new FormControl(null),
		'nomeUsuario': new FormControl(null),
		'senha': new FormControl(null),
	})
	constructor(private autenticacaoService:AutenticacaoService) { }

	ngOnInit() {
	}

	public emmitEventTrocaPainel():void {

		this.changePanel.emit('login');

	}

	public cadastrarUsuario():void {

		let user: Usuario = new Usuario(

			this.formulario.value.email,
			this.formulario.value.nomeCompleto,
			this.formulario.value.nomeUsuario,
			this.formulario.value.senha

		);

		this.autenticacaoService.cadastrarUsuario(user)

			.then(() => {

				this.emmitEventTrocaPainel();

			})
			.catch((error:string) => {

				alert(error);

			});

	}

}
