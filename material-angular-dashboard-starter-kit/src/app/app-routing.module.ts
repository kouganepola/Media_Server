import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LayoutsModule } from './components/layouts';
import { CommonLayoutComponent } from './components/layouts/common-layout';
import { DashboardComponent } from './components/pages/dashboard';
import { TableComponent } from './components/ui';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        { path: '', redirectTo: 'app/:username/myfiles/:folder', pathMatch: 'full' },
        {
          path: 'app/:username', component: CommonLayoutComponent, children: [
           
          { path: 'myfiles/:folder', component: DashboardComponent, pathMatch: 'full' }
        
      ]},
        { path: 'auth', loadChildren: './components/pages/auth/auth.module#AuthModule' },
        { path: 'pages', loadChildren: './components/pages/pages/pages.module#PagesModule' },
        { path: '**', redirectTo: '/pages/404' },
      ],
      { useHash: true,
      onSameUrlNavigation: 'reload'
    }),
    LayoutsModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
