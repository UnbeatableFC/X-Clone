"use client";
import Spinner from "@/components/spinner";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import useUploadCare from "@/hooks/useUploadCare";
import { Camera } from "lucide-react";
import React, { useCallback, useState } from "react";
import Dropzone from "react-dropzone"; // Ensure this is the correct library or path for Dropzone

interface PropType {
  value?: string;
  disabled?: boolean;
  name?: string;
  onChange: (image: string) => void;
}

const ProfileImageUpload: React.FC<PropType> = ({
  value,
  name,
  onChange,
}) => {
  const { uploadFile, base64, uploading } = useUploadCare();
  const handleChange = useCallback(
    (image: string) => {
      onChange(image);
    },
    [onChange]
  );

  const handleDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles?.length === 0) return;
      const file = acceptedFiles[0];
      if (file) {
        const url = await uploadFile(file);
        console.log("Uploaded URL:", url);
        if (url) handleChange(url as string);
      }
    },
    [handleChange, uploadFile]
  );
  return (
    <div className="profile--uploader">
      <Dropzone
        accept={{
          "image/png": [".png"],
          "image/jpg": [".jpg"],
          "image/jpeg": [".jpeg"],
        }}
        onDrop={(acceptedFiles) => {
          handleDrop(acceptedFiles);
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <input
              type="file"
              style={{ display: "none" }}
              accept=".png , .jpg , .jpeg"
              {...getInputProps()}
            />
            <div className=" relative bg-neutral-400 dark:bg-neutral-800 !w-[141px] !h-[141px] rounded-full p-[2px] border-2 overflow-hidden">
              <Avatar className="!w-full !h-full hover:opacity-90">
                <AvatarImage
                  src={base64 || value || ""}
                  alt={name || ""}
                  className="w-full h-full object-cover"
                />
                <AvatarFallback className="font-bold text-[60px] ">
                  {name?.[0]}
                </AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 w-full h-full bg-gray-950/10 dark:bg-gray-950/30 flex items-center justify-center">
                {uploading ? (
                  <Spinner size="icon" />
                ) : (
                  <Button
                    variant="ghost"
                    size="icon"
                    disabled ={uploading}
                    className="rounded-full shadow w-10 h-10 p-2 bg-[#eee]/50 dark:bg-black/80 hover:bg-opacity-60"
                  >
                    <Camera size={18} />
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </Dropzone>
    </div>
  );
};

export default ProfileImageUpload;
