import { Component, OnInit } from '@angular/core';
import { BdService } from '../../services/bd.service';
import * as firebase from 'firebase';

@Component({
	selector: 'app-publicacoes',
	templateUrl: './publicacoes.component.html',
	styleUrls: ['./publicacoes.component.css']
})
export class PublicacoesComponent implements OnInit {

	email: string;

	publicacoes: any;
	constructor(private bdService: BdService) { }

	ngOnInit() {

		firebase.auth().onAuthStateChanged((user) => {

			this.email = user.email;
			this.updateTimeline();

		});

	}

	public updateTimeline() {

		this.bdService.consultaPublicacoes(this.email)
			.then((publicacoes: any) => {

				this.publicacoes = publicacoes;

			});

	}

}
