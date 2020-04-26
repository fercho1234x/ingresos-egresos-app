import { createReducer, on } from '@ngrx/store';
import { setItems, unSetItems } from './ingreso-egreso.actions';

import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AppStateGlobal } from '../app.reducer';

export interface State {
    items: IngresoEgreso[];
}

export interface AppStateGlobalWithIngreso extends AppStateGlobal {
    ingresosEgresos: State;
}

export const initialState: State = {
   items: []
};

const _ingresoEgresoReducer = createReducer(initialState,

    on(setItems, (state, { items }) => ({ ...state, items: [...items] })),
    on(unSetItems, state => ({ ...state, items: [] })),

);

export function ingresoEgresoReducer(state, action) {
    return _ingresoEgresoReducer(state, action);
}
