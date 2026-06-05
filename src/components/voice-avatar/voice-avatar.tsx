"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useVoiceAvatar } from "./use-voice-avatar";

interface VoiceAvatarProps {
    seed: string;
    name: string;
    className?: string;
};

export function VoiceAvatar({ seed, name, className }: VoiceAvatarProps) {
    const avatarUrl = useVoiceAvatar(seed);

    return (
        <Avatar className={cn("size-4 border-white shadow-xs", className)}>
            <AvatarImage src={avatarUrl} alt={name} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
    );
};