import { Component, OnInit } from '@angular/core';
import { trigger, style, state, transition, animate, keyframes } from '@angular/animations';

@Component({
	selector: 'app-acesso',
	templateUrl: './acesso.component.html',
	styleUrls: ['./acesso.component.css'],
	animations: [
		trigger('animacao-banner',[
			state('criado', style({
				opacity: 1
			})),
			// estado padrao void, passamos alem de animate o style, já que void é padrão
			transition('void => criado', [
				style({
					opacity: 0,
					transform: 'translate(-50px,0px)'
				}),
				animate('500ms 0ms ease-in-out')//duracao, delay e aceleração
			])
		]),
		trigger('animacao-painel',[
			state('criado', style({
				opacity: 1
			})),
			transition('void => criado', [
				style({
					opacity: 0,
					transform: 'translate(50px, 0px)'
				}),
				// usando o keyframes

				//0 criado -------x--------------x---x---x-------criado 1.5s//
				animate('1.5s 0ms ease-in-out', keyframes([
					style({
						// offset é o pedaço da duracao total
						offset: 0.15,
						opacity: 1,
						transform: 'translateX(0)'
					}),
					style({
						// offset é o pedaço da duracao total
						offset: 0.86,
						opacity: 1,
						transform: 'translateX(0)'
					}),

					style({
						// offset é o pedaço da duracao total
						offset: 0.88,
						opacity: 1,
						transform: 'translateY(-10px)'
					}),
					style({
						// offset é o pedaço da duracao total
						offset: 0.90,
						opacity: 1,
						transform: 'translateY(10px)'
					}),
					style({
						// offset é o pedaço da duracao total
						offset: 0.92,
						opacity: 1,
						transform: 'translateY(-10px)'
					}),
					style({
						// offset é o pedaço da duracao total
						offset: 0.94,
						opacity: 1,
						transform: 'translateY(10px)'
					}),
					style({
						// offset é o pedaço da duracao total
						offset: 0.96,
						opacity: 1,
						transform: 'translateY(-10px)'
					}),
					style({
						// offset é o pedaço da duracao total
						offset: 0.98,
						opacity: 1,
						transform: 'translateY(10px)'
					}),
					style({
						// offset é o pedaço da duracao total
						offset: 1,
						opacity: 1,
						transform: 'translateY(0)'
					})
				]))
			])
		])
	]
})
export class AcessoComponent implements OnInit {

	private CRIADO: string = 'criado';
	public bannerState:string = this.CRIADO;
	public painelState:string = this.CRIADO;

	public ehCadastro: boolean = false;

	constructor() { }

	ngOnInit() {
	}

	public setEhCadastro(eh:boolean): void {

		this.ehCadastro = eh;

	}

	public mudarPainel(evtName:string):void {

		let eh = evtName === 'cadastro' ? true : false;

		this.setEhCadastro(eh)

	}

	public inicioAnimacao():void {

		// console.log("inicio Animacao");

	}

	public fimAnimacao():void {

		// console.log("fim animacao");

	}

}
