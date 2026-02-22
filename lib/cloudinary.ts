import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Generate a signed, time-limited download URL for a Cloudinary resource.
 * This bypasses "blocked for delivery" restrictions on raw/auto uploads.
 * The URL expires after the given number of seconds (default: 1 hour).
 */
export function getSignedUrl(
  publicId: string,
  options?: { expiresInSeconds?: number; resourceType?: string }
): string {
  const expiresAt =
    Math.floor(Date.now() / 1000) + (options?.expiresInSeconds ?? 3600);
  const resourceType = options?.resourceType ?? "raw";

  return cloudinary.utils.private_download_url(publicId, "", {
    resource_type: resourceType,
    expires_at: expiresAt,
    type: "upload",
  });
}

export default cloudinary;
