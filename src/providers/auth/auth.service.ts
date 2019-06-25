import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireAuth, FirebaseAuthState } from 'angularfire2';
import { BaseService } from '../base.service';


@Injectable()
export class AuthService extends BaseService {

  public emailCurrente: string;

  constructor(
    public auth: AngularFireAuth,
    public http: Http) {

    super();

  }

  createAuthUser(user: { email: string, password: string }): firebase.Promise<FirebaseAuthState> {

    return this.auth.createUser(user)
      .catch(this.handlePromiseError);
  }



  signinWithEmail(user: { email: string, password: string }): firebase.Promise<boolean> {
    return this.auth.login(user)
      .then((authState: FirebaseAuthState) => {
        this.emailCurrente = user.email;

        return authState != null;
      }).catch(this.handlePromiseError);
  }

  logout(): Promise<void> {

    return this.auth.logout();
  }

  get authenticated(): Promise<boolean> {

    return new Promise((resolve, reject) => {
      this.auth
        .first()
        .subscribe((authState: FirebaseAuthState) => {

          this.emailCurrente = authState.auth.email;

          (authState) ? resolve(true) : reject(false);
        });
    });
  }

}
