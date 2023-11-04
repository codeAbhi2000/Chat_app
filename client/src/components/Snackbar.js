import React from "react";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

import { useDispatch, useSelector } from "react-redux";
import { closeSnackBar } from "../redux/slices/app";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function SnackbarAlert() {
  const dispatch = useDispatch();
  const { message,open,severity} = useSelector((store) => store.app.snackbar) ?? {};
  return (
    <>
      {message && open ? (
        <Snackbar
          open={open}
          autoHideDuration={4000}
          onClose={() => {
            dispatch(closeSnackBar());
          }}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={() => {
              dispatch(closeSnackBar());
            }}
            severity={severity}
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      ) : (
        <></>
      )}
    </>
  );
}

export default SnackbarAlert;
