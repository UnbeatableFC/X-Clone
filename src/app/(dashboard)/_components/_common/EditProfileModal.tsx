"use client";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/spinner/index";
import CheckUsername from "@/components/check-username";
import { SquarePen } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useCurrentUserContext } from "@/context/currentUser-provider";
import CoverImageUpload from "./CoverImageUpload";
import ProfileImageUpload from "./ProfileImageUpload";
import { useStore } from "@/hooks/useStore";
import { BASE_URL } from "@/lib/base-url";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";

const EditProfileModal = () => {
  const queryClient = useQueryClient();
  const { isEditModalOpen, onCloseEditModal } = useStore();
  const [editUsername, setEditUsername] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data } = useCurrentUserContext();
  const currentUser = data?.currentUser ?? ({} as UserType);
  const username = data?.currentUser?.username || null;
  const formSchema = z.object({
    name: z.string().min(1, { message: "Name Required" }),
    username: z.string().min(1, { message: "Username Required" }),
    bio: z.string(),
    coverImage: z.string(),
    profileImage: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      bio: "",
      username: "",
      coverImage: "",
      profileImage: "",
    },
  });

  useEffect(() => {
    if (currentUser?.id) {
      form.setValue("name", currentUser?.name || "");
      form.setValue("bio", currentUser?.bio || "");
      form.setValue("username", currentUser?.username || "");
      form.setValue("coverImage", currentUser?.coverImage || "");
      form.setValue("profileImage", currentUser?.profileImage || "");
    }
  }, [currentUser?.id]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      await axios.patch(`${BASE_URL}/api/edit`, {
        name: values.name,
        bio: values.bio,
        profileImage: values.profileImage,
        username: values.username,
        coverImage: values.coverImage,
      });
      if (username) {
        queryClient.refetchQueries({
          queryKey: ["user", username],
        });
      }

      toast({
        title: "Success",
        description: "Updated profile successfully",
        variant: "default",
      });

      onCloseEditModal();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal
      isOpen={isEditModalOpen}
      title="Edit Profile"
      onClose={onCloseEditModal}
      body={
        <div className="w-full flex flex-col justify-center gap-4">
          <div className="w-full bg-neutral-300 dark:bg-neutral-900 h-44 relative rounded-md">
            <CoverImageUpload
              value={form?.getValues()?.coverImage}
              onChange={(image: string) => {
                form?.setValue("coverImage", image);
              }}
            />
            <div className="absolute -bottom-16 left-4">
              <ProfileImageUpload
                value={form?.getValues()?.profileImage}
                name={form?.getValues()?.name}
                onChange={(image: string) => {
                  form?.setValue("profileImage", image);
                }}
              />
            </div>
          </div>

          <div className="w-full mt-14">
            <FormProvider {...form}>
              <form
                action=""
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex h-full w-full flex-col items-center justify-center space-y-3"
              >
                <div className="w-full">
                  <div className="flex flex-row items-center gap-5 pt-4">
                    <label className="text-base">Username</label>
                    <div className="flex items-center gap-1 ">
                      <span className="text-base">
                        {form?.getValues().username}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        disabled={loading}
                        onClick={() => setEditUsername(!editUsername)}
                      >
                        <SquarePen size="17px" />
                      </Button>
                    </div>
                  </div>
                  {editUsername && (
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <CheckUsername />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  )}
                </div>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Edit Name"
                          disabled={loading}
                          className="form--input focus:border-0 dark:border-[rgba(255,255,255,.5)]"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Edit bio"
                          disabled={loading}
                          className="form--input focus:border-0 !h-[85px] dark:border-[rgba(255,255,255,.5)]"
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
                  disabled={loading}
                >
                  {loading && <Spinner size="default" />}
                  Update
                </Button>
              </form>
            </FormProvider>
          </div>
        </div>
      }
    />
  );
};

export default EditProfileModal;
