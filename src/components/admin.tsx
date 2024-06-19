"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { Input } from './ui/input';

const schema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

type FormData = z.infer<typeof schema>;

const AdminLoginForm: React.FC = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = (data: FormData) => {
    console.log('Form Data:', data);
    // Handle form submission (e.g., send data to API)
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <FormControl>
                  <Input {...field} id="username" placeholder="Username" className="mt-1 mb-2" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <FormControl>
                  <Input
                    {...field}
                    id="password"
                    type="password"
                    placeholder="Password"
                    className="mt-1 mb-2"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-blue-500 text-white mt-4">
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AdminLoginForm;
