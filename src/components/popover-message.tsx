import Image from "next/image";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Textarea } from "./ui/textarea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "./ui/use-toast";

interface PopoverMessageProps {
  authorId: string;
  authorName: string;
  authorImageUrl: string;
  about: {
    country: string;
    city?: string;
    category: string;
  }
}

const PopoverMessage = ({authorId, authorName, authorImageUrl, about}: PopoverMessageProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const { user } = useUser();
  const createMessage = useMutation(api.messages.createMessage);
  const FormSchemaMessage = z.object({
    message: z.string().min(2, {
      message: "Message must be at least 2 characters.",
    }),
  });

  const formMessage = useForm<z.infer<typeof FormSchemaMessage>>({
    resolver: zodResolver(FormSchemaMessage),
    defaultValues: {
      message: "",
    },
  });

  const onSubmitMessage = async (data: z.infer<typeof FormSchemaMessage>) => {
    setIsPopoverOpen(false);
    await createMessage({
      senderId: user?.id!,
      senderName: user?.username!,
      senderPicture: user?.imageUrl!,
      receiverId: authorId,
      receiverName: authorName,
      receiverPicture: authorImageUrl,
      text: data.message,
      about: about,
    });
    formMessage.reset({ message: '' });
    toast({
      title: "Message Submitted!"
    });
  };

  const handleSubmit = formMessage.handleSubmit(onSubmitMessage);

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <div
          onClick={() => setIsPopoverOpen(true)}
        >
          <div className="flex items-center cursor-pointer p-2 mr-1 bg-gray-50 rounded-full hover:bg-accent hover:text-accent-foreground hover:rounded-full">
            <Image
              alt="Avatar"
              className="h-8 w-8 rounded-full"
              height={32}
              width={32}
              src={authorImageUrl}
              style={{
                aspectRatio: "32/32",
                objectFit: "cover",
              }}
            />
            <div className="text-sm font-medium text-gray-900 p-1 hover:bg-accent hover:text-accent-foreground hover:rounded-full">
              {authorName}
            </div>
          </div>
        </div>
      </PopoverTrigger>
        <PopoverContent className="w-80">
          <Form {...formMessage}>
            <form
              onSubmit={handleSubmit}
            >
            <FormField
              control={formMessage.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      id="message"
                      placeholder="Message"
                      {...field}
                      className="mt-1 mb-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
              <div className="flex justify-end">
                <Button type="submit" className="bg-blue-500 text-white px-4 rounded">Submit</Button>
              </div>
            </form>
          </Form>
        </PopoverContent>
    </Popover>
  )
}

export default PopoverMessage
