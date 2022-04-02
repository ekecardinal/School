import React, { useReducer, useContext } from 'react'
import reducer from './reducer'
import axios from 'axios'
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

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: user ? JSON.parse(user) : null,
  token: token,
  staffName: '',
  subject: '',
  date: '',
  level: '',
  salary: '',
  staffs: [],
  totalStaffs: 0,
  numOfPages: 1,
  page: 1,
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  //axios
  const authFetch = axios.create({
    baseURL: '/api/',
  })

  //request
  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common['Authorization'] = `Bearer ${state.token}`
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  //response
  authFetch.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (error.response.status === 401) {
        // logoutUser()
        console.log('AUTH ERROR')
      }
      return Promise.reject(error)
    }
  )

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT })
    clearAlert()
  }

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT })
    }, 3000)
  }

  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
  }

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN })
    try {
      const response = await axios.post('/api/auth/register', currentUser)
      // console.log(response)
      const { user, token } = response.data
      dispatch({ type: REGISTER_USER_SUCCESS, payload: { user, token } })
      addUserToLocalStorage({ user, token })
    } catch (error) {
      // console.log(error.response)
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.sesponse.data.msg },
      })
    }
  }

  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN })
    try {
      const { data } = await axios.post('/api/auth/login', currentUser)

      const { user, token } = data
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user, token },
      })
      addUserToLocalStorage({ user, token })
    } catch (error) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER })
    removeUserFromLocalStorage()
  }

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } })
  }

  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES })
  }

  const createStaff = async () => {
    dispatch({ type: CREATE_STAFF_BEGIN })
    try {
      const { staffName, subject, date, level, salary } = state
      await authFetch.post('/staff', {
        staffName,
        subject,
        date,
        level,
        salary,
      })
      dispatch({ type: CREATE_STAFF_SUCCESS })
      dispatch({ type: CLEAR_VALUES })
    } catch (error) {
      if (error.response.status === 401) return
      dispatch({
        type: CREATE_STAFF_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }

  const getStaffs = async () => {
    let url = `/staff`

    dispatch({ type: GET_STAFFS_BEGIN })
    try {
      const { data } = await authFetch(url)
      const { staffs, totalStaffs, numOfPages } = data
      dispatch({
        type: GET_STAFFS_SUCCESS,
        payload: {
          staffs,
          totalStaffs,
          numOfPages,
        },
      })
    } catch (error) {
      console.log(error.response)
      logoutUser()
    }
    clearAlert()
  }

  const setEditStaff = (id) => {
    dispatch({ type: SET_EDIT_STAFF, payload: { id } })
  }

  const editStaff = () => {
    console.log('edit job')
  }

  const deleteStaff = async (staffId) => {
    dispatch({ type: DELETE_STAFF })
    try {
      await authFetch.delete(`/staff/${staffId}`)
      getStaffs()
    } catch (error) {
      console.log(error.response)
    }
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        registerUser,
        loginUser,
        handleChange,
        createStaff,
        clearValues,
        getStaffs,
        logoutUser,
        setEditStaff,
        deleteStaff,
        editStaff,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
const useAppContext = () => {
  return useContext(AppContext)
}
export { AppProvider, initialState, useAppContext }
