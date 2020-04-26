import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { AppStateGlobalWithIngreso } from '../ingreso-egresp.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit, OnDestroy {

  ingresosEgresos: IngresoEgreso[];
  ingresosEgresosSubs: Subscription;

  constructor(
    private store: Store<AppStateGlobalWithIngreso>,
    private ingresoEgresoService: IngresoEgresoService
  ) { }

  ngOnInit(): void {
    this.ingresosEgresosSubs = this.store.select( 'ingresosEgresos' ).subscribe( ({items}) => this.ingresosEgresos = items );
  }

  ngOnDestroy() {
    this.ingresosEgresosSubs.unsubscribe();
  }

  borrar( id: string ) {
    this.ingresoEgresoService.borrarIngresoEgreso( id )
      .then( () => Swal.fire('Borrado', 'Item borrado', 'success') )
      .catch( (error) => Swal.fire('Error', error.message, 'error') );
  }

}
