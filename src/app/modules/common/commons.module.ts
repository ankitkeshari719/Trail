import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MaterialModule } from "./../../material.module";
import { NgModule } from "@angular/core";

import { CommonsRoutingModule } from "./commons-routing.module";
import { SharedModule } from "src/app/shared/shared.module";
import { DriverSheetComponent } from "./driver-sheet/driver-sheet.component";
import { DriverSheetQuestionsComponent } from "./driver-sheet/driver-sheet-questions/driver-sheet-questions.component";
import { DriverSheetSubmittedComponent } from "./driver-sheet/driver-sheet-submitted/driver-sheet-submitted.component";
import { DriverSheetSubmittedAnsComponent } from "./driver-sheet/driver-sheet-submitted-ans/driver-sheet-submitted-ans.component";
import {
  DriverSheetTemplateComponent,
  DsTemplateEditComponent
} from ".";
import { CommonsComponent } from "./commons.component";

@NgModule({
  declarations: [
    DriverSheetComponent,
    DriverSheetQuestionsComponent,
    DriverSheetSubmittedComponent,
    DriverSheetSubmittedAnsComponent,
    CommonsComponent,
    DriverSheetTemplateComponent,
    DsTemplateEditComponent
  ],
  imports: [
    SharedModule,
    CommonsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: []
})
export class CommonsModule {}
