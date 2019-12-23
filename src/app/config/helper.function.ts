import { INTERNAL_RESPONSE_STATUS } from "../services";

export function handleResponse(response, toastr) {
  if (response.status === INTERNAL_RESPONSE_STATUS.SUCCESS) {
    response.success_message ? toastr.success(response.success_message) : "";
  } else {
    response.code != 401 && toastr.error(response.error_message, "ERROR");
  }
}
