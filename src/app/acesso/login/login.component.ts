import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AutenticacaoService } from '../../services/autenticacao.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	@Output()
	public changePanel: EventEmitter<string> = new EventEmitter();

	public formulario: FormGroup = new FormGroup({
		'email': new FormControl(null,[Validators.required,Validators.email]),
		'senha': new FormControl(null,[Validators.required])
	});

	constructor(private autenticacaoService: AutenticacaoService) { }

	ngOnInit() {
	}

	public emmitEventTrocaPainel():void {

		this.changePanel.emit('cadastro');

	}

	public realizarLogin():void {

		let loginDto = {

			'email': this.formulario.value.email,
			'senha': this.formulario.value.senha

		};

		this.autenticacaoService.realizarLogin(loginDto);

	}

}
