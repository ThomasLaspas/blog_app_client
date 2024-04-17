import axios from "axios";
const REACT_APP_CLOUDINARY_ID = "dwdqn8p5a";
export const server = axios.create({
  baseURL: "https://blog-appa-server.onrender.com/",
  responseType: "json",
});

export const handleFileUpload = async (uploadfile) => {
  const formData = new FormData();
  formData.append("file", uploadfile);
  formData.append("upload_preset", "socialmedia");
  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${REACT_APP_CLOUDINARY_ID}/image/upload/`,
      formData
    );
    return response.data.secure_url;
  } catch (err) {
    console.log(err.message);
  }
};
