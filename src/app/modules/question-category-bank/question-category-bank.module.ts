import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { MaterialModule } from "src/app/material.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { QuestionCategoryBankRoutingModule } from "./question-category-bank-routing.module";
import { QuestionCategoryBankComponent } from "./question-category-bank.component";
import { QuestionCategoryComponent } from "./question-category/question-category.component";

@NgModule({
  declarations: [QuestionCategoryBankComponent, QuestionCategoryComponent],
  imports: [
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    QuestionCategoryBankRoutingModule
  ]
})
export class QuestionCategoryBankModule {}
