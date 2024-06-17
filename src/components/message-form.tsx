"use client";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { fetchMutation } from "convex/nextjs";
import { api } from "@/../convex/_generated/api";
import { Id } from "@/../convex/_generated/dataModel";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useUser } from "@clerk/nextjs";

interface MessageProps {
  senderId: string;
  senderName: string;
  senderImageUrl: string;
  about: {
    country?: string;
    city?: string;
    category?: string;
  };
}

const schema = z.object({
  message: z.string(),
});

const MessageForm = ({ senderId, senderName, senderImageUrl, about }: MessageProps) => {
  const { user } = useUser();
  const { toast } = useToast();
  const FormSchema = z.object({
    message: z.string().min(3, {
      message: "Message must be at least 2 characters.",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async (data) => {
    const { message } = data;
    if (!user) return null;
    try {
      await fetchMutation(api.messages.createMessage, {
        senderId: user.id,
        senderName: user.username!,
        senderPicture: user.imageUrl,
        receiverId: senderId,
        receiverName: senderName,
        receiverPicture: senderImageUrl,
        text: message,
        about: about
      });
      form.reset({ message: "" });
      toast({
        description: "Message posted successfully",
      });
    } catch (error) {
      console.error(error);
      toast({
        description: "Failed to submit message",
        variant: "destructive",
      });
    }
  };



  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    id="message"
                    placeholder="Message"
                    {...field}
                    className="mt-1 mb-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button type="submit" className="bg-blue-500 text-white px-4 mb-10 rounded">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default MessageForm;
