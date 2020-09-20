import {
  CREATE_ENTRY_REQUEST,
  CREATE_ENTTRY_SUCCESS,
  CREATE_ENTTRY_FAILURE,
  VIEW_ENTRIES_REQUEST,
  VIEW_ENTRIES_SUCCESS,
  VIEW_ENTRIES_FAILURE,
  DELETE_ENTRY_REQUEST,
  DELETE_ENTRY_SUCCESS,
  DELETE_ENTRY_FAILURE,
  EDIT_ENTRY_REQUEST,
  EDIT_ENTRY_SUCCESS,
  EDIT_ENTRY_FAILURE,
} from '../actions/types';

import AsyncStorage from '@react-native-community/async-storage';

const initialState = {
  entries: [],
  loading: false,
  error: '',
};

export const entryReducer = (state = initialState, action) => {
  let updatedEntries = [];
  switch (action.type) {
    case CREATE_ENTRY_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_ENTTRY_SUCCESS:
      return {
        ...state,
        entries: state.entries.concat(action.data),
        loading: false,
      };

    case CREATE_ENTTRY_FAILURE:
      return {
        ...state,
        entries: [],
        loading: false,
        error: 'Error in creating',
      };

    case VIEW_ENTRIES_REQUEST:
      return {...state, loading: true};

    case VIEW_ENTRIES_SUCCESS:
      return {...state, entries: action.data, loading: false};

    case VIEW_ENTRIES_FAILURE:
      return {
        ...state,
        entries: [],
        error: 'Error in creating',
        loading: false,
      };

    case EDIT_ENTRY_REQUEST:
      return {...state, loading: true};

    case EDIT_ENTRY_SUCCESS:
      return {...state, loading: false};

    case EDIT_ENTRY_FAILURE:
      return {...state, loading: false};

    case DELETE_ENTRY_REQUEST:
      return {...state, loading: true};

    case DELETE_ENTRY_SUCCESS:
      return {...state, loading: false};

    case DELETE_ENTRY_FAILURE:
      return {...state, loading: false};

    default:
      return state;
  }
};
