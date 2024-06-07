import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "./ui/button";
import { ReplyIcon } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Textarea } from "./ui/textarea";
import { Id } from "../../convex/_generated/dataModel";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "./ui/use-toast";

interface PopoverComponentProps {
  commentId: Id<"comments">
}

const PopoverComponent = ({commentId}: PopoverComponentProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const { user } = useUser();
  const createReply = useMutation(api.replies.createReply);
  const FormSchemaComment = z.object({
    reply: z.string().min(2, {
      message: "Reply must be at least 2 characters.",
    }),
  });

  const formComment = useForm<z.infer<typeof FormSchemaComment>>({
    resolver: zodResolver(FormSchemaComment),
    defaultValues: {
      reply: "",
    },
  });

  const onSubmitReply = async (data: z.infer<typeof FormSchemaComment>) => {
    setIsPopoverOpen(false);
    await createReply({
      commentId,
      userClerkId: user?.id!,
      userClerkName: user?.username!,
      userClerkImageUrl: user?.imageUrl!,
      text: data.reply
    });
    formComment.reset({ reply: '' });
    toast({
      title: "Reply Submitted!"
    });
  };

  const handleSubmit = formComment.handleSubmit(onSubmitReply);

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="rounded-full "
          size="smallIcon"
          onClick={() => setIsPopoverOpen(true)}
        >
          <ReplyIcon className="w-3 h-3 text-green-500" />
        </Button>
      </PopoverTrigger>
        <PopoverContent className="w-80">
          <Form {...formComment}>
            <form
              onSubmit={handleSubmit}
            >
            <FormField
              control={formComment.control}
              name="reply"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      id="reply"
                      placeholder="Reply"
                      {...field}
                      className="mt-1 mb-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
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

export default PopoverComponent
