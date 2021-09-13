import Swal from "sweetalert2";

export const fileUpload = async (file) => {
  const cloudUrl = `https://api.cloudinary.com/v1_1/dmqdeq1tw/upload`;

  const formData = new FormData();
  formData.append("upload_preset", "reactjournal");
  formData.append("file", file);

  try {
    const res = await fetch(cloudUrl, {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      const cloudRes = await res.json();
      return cloudRes.secure_url;
    } else {
      throw await res.json();
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error,
    });
  }
};
