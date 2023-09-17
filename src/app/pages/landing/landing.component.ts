import { Component } from '@angular/core';

export interface ITile {
  icon: string;
  title: string;
  description: string;
  id: string;
}

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
  tiles: ITile[] = [
    {
      icon: 'grid_on',
      description: 'displays various types of visual data in one place',
      title: 'Landing',
      id: 'landing',
    },
    {
      icon: 'domain',
      description: 'allows to add, remove or Update Franchise',
      title: 'Franchise',
      id: 'franchise',
    },
    {
      icon: 'location_city',
      description: 'allows to add, remove or Update Brachces',
      title: 'Brachces',
      id: 'brachces',
    },
    {
      icon: 'apps',
      description: 'allows to add, remove or Update Products',
      title: 'Products',
      id: 'products',
    },
    {
      icon: 'money',
      description: 'allows to add, remove or Update Prices',
      title: 'Prices',
      id: 'prices',
    },
    {
      icon: 'list',
      description: 'allows to add, remove or Update Inventory',
      title: 'Inventory',
      id: 'inventory',
    },
    {
      icon: 'shopping_cart',
      description: 'displays DSR or Sales Details by Start & End Date',
      title: 'Sales',
      id: 'sales',
    },
    {
      icon: 'supervisor_account',
      description: 'allows to add, remove or Update Vendors',
      title: 'Vendors',
      id: 'vendors',
    },
    {
      icon: 'supervised_user_circle',
      description: 'allows to add, remove or Update Cutomers',
      title: 'Cutomers',
      id: 'cutomers',
    },
    {
      icon: 'add_shopping_cart',
      description: 'allows to add, remove or Update Orders',
      title: 'Order Taking',
      id: 'order-taking',
    },
  ];
}
