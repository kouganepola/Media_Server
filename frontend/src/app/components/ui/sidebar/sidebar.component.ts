import { Component} from '@angular/core';
import { SidebarComponent as BaseSidebarComponent } from 'theme/components/sidebar';

@Component({
  selector: 'app-sidebar',
  styleUrls: ['../../../../theme/components/sidebar/sidebar.component.scss'],
  templateUrl: '../../../../theme/components/sidebar/sidebar.component.html',
})
export class SidebarComponent extends BaseSidebarComponent {
  public title = 'mserver';
  private username=`${localStorage.getItem('username')}`;
  private folder = `${localStorage.getItem('root')}`;
  public menu = [
    { name: 'My Files', link: `/app/${this.username}/myfiles/${this.folder}`, icon: 'dashboard' },
    {
      name: 'Account',  link: '/auth/login' ,icon: 'person'
    },
    
  ];
}
