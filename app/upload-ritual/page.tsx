import RitualUploadForm from "@/components/RitualUploadForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Upload Ritual | Archive of the Craft",
  description: "Preserve a masonic ritual document or recording",
};

export default function UploadRitualPage() {
  return <RitualUploadForm />;
}
