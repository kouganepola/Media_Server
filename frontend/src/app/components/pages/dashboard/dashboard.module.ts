import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialAngularSelectModule } from 'material-angular-select';
import { ThemeModule } from 'theme';
import { DashboardComponent } from './dashboard.component';
import { TableComponent, UploadformComponent,PopupformComponent,AlertDialogComponent} from '../../ui';
import { FileService } from '@services/';
import { ReactiveFormsModule } from '@angular/forms';



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
    TableComponent,
    AlertDialogComponent
  ],
  providers:[
    
    FileService
  ]
})
export class DashboardModule {

 




}
