import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { QuestionBankComponent } from "./question-bank.component";
import { QuestionComponent } from ".";

const routes: Routes = [
  {
    path: "",
    component: QuestionBankComponent,
    children: [{ path: "", component: QuestionComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionBankRoutingModule {}
