import React, { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  IconButton,
  useTheme,
  Badge,
  Avatar,
  TextField,
  FormHelperText,
  Button,
  Dialog,
  DialogContent,
} from "@mui/material";
import { Camera, CaretLeft } from "phosphor-react";
import { faker } from "@faker-js/faker";
import { useDispatch, useSelector } from "react-redux";
import Axios from 'axios'
import { openSnackBar } from "../redux/slices/app";

const ImageDialog = ({ open, handleClose,handleFileChange }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <Box width={320}>
        <Stack spacing={2} p={2}>
        <Typography variant="body1">Select Profile pic</Typography>
          <Stack alignItems={"center"}>
            <TextField
              label="Upload image"
              type="file"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                inputProps: {
                  accept: "image/jpeg, image/png",
                },
              }}
              name="profilePic"
              required
              onChange={handleFileChange}
            />
            <FormHelperText>The image size should be within 20kb</FormHelperText>
          </Stack>
          <Stack direction={'row'} alignItems={'center'}>
              <Button variant="outlined" onClick={handleClose}>Close</Button>
          </Stack>
        </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

function Profile() {
  const {uid,token, loggedInUser} = useSelector((state)=>state.auth)
  const dispatch = useDispatch()
  const [Profiledata, setProfiledata] = useState({
    about: loggedInUser?.about,
    name: loggedInUser?.name,
    profilePic: loggedInUser?.avatar,
  });

  const [Open, setOpen] = useState(false);

  const makeImageUrl = (avatar) => {
    const uint8Array = new Uint8Array(avatar);
    const base64String = btoa(String.fromCharCode.apply(null, uint8Array));
    const dataUrl = `data:image/png;base64,${base64String}`;
    return dataUrl;
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    setProfiledata({
      ...Profiledata,
      [e.target.name]: e.target.value,
    });
  };

  

  const handleFileChange = (e) => {
    setProfiledata({
      ...Profiledata,
      profilePic: e.target.files[0],
    });
  };

  const handleSubmit = (e)=>{
    e.preventDefault()
    console.log(Profiledata);
    const formData = new FormData()

    formData.append("about",Profiledata.about)
    formData.append("name",Profiledata.name)
    formData.append("profilePic",Profiledata.profilePic)
    formData.append("uid",uid)
    Axios.post('http://localhost:5000/user/updateProfile',
      formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization : token
      },
    }).then((res)=>{
      console.log(res);
      dispatch(openSnackBar({severity:"success",message:res.data.msg}))
    }).catch((err)=>{
      console.log(err);
      dispatch(openSnackBar({severity:"error",message:err.response.data.msg}))
    })

  }
  const theme = useTheme();
  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25);",
        position: "relative",
      }}
      width={{ sm: 320, xs: "100%" }}
      height={"100vh"}
    >
      <Stack sx={{ maxHeight: "100vh" }} spacing={3}>
        <Box
          sx={{
            boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25);",
            width: { sm: 320, xs: "100%" },
            backgroundColor:
              theme.palette.mode === "light"
                ? " #F8FAFF"
                : theme.palette.background.paper,
          }}
        >
          <Stack
            sx={{ height: "100%", p: 2 }}
            direction={"row"}
            alignItems={"center"}
            spacing={2}
          >
            <IconButton>
              <CaretLeft />
            </IconButton>
            <Typography variant="h6">Profile</Typography>
          </Stack>
        </Box>
        <Stack alignItems={"center"} spacing={2}>
          <Badge
            onClick={()=> setOpen(true)}
            badgeContent={<Camera size={32} />}
            overlap="circular"
            component={IconButton}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor: "primary.main",
                color: "white",
                width: 50,
                height: 50,
                borderRadius: "50%",
              },
            }}
          >
            <Avatar
              sx={{ width: 121, height: 121 }}
              src={makeImageUrl(Profiledata?.profilePic?.data)}
              alt={Profiledata?.name}
            />
          </Badge>
          <Typography variant="subtitle1">{Profiledata?.name}</Typography>
        </Stack>
        <Stack spacing={3} sx={{ overflowY: "scroll", flexGrow: 1 }}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2} p={2}>
              <TextField
                label="Name"
                name="name"
                value={Profiledata?.name}
                onChange={handleInputChange}
              />
              <FormHelperText>
                This name is visible to your contacts
              </FormHelperText>
              <TextField
                label="About"
                name="about"
                value={Profiledata?.about}
                onChange={handleInputChange}
              />
              <Stack direction={"row"} justifyContent={"end"}>
                <Button variant="outlined" type="submit" size="large">
                  Save
                </Button>
              </Stack>
            </Stack>
          </form>
        </Stack>
        {Open && <ImageDialog open={Open} handleClose={handleClose} handleFileChange={handleFileChange}/>}
      </Stack>
    </Box>
  );
}

export default Profile;
