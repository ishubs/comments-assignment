import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

export default function MenuPopupState({ variants }) {
    return (
        <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
                <>
                    <Button variant="contained" {...bindTrigger(popupState)}>

                    </Button>
                    <Menu {...bindMenu(popupState)}>
                        {variants.map((item, index) => <MenuItem onClick={popupState.close}>item</MenuItem>)}
                    </Menu>
                </>
            )}
        </PopupState>
    );
}