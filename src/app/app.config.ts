import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(), provideFirebaseApp(() => initializeApp({"projectId":"sala-de-juegos-altamira","appId":"1:321836067623:web:b0c14a89b0916a1bc3d702","storageBucket":"sala-de-juegos-altamira.appspot.com","apiKey":"AIzaSyDiD70X5t37roehSgfeUypPFjsRrigCPHk","authDomain":"sala-de-juegos-altamira.firebaseapp.com","messagingSenderId":"321836067623"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideStorage(() => getStorage()), provideFirebaseApp(() => initializeApp({"projectId":"sala-de-juegos-altamira","appId":"1:321836067623:web:b0c14a89b0916a1bc3d702","storageBucket":"sala-de-juegos-altamira.appspot.com","apiKey":"AIzaSyDiD70X5t37roehSgfeUypPFjsRrigCPHk","authDomain":"sala-de-juegos-altamira.firebaseapp.com","messagingSenderId":"321836067623"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideStorage(() => getStorage())]
};
