import { Injectable } from '@angular/core';
import * as firebase from 'firebase'
import { ProgressoService } from './progresso.service';

@Injectable()
export class BdService {

	constructor(private progressoService: ProgressoService) { }

	public publicar(publicacao: any): void {

		let max = 1000000;
		let min = 0;

		let nomeImagem = Date.now() + (Math.random() * (max - min) + min);

		// upload da publicacao no db
		firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
			.push({
				titulo: publicacao.titulo
			}).then((resposta: any) => {

				let nomeImagem = resposta.key;

				// upload da imagem no storage
				firebase.storage().ref()
					.child(`imagens/${nomeImagem}`)
					.put(publicacao.imagem)
					// controlando o progresso de upload escutando o evento do firebase de mudaça no estado no storage
					.on(firebase.storage.TaskEvent.STATE_CHANGED,
						//acompanhamento do progresso de upload
						(snapshot: any) => {

							this.progressoService.status = 'andamento';
							this.progressoService.estado = snapshot;

						},
						(erro: any) => {

							console.log(erro);
							this.progressoService.status = 'erro';
							alert(erro.message);

						},
						() => {
							//finalização do processo de upload
							console.log('Upload completo');
							this.progressoService.status = 'uploadCompleto';
						}
					);

			});

		console.log("chegamos no publicar do servico do bd");

	}

	public consultaPublicacoes(emailUsuario: string): Promise<any> {

		return new Promise((resolve, reject) => {

			firebase.database().ref(`publicacoes/${btoa(emailUsuario)}`)
				.once('value').
				then((snapshot: any) => {

					let publicacoes: any[] = [];

					snapshot.forEach((childSnapshot: any) => {

						let publicacao: any = childSnapshot.val();

						//pego imagens
						firebase.storage().ref()
							.child(`imagens/${childSnapshot.key}`)
							.getDownloadURL()
							.then((url: string) => {

								publicacao.url_imagem = url;

								// pego o nome do usuario - somente do meu usuario

								firebase.database().ref(`usuario_detalhe/${btoa(emailUsuario)}`)
									.once('value')
									.then((snapshot: any) => {

										publicacao.nomeUsuario = snapshot.val().nomeUsuario;
										publicacoes.push(publicacao);

										console.log(publicacoes);

									});

							});

					});

					resolve(publicacoes);


				});

		});



	}

}
