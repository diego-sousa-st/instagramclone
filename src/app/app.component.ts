import { Component, OnInit } from '@angular/core';

// importando o firebase
import * as firebase from 'firebase'

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'app';

	ngOnInit():void {
		// Initialize Firebase
		var config = {
			apiKey: "AIzaSyDvvlPgwV9cn5PRHknZ59SH8kox-H_O9T8",
			authDomain: "jta-instagram-clone-1ad03.firebaseapp.com",
			databaseURL: "https://jta-instagram-clone-1ad03.firebaseio.com",
			projectId: "jta-instagram-clone-1ad03",
			storageBucket: "jta-instagram-clone-1ad03.appspot.com",
			messagingSenderId: "17944294834"
		  };

		// inicializando firebase
		firebase.initializeApp(config);

	}
}
