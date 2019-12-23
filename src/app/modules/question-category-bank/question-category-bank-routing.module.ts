import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { QuestionCategoryBankComponent } from "./question-category-bank.component";
import { QuestionCategoryComponent } from ".";

const routes: Routes = [
  {
    path: "",
    component: QuestionCategoryBankComponent,
    children: [{ path: "", component: QuestionCategoryComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionCategoryBankRoutingModule {}
