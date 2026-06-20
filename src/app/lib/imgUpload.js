export const imgUpload = async (image) => {
    const formData = new FormData();
    formData.append('image', image);
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`, {
        method: 'POST',
        body: formData
    });

    if (!response.ok) {
        throw new Error('Failed to upload image to ImgBB');
    }

    const data = await response.json();
    if (!data.success) {
        throw new Error(data.error?.message || 'Image upload failed');
    }
    
    return data.data;
}