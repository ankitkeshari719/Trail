import { ToastrService } from "ngx-toastr";
import { Component, OnInit } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormGroupDirective
} from "@angular/forms";

import {
  InternalResponse,
  INTERNAL_RESPONSE_STATUS,
  Question,
  CommonList
} from "src/app/services";
import { handleResponse } from "src/app/config/helper.function";
import { DashboardService } from "./../../dashboard/dashboard.service";
import { QuestionBankService } from "../question-bank.service";
import { QuestionCategoryService } from "../../question-category-bank/question-category.service";

@Component({
  selector: "app-question",
  templateUrl: "./question.component.html",
  styleUrls: ["../../style.css"]
})
export class QuestionComponent implements OnInit {
  isLoading: boolean = false;
  questionForm: FormGroup;
  questionList: CommonList[];
  categorylist: CommonList[];
  selectedQuestionId: string;
  selectedQuestiondata: Question;
  enableEdit: boolean = false;
  enableDelete: boolean = false;
  info_description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip excommodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router,
    private dashboardService: DashboardService,
    private questionBankService: QuestionBankService,
    private questionCategoryService: QuestionCategoryService
  ) {}

  ngOnInit() {
    this.dashboardService.setTitle("Add New Question");
    this.getQuestionCategoryList();
    this.createForm();
  }

  createForm() {
    this.questionForm = this.formBuilder.group({
      question: ["", Validators.required],
      questionCategoryId: [null, Validators.required],
      description: ["", Validators.required],
      active: [false],
      visibility: [false]
    });
  }

  // Function execute on Add button Click
  onClickAdd() {
    this.dashboardService.setTitle("Add New Question");
    this.enableEdit = false;
    this.enableDelete = false;
    this.questionForm.reset();
  }

  // Function execute on Edit button Click
  onClickEdit() {
    this.dashboardService.setTitle("Edit Question");
    this.enableEdit = true;
    this.selectedQuestionId = null;
    this.questionForm.reset();
    this.getQuestionNameList();
  }

  // Function execute on Delete button Click
  onClickDelete() {
    this.dashboardService.setTitle("Delete Question");
    this.enableEdit = false;
    this.enableDelete = true;
    this.selectedQuestionId = null;
    this.questionForm.reset();
    this.getQuestionNameList();
  }

  onQuestionChange(templateId: any): void {
    this.isLoading = true;
    this.selectedQuestionId = templateId;
    this.getQuestionDetails(this.selectedQuestionId);
  }

  patchFormValue(questionData: Question) {
    this.questionForm.setValue({
      question: questionData.question,
      questionCategoryId: questionData.questionCategoryId,
      description: questionData.description,
      active: questionData.active,
      visibility: questionData.visibility
    });
    this.isLoading = false;
  }

  onSubmit(newQuestionData: Question, formDirective: FormGroupDirective) {
    if (!this.enableEdit && this.enableDelete) {
      this.deleteQuestion(formDirective);
    } else if (this.enableEdit) {
      this.editQuestion(newQuestionData, formDirective);
    } else {
      this.addNewQuestion(newQuestionData, formDirective);
    }
  }

  /**
   * Gets question categories list
   */
  getQuestionCategoryList() {
    this.isLoading = true;
    this.questionCategoryService.getQuestionCategoryList().subscribe(
      response => {
        let responseData: InternalResponse = response;
        if (responseData.status === INTERNAL_RESPONSE_STATUS.SUCCESS) {
          this.categorylist = response.success_data.questionCategories;
          this.isLoading = false;
        }
      },
      (err: HttpErrorResponse) => {
        this.isLoading = false;
        console.log(err.error);
        console.log(err.message);
      }
    );
  }

  /**
   * Gets questions list
   */
  getQuestionNameList() {
    this.isLoading = true;
    this.questionBankService.getQuestionNameList().subscribe(
      response => {
        let responseData: InternalResponse = response;
        if (responseData.status === INTERNAL_RESPONSE_STATUS.SUCCESS) {
          this.questionList = responseData.success_data.questions;
          this.isLoading = false;
        } else {
          this.isLoading = false;
          response.code != 401 &&
            this.toastr.error(response.error_message, "ERROR");
        }
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.message);
      }
    );
  }

  /**
   * Gets ne question details
   * @param selectedQuestionId
   */
  getQuestionDetails(selectedQuestionId: string) {
    this.questionBankService.getQuestionDetails(selectedQuestionId).subscribe(
      response => {
        let responseData: InternalResponse = response;
        if (responseData.status === INTERNAL_RESPONSE_STATUS.SUCCESS) {
          this.selectedQuestiondata = responseData.success_data;
          this.patchFormValue(this.selectedQuestiondata);
        } else {
          response.code != 401 &&
            this.toastr.error(response.error_message, "ERROR");
        }
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.message);
      }
    );
  }

  /**
   * Adds new question
   * @param newQuestionData
   */
  addNewQuestion(newQuestionData: Question, formDirective: FormGroupDirective) {
    this.isLoading = true;
    this.questionBankService.addNewQuestion(newQuestionData).subscribe(
      response => {
        let responseData: InternalResponse = response;
        handleResponse(responseData, this.toastr);
        this.isLoading = false;
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.message);
      }
    );
    this.questionForm.reset();
    formDirective.resetForm();
  }

  /**
   * Edits question
   * @param updatedQuestionData
   */
  editQuestion(
    updatedQuestionData: Question,
    formDirective: FormGroupDirective
  ) {
    this.isLoading = true;
    updatedQuestionData.questionId = this.selectedQuestionId;
    this.questionBankService.editQuestion(updatedQuestionData).subscribe(
      response => {
        let responseData: InternalResponse = response;
        handleResponse(responseData, this.toastr);
        this.selectedQuestionId = null;
        this.getQuestionNameList();
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.message);
      }
    );
    this.questionForm.reset();
    formDirective.resetForm();
  }

  /**
   * Delete question
   * @param updatedQuestionData
   */
  deleteQuestion(formDirective: FormGroupDirective) {
    this.isLoading = true;
    this.questionBankService.deleteQuestion(this.selectedQuestionId).subscribe(
      response => {
        let responseData: InternalResponse = response;
        handleResponse(responseData, this.toastr);
        this.selectedQuestionId = null;
        this.getQuestionNameList();
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.message);
      }
    );
    this.questionForm.reset();
    formDirective.resetForm();
  }

  getQuestionError() {
    return this.questionForm.get("question").hasError("required")
      ? "Question is required"
      : "";
  }

  getDescriptionError() {
    return this.questionForm.get("description").hasError("required")
      ? "Description is required"
      : "";
  }

  getQuestionCategoryError() {
    return this.questionForm.get("questionCategoryId").hasError("required")
      ? "Question Category is required"
      : "";
  }

  backToDashboard() {
    this.router.navigate(["./dashboard"]);
  }
}
