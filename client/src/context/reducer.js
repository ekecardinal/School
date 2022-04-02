import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_STAFF_BEGIN,
  CREATE_STAFF_SUCCESS,
  CREATE_STAFF_ERROR,
  GET_STAFFS_BEGIN,
  GET_STAFFS_SUCCESS,
  SET_EDIT_STAFF,
  DELETE_STAFF,
} from './action'

import { initialState } from './appContext'

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: 'error',
      alertText: 'Please provide all values!',
    }
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: '',
      alertText: '',
    }
  }
  if (action.type === REGISTER_USER_BEGIN) {
    return { ...state, isLoading: true }
  }
  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      showAlert: true,
      alertType: 'success',
      alertText: 'User Created! Redirecting...',
    }
  }
  if (action.type === REGISTER_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'error',
      alertText: action.payload.msg,
    }
  }

  if (action.type === LOGIN_USER_BEGIN) {
    return { ...state, isLoading: true }
  }
  if (action.type === LOGIN_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      showAlert: true,
      alertType: 'success',
      alertText: 'Login Successful! Redirecting...',
    }
  }
  if (action.type === LOGIN_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'error',
      alertText: action.payload.msg,
    }
  }

  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null,
      propertyLocation: '',
      userLocation: '',
    }
  }

  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      [action.payload.name]: action.payload.value,
    }
  }

  if (action.type === CLEAR_VALUES) {
    const initialState = {
      isEditing: false,
      staffName: '',
      subject: '',
      date: '',
      level: '',
      salary: '',
    }
    return {
      ...state,
      ...initialState,
    }
  }

  if (action.type === CREATE_STAFF_BEGIN) {
    return { ...state, Loading: true }
  }
  if (action.type === CREATE_STAFF_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'New Staff Created!',
    }
  }
  if (action.type === CREATE_STAFF_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'error',
      alertText: action.payload.msg,
    }
  }

  if (action.type === GET_STAFFS_BEGIN) {
    return { ...state, isLoading: true, showAlert: false }
  }
  if (action.type === GET_STAFFS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      staffs: action.payload.staffs,
      totalStaffs: action.payload.totalStaffs,
      numOfPages: action.payload.numOfPages,
    }
  }

  if (action.type === SET_EDIT_STAFF) {
    const staff = state.staffs.find((staff) => staff._id === action.payload.id)
    const { _id, staffName, subject, date, level, salary } = staff
    return {
      ...state,
      isEditing: true,
      editStaffId: _id,
      staffName,
      subject,
      date,
      level,
      salary,
    }
  }

  if (action.type === DELETE_STAFF) {
    return { ...state, isLoading: true }
  }

  throw new Error(`no such action:${action.type}`)
}
export default reducer
