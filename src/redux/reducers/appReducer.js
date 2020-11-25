import {createReducer} from "@reduxjs/toolkit";
import {getContactCoordinates} from "../appThunk";
import {deleteContact, editContact, saveChange, addContact, addCoordinates} from "../actions/usersActions";


const initialState = {
    contacts: [
        {
            'name': 'John Smith',
            'address': 'Riviera State',
            'position': 'Graphics designer',
            'company': 'Twitter, Inc.',
            'company_address': '795 Folsom Ave, Suite 600 San Francisco, CA 94107 ',
            'phone': '(123) 456-7890',
            'img': '/img/john-smith.jpg',
            'edit': false,
            'coordinates': false,
            'id': 1,
            'hasFetched': false,
            'isFetching': false,
        },
        {
            'name': 'Alex Johnatan',
            'address': 'Paris',
            'position': 'CEO',
            'company': 'Twitter, Inc.',
            'company_address': '795 Folsom Ave, Suite 600 San Francisco, CA 94107 ',
            'phone': '(123) 456-7890',
            'img': '/img/alex jonathan.jpg',
            'edit': false,
            'coordinates': false,
            'id': 2,
            'hasFetched': false,
            'isFetching': false,
        },
    ]
    ,
    isFetchingError: null
};

const appReducer = createReducer(initialState, {
    [getContactCoordinates.pending]: (state, action) => {
        state.contacts.forEach((contact, index) => {
                if (contact.id === action.payload.id) {
                    state.contacts[index].isFetching = true;
                }
            })
        return state;
    },
    [getContactCoordinates.rejected]: (state, action) => {
        state.isFetching = false;
        state.error = action.error.message;
        return state;
    },
    [getContactCoordinates.fulfilled]: (state, action) => {
        console.log(action.payload)
        state.contacts.forEach((contact, index) => {
            if (contact.id === action.payload.id) {
                state.contacts[index].isFetching = false;
                state.contacts[index].hasFetched = true;
                state.contacts[index].coordinates = action.payload;
            }
        })
        return state;
    },
    [deleteContact]: (state, action) => {
        state.contacts.forEach((contact, index) => {
            if (contact.id === action.payload) {
                state.contacts.splice(index, 1);
            }
        })
        return state;
    },
    [editContact]: (state, action) => {
        state.contacts.forEach((contact, index) => {
            if (contact.id === action.payload) {
                state.contacts[index].edit = true;
            }
        })
        return state;
    },
    [saveChange]: (state, action) => {
        state.contacts.forEach((contact, index) => {
            if (contact.id === action.payload.id) {
                state.contacts[index] = action.payload;
                state.contacts[index].edit = false;
            }
        })
        return state;
    },
    [addContact]: (state, action) => {
        let tempObj = action.payload;
        state.contacts.push(tempObj)
        return state;
    },
    [addCoordinates]: (state, action) => {
        state.contacts.forEach((contact, index) => {
            if (contact.id === action.payload[0]) {
                state.contacts[index].coordinates = action.payload[1];
            }
        })
        return state;
    },
    // [getContactCoordinates.pending]: (state, action) => {
    //     console.log('pending',action.payload)
    //     return state;
    // },
    // [getContactCoordinates.rejected]: (state, action) => {
    //     console.log(action.payload)
    //     return state;
    // },
    // [getContactCoordinates.fulfilled]: (state, action) => {
    //
    //     console.log('fulfilled',action.payload)
    //     state.contacts.forEach( (contact, index) => {
    //         if (contact.id === action.payload[0]) {
    //             state.contacts[index].coordinates = action.payload[1];
    //             state.contacts[index].isFetching = false;
    //             state.contacts[index].hasFetched = true;
    //         }
    //     })
    //     return state;
    // },
})

export default appReducer;