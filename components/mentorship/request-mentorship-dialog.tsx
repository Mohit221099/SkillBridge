"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useGameStore } from "@/lib/store";
import { toast } from "sonner";

const requestSchema = z.object({
  message: z.string().min(20, "Message must be at least 20 characters"),
});

export function RequestMentorshipDialog({ mentorId, menteeId, projectId, children }) {
  const [open, setOpen] = useState(false);
  const { addMentorshipRequest } = useGameStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(requestSchema),
  });

  const onSubmit = async (data) => {
    try {
      const request = {
        id: Date.now().toString(),
        mentorId,
        menteeId,
        projectId,
        status: 'pending',
        message: data.message,
        createdAt: new Date().toISOString(),
      };

      addMentorshipRequest(request);
      toast.success("Mentorship request sent successfully!");
      setOpen(false);
    } catch (error) {
      toast.error("Failed to send mentorship request");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Request Mentorship</DialogTitle>
          <DialogDescription>
            Explain what you'd like help with and why you think this mentor would be a good fit.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Textarea
              placeholder="I'd like your help with..."
              className="min-h-[150px]"
              {...register("message")}
            />
            {errors.message && (
              <p className="text-sm text-destructive">{errors.message.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Request"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}