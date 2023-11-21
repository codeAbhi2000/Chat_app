import {
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { DotsThreeVertical, DownloadSimple, File} from "phosphor-react";
import React from "react";
import { Message_options } from "../assets/data";

function Docmsg({ el, menu }) {
  const handleDownload = () => {
    const documentUrl = el.docUrl;
    console.log(documentUrl);
    const anchor = document.createElement("a");

    anchor.href = documentUrl;

    anchor.download = `${el.docUrl.split("/").pop()}`;

    document.body.appendChild(anchor);

    anchor.click();

    document.body.removeChild(anchor);
  };
  return (
    <Stack direction={"row"} justifyContent={el.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: el.incoming ? "background.paper" : "primary.main",
          borderRadius: 1.5,
          width: "max-conten",
        }}
      >
        <Stack spacing={2}>
          <Stack
            p={2}
            spacing={3}
            alignItems={"center"}
            direction={"row"}
            sx={{ backgroundColor: "background.default", borderRadius: 1 }}
          >
            <File size={48} />
            <Typography variant="caption">
              {el.docUrl.split("/").pop()}
            </Typography>
            <IconButton onClick={handleDownload}>
              <DownloadSimple />
            </IconButton>
          </Stack>
          
        </Stack>
      </Box>
      {menu && <MessageOptions />}
    </Stack>
  );
}

function LinkMsg({ el, menu }) {
  return (
    <Stack direction={"row"} justifyContent={el.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: el.incoming ? "background.paper" : "primary.main",
          borderRadius: 1.5,
          width: "max-conten",
        }}
      >
        <Stack spacing={2}>
          <Stack
            p={2}
            spacing={3}
            alignItems={"start"}
            sx={{ backgroundColor: "background.paper", borderRadius: 1 }}
          >
            <iframe
              src={el.message}
              alt={el.message}
              style={{ borderRadius: "10px", maxHeight: 210 }}
              title="linkPreview"
            />

            <Typography variant="body2" color={el.incoming ? "text" : "white"}>
              <a href={el.message} target="_blank" rel="noreferrer">
                click
              </a>
            </Typography>
          </Stack>
        </Stack>
      </Box>
      {menu && <MessageOptions />}
    </Stack>
  );
}

function ReplyMsg({ el, menu }) {
  return (
    <Stack direction={"row"} justifyContent={el.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: el.incoming ? "background.paper" : "primary.main",
          borderRadius: 1.5,
          width: "max-conten",
        }}
      >
        <Stack spacing={2}>
          <Stack
            alignItems={"center"}
            spacing={3}
            p={2}
            sx={{ backgroundColor: "background.paper", borderRadius: 1.5 }}
          >
            <Typography variant="body2" color={"text"}>
              {el.message}
            </Typography>
          </Stack>
          <Typography variant="body2" color={el.incoming ? "text" : "white"}>
            {el.reply}
          </Typography>
        </Stack>
      </Box>
      {menu && <MessageOptions />}
    </Stack>
  );
}

function GroupMsg({ el, menu }) {
  return (
    <Stack direction={"row"} justifyContent={el.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: el.incoming ? "background.paper" : "primary.main",
          borderRadius: 1.5,
          width: "max-conten",
        }}
      >
        <Stack spacing={2}>
          <Stack
            alignItems={"center"}
            spacing={3}
            p={2}
            sx={{
              backgroundColor: "background.paper",
              borderRadius: 1.5,
              borderLeft: "2px solid primary.main",
            }}
          >
            <Typography variant="body2" color={"text"}>
              {el.sender_name}
            </Typography>
          </Stack>
          <Typography variant="body2" color={el.incoming ? "text" : "white"}>
            {el.message}
          </Typography>
        </Stack>
      </Box>
      {menu && <MessageOptions />}
    </Stack>
  );
}
function GroupLinkMsg({ el, menu }) {
  return (
    <Stack direction={"row"} justifyContent={el.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: el.incoming ? "background.paper" : "primary.main",
          borderRadius: 1.5,
          width: "max-conten",
        }}
      >
        <Stack spacing={2}>
          <Stack
            alignItems={"center"}
            spacing={3}
            p={2}
            sx={{
              backgroundColor: "background.paper",
              borderRadius: 1.5,
              borderLeft: "2px solid primary.main",
            }}
          >
            <Typography variant="body2" color={"text"}>
              {el.sender_name}
            </Typography>
          </Stack>
          <Stack
            p={2}
            spacing={3}
            alignItems={"start"}
            sx={{ backgroundColor: "background.paper", borderRadius: 1 }}
          >
            <iframe
              src={el.message}
              alt={el.message}
              style={{ borderRadius: "10px", maxHeight: 210 }}
              title="LinkpReview"
            />

            <Typography variant="body2" color={el.incoming ? "text" : "white"}>
              <a href={el.message} target="_blank" rel="noreferrer">
                click
              </a>
            </Typography>
          </Stack>
        </Stack>
      </Box>
      {menu && <MessageOptions />}
    </Stack>
  );
}
function GroupImgMsg({ el, menu }) {
  return (
    <Stack direction={"row"} justifyContent={el.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: el.incoming ? "background.paper" : "primary.main",
          borderRadius: 1.5,
          width: "max-conten",
        }}
      >
        <Stack spacing={2}>
          <Stack
            alignItems={"center"}
            spacing={3}
            p={2}
            sx={{
              backgroundColor: "background.paper",
              borderRadius: 1.5,
              borderLeft: "2px solid primary.main",
            }}
          >
            <Typography variant="body2" color={"text"}>
              {el.sender_name}
            </Typography>
          </Stack>
          <Stack spacing={1}>
            <img
              src={el.imgUrl}
              alt={el.message}
              style={{ maxHeight: 100, borderRadius: "10px" }}
            />
          </Stack>
        </Stack>
      </Box>
      {menu && <MessageOptions />}
    </Stack>
  );
}
function GroupDocMsg({ el, menu }) {
  const handleDownload = () => {
    const documentUrl = el.docUrl;
    console.log(documentUrl);
    const anchor = document.createElement("a");

    anchor.href = documentUrl;

    anchor.download = `${el.docUrl.split("/").pop()}`;

    document.body.appendChild(anchor);

    anchor.click();

    document.body.removeChild(anchor);
  };
  return (
    <Stack direction={"row"} justifyContent={el.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: el.incoming ? "background.paper" : "primary.main",
          borderRadius: 1.5,
          width: "max-conten",
        }}
      >
        <Stack spacing={2}>
          <Stack
            alignItems={"center"}
            spacing={3}
            p={2}
            sx={{
              backgroundColor: "background.paper",
              borderRadius: 1.5,
              borderLeft: "2px solid primary.main",
            }}
          >
            <Typography variant="body2" color={"text"}>
              {el.sender_name}
            </Typography>
          </Stack>
          <Stack
            p={2}
            spacing={3}
            alignItems={"center"}
            direction={"row"}
            sx={{ backgroundColor: "background.default", borderRadius: 1 }}
          >
            <File size={48} />
            <Typography variant="caption">
              {el.docUrl.split("/").pop()}
            </Typography>
            <IconButton onClick={handleDownload}>
              <DownloadSimple />
            </IconButton>
          </Stack>
        </Stack>
      </Box>
      {menu && <MessageOptions />}
    </Stack>
  );
}

function MediaMsg({ el, menu }) {
  return (
    <Stack direction={"row"} justifyContent={el.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: el.incoming ? "background.paper" : "primary.main",
          borderRadius: 1.5,
          width: "max-conten",
        }}
      >
        <Stack spacing={1}>
          <img
            src={el.imgUrl}
            alt={el.message}
            style={{ maxHeight: 100, borderRadius: "10px" }}
          />
        </Stack>
      </Box>
      {menu && <MessageOptions />}
    </Stack>
  );
}

function TextMsg({ el, menu }) {
  return (
    <Stack direction={"row"} justifyContent={el.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: el.incoming ? "background.paper" : "primary.main",
          borderRadius: 1.5,
          width: "max-conten",
        }}
      >
        <Typography variant="body2" color={el.incoming ? "text" : "white"}>
          {el.message}
        </Typography>
      </Box>
      {menu && <MessageOptions />}
    </Stack>
  );
}

function Timeline({ el }) {
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Divider sx={{ width: "46%" }} />
      <Typography variant="caption" sx={{ color: "text" }}>
        {el.text}
      </Typography>
      <Divider sx={{ width: "46%" }} />
    </Stack>
  );
}

const MessageOptions = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <DotsThreeVertical
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        size={20}
      />
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Stack spacing={1} px={1}>
          {Message_options?.map((el) => {
            return (
              <MenuItem onClick={handleClose} key={el.title}>
                {el.title}
              </MenuItem>
            );
          })}
        </Stack>
      </Menu>
    </>
  );
};

export { Timeline, TextMsg, MediaMsg, ReplyMsg, LinkMsg, Docmsg, GroupMsg ,GroupLinkMsg,GroupImgMsg,GroupDocMsg};
