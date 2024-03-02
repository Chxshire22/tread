/**
 * This function optimizes an image by resizing it to a specified width while maintaining the aspect ratio.
 * The optimized image is then converted to a webp format with a quality of 80.
 * The function is asynchronous and returns a Promise that resolves with the Data URL of the optimized image.
 *
 * @param {File} file - The image file to be optimized.
 * @param {number} width - The desired width of the optimized image.
 * @returns {Promise<string>} A Promise that resolves with the Data URL of the optimized image.
 */
export const imgOptimization = (file, width) => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const dataUrl = e.target.result;

      const img = document.createElement("img");
      img.src = dataUrl;
      img.onload = (e) => {
        const canvas = document.createElement("canvas");
        const ratio = width / img.width;
        canvas.width = width;
        canvas.height = img.height * ratio;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        resolve(ctx.canvas.toDataURL("image/webp", 80));
      };
    };
    reader.onerror = (e) => {
      reject(e);
    };
  });
};
