// SERVER ADDRESS TO BE FETCHED FROM app.config.json
import { environment } from "../../environments/environment";

// API'S FOR USER AND APP CONFIG RELATED STUFF
export const LOGIN = environment.baseUrl + "/user/login";
export const ACTIVATE_USER_REGISTRATION =
  environment.baseUrl + "/user/activateuser";
export const REGISTRATION = environment.baseUrl + "/user/register";
export const LOGOUT = environment.baseUrl + "/user/logout";
export const FORGOT_PASSWORD = environment.baseUrl + "/user/forgotpassword";
export const RESET_PASSWORD = environment.baseUrl + "/user/resetpassword";
export const UPDATE_USER_ROLE = environment.baseUrl + "/user/user-roles";
export const UPDATE_USER = environment.baseUrl + "/user/users";
export const REGISTER_OPERATOR =
  environment.baseUrl + "/user/register-operator";
export const GET_LOCATIONS = environment.baseUrl + "/user/location-names";

// API'S FOR USER DASHBOARD RELATED STUFF
export const GET_ALL_DASHBOARD_COUNTS =
  environment.baseUrl + "/dashboard/all-dashboard-counts";

// API'S FOR USER PROJECT RELATED STUFF
export const GET_PROJECT_LIST = environment.baseUrl + "/dashboard/projects";
export const GET_PROJECT_DETAILS =
  environment.baseUrl + "/dashboard/project-details";
export const GET_PROJECT_MACHINE_LIST =
  environment.baseUrl + "/project/project-machine-list";
export const GET_PROJECT_FAULT_LIST =
  environment.baseUrl + "/project/project-fault-list";
export const PROJECT_MACHINE_API =
  environment.baseUrl + "/project/project-machine";
export const PROJECT_USER_API = environment.baseUrl + "/project/project-user";
export const PROJECT_ENDURANCE_API =
  environment.baseUrl + "/project/project-endurance-cycle";

// API'S FOR USER MACHINES RELATED STUFF
export const MACHINE_API = environment.baseUrl + "/dashboard/machines";
export const GET_MACHINES_LIST =
  environment.baseUrl + "/dashboard/model-machine-names";

export const GET_MACHINES_USERS =
  environment.baseUrl + "/dashboard/machines-users";

// API'S FOR USER DASHBOARD LIST ITEM'S RELATED STUFF
export const GET_VIN_LIST = environment.baseUrl + "/dashboard/machine-names";
export const GET_ACTIVITY_LIST =
  environment.baseUrl + "/dashboard/activity-names";
export const GET_MODEL_LIST = environment.baseUrl + "/dashboard/model-names";
export const GET_ALL_USERS = environment.baseUrl + "/dashboard/getallusers";
export const GET_PROJECT_NAME_LIST =
  environment.baseUrl + "/dashboard/project-names";
export const GET_USER_LIST = environment.baseUrl + "/dashboard/user-names";
export const GET_USER_ROLES = environment.baseUrl + "/dashboard/user-roles";

// API'S FOR USER OPERATORS RELATED STUFF
export const GET_OPERATORS_LIST = environment.baseUrl + "/dashboard/operators";

// API'S FOR USER DEVICES RELATED STUFF
export const DEVICES_API = environment.baseUrl + "/common/devices";
export const GET_DEVICE_LIST = environment.baseUrl + "/dashboard/device-names";

// API'S FOR USER PLANT RELATED STUFF
export const PLANT_API = environment.baseUrl + "/dashboard/plants";
export const GET_PLANT_LIST = environment.baseUrl + "/dashboard/plant-names";

// API'S FOR  USER PLATFORM RELATED STUFF
export const PLATFORM_API = environment.baseUrl + "/dashboard/platforms";
export const GET_PLATFORM_LIST =
  environment.baseUrl + "/dashboard/platform-names";

// API'S FOR USER DRIVER SHEETS RELATED STUFF
export const DRIVER_SHEETS_API = environment.baseUrl + "/common/driversheets";
export const DRIVER_SHEET_QUESTIONS_API =
  environment.baseUrl + "/dashboard/driversheetquestions";
export const DS_SUBMITTED_API =
  environment.baseUrl + "/dashboard/driversheetsubmitted";
export const DS_SUBMITTED_ANSWERS_API =
  environment.baseUrl + "/dashboard/driversheetsubmittedanswers";
export const QUESTIONS_API = environment.baseUrl + "/dashboard/questions";
export const QUESTIONS_LIST_API =
  environment.baseUrl + "/dashboard/questions-list";
export const QUESTIONS_NAME_LIST =
  environment.baseUrl + "/dashboard/question-names";
export const QUES_CATEGORIES_API =
  environment.baseUrl + "/dashboard/questioncategories";
export const QUES_CATEGORIES_LIST_API =
  environment.baseUrl + "/dashboard/questioncategories-list";
export const DS_TEMPLATES_API =
  environment.baseUrl + "/dashboard/driversheettemplates";
export const DS_TEMPLATE_LIST =
  environment.baseUrl + "/dashboard/template-names";

// API'S FOR REPORT RELATED STUFF
export const DUTYCYCLE_PERFORMANCE =
  environment.baseUrl + "/report/dutycycle-performed";
export const FAULT_TREND = environment.baseUrl + "/report/fault-trend";
export const OVERALL_DRIVER_SCORE =
  environment.baseUrl + "/report/overall-driver-score";
