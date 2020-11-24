import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


export const getContactCoordinates = createAsyncThunk( "contacts/getContactCoordinates", (contact) =>{
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${contact[1]}&key=AIzaSyCS3U4Rmj5fzxOZz-F0zlmhbdv1pMkUtJ8`)
        .then(res => ([contact[0], res.data.results[0].geometry.location])
        )
        .catch(err => console.log(err))
})

