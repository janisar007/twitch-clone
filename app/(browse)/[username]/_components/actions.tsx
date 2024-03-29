"use client";

import { Button } from "@/components/ui/button";
import { onFollow, onUnfollow } from "@/actions/follow";
import { useTransition } from "react";
import { toast } from "sonner";

interface ActionProps {
    isFollowing: boolean;
    userId: string;
}

export const Actions = ({isFollowing, userId}: ActionProps) => {
  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(userId)
        .then((data) => toast.success(`you are now following ${data.following.username}`))
        .catch(() => toast.error("Something went wrong."))
    });
  };

  const handleUnfollow = () => {
    startTransition(() => {
      onUnfollow(userId)
        .then((data) => toast.success(`you have unfollowed ${data.following.username}`))
        .catch(() => toast.error("Something went wrong."))
    });
  };

  const onClick = () => {
    if(isFollowing) {
        handleUnfollow();
    } else {
        handleFollow();
    }
  }

  
  return (
    <Button disabled={isPending} onClick={onClick} variant="primary">
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};
