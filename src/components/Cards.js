import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import axios from 'axios';
import {addCoordinates} from '../redux/actions/usersActions'
import {getContactCoordinates} from '../redux/appThunk'
import {SingleCard} from "./SingleCard";
import {Grid, IconButton} from "@material-ui/core";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Box from '@material-ui/core/Box';


export function Cards() {
    const contacts = useSelector(store => store.contacts);
    const [newCont, setNewCont] = useState(false)
    const dispatch = useDispatch();

    const cardComponent = (contacts.contacts.length) ? contacts.contacts.map(contact => {
        return (<SingleCard key={contact.id} contact={contact}/>)
    }) : null;

    useEffect(() => {
        contacts.contacts.forEach(contact => {
            if (!contact.coordinates) {
                // dispatch(getContactCoordinates([contact.id, contact.name]))

                axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${contact.address}&key=AIzaSyCS3U4Rmj5fzxOZz-F0zlmhbdv1pMkUtJ8`)
                    .then(res =>
                        dispatch(addCoordinates([contact.id, res.data.results[0].geometry.location]))
                    )
                    .catch(err => console.log(err))
            }
        })
    }, [contacts])

    const handleAddClick = () => {
        setNewCont(true);
    }

    const newContactEl = (newCont) ? (
        <SingleCard contact={{
            'name': '',
            'address': '',
            'position': 'Graphics designer',
            'company': '',
            'company_address': '',
            'phone': '',
            'img': '/img/john-smith.jpg',
            'edit': true,
            'coordinates': false,
            'id': Math.floor(Math.random() * 1000),
        }}
                    setNewCont={setNewCont}/>
    ) : (
        <Box height={240} width={500}>
            <Grid container
                  wrap='wrap'
                  direction="row"
                  justify="center"
                  alignItems="center">
                <Grid item>
                    <IconButton onClick={handleAddClick}>
                        <AddCircleOutlineIcon/>
                    </IconButton>
                </Grid>
            </Grid>

        </Box>
    )


    return (
        <Grid container spacing={2} wrap="wrap" direction="row"
              justify="flex-start"
              alignItems="flex-start">
            {cardComponent}
            <Grid item>
                <Grid container justify="center"
                      alignItems="center">
                    <Grid item>
                        {newContactEl}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}