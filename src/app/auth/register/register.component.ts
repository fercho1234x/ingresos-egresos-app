import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppStateGlobal } from '../../app.reducer';
import { isLoading, stopLoading } from '../../shared/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {

  registroForm: FormGroup;

  uiSubscription: Subscription;

  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppStateGlobal>
  ) { }

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre:   ['', Validators.required],
      correo:   ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.uiSubscription = this.store.select('ui').subscribe( ui => this.loading = ui.isLoading);
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  crearUsuario() {
    if ( this.registroForm.invalid ) {
      return;
    }

    // Swal.showLoading();
    this.store.dispatch( isLoading() );

    const { nombre, correo, password } = this.registroForm.value;

    this.authService.crearUsuario( nombre, correo, password )
      .then( credenciales => {
        // Swal.close();
        this.store.dispatch( stopLoading() );
        this.router.navigateByUrl('/dashboard');
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
