import { v2 as cloudinary } from "cloudinary";

// Cloudinary is auto-configured from CLOUDINARY_URL env var
cloudinary.config(true);

export async function uploadToCloudinary(
  file: Buffer,
  filename: string,
  folder = "rituals"
): Promise<{ url: string; public_id: string }> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "auto",
        public_id: `${Date.now()}-${filename.replace(/\.[^/.]+$/, "")}`,
        allowed_formats: ["pdf", "mp4", "mov", "avi", "mkv", "webm"],
      },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Upload failed"));
        } else {
          resolve({ url: result.secure_url, public_id: result.public_id });
        }
      }
    );
    uploadStream.end(file);
  });
}

export default cloudinary;
