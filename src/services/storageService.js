export async function uploadIncidentImage(file) {
  if (!file) return null;

  const cloudName = "YOUR_CLOUD_NAME";
  const uploadPreset = "YOUR_UPLOAD_PRESET";  // unsigned preset

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();
  return data.secure_url;  // the image URL
}
