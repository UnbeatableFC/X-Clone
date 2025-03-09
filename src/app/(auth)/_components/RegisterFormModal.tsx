"use client";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const RegisterFormModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const formSchema = z.object({
    name: z.string().min(1, { message: "Name Required" }),
    email: z
      .string()
      .trim()
      .email({ message: "Invalid Email Address" })
      .min(1, { message: "Email Required" }),
    username: z.string().min(1, { message: "Username Required" }),
    dateOfBirth: z
      .string()
      .min(1, { message: "Date of Birth Required" })
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Please enter a valid date",
      }),
    password: z.string().min(1, { message: "Password Required" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      username: "",
      dateOfBirth: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };
  const handleClose = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Modal
      isOpen={isOpen}
      title="Create your account"
      onClose={handleClose}
      body={
        <>
          <FormProvider {...form}>
            <form
              action=""
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex h-full w-full flex-col items-center justify-center space-y-3"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Name"
                        disabled={false}
                        className="form--input focus:border-0 dark:border-[rgba(255,255,255,.5)]"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email"
                        disabled={false}
                        className="form--input focus:border-0 dark:border-[rgba(255,255,255,.5)]"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      {/* <CheckUsername /> */}
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Date Of Birth</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        placeholder="Enter DOB"
                        disabled={false}
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter Password"
                        disabled={false}
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
                disabled={false}
              >
                {/* <Spinner size='default' /> */}
                Create
              </Button>
            </form>
          </FormProvider>
        </>
      }
    >
      <Button
        variant="brandOutline"
        width="full"
        size="brandSm"
        className="!mt-5 gap-1"
        onClick={() => setIsOpen(!isOpen)}
      >
        Create New Account
      </Button>
    </Modal>
  );
};

export default RegisterFormModal;
