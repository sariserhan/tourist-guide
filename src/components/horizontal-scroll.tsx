"use client";

import Image from "next/image"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useState } from "react";
import { Dialog, DialogContent, DialogOverlay, DialogTrigger } from "./ui/dialog";

export function HorizontalScroll({images}: {images: string[]}) {
  return (
    <ScrollArea className={`whitespace-nowrap ${images.length>0 && "border rounded-md "}`}>
      <div className="flex space-x-4 p-4">
        {images.map((image) => (
          <figure key={image} className="shrink-0">
            <div className="overflow-hidden rounded-md">
              <ImagePopup src={image} alt={image} />
            </div>
          </figure>
          ))
          }
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}

const ImagePopup = ({ src, alt }: {src: string, alt: string}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  return (
    <>
      <Image
        src={src}
        alt={alt}
        className="h-fit w-fit object-cover cursor-pointer"
        width={300}
        height={400}
        onClick={openPopup}
      />

      <Dialog open={isOpen} onOpenChange={closePopup}>
        <DialogOverlay className="fixed inset-0 bg-black opacity-50" />
        <DialogContent className="flex items-center justify-center max-w-max max-h-max">
            <Image src={src} alt={alt} width={1000} height={1000} className="object-cover" />
        </DialogContent>
      </Dialog>
    </>
  );
};
