import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
} from './action'

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
}
