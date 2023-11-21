import React, { useRef } from "react";
import { Fab, Stack, Tooltip } from "@mui/material";
import { Image, File } from "phosphor-react";

function ActionButtons({ openActionBtn,setMessageType,handleFileChange }) {
  const fileInputRef = useRef(null);

  const handleFileButtonClick = (fileType) => {
    // Trigger the file input click event only if the fileType matches
    if (fileType === 'image') {
      fileInputRef.current.accept = 'image/*';
      setMessageType('Img')
    } else if (fileType === 'document') {
      fileInputRef.current.accept = 'application/pdf, .doc, .docx'; // Adjust the accepted document file types
      setMessageType('Doc')
    }

    fileInputRef.current.click();
  };

  

  const Actions = [
    {
      color: "#4da5fe",
      icon: <Image size={24} />,
      y: 102,
      title: "Photo/Video",
      onClick: () => handleFileButtonClick('image'), // Pass 'image' as the fileType
    },
    {
      color: "#0159b2",
      icon: <File size={24} />,
      y: 172,
      title: "Document",
      onClick: () => handleFileButtonClick('document'), // Pass 'document' as the fileType
    },
  ];

  return (
    <Stack sx={{ position: "relative" }} display={openActionBtn ? 'inline-block' : 'none'}>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {Actions.map((el) => (
        <Tooltip title={el.title} placement="right" key={el.title}>
          <Fab
            sx={{
              position: "absolute",
              top: -el.y,
              backgroundColor: el.color,
            }}
            onClick={el.onClick} // Attach the onClick handler
          >
            {el.icon}
          </Fab>
        </Tooltip>
      ))}
    </Stack>
  );
}

export default ActionButtons;