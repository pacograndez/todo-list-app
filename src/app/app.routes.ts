import { Routes } from '@angular/router';
import { authGuard } from './features/auth/guard/auth.guard';

export const routes: Routes = [
    {
        path: 'login',
        canActivate: [authGuard],
        loadComponent: () => import('./features/auth/auth.component').then(m => m.AuthComponent)
    },
    {
        path: '',
        canActivate: [authGuard],
        loadComponent: () => import('./shared/layout/layout.component').then(m => m.LayoutComponent),
        children: [
            {
                path: 'tasks',
                loadComponent: () => import('./features/tasks/tasks.component').then(m => m.TasksComponent)
            },
            {
                path: '', redirectTo: 'tasks', pathMatch: 'full'
            }
        ]
    },
    {
        path: '', redirectTo: 'login', pathMatch: 'full'
    },
    {
        path: '**', redirectTo: 'login'
    }
];
