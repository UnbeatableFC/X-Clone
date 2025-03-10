"use client";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/spinner";
import { useToast } from "@/hooks/use-toast";

const LoginForm = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const formSchema = z.object({
    email: z
      .string()
      .email({ message: "Invalid Email Address" })
      .min(1, { message: "Email Required" }),
    password: z.string().min(1, { message: "Password Required" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(!isLoading);
      await doCredentialLogin({
        email: values.email,
        password: values.password,
      });
      toast({
        title: "Success",
        description: "Login successful",
        variant: "default",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Failed to Login",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <FormProvider {...form}>
      <form
        action=""
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-full w-full flex-col items-center justify-center space-y-3"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="Email"
                  disabled={isLoading}
                  className="form--input focus:border-0 dark:border-[rgba(255,255,255,.5)]"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  type="password"
                  placeholder="Password"
                  disabled={isLoading}
                  className="form--input focus:border-0 dark:border-[rgba(255,255,255,.5)]"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          variant="brandPrimary"
          width="full"
          size="brandSm"
          type="submit"
          className="!mt-5 gap-1"
          disabled={isLoading}
        >
          {isLoading && <Spinner size="default" />}
          Sign In
        </Button>
      </form>
    </FormProvider>
  );
};

export default LoginForm;
function doCredentialLogin(arg0: {
  email: string;
  password: string;
}) {
  throw new Error("Function not implemented.");
}
