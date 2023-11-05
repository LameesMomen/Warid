import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  item : MenuItem [] =[
    {
      label : 'لوحة التحكم',
      icon : 'pi pi-fw pi-compass',
      routerLink: ['dashboard'],
      routerLinkActiveOptions:{exact:false}
    },
    {
      label : 'الاعلانات',
      icon : 'pi pi-fw pi-video',
      routerLink: ['adds'],
      routerLinkActiveOptions:{exact:false}
    },
    {
      label : 'التصنيفات',
      icon : 'pi pi-fw pi-list',
      routerLink: ['category'],
      routerLinkActiveOptions:{exact:true}
    },
    {
      label : 'المنتجات',
      icon : 'pi pi-fw pi-sitemap',
      routerLink: ['product'],
      routerLinkActiveOptions:{exact:false}
    },
    {
      label : 'العملاء',
      icon : 'pi pi-fw pi-user',
      routerLink: ['client'],
      routerLinkActiveOptions:{exact:false}
    },
    {
      label : 'الموردين',
      icon : 'pi pi-fw pi-users',
      routerLink: ['supplier'],
      routerLinkActiveOptions:{exact:false}
    },
    {
      label : 'الإداريون',
      icon : 'pi pi-fw pi-briefcase',
      routerLink: ['admins'],
      routerLinkActiveOptions:{exact:false}
    },
    {
      label : 'المعاملات',
      icon : 'pi pi-fw pi-money-bill',
      routerLink: ['transaction'],
      routerLinkActiveOptions:{exact:false}
    },
    {
      label : 'الطلبات',
      icon : 'pi pi-fw pi-envelope',
      routerLink: ['orders'],
      routerLinkActiveOptions:{exact:false}
    },
    {
      label : 'المواقع',
      icon : 'pi pi-fw pi-map-marker',
      routerLink: ['map'],
      routerLinkActiveOptions:{exact:false}
    },
    {
      label : 'الإعدادات',
      icon : 'pi pi-fw pi-cog',
      routerLink: ['setting'],
      routerLinkActiveOptions:{exact:false}
    },
    {
      label : 'النسخ الإحتياطي',
      icon : 'pi pi-fw pi-cloud-upload',
      routerLink: ['cloud'],
      routerLinkActiveOptions:{exact:false}
    },
  ]

}