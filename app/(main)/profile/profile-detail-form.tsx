"use client";

import { LoadingButton } from "@/components/loading-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UserAvatar } from "@/components/user-avatar";
import { User } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const updateProfileSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }),
  image: z.string().optional().nullable(),
});

export type UpdateProfileValues = z.infer<typeof updateProfileSchema>;

interface ProfileDetailsFormPage {
  user: User;
}

export function ProfileDetailsForm({ user }: ProfileDetailsFormPage) {
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const form = useForm<UpdateProfileValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: user.name ?? "",
      image: user.image ?? null,
    },
  });

  async function onSubmit({ name, image }: UpdateProfileValues) {
    setStatus(null);
    setError(null);

    const result = await authClient.updateUser({ name, image });

    if (result.error) {
      setError(result.error.message ?? "Something went wrong");
    } else {
      setStatus("Profile updated");
      router.refresh();
    }
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        form.setValue("image", base64, { shouldDirty: true });
      };
      reader.readAsDataURL(file);
    }
  }

  const imagePreview = form.watch("image");
  const loading = form.formState.isSubmitting;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Details</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Full name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={() => (
                <FormItem>
                  <FormLabel>Profile image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        handleImageChange(e);
                        e.target.value = ""; // reset input for same file re-upload
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {imagePreview && (
              <div className="relative h-16 w-16 sm:h-20 sm:w-20">
                <UserAvatar
                  name={user.name ?? "User"}
                  image={imagePreview}
                  className="h-full w-full rounded-full"
                />
                <Button
                  type="button"
                  variant="ghost"
                  className="absolute -top-2 -right-2 size-6 rounded-full"
                  onClick={() => form.setValue("image", null)}
                  aria-label="Remove image"
                >
                  <XIcon className="size-4" />
                </Button>
              </div>
            )}

            {error && (
              <p role="alert" className="text-sm font-medium text-red-600">
                {error}
              </p>
            )}
            {status && (
              <p role="status" className="text-sm font-medium text-green-600">
                {status}
              </p>
            )}

            <LoadingButton type="submit" loading={loading}>
              Save changes
            </LoadingButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
