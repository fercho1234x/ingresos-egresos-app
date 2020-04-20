import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppStateGlobal } from '../../app.reducer';
import { isLoading, stopLoading } from '../../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  loading: boolean = false;

  uiSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppStateGlobal>
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(1)]]
    });

    this.uiSubscription = this.store.select('ui').subscribe( ui => this.loading = ui.isLoading );

  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    this.store.dispatch( isLoading() );

    // Swal.showLoading();

    const { correo, password } = this.loginForm.value;
    this.authService.loginUsuario( correo, password )
      .then( user => {
        // Swal.close();
        this.store.dispatch( stopLoading() );
        this.router.navigateByUrl('dashboard');
      })
      .catch( error => {
        this.store.dispatch( stopLoading() );
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
        });
      });
  }

}
