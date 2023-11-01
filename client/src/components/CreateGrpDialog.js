import React from "react";
import {
  Dialog,

  DialogContent,
  
  Button,

  Slide,
  Stack,
  IconButton,
  Typography,
  Box,
  TextField,
  Avatar,
  Tooltip,
} from "@mui/material";
import {  PlusCircle, XCircle } from "phosphor-react";
import { faker } from "@faker-js/faker";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function CreateGrpDialog({ open, handleClose }) {
  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        
      >
        <DialogContent sx={{backgroundColor:'background.default' }}>
          <Box sx={{ width: "100%"  }}>
            <Stack spacing={3} p={3} width={"100%"}>
              <Stack
                alignItems={"center"}
                justifyContent={"space-between"}
                spacing={2}
                direction={"row"}
              >
                <Typography variant="h6">Create New Group</Typography>
                <IconButton onClick={() => handleClose()}>
                  <XCircle />
                </IconButton>
              </Stack>
              <form>
                <Stack spacing={2} width={"100%"}>
                  <TextField label="Group Name" name="grpName" />
                  <Stack spacing={1}>
                    <Stack
                      direction={"row"}
                      justifyContent={"space-between"}
                      spacing={1}
                      alignItems={"center"}
                    >
                      <Typography variant="body1">Members</Typography>
                      <Tooltip title="Add Member" placement="left">
                      <IconButton>
                        <PlusCircle/>
                      </IconButton>
                      </Tooltip>
                    </Stack>
                    <Stack
                      direction={"row"}
                      alignItems={"center"}
                      spacing={2}
                      sx={{ overflowX: "scroll" }}
                      p={2}
                    >
                      {[1, 2, 3].map((el, i) => {
                        return (
                          <Stack
                            direction={"row"}
                            spacing={2}
                            key={i}
                            alignItems={"center"}
                          >
                            <Stack
                              spacing={1}
                              direction={"row"}
                              alignItems={"center"}
                            >
                              <Avatar
                                src={faker.image.avatar()}
                                alt={faker.name.fullName()}
                              />
                              <Typography variant="caption">
                                {faker.name.firstName()}
                              </Typography>
                            </Stack>
                            <IconButton>
                              <XCircle size={15} />
                            </IconButton>
                          </Stack>
                        );
                      })}
                    </Stack>
                  </Stack>
                  <Stack direction={'row'} justifyContent={'end'}>
                    <Button variant="contained" type="submit" size="xlarge">
                      Create
                    </Button>
                  </Stack>
                </Stack>
              </form>
            </Stack>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CreateGrpDialog;
