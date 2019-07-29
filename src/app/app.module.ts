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
import { HttpClientModule } from '@angular/common/http';

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
    DropdownDirective
  ],
  imports: [
    BrowserModule,AppRoutingModule,FormsModule,HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
