import "@xixixao/uploadstuff/react/styles.css";
import Image from "next/image";
import { useRef, useState } from 'react';
import { useMutation } from "convex/react";
import { useUploadFiles } from "@xixixao/uploadstuff/react";
import { api } from "../../convex/_generated/api";
import { PostImageProps } from '@/lib/types';
import { useToast } from "./ui/use-toast";
import { Loader } from "lucide-react";
import { Input } from "./ui/input";
import { TbCloudUpload } from "react-icons/tb";


export function UploadFile({setImage, setImageStorageId, image} : PostImageProps) {
  const [isImageLoading, setIsImageLoading] = useState(false);
  const imageRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const { startUpload } = useUploadFiles(generateUploadUrl)
  const getImageUrl = useMutation(api.posts.getStorageUrl);

  const handleImage = async (blob: Blob, fileName: string) => {
    setIsImageLoading(true);
    setImage('');

    try {
      const file = new File([blob], fileName, { type: 'image/png' });

      const uploaded = await startUpload([file]);
      const storageId = (uploaded[0].response as any).storageId;

      setImageStorageId(storageId);

      const imageUrl = await getImageUrl({ storageId });
      setImage(imageUrl!);
      setIsImageLoading(false);
      toast({
        title: "File uploaded successfully",
      })
    } catch (error) {
      console.log(error)
      toast({ title: 'Error uploading file', variant: 'destructive'})
    }
  }

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    try {
      const files = e.target.files;
      if (!files) return;
      const file = files[0];
      const blob = await file.arrayBuffer()
      .then((ab) => new Blob([ab]));

      handleImage(blob, file.name);
    } catch (error) {
      console.log(error)
      toast({ title: 'Error uploading image', variant: 'destructive'})
    }
  }

  return (
    <div className="flex flex-col border p-8 cursor-pointer" onClick={() => imageRef?.current?.click()}>
      <Input
        type="file"
        className="hidden"
        ref={imageRef}
        onChange={(e) => uploadImage(e)}
      />
      {!isImageLoading ? (
        <div className="flex justify-center items-center">
          <TbCloudUpload />
        </div>
      ): (
        <div className="text-16 flex-center font-medium text-white-1">
          Uploading
          <Loader size={20} className="animate-spin ml-2" />
        </div>
      )}
      <div className="flex flex-col items-center gap-1">
        <h2 className="text-12 font-bold text-orange-1">
        Click to upload
        </h2>
        <p className="text-12 font-normal text-gray-1">SVG, PNG, JPG, or GIF</p>
      </div>
      {image && (
        <div className="flex justify-center items-center w-full">
          <Image
            src={image}
            width={400}
            height={400}
            className="mt-5"
            alt="uploaded image"
          />
        </div>
      )}
    </div>
  );
}
