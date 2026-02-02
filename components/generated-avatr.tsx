"use client";

import { createAvatar } from '@dicebear/core'; 
import {botttsNeutral, initials} from '@dicebear/collection';

import { cn } from '@/lib/utils';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';

interface GeneratedAvatarProps {
  seed: string;
  className?: string;
  variant: "botttsNeutral" | "initials";
}

export const GeneratedAvatar = ({ seed, className, variant }: GeneratedAvatarProps) => {
  const safeSeed = seed || "User";

  const avatar =
    variant === "botttsNeutral"
      ? createAvatar(botttsNeutral, { seed: safeSeed })
      : createAvatar(initials, { seed: safeSeed, fontWeight: 500, fontSize: 42 });

  return (
    <Avatar className={cn(className)}>
      <AvatarImage src={avatar.toDataUri()} alt="Avatar" />
      <AvatarFallback>{safeSeed.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
};
