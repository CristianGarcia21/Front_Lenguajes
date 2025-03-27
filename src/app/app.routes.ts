import { Routes } from '@angular/router';
import { FormGramaticaComponent } from './components/form-gramatica/form-gramatica.component';

export const routes: Routes = [
    { path: 'form', component: FormGramaticaComponent},
    { path: '**', redirectTo: '/form', pathMatch: 'full'}
];
