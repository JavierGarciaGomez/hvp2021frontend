import Swal from "sweetalert2";
import { fileUploadCloudinary } from "./fileUploadCloudinary";

export const uploadImg = async (file) => {
  Swal.fire({
    title: "Uploading...",
    text: "Please wait...",
    allowOutsideClick: false,
    onBeforeOpen: () => {
      Swal.showLoading();
    },
  });

  // cloudinary
  const cloudUrl = "https://api.cloudinary.com/v1_1/dwalcv9li/upload";
  const formData = new FormData();
  formData.append("upload_preset", "react-course");
  formData.append("file", file);
  try {
    // cloudinary request
    const resp = await fetch(cloudUrl, {
      method: "POST",
      body: formData,
    });

    if (resp.ok) {
      // get the response
      const cloudResp = await resp.json();
      // return the url
      Swal.close();
      return cloudResp.secure_url;
    } else {
      Swal.close();
      return null;
    }
  } catch (error) {
    Swal.close();
    throw error;
  }
};
