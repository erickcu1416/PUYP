import { UserResolver } from './../../home/user.resolver';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: "",
    redirectTo: "home"
  },
  {
    path: "",
    component: TabsPage,
    children: [
      {
        path: "home",
        loadChildren: "../../home/home.module#HomePageModule",
        resolve: { data: UserResolver }
      },
      {
        path: "record",
        loadChildren: "../record/record.module#RecordPageModule",
        resolve: { data: UserResolver }
      },
      {
        path: "profile",
        loadChildren: "../profile/profile.module#ProfilePageModule",
        resolve: { data: UserResolver }
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
