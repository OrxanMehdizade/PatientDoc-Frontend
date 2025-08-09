import { Button } from "@mui/material";
import React from "react";
import { toast } from "react-toastify";

const UploadFile = ({ setImageUrl, content, className = "" }) => {
  const preset_key = "rha7kdn4";
  const cloud_name = "datbocndc";

  const handleFile = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset_key);
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    console.log(response);
    if (response.ok) {
      const data = await response.json();
      const imageURL = data.secure_url;
      setImageUrl(imageURL);
      console.log(imageURL);
    } else {
      toast.error(response.statusText);
    }
  };

  return (
    <Button
      variant="contained"
      component="label"
      className={`${className} app-theme-color`}
    >
      {content}
      <input type="file" hidden onChange={handleFile} />
    </Button>
  );
};

export default UploadFile;
