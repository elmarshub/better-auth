"use client";

import { LoadingButton } from "@/components/loading-button";
import { useTransition } from "react";
import { toast } from "sonner";
import { deleteApplication } from "./action";

export function DeleteApplication() {
  const [isPending, startTransition] = useTransition();

  async function handleDeleteApplication() {
    startTransition(async () => {
      try {
        await deleteApplication();
        toast.success("Application deletion authorized successfully");
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong");
      }
    });
  }

  return (
    <div className="max-w-md">
      <div className=" rounded-lg border p-4 shadow-md">
        <div className="space-y-3">
          <div>
            <h2 className="dark:text-destructive text-red-500 font-medium">Delete Application</h2>
            <p className="text-muted-foreground text-sm">
              This action will delete the entire application. This cannot be
              undone.
            </p>
          </div>
          <LoadingButton
            loading={isPending}
            onClick={handleDeleteApplication}
            // variant="destructive"
            className="w-full bg-red-500 hover:bg-red-700"
          >
            Delete Application
          </LoadingButton>
        </div>
      </div>
    </div>
  );
}
