import { Routes } from '@angular/router';
import {inject} from '@angular/core';
import {ProductService} from '../services/product.service';

export const routes: Routes = [
  {
    path: "",
    loadComponent: () => import('../views/home/home.component').then(m => m.HomeComponent),
    resolve: {
      products: () => inject(ProductService).all()
    }
  },
  {path: "editor/:id", loadComponent: () => import('../views/editor/editor.component').then(m => m.EditorComponent)},
  {path: "auth", loadChildren: () => authRoutes},
  {
    path: "manage",
    loadComponent: () => import('../views/products/products.component').then(m => m.ProductsComponent),
    resolve: {
      products: () => inject(ProductService).all()
    }
  },
  {path: "panier", loadComponent: () => import('../views/chart/chart.component').then(m => m.ChartComponent)},
  {path: "**", loadComponent: () => import('../views/not-found/not-found.component').then(m => m.NotFoundComponent)}
];

const authRoutes: Routes = [
  {path: "login", loadComponent: () => import('../views/login/login.component').then(m => m.LoginComponent)},
  {path: "register",  loadComponent: () => import('../views/register/register.component').then(m => m.RegisterComponent)},
  {path: "**", redirectTo: "login"} // path : "**" (wildcards) récupère toutes routes ne correspondant pas aux précédentes
]
