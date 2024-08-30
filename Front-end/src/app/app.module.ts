import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FormsModule } from '@angular/forms';




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import  {UserPannelComponent} from './user-pannel/user-pannel.component';
import { HomepageComponent } from './user-pannel/homepage/homepage.component';
import { HeaderComponent } from './user-pannel/header/header.component';
import { FooterComponent } from './user-pannel/footer/footer.component';
import { AboutComponent } from './user-pannel/about/about.component';
import { ItemsComponent } from './user-pannel/items/items.component';
import { ContactComponent } from './user-pannel/contact/contact.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './user-pannel/cart/cart.component';
import { RegisterComponent } from './user-pannel/register/register.component';
import { ImageSliderComponent } from './user-pannel/image-slider/image-slider.component';
import { VerifymobileComponent } from './user-pannel/verifymobile/verifymobile.component';
import { SetPasswordComponent } from './user-pannel/set-password/set-password.component';

import { AdminpanelComponent } from './adminpanel/adminpanel.component';
import { AdminHeaderComponent } from './adminpanel/admin-header/admin-header.component';
import  {AdminAreaComponent}  from './adminpanel/admin-area/admin-area.component';
import  {AdminHomeComponent}  from './adminpanel/admin-home/admin-home.component';
import { AdminProductComponent } from './adminpanel/admin-product/admin-product.component';
import { AdminUserComponent } from './adminpanel/admin-user/admin-user.component'; 
import  {OrdersComponent}  from './adminpanel/orders/orders.component';
import { AuthService } from './Services/auth.service';
import { UserService } from './Services/user.service';
import { OrderService } from './Services/order.service';
import { AdminCategoryComponent } from './adminpanel/admin-category/admin-category.component';
import { AdminCouponComponent } from './adminpanel/admin-coupon/admin-coupon.component';
import { DashboardService } from './Services/dashboard.service';
import { DashboardComponent } from './adminpanel/dashboard/dashboard.component';
import { MyAccountComponent } from './user-pannel/my-account/my-account.component';






@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    ItemsComponent,
    ContactComponent,
    LoginComponent,
    CartComponent,
    RegisterComponent,
    AdminpanelComponent,
    ImageSliderComponent,
    VerifymobileComponent,
    SetPasswordComponent,
    AdminHeaderComponent,
    UserPannelComponent,
    AdminAreaComponent,
    AdminHomeComponent,
    AdminProductComponent,
    AdminUserComponent,
    OrdersComponent,
    AdminCategoryComponent,
    AdminCouponComponent,
    DashboardComponent,
    MyAccountComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule,
    FormsModule,
    HttpClientModule,
        
     
  ],
  providers: [
    provideClientHydration(),
    AuthService,
    UserService,
    OrderService
  ],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
