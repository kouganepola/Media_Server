import { Component, HostBinding } from '@angular/core';

import { BlankLayoutCardComponent } from 'app/components/ui/blank-layout-card';

@Component({
  selector: 'app-error',
  styleUrls: ['../../../ui/blank-layout-card/blank-layout-card.component.scss'],
  templateUrl: './error.component.html',
})
export class ErrorComponent extends BlankLayoutCardComponent { }
