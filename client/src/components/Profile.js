import React from "react";
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
} from "@mui/material";
import { Camera, CaretLeft } from "phosphor-react";
import { faker } from "@faker-js/faker";

function Profile() {
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
              src={faker.image.avatar()}
              alt={faker.name.firstName()}
            />
          </Badge>
          <Typography variant="subtitle1">{faker.name.fullName()}</Typography>
        </Stack>
        <Stack spacing={3} sx={{ overflowY: "scroll", flexGrow: 1 }}>
          <form>
            <Stack spacing={2} p={2}>
              <TextField label="Name" name="name" />
              <FormHelperText>
                This name is visible to your contacts
              </FormHelperText>
              <TextField label="About" name="about" />
                <Stack direction={'row'} justifyContent={'end'}>

              <Button variant="outlined" type="submit" size="large">
                Save
              </Button>
                </Stack>
            </Stack>
          </form>
        </Stack>
      </Stack>
    </Box>
  );
}

export default Profile;
