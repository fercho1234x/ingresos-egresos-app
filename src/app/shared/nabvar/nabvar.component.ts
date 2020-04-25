import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStateGlobal } from 'src/app/app.reducer';
import { User } from '../../models/user.model';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nabvar',
  templateUrl: './nabvar.component.html',
  styles: [
  ]
})
export class NabvarComponent implements OnInit, OnDestroy {

  user: User;
  userSubs: Subscription;

  constructor(
    private store: Store<AppStateGlobal>
  ) { }

  ngOnInit(): void {
    this.userSubs = this.store.select('auth')
    .pipe(
      filter( auth => auth.user != null )
    )
    .subscribe( ({user}) => this.user = user);
  }

  ngOnDestroy() {
    this.userSubs.unsubscribe();
  }

}
