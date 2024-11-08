'use client'

//This is our login form component that will be used in the login page.

import AuthCard from "@/components/auth/auth-card";
import { LoginSchema } from "@/types/login-schema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { handleLogin } from "@/server/handle-login";



export const LoginForm = () => {

    const form = useForm<z.infer<typeof LoginSchema>>({
      resolver: zodResolver(LoginSchema),
      defaultValues: {
        email: "",
        password: "",
      },
    });
  
    const onSubmit =   (values: z.infer<typeof LoginSchema>) => {
        handleLogin(values);
    }
  
    return (
      <AuthCard
        cardTitle="Welcome Back!"
        backButtonHref="/"
        backButtonLabel="Return to Homepage"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-col gap-4">
              <div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="email@gmail.com"
                          type="email"
                          autoComplete="email"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription/>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
              </div>
              <div>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="***********"
                        type="password"
                        autoComplete="current-password"
                        {...field}
                      />
                    </FormControl>
                      <FormMessage/>
                  </FormItem>
                )}
              />
              </div>
            </div>
            <Button type="submit" className="w-full">Login</Button>
          </form>
        </Form>
      </AuthCard>
    );
  };
  