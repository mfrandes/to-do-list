import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { BodyComponent } from './body/body.component';
import { AuthComponent } from './auth/auth.component';
import { ListComponent } from './body/list/list.component';
import { CompletedComponent } from './body/completed/completed.component';
import { FeatureComponent } from './body/feature/feature.component';
import { AuthGurad } from './auth/auth.guard';


const appRoutes: Routes = [
    { path: '', redirectTo: '/feature', pathMatch: 'full' },
    { path: 'feature', component: FeatureComponent },
    { path: 'tasks-list', component: ListComponent, canActivate: [AuthGurad] },
    { path: 'tasks-complete', component: CompletedComponent, canActivate: [AuthGurad] },
    { path: 'auth', component: AuthComponent },
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }