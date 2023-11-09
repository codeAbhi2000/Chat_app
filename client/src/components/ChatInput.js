import React, { useState } from "react";
import { LinkSimple, Smiley } from "phosphor-react";
import styled from "@emotion/styled";
import { IconButton, TextField, Stack, InputAdornment } from "@mui/material";
import ActionButtons from "./ActionButtons";

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderWidth: 1, // Add a fixed border
      borderColor: "transparent", // Set a transparent border color by default
    },
    "&:hover fieldset": {
      borderColor: "transparent", // Remove the border on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "transparent", // Remove the border on focus
    },
  },
  "& .MuiInputLabel-root": {
    "&.Mui-focused": {
      color: "inherit", // Use the default label color on focus
    },
  },
}));

const ChatInput = ({ setopenPicker, setValue, value, inputRef }) => {
  const [openActionBtn, setopenActionBtn] = useState(false);
  return (
    <StyledTextField
    inputRef={inputRef}
    value={value}
    onChange={(event) => {
      setValue(event.target.value);
    }}
      fullWidth
      placeholder="Write a message..."
      InputProps={{
        startAdornment: (
          <Stack sx={{ width: "max-conten" }}>
            <ActionButtons openActionBtn={openActionBtn} />
            <InputAdornment>
              <IconButton
                onClick={() => {
                  setopenActionBtn((prev) => !prev);
                }}
              >
                <LinkSimple />
              </IconButton>
            </InputAdornment>
          </Stack>
        ),
        endAdornment: (
          <InputAdornment>
            <IconButton
              onClick={() => {
                setopenPicker((prev) => !prev);
              }}
            >
              <Smiley />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default ChatInput;
