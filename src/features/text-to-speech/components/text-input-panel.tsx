"use client";

import { Coins } from "lucide-react";
import { useStore } from "@tanstack/react-form";

import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useTypedAppFormContext } from "@/hooks/use-app-form";

import { COST_PER_UNIT, TEXT_MAX_LENGTH } from "../data/constants";
import { ttsFormOptions } from "./text-to-speech-form";
import { GenerateButton } from "./generate-button";


export function TextInputPanel() {
  const form = useTypedAppFormContext(ttsFormOptions);
  const text = useStore(form.store, (state) => state.values.text);
  const isSubmitting = useStore(form.store, (state) => state.isSubmitting);
  const isValid = useStore(form.store, (state) => state.isValid);


    return (
        <div className="flex h-full min-h-0 flex-col flex-1">
            {/* Text Input area */}
            <div className="relative min-h-0 flex-1">
                <form.Field name="text">
                    {(field) => (
                        <Textarea
                            placeholder="Enter text to convert to speech..."
                            className="absolute inset-0 resize-none border-0 bg-transparent p-4 pb-6 lg:p-6 lg:pb-8 text-base! leading-relaxed tracking-tight shadow-none wrap-break-word focus-visible:right-0"
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            maxLength={TEXT_MAX_LENGTH}
                            disabled={isSubmitting}
                        />
                    )}
                </form.Field>

                {/* Bottom fade overlay */}
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-background/80 to-transparent" />
            </div>

            {/* Action bar */}
            <div className="shrink-0 p-4 lg:p-6">
                {/* Mobile action button */}
                <div className="flex flex-col gap-3 lg:hidden">
                    <GenerateButton 
                        className="w-full"
                        disabled={text.length === 0 || isSubmitting || !isValid}
                        isSubmitting={isSubmitting}
                        onSubmit={() => form.handleSubmit()}
                    />
                </div>
                {/* Desktop action bar */}
                {text.length > 0 ? (
                    <div className="hidden lg:flex items-center justify-between">
                        <Badge variant="outline" className="gap-1.5 border-dashed">
                            <Coins className="size-3 text-chart-5" />
                            <span className="text-sm text-muted-foreground">
                                <span className="tabular-nums">
                                    ${(text.length * COST_PER_UNIT).toFixed(4)}
                                </span>{" "}cost
                            </span>
                        </Badge>
                        <div className="flex items-center gap-3">
                            <p className="text-xs tracking-tight">
                                {text.length.toLocaleString()}
                                <span className="text-muted-foreground">
                                    {" "}/{" "}{TEXT_MAX_LENGTH.toLocaleString()} characters
                                </span>
                            </p>
                            <GenerateButton 
                                size="sm"
                                disabled={text.length === 0 || isSubmitting || !isValid}
                                isSubmitting={isSubmitting}
                                onSubmit={() => form.handleSubmit()}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="hidden lg:block">
                        <p className="text-sm text-muted-foreground">
                            Get started by entering some text above. You can convert up to {TEXT_MAX_LENGTH} characters into speech. Perfect for creating audio content, enhancing accessibility, or just having fun with your words!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};