import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStateGlobal } from '../app.reducer';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { setItems, unSetItems } from '../ingreso-egreso/ingreso-egreso.actions';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {

  userSubs: Subscription;
  ingreosEgresosSubs: Subscription;

  constructor(
    private store: Store<AppStateGlobal>,
    private ingresoEgresoService: IngresoEgresoService
  ) { }

  ngOnInit(): void {
    this.userSubs = this.store.select( 'auth' )
      .pipe(
        filter( auth => auth.user != null )
      )
      .subscribe( ({user}) => {
        this.ingreosEgresosSubs = this.ingresoEgresoService.initIngresosEgresosListener( user.uid )
        .subscribe( ingresosEgresos => {
          this.store.dispatch( setItems( { items: ingresosEgresos } ) );
        });
      });
  }

  ngOnDestroy() {
    this.userSubs?.unsubscribe();
    this.ingreosEgresosSubs.unsubscribe();
    this.store.dispatch( unSetItems() );
  }

}
