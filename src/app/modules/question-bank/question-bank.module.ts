import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { MaterialModule } from "src/app/material.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { QuestionBankRoutingModule } from "./question-bank-routing.module";
import { QuestionBankComponent } from "./question-bank.component";
import { QuestionComponent } from "./question/question.component";

@NgModule({
  declarations: [QuestionBankComponent, QuestionComponent],
  imports: [
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    QuestionBankRoutingModule
  ]
})
export class QuestionBankModule {}
