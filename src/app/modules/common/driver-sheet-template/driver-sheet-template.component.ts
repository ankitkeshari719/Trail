import { CommonsService } from "./../commons.service";
import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormGroupDirective
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";

import { DashboardService } from "../../dashboard/dashboard.service";
import {
  InternalResponse,
  INTERNAL_RESPONSE_STATUS,
  CommonList,
  SelectedCategories
} from "src/app/services";
import { handleResponse } from "src/app/config/helper.function";

@Component({
  selector: "app-driver-sheet-template",
  templateUrl: "./driver-sheet-template.component.html",
  styleUrls: ["../style.css"]
})
export class DriverSheetTemplateComponent implements OnInit {
  isLoading: boolean = false;
  masterSelected: boolean;
  checklist: any;
  checkedList: any;
  dsTemplateForm: FormGroup;
  selectedCategoryId: string;
  categorylist: CommonList[];
  questionlist: CommonList[];
  selectedCategories: SelectedCategories[] = [];

  constructor(
    private commonsService: CommonsService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private dashboardService: DashboardService
  ) {}

  ngOnInit() {
    this.dashboardService.setTitle("Driversheet Template");
    this.getQuestionCategoryList();
    this.createForm();
  }

  createForm() {
    this.dsTemplateForm = this.formBuilder.group({
      driverSheetTemplateName: [null, [Validators.required]],
      description: [null, [Validators.required]]
    });
  }

  onCategoryChange(categoryId: any): void {
    this.selectedCategoryId = categoryId;
    this.getQuestionList(categoryId);
  }

  checkUncheckAll() {
    for (var i = 0; i < this.checklist.length; i++) {
      this.checklist[i].isSelected = this.masterSelected;
    }
    this.getCheckedItemList();
  }

  isAllSelected() {
    this.masterSelected = this.checklist.every(function(item: any) {
      return item.isSelected == true;
    });
    this.getCheckedItemList();
  }

  getCheckedItemList() {
    this.checkedList = [];
    for (var i = 0; i < this.checklist.length; i++) {
      if (this.checklist[i].isSelected)
        this.checkedList.push(this.checklist[i]);
    }
    this.checkedList = JSON.stringify(this.checkedList);
  }

  getQuestionCategoryList() {
    this.isLoading = true;
    this.commonsService.getQuestionCategoryList().subscribe(
      response => {
        let responseData: InternalResponse = response;
        if (responseData.status === INTERNAL_RESPONSE_STATUS.SUCCESS) {
          this.categorylist = response.success_data.questionCategories;
          this.isLoading = false;
        }
      },
      error => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }

  getQuestionList(categoryId: string) {
    this.commonsService.getQuestionList(categoryId).subscribe(
      response => {
        let responseData: InternalResponse = response;
        if (responseData.status === INTERNAL_RESPONSE_STATUS.SUCCESS) {
          this.questionlist = response.success_data.questions;
          this.masterSelected = false;
          this.checklist = this.questionlist.map(obj => ({
            ...obj,
            isSelected: false
          }));
          this.getCheckedItemList();
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  toggleList(selectedCategoryId: string) {
    var index = this.selectedCategories
      .map(function(item) {
        return item.questionCategoryId;
      })
      .indexOf(selectedCategoryId);
    this.selectedCategories[index].hideQuestionCategory = !this
      .selectedCategories[index].hideQuestionCategory;
  }

  addSelectedQuestion() {
    let selectedCategorydata = this.categorylist.filter(
      el => el.id == this.selectedCategoryId
    );
    let selectedQuestions = JSON.parse(this.checkedList);
    if (selectedQuestions.length === 0) {
      this.toastr.warning("Please select atleast one Question!!");
      return;
    }
    if (
      this.selectedCategories.some(
        el => el.questionCategoryId === selectedCategorydata[0].id
      )
    ) {
      this.toastr.warning("Duplicate entry not allowed!!");
      return;
    }
    if (
      selectedCategorydata[0] &&
      this.checkedList &&
      !this.selectedCategories.some(
        el => el.questionCategoryId === selectedCategorydata[0].id
      )
    ) {
      this.selectedCategories = [
        ...this.selectedCategories,
        {
          questionCategoryId: selectedCategorydata[0].id,
          questionCategoryName: selectedCategorydata[0].name,
          hideQuestionCategory: false,
          questions: selectedQuestions
        }
      ];
    }
  }

  removeSelectedCategory(selectedCategoryId) {
    let removeIndex = this.selectedCategories
      .map(function(item) {
        return item.questionCategoryId;
      })
      .indexOf(selectedCategoryId);
    this.selectedCategories.splice(removeIndex, 1);
  }

  deleteQuestionFromCategory(questionCategoryId, questionId) {
    this.selectedCategories.forEach(el => {
      if (el.questionCategoryId === questionCategoryId) {
        if (el.questions.length === 1) {
          let removeCategoryIndex = this.selectedCategories
            .map(function(item) {
              return item.questionCategoryId;
            })
            .indexOf(questionCategoryId);
          this.selectedCategories.splice(removeCategoryIndex, 1);
        }
        let removeIndex = el.questions
          .map(function(item) {
            return item.id;
          })
          .indexOf(questionId);
        el.questions.splice(removeIndex, 1);
      }
    });
  }

  /**
   * Add New Driversheet template
   * @param data
   * @param formDirective
   * @returns
   */
  saveDStemplate(
    data: {
      driverSheetTemplateName: string;
      description: string;
    },
    formDirective: FormGroupDirective
  ) {
    if (!this.dsTemplateForm.valid) {
      return;
    }
    if (this.selectedCategories.length === 0) {
      this.toastr.warning("Please add atleast one Question Category !!");
      return;
    }
    let driverSheetQuestionCategoryList = this.selectedCategories.map(el => {
      return {
        questionCategoryId: el.questionCategoryId,
        questions: el.questions.map(el => {
          return { questionId: el.id };
        })
      };
    });
    let finalData = {
      active: true,
      current: true,
      driverSheetTemplateName: data && data.driverSheetTemplateName,
      description: data && data.description,
      driverSheetQuestionCategoryList: driverSheetQuestionCategoryList
    };
    this.isLoading = true;
    this.commonsService.addNewDSTemplate(finalData).subscribe(response => {
      let responseData: InternalResponse = response;
      handleResponse(responseData, this.toastr);
      this.isLoading = false;
      formDirective.resetForm();
      this.dsTemplateForm.reset();
      this.masterSelected = false;
      this.selectedCategories = [];
      this.checklist = [];
    });
  }

  editDSTemplate() {
    this.router.navigate(["edit"], { relativeTo: this.route });
  }

  getErrorName() {
    return this.dsTemplateForm
      .get("driverSheetTemplateName")
      .hasError("required")
      ? "Name is required."
      : "";
  }

  getErrorDescription() {
    return this.dsTemplateForm.get("description").hasError("required")
      ? "Description is required."
      : "";
  }
}
