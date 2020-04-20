import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ui.reducer';
import * as auth from './auth/auth.reducer';

export interface AppStateGlobal {
   ui: ui.State;
   auth: auth.State;
}

export const appReducers: ActionReducerMap<AppStateGlobal> = {
   ui: ui.uiReducer,
   auth: auth.authReducer
};
