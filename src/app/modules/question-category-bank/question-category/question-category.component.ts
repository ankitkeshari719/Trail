import { QuestionCategoryService } from "./../question-category.service";
import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormGroupDirective
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import {
  QuestionCategories,
  InternalResponse,
  CommonList,
  INTERNAL_RESPONSE_STATUS
} from "src/app/services";
import { handleResponse } from "src/app/config/helper.function";
import { HttpErrorResponse } from "@angular/common/http";
import { DashboardService } from "../../dashboard/dashboard.service";

@Component({
  selector: "app-question-category",
  templateUrl: "./question-category.component.html",
  styleUrls: ["../../style.css"]
})
export class QuestionCategoryComponent implements OnInit {
  quesCategoryForm: FormGroup;
  isLoading: boolean = false;
  enableEdit: boolean = false;
  enableDelete: boolean = false;
  selectedCategoryId: string;
  selectedQuesCategorydata: QuestionCategories;
  categorylist: CommonList[];
  info_description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip excommodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  constructor(
    private formBuilder: FormBuilder,
    private questionCategoryService: QuestionCategoryService,
    private toastr: ToastrService,
    private router: Router,
    private dashboardService: DashboardService
  ) {}

  ngOnInit() {
    this.dashboardService.setTitle("Add New Question Category");
    this.createForm();
  }

  createForm() {
    this.quesCategoryForm = this.formBuilder.group({
      active: ["false", Validators.required],
      description: [null, Validators.required],
      questionCategoryName: [null, Validators.required]
    });
  }

  // Function execute on Add button Click
  onClickAdd() {
    this.dashboardService.setTitle("Add New Question Category");
    this.enableEdit = false;
    this.enableDelete = false;
    this.quesCategoryForm.reset();
  }

  // Function execute on Edit button Click
  onClickEdit() {
    this.dashboardService.setTitle("Edit Question Category");
    this.enableEdit = true;
    this.selectedCategoryId = null;
    this.quesCategoryForm.reset();
    this.getQuestionCategoryList();
  }

  // Function execute on Delete button Click
  onClickDelete() {
    this.dashboardService.setTitle("Delete Question Category");
    this.enableEdit = false;
    this.enableDelete = true;
    this.selectedCategoryId = null;
    this.quesCategoryForm.reset();
    this.getQuestionCategoryList();
  }

  onCategoryChange(categoryId: any): void {
    this.isLoading = true;
    this.selectedCategoryId = categoryId;
    this.getQuesCatagoryDetails(this.selectedCategoryId);
  }

  patchFormValue(selectedQuesCategorydata: QuestionCategories) {
    this.quesCategoryForm.patchValue({
      description: selectedQuesCategorydata.description,
      active: selectedQuesCategorydata.active.toString(),
      questionCategoryName: selectedQuesCategorydata.questionCategoryName
    });
    this.isLoading = false;
  }

  onSubmit(
    newQuestionData: QuestionCategories,
    formDirective: FormGroupDirective
  ) {
    if (!this.enableEdit && this.enableDelete) {
      this.deleteQuesCatagory(formDirective);
    } else if (this.enableEdit) {
      this.editQuesCatagory(newQuestionData, formDirective);
    } else {
      this.addNewQuesCategory(newQuestionData, formDirective);
    }
  }

  /**
   * Gets question catagory details
   * @param selectedCategoryId
   */
  getQuesCatagoryDetails(selectedCategoryId: string) {
    this.isLoading = true;
    this.questionCategoryService
      .getQuesCatagoryDetails(selectedCategoryId)
      .subscribe(
        response => {
          let responseData: InternalResponse = response;
          if (responseData.status === INTERNAL_RESPONSE_STATUS.SUCCESS) {
            this.selectedQuesCategorydata = responseData.success_data;
            this.patchFormValue(this.selectedQuesCategorydata);
          }
        },
        (err: HttpErrorResponse) => {
          console.log(err.error);
          console.log(err.message);
        }
      );
  }

  /**
   * Gets question category list
   */
  getQuestionCategoryList() {
    this.isLoading = true;
    this.questionCategoryService.getQuestionCategoryList().subscribe(
      response => {
        let responseData: InternalResponse = response;
        if (responseData.status === INTERNAL_RESPONSE_STATUS.SUCCESS) {
          this.categorylist = response.success_data.questionCategories;
        }
        this.isLoading = false;
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.message);
      }
    );
  }

  /**
   * Adds new Question category
   * @param newQuesCategoryData
   */
  addNewQuesCategory(
    newQuesCategoryData: QuestionCategories,
    formDirective: FormGroupDirective
  ) {
    this.isLoading = true;
    this.questionCategoryService.addQuesCategory(newQuesCategoryData).subscribe(
      response => {
        let responseData: InternalResponse = response;
        handleResponse(responseData, this.toastr);
        this.getQuestionCategoryList();
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.message);
      }
    );
    this.quesCategoryForm.reset();
    formDirective.resetForm();
  }

  /**
   * Edit Question category
   * @param newQuesCategoryData
   */
  editQuesCatagory(
    quesCategoryData: QuestionCategories,
    formDirective: FormGroupDirective
  ) {
    quesCategoryData.questionCategoryId = this.selectedCategoryId;
    this.isLoading = true;
    this.questionCategoryService.editQuesCatagory(quesCategoryData).subscribe(
      response => {
        let responseData: InternalResponse = response;
        handleResponse(responseData, this.toastr);
        this.selectedCategoryId = null;
        this.getQuestionCategoryList();
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.message);
      }
    );
    this.quesCategoryForm.reset();
    formDirective.resetForm();
  }

  /**
   * Deletes question category
   * @param formDirective
   */
  deleteQuesCatagory(formDirective: FormGroupDirective) {
    this.isLoading = true;
    this.questionCategoryService
      .deleteQuesCatagory(this.selectedCategoryId)
      .subscribe(
        response => {
          let responseData: InternalResponse = response;
          handleResponse(responseData, this.toastr);
          this.selectedCategoryId = null;
          this.getQuestionCategoryList();
        },
        (err: HttpErrorResponse) => {
          console.log(err.error);
          console.log(err.message);
        }
      );
    this.quesCategoryForm.reset();
    formDirective.resetForm();
  }

  getError(formField: string) {
    let errorMessage: string =
      formField === "questionCategoryName" ? "Category Name " : "Description";
    return this.quesCategoryForm.get(formField).hasError("required")
      ? errorMessage + "is required"
      : "";
  }

  backToDashboard() {
    this.router.navigate(["./dashboard"]);
  }
}
