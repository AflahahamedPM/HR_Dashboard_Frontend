class ConfigAPIURL {
  //   static baseUrl = import.meta.env.VITE_DEV_API_URL;

  // general api
  static deleteUser = "/admin/user/delete";

  // auth apis
  static registerNewUser = "/admin/account/register";
  static userLoggin = "/admin/account/login";

  // upload resume
  static upload = "/admin/upload";

  // candidate apis
  static createCandidate = "/admin/candidate/create";
  static listCandidate = "/admin/candidate/list";
  static updateStatus = "/admin/candidate/update";

  // employee api
  static listEmployee = "/admin/employee/list";
  static employeeDetails = "/admin/employee/details";
  static updateEmployee = "/admin/employee/update";

  // attendance api
  static updateAttendanceStatus = "/admin/attendance/update";

  // leave api
  static employeeDropdown = "/admin/employee/dropdown";
  static applyLeave = "/admin/leave/apply";
  static listLeaves = "/admin/leave/list";
  static updateLeaveStatus = "/admin/leave/update"
}

export default ConfigAPIURL;
