import React, {useState} from 'react';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {Grid, IconButton} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {useDispatch} from "react-redux";
import {addContact, deleteContact, editContact, saveChange} from "../redux/actions/usersActions";
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import Paper from '@material-ui/core/Paper';


export function SingleCard(props) {
    const dispatch = useDispatch();
    const [contact, setContact] = useState(props.contact)


    const handleClickChangeButton = () => {
        let tempObj = {...contact};
        tempObj.edit = true;
        setContact(tempObj);
        dispatch(editContact(contact.id))
    }

    const handleChange = (e) => {
        let temp = {...contact};
        temp[e.target.id] = e.target.value
        setContact(temp)
    }

    const handleSaveChange = () => {
        let regexp = RegExp(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)
        if (!regexp.test(contact.phone)) {
            alert('Phone number isnt correct');
            return;
        }

        let tempObj = {...contact}
        tempObj.edit = false;
        setContact(tempObj)
        if (props.setNewCont !== undefined) {
            props.setNewCont(false);
            delete tempObj.setNewCont;
            dispatch(addContact(tempObj));
        } else {
            dispatch(saveChange(tempObj))
        }
    }

    const handleDelete = () => {
       if (props.setNewCont !== undefined)
        {
            props.setNewCont(false);
        } else {
           dispatch(deleteContact(contact.id))
       }


    }

    const description = (contact.edit) ? (
        <Grid item xs={7}>
                <TextField id="name" value={contact.name} onChange={handleChange} placeholder='Name'/>
                <TextField id='address' value={contact.address} onChange={handleChange} placeholder='City'/>
                <TextField id='company' value={contact.company} onChange={handleChange} placeholder='Company Name'/>
                <TextField id='company_address' value={contact.company_address} onChange={handleChange}
                           placeholder='Company address'/>
                <TextField id='phone' value={contact.phone} onChange={handleChange} placeholder='Phone number'/>
                <IconButton onClick={handleSaveChange}>
                    <SaveIcon/>
                </IconButton>
        </Grid>
    ) : (
        <Grid item xs={7}>
            <Typography gutterBottom variant="h6" component="h2">
                {contact.name}
            </Typography>
            <Typography> {contact.address}</Typography>
            <Typography> {contact.company}</Typography>
            <Typography> {contact.company_address}</Typography>
            <Typography> {contact.phone}</Typography>
            <Typography> {'lat:' + props.contact.coordinates.lat + ' lng:' + props.contact.coordinates.lng}</Typography>
        </Grid>
    );

    return (
        <Grid item >
            <Paper>
                <Grid container
                      wrap="wrap"
                      direction="row"
                      justify="space-around"
                      alignItems="center"
                      alignContent="center"
                >

                    <Grid item xs={4}>
                        <Grid container
                              justify='center'
                              alignItems="flex-start"
                              direction="column">
                            <Grid item xs={11}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={contact.img}
                                    />
                                    <Typography gutterBottom >
                                        {contact.position}
                                    </Typography>
                                </CardActionArea>

                            </Grid>

                        </Grid>
                    </Grid>

                    {description}

                </Grid>
                <Grid container
                      justify='flex-end'>
                    <Grid item>
                        <IconButton onClick={handleClickChangeButton}>
                            <EditIcon/>
                        </IconButton>
                        <IconButton onClick={handleDelete}>
                            <DeleteIcon/>
                        </IconButton>
                    </Grid>
                </Grid>

            </Paper>
        </Grid>
    );
}