import React from "react";
import { Fab, Stack, Tooltip } from "@mui/material";
import { Image, Sticker, File } from "phosphor-react";

function ActionButtons({openActionBtn}) {
  const Actions = [
    {
      color: "#4da5fe",
      icon: <Image size={24} />,
      y: 102,
      title: "Photo/Video",
    },
    {
      color: "#1b8cfe",
      icon: <Sticker size={24} />,
      y: 172,
      title: "Stickers",
    },
    {
      color: "#0159b2",
      icon: <File size={24} />,
      y: 242,
      title: "Document",
    },
  ];
  return (
    <Stack sx={{ position: "relative" }} display={openActionBtn ? 'inline-block': 'none'}>
      {Actions.map((el) => {
        return (
          <Tooltip title={el.title} placement="right" key={el.title}>
            <Fab
              sx={{
                position: "absolute",
                top: -el.y,
                backgroundColor: el.color,
              }}
            >
              {el.icon}
            </Fab>
          </Tooltip>
        );
      })}
    </Stack>
  );
}

export default ActionButtons;
