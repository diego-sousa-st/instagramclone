import { Component, OnInit } from '@angular/core';
// importamos do angular animations o que é usado e não do angular core igual na video aula
import { trigger, state, style, transition, animate } from '@angular/animations';

import { Imagem } from './model/imagem.model'

@Component({
	selector: 'app-banner',
	templateUrl: './banner.component.html',
	styleUrls: ['./banner.component.css'],
	//metado para animations
	animations: [
		trigger('banner', [
			state('escondido',style({
				opacity: 0
			})),
			state('visivel',style({
				opacity: 1
			})),
			transition('escondido <=> visivel', animate('2s ease-in'))
			// transition('visivel => escondido', animate('2s ease-out'))
		])
	]
})

// animate(duracao,delay,aceleracao)
export class BannerComponent implements OnInit {

	private ESCONDIDO = 'escondido';
	private VISIVEL = 'visivel'

	public estado: string = 'escondido';

	public imagens: Imagem[] = [
		{ estado:this.VISIVEL , url:'assets/banner-acesso/img_1.png' },
		{ estado:this.ESCONDIDO , url:'assets/banner-acesso/img_2.png' },
		{ estado:this.ESCONDIDO , url:'assets/banner-acesso/img_3.png' },
		{ estado:this.ESCONDIDO , url:'assets/banner-acesso/img_4.png' },
		{ estado:this.ESCONDIDO , url:'assets/banner-acesso/img_5.png' }
	]

	constructor() { }

	ngOnInit() {

		setTimeout(() => this.rotateImagens(),3000);

	}

	public rotateImagens():void {

		for (let i:number = 0; i < this.imagens.length; i++) {

			if(this.imagens[i].estado == this.VISIVEL) {

				this.imagens[i].estado = this.ESCONDIDO;

				let indexAtual = i;

				if(indexAtual === this.imagens.length-1) {

					indexAtual = -1;

				}

				this.imagens[indexAtual + 1].estado = this.VISIVEL;

				break;

			}

		}

		setTimeout( () => this.rotateImagens(),3000);

	}


}
