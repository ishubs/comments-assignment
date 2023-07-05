import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { Button } from '@mui/material';
import { CheckCircleOutline, CloseOutlined } from '@mui/icons-material';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import CheckIcon from '@mui/icons-material/Check';
import { IconButton } from '@mui/material';
import Snackbar from './Snackbar'
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};




export default function MultipleSelectCheckmarks({ variantName, setVariantName, variants, setVariants }) {

    const [newUser, setNewUser] = React.useState('')
    const [addNewActive, setAddNewActive] = React.useState(false)
    const [snackbar, setSnackbar] = React.useState(false)
    const [snackbarmessage, setSnackbarmessage] = React.useState('')
    const [severity, setSeverity] = React.useState('success')
    const newUserInputRef = React.useRef(null)
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;

        console.log(value);

        const filterdValue = value.filter(
            (item) => variantName.findIndex((o) => o === item) >= 0
        );

        let duplicatesRemoved = value.filter((item, itemIndex) =>
            value.findIndex((o, oIndex) => o === item && oIndex !== itemIndex)
        );

        // console.log(duplicatesRemoved);

        // let map = {};

        // for (let list of value) {
        //   map[Object.values(list).join('')] = list;
        // }
        // console.log('Using Map', Object.values(map));

        let duplicateRemoved = [];

        value.forEach((item) => {
            if (duplicateRemoved.findIndex((o) => o === item) >= 0) {
                duplicateRemoved = duplicateRemoved.filter((x) => x === item);
            } else {
                duplicateRemoved.push(item);
            }
        });

        setVariantName(duplicateRemoved);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbar(false);
    };

    const addNewUser = () => {
        //check if user already exists
        // make the first letter of new user capital
        if (variants.findIndex(item => item == newUser) >= 0) {
            // alert("User already exists")
            setSnackbarmessage("User already exists")
            setSnackbar(true)
            setSeverity('error')
            return
        }
        else if (newUser == '') {
            // alert("Please enter a name")
            setSnackbarmessage("User already exists")
            setSnackbar(true)
            setSeverity('error')
            return
        }
        else {
            // setVariantName([...variantName, newUser])
            setVariants([...variants, capitalizeFirstLetter(newUser)])
            console.log(newUser)
            setSeverity('success')
            setSnackbarmessage("User added successfully")
            setSnackbar(true)
            setNewUser('')
            newUserInputRef.current.focus()
        }
    }

    return (
        <>
            <FormControl sx={{ mt: 1, mb: 1, width: '100%' }}>
                <InputLabel id="demo-multiple-checkbox-label">Tag to</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-select-small"
                    multiple
                    style={{ width: '100%' }}
                    value={variantName}
                    onChange={handleChange}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.map((x) => x).join(', ')}
                    MenuProps={MenuProps}
                >
                    {variants.sort().map((variant) => (
                        <MenuItem key={variant} value={variant}>
                            <Checkbox
                                checked={
                                    variantName.findIndex((item) => item == variant) >= 0
                                }
                            />
                            <ListItemText primary={variant} />
                        </MenuItem>
                    ))}
                    {!addNewActive ? <Button variant='contained' onClick={() => setAddNewActive(true)}>Add New</Button>
                        :
                        <>
                            <Input
                                ref={newUserInputRef}
                                value={newUser}
                                onClick={e => e.stopPropagation()}
                                onChange={e => { e.stopPropagation(); setNewUser(e.target.value) }}
                            />
                            <IconButton onClick={() => setAddNewActive(false)} color="primary" aria-label="add to shopping cart">
                                <CloseOutlined />

                            </IconButton>
                            <IconButton onClick={addNewUser} color="primary" aria-label="add to shopping cart">
                                <CheckIcon />
                            </IconButton>
                        </>
                    }

                </Select>
            </FormControl>
            <Snackbar open={snackbar} message={snackbarmessage} handleClose={handleClose} severity={severity} />
        </>
    );
}


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}