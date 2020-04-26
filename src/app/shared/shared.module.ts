import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { NabvarComponent } from './nabvar/nabvar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

//
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    FooterComponent,
    NabvarComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    FooterComponent,
    NabvarComponent,
    SidebarComponent
  ]
})
export class SharedModule { }
