import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppStateGlobal } from '../../app.reducer';
import { User } from '../../models/user.model';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {

  user: User;
  userSubs: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
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

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

}
