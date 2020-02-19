import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialAngularSelectModule } from 'material-angular-select';
import { ThemeModule } from 'theme';

import { DashboardComponent } from './dashboard.component';


import { TableComponent, UploadformComponent} from '../../ui';
import { FileService } from '@services/';
import { ReactiveFormsModule } from '@angular/forms';
import {PopupformComponent} from '../../ui';


@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    MaterialAngularSelectModule,
    ReactiveFormsModule
    
  ],
  declarations: [
    DashboardComponent,
    PopupformComponent,
    UploadformComponent,
    TableComponent
  ],
  providers:[
    
    FileService
  ]
})
export class DashboardModule {

 




}
