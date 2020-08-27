import {CREATE_ENTRY,
        DELETE_ENTRY,
        EDIT_ENTRY,
        VIEW_ENTRY} from '../actions/types';


const initialState = {

    entries: []
    
}

export const entryReducer = (state = initialState, action ) => {
    
    let updatedEntries = [];
    switch(action.type) {
        case CREATE_ENTRY: 
            return {...state,
            entries: state.entries.concat(action.data)
            }
        
        case EDIT_ENTRY: 
            updatedEntries = state.entries.map( (entry,index)=>{
                if(index === action.key) {
                    return action.data;
                }else{
                    return entry;
                }
            });
        
            return {...state,
            entries: updatedEntries
            }

        case DELETE_ENTRY: 
            updatedEntries = state.entries.filter( (entry,index)=>{
                if(index !== action.key) {
                    return entry;
                }
            });
            return {...state,
            entries: updatedEntries
            }


        default:
            return state;
    }
}