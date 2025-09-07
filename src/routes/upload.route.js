import express from "express";
import multer from "multer";
import mime from "mime-types"; // Sử dụng import thay vì require
import sharp from "sharp";
import fs from "fs";
import path from "path";

const UploadRouter = express.Router();
const SERVER_URL = process.env.SERVER_URL || "http://localhost:3001";

const applyUploadRoutes = (app) => {
  // Cấu hình multer để nhận file upload
  const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }, // Giới hạn kích thước file: 5MB
  });

  UploadRouter.post("/image", upload.single("file"), async (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        console.log("No file uploaded");
        return res.status(400).send({ message: "No file uploaded" });
      }

      const allowedExtensions = ["jpg", "jpeg", "png", "jfif", "pjpeg", "pjp", "gif", "webp", "bmp", "svg", "ico"];
      let fileMimeType = mime.lookup(file.originalname);

      // Kiểm tra nếu MIME type trả về là undefined và file có đuôi .jfif
      if (fileMimeType === false && file.originalname.toLowerCase().endsWith('.jfif')) {
        // Gán MIME type mặc định là 'image/jpeg' cho .jfif
        fileMimeType = 'image/jpeg';
      }
      if (!fileMimeType || !fileMimeType.startsWith("image/")) {
        console.log("Uploaded file is not a valid image");
        return res.status(400).send({ message: "Uploaded file is not a valid image" });
      }

      const fileExtension = mime.extension(fileMimeType);
      if (!allowedExtensions.includes(fileExtension)) {
        console.log("File extension is not allowed");
        return res.status(400).send({ message: "File extension is not allowed" });
      }

      // Kiểm tra metadata hình ảnh
      try {
        await sharp(file.buffer).metadata(); // Nếu không phải ảnh hợp lệ sẽ throw error
      } catch (error) {
        // console.log("Uploaded file is not a valid image");
        return res.status(400).send({ message: "Uploaded file is not a valid image" });
      }

      const imagesDir = path.join(__dirname, "../../public/images");
      if (!fs.existsSync(imagesDir)) {
        fs.mkdirSync(imagesDir, { recursive: true });
      }

      const fileName = `${Date.now()}.${fileExtension}`;
      const filePath = path.join(imagesDir, fileName);

      // Lưu file
      await fs.promises.writeFile(filePath, file.buffer);

      const fileUrl = `${SERVER_URL}/api/v1/file/image/${fileName}`;
      return res.status(200).send({
        message: "File uploaded successfully",
        name: fileName,
        url: fileUrl,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: "Error uploading file" });
    }
  });

  app.use("/api/v1/upload", UploadRouter); // Đảm bảo có dấu `/`
};

export default applyUploadRoutes;
