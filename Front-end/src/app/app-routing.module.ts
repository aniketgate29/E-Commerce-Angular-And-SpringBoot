import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './user-pannel/homepage/homepage.component';
import { AboutComponent } from './user-pannel/about/about.component';
import { ContactComponent } from './user-pannel/contact/contact.component';
import { CartComponent } from './user-pannel/cart/cart.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './user-pannel/register/register.component';
import { VerifymobileComponent } from './user-pannel/verifymobile/verifymobile.component';
import { SetPasswordComponent } from './user-pannel/set-password/set-password.component';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';
import { AdminAreaComponent } from './adminpanel/admin-area/admin-area.component';
import { AdminProductComponent } from './adminpanel/admin-product/admin-product.component';
import { AdminUserComponent } from './adminpanel/admin-user/admin-user.component';
import { OrdersComponent } from './adminpanel/orders/orders.component';
import { AdminCategoryComponent } from './adminpanel/admin-category/admin-category.component';
import { DashboardComponent } from './adminpanel/dashboard/dashboard.component';
import { AdminCouponComponent } from './adminpanel/admin-coupon/admin-coupon.component';
import { AuthGuard } from './Services/auth.guard';
import { AdminGuard } from './Services/admin.guard';
import { MyAccountComponent } from './user-pannel/my-account/my-account.component';
import { UserPannelComponent } from './user-pannel/user-pannel.component';
const routes: Routes = [
  
  { path: 'user-pannel', component: UserPannelComponent, children: [
  { path: 'home', component: HomepageComponent },
  { path: 'about', component: AboutComponent, canActivate: [AuthGuard] },
  { path: 'contact', component: ContactComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  {path:'profile',component:MyAccountComponent , canActivate: [AuthGuard]},

    { path: '', redirectTo: 'user-pannel/home', pathMatch: 'full' }
  ] },
  
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'verify', component: VerifymobileComponent },
  { path: 'set-password', component: SetPasswordComponent },
  { path: 'adminpanel', component: AdminpanelComponent,children: [ 
  { path: 'admin-area', component: AdminAreaComponent, canActivate: [AdminGuard] },
  { path: 'admin-home', component: DashboardComponent, canActivate: [AdminGuard] },
  { path: 'admin-product', component: AdminProductComponent, canActivate: [AdminGuard] },
  { path: 'admin-user', component: AdminUserComponent, canActivate: [AdminGuard] },
  { path: 'orders', component: OrdersComponent, canActivate: [AdminGuard] },
  { path: 'admin-category', component: AdminCategoryComponent, canActivate: [AdminGuard] },
  { path: 'admin-coupon', component: AdminCouponComponent, canActivate: [AdminGuard] },
  { path: '', redirectTo: 'adminpanel/admin-home', pathMatch: 'full' }
] },

  { path: '', redirectTo: '/user-pannel/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
