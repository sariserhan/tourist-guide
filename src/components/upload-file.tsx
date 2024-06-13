import "@xixixao/uploadstuff/react/styles.css";
import { useRef, useState } from 'react';
import { useMutation } from "convex/react";
import { useUploadFiles } from "@xixixao/uploadstuff/react";
import { api } from "../../convex/_generated/api";
import { PostImageProps } from '@/lib/types';
import { useToast } from "./ui/use-toast";
import { Loader, UploadIcon } from "lucide-react";
import { Input } from "./ui/input";
import { TbCloudUpload } from "react-icons/tb";
import { HorizontalScroll } from "./horizontal-scroll";

export function UploadFile({setImages, setImageStorageIds, images} : PostImageProps) {
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const imageRef = useRef<HTMLInputElement>(null);
  const getImageUrl = useMutation(api.posts.getStorageUrl);
  const { startUpload } = useUploadFiles(generateUploadUrl)
  const { toast } = useToast();

  const handleImage = async (blob: Blob, fileName: string) => {
    setIsImageLoading(true);

    try {
      const file = new File([blob], fileName, { type: 'image/png' });

      const uploaded = await startUpload([file]);
      const storageId = (uploaded[0].response as any).storageId;

      const imageUrl = await getImageUrl({ storageId });
      storageId && setImageStorageIds((prev) => [...(prev || []), storageId]);
      imageUrl && setImages((prev) => [...prev, imageUrl]);
      setIsImageLoading(false);

    } catch (error) {
      console.log(error)
      toast({ title: 'Error uploading file', variant: 'destructive'})
    }
  }

  const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    try {
      const files = Array.from(event.target.files as FileList);
      if (files.length === 0) {
        return;
      }
      files.map(async (file) => {
        const blob = await file.arrayBuffer()
        .then((ab) => new Blob([ab]));

        handleImage(blob, file.name);
      })

    } catch (error) {
      console.log(error)
      toast({ title: 'Error uploading image', variant: 'destructive'})
    }
  }


  return (
    <div className="flex flex-col border p-8 cursor-pointer" onClick={() => imageRef?.current?.click()}>
      <Input
        type="file"
        multiple
        className="hidden"
        ref={imageRef}
        onChange={(event) => uploadImage(event)}
      />
      {!isImageLoading ? (
        <div className="flex justify-center items-center">
          <TbCloudUpload />
        </div>
      ): (
        <div className="text-16 flex items-center justify-center font-medium text-white-1">
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
      {images && (
        <div className="flex justify-center items-center w-full">
          <HorizontalScroll images={images} />
        </div>
      )}
    </div>
  );
}
