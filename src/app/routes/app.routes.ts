import { Routes } from '@angular/router'

import { AcessoComponent } from '../acesso/acesso.component'
import { HomeComponent } from '../home/home.component'


// importando o servico de guarda de rotas que criamos
import { AutenticacaoGuardService } from '../services/autenticacao-guard.service'

export const ROUTES: Routes = [
	{path: '', component: AcessoComponent},
	// setando o canActive que verifica se uma rota pode ser ativa ou n. Passamos um array de classes que implementam o método
	// canActivate

	// poderiamos ter mais classes controlando a liberação desse path
	{path: 'home', component: HomeComponent, canActivate: [ AutenticacaoGuardService ]}
]

