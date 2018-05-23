// modulos
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ReactiveFormsModule } from '@angular/forms'

// componentes
import { AppComponent } from './app.component';
import { AcessoComponent } from './acesso/acesso.component';
import { CadastroComponent } from './acesso/cadastro/cadastro.component';
import { LoginComponent } from './acesso/login/login.component';
import { BannerComponent } from './acesso/banner/banner.component';

// servicos
import { AutenticacaoService } from './services/autenticacao.service';
import { HomeComponent } from './home/home.component';
import { PublicacoesComponent } from './home/publicacoes/publicacoes.component'
import { BdService } from './services/bd.service';
import { ProgressoService } from './services/progresso.service';

// rotas
import { RouterModule } from '@angular/router'

import { ROUTES } from './routes/app.routes'

// importando nosso servico de guarda para a aplicacao
import { AutenticacaoGuardService } from './services/autenticacao-guard.service';
import { IncluirPublicacaoComponent } from './home/incluir-publicacao/incluir-publicacao.component'


@NgModule({
	declarations: [
		AppComponent,
		AcessoComponent,
		CadastroComponent,
		LoginComponent,
		BannerComponent,
		HomeComponent,
		PublicacoesComponent,
		IncluirPublicacaoComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		ReactiveFormsModule,
		RouterModule.forRoot(ROUTES)
	],
	providers: [AutenticacaoService, AutenticacaoGuardService, BdService, ProgressoService],
	bootstrap: [AppComponent]
})
export class AppModule { }
