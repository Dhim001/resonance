"use client";

import { useUser } from "@clerk/nextjs";
import { Headphones, ThumbsUp } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function DashboardHeader() {
    const { isLoaded, user } = useUser();

    if (!isLoaded) {
        return <div className="flex items-center gap-2 text-muted-foreground">Loading...</div>;
    }

    return (
        <div className="flex items-start justify-between">
            <div className="space-y-1">
                <p className="text-sm text-muted-foreground">
                    Nice to see you
                </p>
                <h1 className="text-2xl lg:text-3xl font-semibold tracking-tight">
                    {isLoaded ? (user?.fullName ?? user?.firstName ?? "there"): "..."}
                </h1>
            </div>

            <div className="lg:flex items-center gap-3 hidden">
                <Button variant="outline" size="sm" asChild>
                    <Link href="mailto:rfdimeji@gmail.com" className="flex items-center gap-1">
                        <ThumbsUp className="h-4 w-4" />
                        <span className="hidden lg:block">Feedback</span>
                    </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                    <Link href="mailto:rfdimeji@gmail.com" >
                        <Headphones/>
                        <span className="hidden lg:block">Need help?</span>
                    </Link>
                </Button>
            </div>
        </div>
    );
};