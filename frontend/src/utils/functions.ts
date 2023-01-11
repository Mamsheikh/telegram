export const uploadImage = async (
  file: File
): Promise<{ secure_url: string }> => {
  const formData = new FormData();
  formData.append('file', file);

  formData.append('upload_preset', 'prismagram');
  formData.append('cloud_name', 'mamsheikh');

  const res = await fetch(`https://api.cloudinary.com/v1_1/mamsheikh/upload`, {
    method: 'POST',
    body: formData,
  });

  const data = await res.json();

  return { secure_url: data.secure_url };
};
