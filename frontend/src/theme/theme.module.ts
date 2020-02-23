import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from './components/card';
import { PageTopComponent } from './components/page-top';
import { PaginationComponent } from './components/pagination';
import { ProgressComponent } from './components/progress';
import { SidebarModule } from './components/sidebar';
import { UpgradableComponent } from './components/upgradable';
import { TooltipModule } from './directives/tooltip';

const BASE_COMPONENTS = [
  PageTopComponent,
  ProgressComponent,
  PaginationComponent,
  UpgradableComponent,

];

const BASE_DIRECTIVES = [];
const BASE_PIPES = [];

@NgModule({
  declarations: [
    ...BASE_PIPES,
    ...BASE_DIRECTIVES,
    ...BASE_COMPONENTS,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SidebarModule,
    CardModule,
  ],
  exports: [
    ...BASE_PIPES,
    ...BASE_DIRECTIVES,
    ...BASE_COMPONENTS,
    SidebarModule,
    CardModule,
    TooltipModule,
  ],
})

export class ThemeModule { }
