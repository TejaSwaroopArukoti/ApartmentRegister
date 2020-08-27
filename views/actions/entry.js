import {CREATE_ENTRY, DELETE_ENTRY, EDIT_ENTRY} from './types';

export const createEntry = ( entry ) => (
 {   
    type: CREATE_ENTRY,
    data: entry
 }
);

export const editEntry = ( entry, index ) => (
   {   
      type: EDIT_ENTRY,
      data: entry,
      key: index
   }
  );
  

export const deleteEntry = ( key ) => (
    {   
       type: DELETE_ENTRY,
       key: key
    }
   );