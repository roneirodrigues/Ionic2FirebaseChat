import { HomePage } from './../home/home';
import { FirebaseAuthState } from 'angularfire2';
import { AuthService } from './../../providers/auth/auth.service';
import { UserService } from './../../providers/user/user.service';
import { Component } from '@angular/core';
import { NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import 'rxjs/add/operator/first';


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {



  signupForm: FormGroup;

  constructor(
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UserService) {

    let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    this.signupForm = this.formBuilder.group({

      name: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
      password: ['', [Validators.required, Validators.minLength(6)]]

    });

  }



  onSubmit(): void {

    let formUser = this.signupForm.value;
    let loading: Loading = this.showLoading();
    let username: string = formUser.username;

    this.userService.userExists(username)
      .first()
      //.take(5) qtde. de valores que vc quer ouvir
      .subscribe((userExists: boolean) => {

        if (!userExists) {
          this.authService.createAuthUser({
            email: formUser.email,
            password: formUser.password
          }).then((authState: FirebaseAuthState) => {

            delete formUser.password;

            let uuid : string = authState.auth.uid;

            this.userService.create(formUser, uuid)
              .then(() => {

                loading.dismiss();
                this.showAlert('Usuário cadastrado com sucesso');
                this.navCtrl.setRoot(HomePage);

              }).catch((error: any) => {
                loading.dismiss();
                this.showAlert(error);
              });



          }).catch((error: any) => {
            console.log(error);
            loading.dismiss();
            this.showAlert(error);

          });
        }
        else {
          this.showAlert(`O username ${username} está em uso em outra conta`);
          loading.dismiss();
        }
      })




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
}
