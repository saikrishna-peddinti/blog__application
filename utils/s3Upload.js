// utils/s3Upload.js
const { Upload } = require("@aws-sdk/lib-storage");
const s3Client = require("./s3");
const path = require("path");

async function uploadFileToS3(file) {
  const fileExtension = path.extname(file.originalname);
  const key = `${Date.now()}-${file.originalname}`;

  const upload = new Upload({
    client: s3Client,
    params: {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: "public-read",
    },
  });

  await upload.done();
  return `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
}

module.exports = uploadFileToS3;
