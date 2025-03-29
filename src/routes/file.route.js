const fs = require('fs');
const express = require('express');
const path = require("path");

const FileRouter = express.Router();

const applyFileRoutes = (app) => {
  FileRouter.get("/image/:fileName", async (req, res) => {
    try {
      const fileName = req.params.fileName;
      if (!fileName || fileName.includes('..')) {
        return res.status(400).send({ message: "Invalid file name" });
      }
      const filePath = path.join(__dirname, '../../public/images', fileName);

      if (!fs.existsSync(filePath)) {
        return res.status(404).send({ message: "File not found" });
      }

      const fileData = fs.readFileSync(filePath);
      const mime = require('mime-types');
      const fileType = mime.lookup(filePath);
      res.setHeader('Content-Type', fileType || 'application/octet-stream');
      res.send(fileData);
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: "Error retrieving file" });
    }
  });

  FileRouter.get("/assest/:fileName", async (req, res) => {
    try {
      const fileName = req.params.fileName;
      const filePath = path.join(__dirname, '../../public/assests', fileName);

      if (!fs.existsSync(filePath)) {
        return res.status(404).send({ message: "File not found" });
      }

      const fileData = fs.readFileSync(filePath);
      const mime = require('mime-types');
      const fileType = mime.lookup(filePath);
      res.setHeader('Content-Type', fileType || 'application/octet-stream');
      res.send(fileData);
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: "Error retrieving file" });
    }
  });

  app.use("/api/v1/file", FileRouter);
};

module.exports = applyFileRoutes;
