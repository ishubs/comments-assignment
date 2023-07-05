import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import { Button } from "@mui/material"
import PopupComponent from './components/ComponentsPopup';
import List from './components/ComponentsPopup'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

function App() {
  const [open, setOpen] = useState(false);
  const [variants, setVariants] = useState(['Shubham', 'Pavan', 'Nintendo', "Abdul"]);

  return (
    <div className="App">
      <Button variant='contained' onClick={() => setOpen(true)}>Comments</Button>
      <PopupComponent variants={variants} setVariants={setVariants} open={open} onClose={() => setOpen(false)} />
      {/* <Button className='user-list-btn'>User List</Button> */}
      {/* <List className='user-list-btn' /> */}
      <PopupState variant="popover" popupId="demo-popup-menu">
        {(popupState) => (
          <>
            <Button className='user-list-btn' variant="contained" {...bindTrigger(popupState)}>
              Dashboard
            </Button>
            <Menu {...bindMenu(popupState)}>
              {variants.map((item, index) => <MenuItem onClick={popupState.close}>{item}</MenuItem>)}

            </Menu>
          </>
        )}
      </PopupState>
    </div>
  );
}

export default App;
