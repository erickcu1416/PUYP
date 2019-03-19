import { UserResolver } from './home/user.resolver';
import { LoginGuard } from './guards/login.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'tabs', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule',
    canActivate: [AuthGuard],
    resolve: { data: UserResolver }
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginPageModule',
    canActivate: [LoginGuard]
  },
  {
    path: 'register',
    loadChildren: './register/register.module#RegisterPageModule',
    canActivate: [LoginGuard]
  },
  {
    path: 'posts/:category',
    loadChildren: './pages/posts/posts.module#PostsPageModule'
  },
  {
    path: 'post/:category/:id',
    loadChildren: './pages/post/post.module#PostPageModule',
    resolve: { data: UserResolver }
  },
  {
    path: 'mapamodal',
    loadChildren: './pages/mapamodal/mapamodal.module#MapamodalPageModule'
  },
  {
    path: 'tabs',
    loadChildren: './pages/tabs/tabs.module#TabsPageModule'
  },
  {
    path: 'record',
    loadChildren: './pages/record/record.module#RecordPageModule'
  },
  {
    path: 'profile',
    loadChildren: './pages/profile/profile.module#ProfilePageModule',
    resolve: { data: UserResolver }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
