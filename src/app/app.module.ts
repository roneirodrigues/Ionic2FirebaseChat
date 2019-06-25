import { CapitalizePipe } from './../pipes/capitalize.pipe';
import { CustomLoggedHeaderComponent } from './../components/custom-logged-header/custom-logged-header';
import { AuthService } from './../providers/auth/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http'
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { AngularFireModule, FirebaseAppConfig, AuthProviders, AuthMethods } from 'angularfire2';
import { SignupPage } from '../pages/signup/signup';
import { UserService } from '../providers/user/user.service';
import { SigninPage } from '../pages/signin/signin';
import { ChatPage } from '../pages/chat/chat';
import { ChatService } from '../providers/chat/chat.service';
import { MessageService } from '../providers/message/message';
import { MessageBoxComponent } from '../components/message-box/message-box';
import { UserInfoComponent } from '../components/user-info/user-info';
import { UserMenuComponent } from '../components/user-menu/user-menu';
import { UserProfilePage } from '../pages/user-profile/user-profile';
import { ProgressBarComponent } from '../components/progress-bar/progress-bar';



const firebaseAppConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyD_ImrgvcAvPutI0StyOdtDHti6qWtF7vI",
  authDomain: "rr-technology-ionic-chat-ab9b9.firebaseapp.com",
  databaseURL: "https://rr-technology-ionic-chat-ab9b9.firebaseio.com",
  storageBucket: "rr-technology-ionic-chat-ab9b9.appspot.com",
  messagingSenderId: "938273085329"
};

const firebaseAuthConfig = {
  provider: AuthProviders.Custom,
  method: AuthMethods.Password
}

@NgModule({
  declarations: [
    CapitalizePipe,
    UserInfoComponent,
    MyApp,
    HomePage,
    SignupPage,
    SigninPage,
    CustomLoggedHeaderComponent,
    ChatPage,
    MessageBoxComponent,
    UserMenuComponent,
    UserProfilePage,
    ProgressBarComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAppConfig, firebaseAuthConfig),

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignupPage,
    SigninPage,
    ChatPage,
    UserProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    UserService,
    AuthService,
    ChatService,
    MessageService
  ]
})
export class AppModule { }
