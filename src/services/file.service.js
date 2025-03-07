
const fs = require('fs');
const path = require('path');

export default class FileService {
  deleteImage = async (image) => {
    try {
      const filePath = path.join(__dirname, `../../public/images/${image}`);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      return true;
    } catch (error) {
      throw error;
    }
  }

  deleteAssest = async (asset) => {
    try {
      const filePath = path.join(__dirname, `../../public/assets/${asset}`);

      if (fs.existsSync(filePath))
        fs.unlinkSync(filePath);

      return true;
    } catch (error) {
      throw error;
    }
  }
}