import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "../material.module";
import {
  NotFoundComponent,
  MessagesComponent,
  ConfirmComponent,
  HeaderComponent,
  DigitOnlyDirective
} from ".";
import { SidebarNavComponent } from "./sidebar-nav/sidebar-nav.component";
import { SharedRoutingModule } from "./shared-routing.module";
import { SessionExpireComponent } from "./session-expire/session-expire.component";
import { MenuListItemComponent } from "./sidebar-nav/menu-list-item/menu-list-item.component";

@NgModule({
  declarations: [
    NotFoundComponent,
    MessagesComponent,
    ConfirmComponent,
    SidebarNavComponent,
    HeaderComponent,
    DigitOnlyDirective,
    SessionExpireComponent,
    MenuListItemComponent
  ],
  imports: [CommonModule, MaterialModule, SharedRoutingModule],
  exports: [
    CommonModule,
    NotFoundComponent,
    SidebarNavComponent,
    HeaderComponent,
    DigitOnlyDirective
  ],
  entryComponents: [
    MessagesComponent,
    ConfirmComponent
  ]
})
export class SharedModule {}
