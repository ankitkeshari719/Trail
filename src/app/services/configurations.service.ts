/* THIS FILE CONTAINS ALL THE STRUCTURAL INTERFACES OF JCB-ENDURANCE-TESTING APPLICATION */

// ---------------------------------- Sidebar Nav Items ---------------------------
export interface NavItem {
  displayName?: string;
  disabled?: boolean;
  iconName?: string;
  route?: string;
  tooltip?: string;
  children?: NavItem[];
}

// ---------------------------------- List Data ---------------------------

export interface CommonList {
  id?: string;
  name?: string;
}

// ----------------------------------User Management Module ---------------------------
export interface User {
  plant?: string;
  plantId?: string;
  role?: string;
  roleId?: string;
  user?: string;
  userId?: string;
  mobileNumber?: string;
}
export interface UserLoginRequest {
  password?: string;
  email?: string;
  checked?: boolean;
}
export interface UserLoginResponse {
  accessToken?: string;
  bucketAccesskey?: string;
  bucketSecretkey?: string;
  country?: string;
  email?: string;
  firstName?: string;
  image?: string;
  lastName?: string;
  roleId?: string;
}
export interface UserRegistrationRequest {
  email?: string;
  firstName?: string;
  lastName?: string;
  activateUserUrl?: string;
  roleId?: string;
  selfRegistration?: boolean;
}

export interface ActivateAccountRequest {
  email?: string;
  newPassword?: string;
  oldPassword?: string;
}

export interface ForgetPasswordRequest {
  email?: string;
  resetPasswordUrl?: string;
}

export interface ResetPasswordRequest {
  email?: string;
  newPassword?: string;
}

export interface UpdateUserRoleRequest {
  userName?: string;
  roleId?: string;
}
export interface RegisterOperatorRequest {
  email?: string;
  firstName?: string;
  lastName?: string;
  location?: string;
  password?: string;
  roleId?: string;
}
export interface UserProfileDetails {
  active?: boolean;
  address?: string;
  country?: string;
  email?: string;
  firstName?: string;
  image?: string;
  lastName?: string;
  phoneNumber?: string;
  roleName?: string;
  smsLanguage?: string;
  thumbnail?: string;
  timeZone?: string;
}

// ---------------------------------- Dashboard Module -------------------------
export interface DashboardCountResponse {
  projectsCount?: number;
  machinesCount?: number;
  machineOperatorsCount?: number;
  redCount?: number;
  amberCount?: number;
  greenCount?: number;
}

export interface Project {
  active?: boolean;
  completedHours?: number;
  createdOn?: string;
  endDate?: string;
  startDate?: string;
  numberOfMachines?: number;
  projectId?: string;
  projectName?: string;
  projectStatus?: string;
  targetHours?: number;
  type?: string;
  imageUrl?: string;
  description?: string;
}

export interface Operator {
  name?: string;
  projectId?: string;
  projectName?: string;
  userId?: string;
}

// ---------------------------------- Question & Question Category Module -------------------------
export interface Question {
  questionId?: string;
  active?: boolean;
  description?: string;
  question?: string;
  questionCategoryId?: string;
  questionType?: string;
  visibility?: boolean;
}

export interface QuestionCategories {
  questionCategoryId?: string;
  active?: boolean;
  description?: string;
  questionCategoryName?: string;
}

export interface QuesWithCategoriesList {
  id?: string;
  name?: string;
  questions?: CommonList[];
}

// ---------------------------------- Driversheet Template Module -------------------------
export interface DSTemplateRequest {
  active?: boolean;
  current?: boolean;
  driverSheetTemplateName?: string;
  description?: string;
  driverSheetTemplateId?: string;
  driverSheetQuestionCategoryList?: {
    questionCategoryId?: string;
    questions?: { questionId?: string }[];
  }[];
}
export interface SelectedCategories {
  questionCategoryId?: string;
  questionCategoryName?: string;
  hideQuestionCategory?: boolean;
  questions?: CommonList[];
}

export interface DSTemplateDetails {
  driverSheetTemplateName?: string;
  description?: string;
  current?: string;
  active?: string;
  questionCategoryList?: {
    map: (arg0: (el: any) => any) => SelectedCategories[];
  };
}

// ---------------------------------- Driversheet Module -------------------------
export interface DriverSheet {
  driverSheetId?: string;
  active?: boolean;
  current?: boolean;
  description?: string;
  driverSheetName?: string;
  projectId?: string;
  driverSheetQuestionCategoryList?: {
    questionCategoryId: string;
    questions: { questionId: string }[];
  }[];
}

export interface DriverSheetSubmitted {
  driverSheetSubmittedId?: string;
  active?: boolean;
  deviceId?: string;
  driverSheetId?: string;
  inProgress?: boolean;
  language?: string;
  projectMachineId?: string;
  shiftId?: string;
  endHours?: number;
  startHours?: number;
  testingHoursCompleted?: number;
  userId?: string;
}

export interface DriverSheetSubmittedAns {
  driverSheetAnsweredId?: string;
  answer?: string;
  comment?: string;
  driverSheetQuestionId?: string;
  driverSheetSubmittedId?: string;
}

export interface DriverSheetQuestion {
  driverSheetQuestionId?: string;
  active?: false;
  driverSheetId?: string;
  questionId?: string;
}

// ---------------------------------- Device Module -------------------------
export interface Device {
  deviceId?: string;
  active?: boolean;
  deviceName?: string;
  identificationKeys?: string;
  installed?: boolean;
  oS?: string;
}

// ---------------------------------- Plant Module -------------------------
export interface Plants {
  active?: boolean;
  plantId?: string;
  address?: string;
  city?: string;
  country?: string;
  plantName?: string;
  plantPOCEmail?: string;
  plantPOCFName?: string;
  plantPOCLName?: string;
}

// ---------------------------------- Platform Module -------------------------
export interface Platform {
  platformId?: string;
  active?: false;
  description?: string;
  imageUrl?: string;
  platformName?: string;
}

// ---------------------------------- Machine Module -------------------------
export interface Machine {
  machineName?: string;
  modelId?: string;
  modelName?: string;
  plantId?: string;
  plantName?: string;
  platformId: string;
  platformName?: string;
  projectId?: string;
  projectName?: string;
  description?: string;
  projectMachineId?: string;
  vin?: string;
  targetHours?: string;
  active?: string;
}
// ---------------------------------- Endurance Cycle Module -------------------------

export interface EnduranceCycle {
  activity?: string;
  activityId?: string;
  instructions?: string;
  hours?: string;
}

// ---------------------------------- Project User  -------------------------

export interface ProjectUser {
  projectUserId?: string;
  plantId?: string;
  plantName?: string;
  role?: string;
  roleName?: string;
  assignedUser?: string;
  assignedUserName?: string;
  mobileNumber?: string;
  active?: boolean;
  projectId?: string;
  responsibility?: string;
}

export interface PojectEnduranceCycle {
  projectEnduranceCycleId?: string;
  enduranceCycleId?: string;
  enduranceCycleName?: string;
  instruction?: string;
  unit?: string;
  hours?: string;
  efforts?: string;
  projectId?: string;
}

interface SecretQuestion {
  identification?: string;
  question?: string;
}

export interface SecretQuestions extends Array<SecretQuestion> {}
