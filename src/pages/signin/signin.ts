import { HomePage } from './../home/home';
import { AuthService } from './../../providers/auth/auth.service';
import { Component } from '@angular/core';
import { NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SignupPage } from '../signup/signup';


@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  signinForm: FormGroup;

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams) {



    let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    this.signinForm = this.formBuilder.group({

      email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
      password: ['', [Validators.required, Validators.minLength(6)]]

    });




  }


  onSubmit(): void {

    let loading: Loading = this.showLoading();


    this.authService.signinWithEmail(this.signinForm.value)


      .then((isLogged: boolean) => {


        if (isLogged) {


          this.navCtrl.setRoot(HomePage);
          loading.dismiss();
        }
        else {
          this.showAlert('e-Mail não encontrado');
        }


      }).catch((error: any) => {
        console.log(error);
        loading.dismiss();
        this.showAlert(error);

      });
  }



  onSignup(): void {
    this.navCtrl.push(SignupPage);
  }

  private showLoading(): Loading {

    let loading: Loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    return loading;

  }

  private showAlert(message: string): void {
    this.alertCtrl.create({
      message: message,
      buttons: ['Ok']
    }).present();

  }

/*
  onHomePage():void {
    this.navCtrl.push(HomePage)
    .then((hasAccess: boolean) => {
      console.log('Autorizado', hasAccess);
   }).catch(errv => {
     console.log('Não autorizado', errv);

   })
  }
  onLogout(): void {
  this.authService.logout();
  }
*/

}
