import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthComponent } from './auth/auth.component';
import { BodyComponent } from './body/body.component';
import { FeatureComponent } from './body/feature/feature.component';
import { ListComponent } from './body/list/list.component';
import { CompletedComponent } from './body/completed/completed.component';
import { ListEditComponent } from './body/list/list-edit/list-edit.component';
import { AppRoutingModule } from './app-router-module';
import { DropdownDirective } from './shared/dropdown.directive';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AlertComponent } from './shared/alert/alert.component';
import { IntecetorService } from './auth/intecetor.service';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
    BodyComponent,
    FeatureComponent,
    ListComponent,
    CompletedComponent,
    ListEditComponent,
    DropdownDirective,
    AlertComponent
  ],
  imports: [
    BrowserModule,AppRoutingModule,FormsModule,HttpClientModule, CommonModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: IntecetorService,
    multi: true
}],
entryComponents:[
  AlertComponent
],
  bootstrap: [AppComponent]
})
export class AppModule { }
