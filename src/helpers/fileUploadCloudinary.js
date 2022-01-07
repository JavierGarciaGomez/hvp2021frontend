export const fileUploadCloudinary = async (file) => {
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
      return cloudResp.secure_url;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};
