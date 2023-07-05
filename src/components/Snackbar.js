import React from "react"
import { Snackbar } from "@mui/material"
import { Alert } from "@mui/material"

const CustomSnackbar = ({ message, open, handleClose, severity }) => {
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
            <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    )
}

export default CustomSnackbar