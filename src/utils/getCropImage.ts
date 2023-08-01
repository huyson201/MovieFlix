import { Area } from "react-easy-crop";
const getCropImage = (imgSrc: string, crop: Area): Promise<Blob> => {
  const image = document.createElement("img");
  image.src = imgSrc;
  const canvas = document.createElement("canvas");
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx = canvas.getContext("2d");

  ctx?.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) return reject("blob null");
      return resolve(blob);
    }, "image/jpeg");
  });
};

export default getCropImage;
