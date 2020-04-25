import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStateGlobal } from '../../app.reducer';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';

import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: [
  ]
})
export class EstadisticaComponent implements OnInit {

  public doughnutChartLabels: Label[] = ['Egresos', 'Ingresos'];
  public doughnutChartData: MultiDataSet = [[]];

  ingresos = 0;
  egresos = 0;

  totalEgresos = 0;
  totalIngresos = 0;

  constructor(
    private store: Store<AppStateGlobal>
  ) { }

  ngOnInit(): void {
    this.store.select('ingresosEgresos')
      .subscribe( ({items}) => this.generarEstadistica( items ) )
  }

  generarEstadistica( items: IngresoEgreso[] ) {
    for (const item of items) {
      if (item.tipo === 'ingreso') {
        this.totalIngresos += item.monto;
        this.ingresos++;
      } else {
        this.totalEgresos += item.monto;
        this.egresos ++;
      }
    }

    this.doughnutChartData = [[this.totalEgresos, this.totalIngresos]];

  }

}
