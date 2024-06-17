"use client";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { fetchMutation } from "convex/nextjs";
import { api } from "@/../convex/_generated/api";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "./ui/input";

const ContactForm = () => {
  const { toast } = useToast();
  const FormSchema = z.object({
    contact_name: z.string().min(3, {
      message: "Name must be at least 3 characters.",
    }),
    contact_email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    contact_message: z.string().min(3, {
      message: "Message must be at least 3 characters.",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      contact_name: "",
      contact_email: "",
      contact_message: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async (data) => {
    const { contact_name, contact_email, contact_message } = data;
    try {
      await fetchMutation(api.contact.createContactMessage, {
        contact_email,
        contact_name,
        contact_message,
      });
      form.reset({ contact_name: "", contact_email: "", contact_message: "" });
      toast({
        description: "Message submitted successfully",
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
        <form
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="contact_name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    id="contact_name"
                    placeholder="Name"
                    {...field}
                    className="mt-1 mb-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contact_email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    id="contact_email"
                    placeholder="Email"
                    {...field}
                    className="mt-1 mb-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contact_message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    id="contact_message"
                    placeholder="Message"
                    {...field}
                    className="mt-1 mb-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end mt-2">
            <Button type="submit" className="bg-blue-500 text-white px-4 mb-10 rounded">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
