import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BdService } from '../../services/bd.service';

import * as firebase from 'firebase'
import { ProgressoService } from '../../services/progresso.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Subject } from 'rxjs/Rx';

@Component({
	selector: 'app-incluir-publicacao',
	templateUrl: './incluir-publicacao.component.html',
	styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit {

  @Output()
  atualizarTimeline: EventEmitter<any> = new EventEmitter<any>();

	public formulario: FormGroup = new FormGroup({

		'tituloPublicacao': new FormControl(null,[Validators.required])

	});

	public email: string;

  private imagem: any;

  public progressoPublicacao: string = 'pendente';

  public porcentagemUpload: number;

	constructor(private bdService: BdService, private progressoService: ProgressoService) { }

	ngOnInit() {

		firebase.auth().onAuthStateChanged(
			(user:any) => {

				this.email = user.email;

			}
		);

	}

	public publicar():void {

		this.bdService.publicar({
			email: this.email,
			titulo: this.formulario.value.tituloPublicacao,
			imagem: this.imagem
    });

    let continua = new Subject();

    continua.next(true);

    let acompanhemtoUpload = Observable.interval(1500);

    acompanhemtoUpload
    .takeUntil(continua)
    .subscribe(() => {

      this.progressoPublicacao = 'andamento';

      this.porcentagemUpload = Math.round((this.progressoService.estado.bytesTransferred/this.progressoService.estado.totalBytes) * 100);

      if(this.progressoService.status === 'uploadCompleto') {
        continua.next(false);
        this.progressoPublicacao = 'uploadCompleto';
        setTimeout(()=> {this.progressoPublicacao = 'pendente'}, 1000);

        this.atualizarTimeline.emit();
      }

    });

	}

	public preparaImagemUpload(evt: Event):void {

		this.imagem = (<HTMLInputElement>evt.target).files[0];
		console.log(this.imagem);

	}

}
