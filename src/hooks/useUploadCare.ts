import React, { useCallback, useState } from "react";
import { toast } from "./use-toast";
import { uploadFileAction } from "@/app/actions/upload.action";

const toBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const useUploadCare = () => {
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [base64, setBase64] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  const uploadFile = useCallback(
    async (file: File): Promise<string | null> => {
      try {
        const baseString = await toBase64(file);
        setBase64(baseString as string);

        const UPLOADCARE_PUBLIC_KEY =
          process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY;
        const formData = new FormData();
        formData.append("UPLOADCARE_PUB_KEY", UPLOADCARE_PUBLIC_KEY!);
        formData.append("UPLOADCARE_STORE", "1");
        formData.append("file", file);

        const result = await uploadFileAction(formData);
        if (!result?.uploadedUrl) {
          toast({
            title: "Error",
            description: result?.message || "Upload failed",
            variant: "destructive",
          });
          return null;
        }

        setUploadedUrl(result.uploadedUrl);
        setUploading(false);
        toast({
          title: "Success",
          description: "Upload successfully",
          variant: "default",
        });
        return result.uploadedUrl;
      } catch (err) {
        toast({
          title: "Error",
          description:
            err instanceof Error ? err.message : "Upload failed",
          variant: "destructive",
        });
        setUploading(false);
        return null;
      }
    },
    []
  );

  const clearFile = useCallback(() => {
    setBase64("");
    setUploadedUrl("");
  }, []);

  return {
    uploadFile,
    uploadedUrl,
    base64,
    uploading,
    clearFile,
  };
};

export default useUploadCare;
