import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormGroupDirective
} from "@angular/forms";

import { CommonsService } from "./../../commons.service";
import { DashboardService } from "src/app/modules/dashboard/dashboard.service";
import {
  DSTemplateDetails,
  InternalResponse,
  INTERNAL_RESPONSE_STATUS,
  CommonList
} from "src/app/services";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-ds-template-edit",
  templateUrl: "./ds-template-edit.component.html",
  styleUrls: ["../../style.css"]
})
export class DsTemplateEditComponent implements OnInit {
  isLoadingResults: boolean = false;
  masterSelected: boolean;
  checklist: any;
  checkedList: any;
  selectedTemplateId: string;
  selectedCategoryId: string;
  selectedTemplatedData: DSTemplateDetails;
  dsTemplateForm: FormGroup;
  templateList: CommonList;
  categorylist: CommonList[];
  questionlist: CommonList[];
  selectedCategories = [];

  constructor(
    private commonsService: CommonsService,
    private dashboardService: DashboardService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.dashboardService.setTitle("Edit Driversheet Template");
    this.getDSTemplateList();
  }

  createForm() {
    this.dsTemplateForm = this.formBuilder.group({
      driverSheetTemplateName: ["", [Validators.required]],
      description: ["", [Validators.required]]
    });
  }

  getDSTemplateList() {
    this.isLoadingResults = true;
    this.commonsService.getDSTemplateList().subscribe(response => {
      let responseData: InternalResponse = response;
      if (responseData.status === INTERNAL_RESPONSE_STATUS.SUCCESS) {
        this.templateList = response.success_data.driverSheetTemplateList;
        this.getQuestionCategoryList();
      }
    });
  }

  onTemplateChange(templateId: any): void {
    this.selectedTemplateId = templateId;
    this.getDStemplateDetails();
  }

  getDStemplateDetails() {
    this.commonsService
      .getDSTemplateData(this.selectedTemplateId)
      .subscribe(response => {
        let responseData: InternalResponse = response;
        if (responseData.status === INTERNAL_RESPONSE_STATUS.SUCCESS) {
          this.selectedTemplatedData = responseData.success_data;
          this.selectedCategories = this.selectedTemplatedData.questionCategoryList.map(
            el => {
              return { ...el, hideQuestionCategory: false };
            }
          );
          // patch the template data to form
          this.patchFormValue(this.selectedTemplatedData);
        }
      });
  }

  patchFormValue(selectedTemplatedData: DSTemplateDetails) {
    this.dsTemplateForm.setValue({
      driverSheetTemplateName: selectedTemplatedData.driverSheetTemplateName,
      description: selectedTemplatedData.description
    });
  }

  getQuestionCategoryList() {
    this.isLoadingResults = true;
    this.commonsService.getQuestionCategoryList().subscribe(
      response => {
        let responseData: InternalResponse = response;
        if (responseData.status === INTERNAL_RESPONSE_STATUS.SUCCESS) {
          this.categorylist = response.success_data.questionCategories;
          this.isLoadingResults = false;
          this.createForm();
        }
      },
      error => {
        console.log(error);
        this.isLoadingResults = false;
      }
    );
  }

  onCategoryChange(categoryId: any): void {
    this.selectedCategoryId = categoryId;
    this.getQuestionList();
  }

  getQuestionList() {
    this.commonsService.getQuestionList(this.selectedCategoryId).subscribe(
      response => {
        let responseData: InternalResponse = response;
        if (responseData.status === INTERNAL_RESPONSE_STATUS.SUCCESS) {
          this.questionlist = response.success_data.questions;
          this.masterSelected = false;
          this.checklist = this.questionlist.map(obj => ({
            questionId: obj.id,
            questionName: obj.name,
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

  toggleList(selectedCategoryId: string) {
    var index = this.selectedCategories
      .map(function(item) {
        return item.questionCategoryId;
      })
      .indexOf(selectedCategoryId);
    this.selectedCategories[index].hideQuestionCategory = !this
      .selectedCategories[index].hideQuestionCategory;
  }

  /**
   * Adds selected question
   * @returns
   */
  addSelectedQuestion() {
    let selectedCategorydata = this.categorylist.filter(
      el => el.id == this.selectedCategoryId
    );
    let selectedQuestions = JSON.parse(this.checkedList);
    if (selectedQuestions.length === 0) {
      this.toastr.warning("Please select atleast one question!!");
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

  /**
   * Removes selected category
   * @param selectedCategoryId
   */
  removeSelectedCategory(selectedCategoryId) {
    var removeIndex = this.selectedCategories
      .map(function(item) {
        return item.questionCategoryId;
      })
      .indexOf(selectedCategoryId);
    this.selectedCategories.splice(removeIndex, 1);
  }

  /**
   * Deletes question from category
   * @param questionCategoryId
   * @param questionId
   */
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
   * Edits Driversheet template
   * @param data
   * @param formDirective
   * @returns
   */
  editDStemplate(
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
      this.toastr.warning("Please add atleast one Question Catetory!!");
      return;
    }
    let dSQuestionCategoryList = this.selectedCategories.map(el => {
      return {
        questionCategoryId: el.questionCategoryId,
        questions: el.questions.map(el => {
          return { questionId: el.questionId };
        })
      };
    });
    let finalData = {
      active: true,
      current: true,
      driverSheetTemplateName: data && data.driverSheetTemplateName,
      description: data && data.description,
      driverSheetQuestionCategoryList: dSQuestionCategoryList,
      driverSheetTemplateId: this.selectedTemplateId
    };
    this.isLoadingResults = true;
    this.commonsService.updateDSTemplate(finalData).subscribe(response => {
      let responseData: InternalResponse = response;
      // STORING IN SERVICE IF ALL API RETURNED SUCCESS DATA
      if (responseData.status === INTERNAL_RESPONSE_STATUS.SUCCESS) {
        this.toastr.success(response.success_message);
        this.isLoadingResults = false;
      } else {
        this.isLoadingResults = false;
        this.toastr.error(
          response.success_message
            ? response.success_message
            : response.error_message,
          "Error"
        );
      }
      formDirective.resetForm();
      this.dsTemplateForm.reset();
      this.getDSTemplateList();
      this.masterSelected = false;
      this.selectedCategories = [];
      this.checklist = [];
      this.selectedTemplateId = null;
    });
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
