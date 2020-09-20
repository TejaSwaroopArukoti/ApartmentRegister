import {
  CREATE_ENTRY_REQUEST,
  CREATE_ENTTRY_FAILURE,
  CREATE_ENTTRY_SUCCESS,
  DELETE_ENTRY_REQUEST,
  DELETE_ENTRY_FAILURE,
  DELETE_ENTRY_SUCCESS,
  EDIT_ENTRY_REQUEST,
  EDIT_ENTRY_SUCCESS,
  EDIT_ENTRY_FAILURE,
  VIEW_ENTRY_REQUEST,
  VIEW_ENTRY_SUCCESS,
  VIEW_ENTRY_FAILURE,
  VIEW_ENTRIES_FAILURE,
  VIEW_ENTRIES_REQUEST,
  VIEW_ENTRIES_SUCCESS,
} from './types';

import shortid from 'shortid';

import AsyncStorage from '@react-native-community/async-storage';

export const createEntryRequest = () => ({
  type: CREATE_ENTRY_REQUEST,
});

export const createEntrySuccess = (entry) => ({
  type: CREATE_ENTTRY_SUCCESS,
  data: entry,
});

export const createEntryFailure = (error) => ({
  type: CREATE_ENTTRY_FAILURE,
  error: error,
});

export const viewEntriesRequest = () => ({
  type: VIEW_ENTRIES_REQUEST,
});

export const viewEntriesSuccess = (entries) => ({
  type: VIEW_ENTRIES_SUCCESS,
  data: entries,
});

export const viewEntriesFailure = (error) => ({
  type: VIEW_ENTRIES_FAILURE,
  error: error,
});

export const editEntryRequest = () => ({
  type: EDIT_ENTRY_REQUEST,
});

export const editEntrySuccess = () => ({
  type: EDIT_ENTRY_SUCCESS,
});

export const editEntryFailure = (error) => ({
  type: EDIT_ENTRY_FAILURE,
  error: error,
});

export const deleteEntryReqest = () => ({
  type: DELETE_ENTRY_REQUEST,
});

export const deleteEntrySuccess = () => ({
  type: DELETE_ENTRY_SUCCESS,
});

export const deleteEntryFailure = (error) => ({
  type: DELETE_ENTRY_FAILURE,
  error: error,
});

export const createEntry = (entry) => {
  return async (dispatch) => {
    dispatch(createEntryRequest());
    try {
      let generatedId = shortid.generate();
      const entryWithID = {id: generatedId, ...entry};
      const jsonValue = JSON.stringify(entryWithID);
      await AsyncStorage.setItem(generatedId, jsonValue);
      dispatch(createEntrySuccess(entryWithID));
    } catch (e) {
      dispatch(createEntryFailure(e.message));
    }
  };
};

export const editEntry = (entry) => {
  return async (dispatch) => {
    dispatch(editEntryRequest());
    try {
      let generatedId = entry.id;
      await AsyncStorage.mergeItem(generatedId, JSON.stringify(entry));
      dispatch(editEntrySuccess());
    } catch (e) {
      dispatch(editEntryFailure(e.message));
    }
  };
};

export const viewEntries = () => {
  return async (dispatch) => {
    dispatch(viewEntriesRequest());
    let keys = [];
    let entries = [];
    try {
      keys = await AsyncStorage.getAllKeys();

      if (keys.length) {
        keys.forEach(async (key, index) => {
          let entry = await AsyncStorage.getItem(key);

          let entryObj = JSON.parse(entry);

          entries.push(entryObj);
          if (index === keys.length - 1) {
            dispatch(viewEntriesSuccess(entries));
          }
        });
      } else {
        dispatch(viewEntriesSuccess([]));
      }
    } catch (e) {
      dispatch(viewEntriesFailure(e.message));
    }
  };
};

export const deleteEntry = (key) => {
  return async (dispatch) => {
    dispatch(deleteEntryReqest());

    try {
      await AsyncStorage.removeItem(key);
      dispatch(deleteEntrySuccess());
    } catch (e) {
      dispatch(deleteEntryFailure(e.message));
    }
  };
};
