import { TextToSpeechView } from "@/features/text-to-speech/views/text-to-speech-view";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Text to Speech - Resonance",
    description: "Convert your text into natural-sounding speech with our Text to Speech feature. Simply input your text, choose a voice, and let our advanced AI technology do the rest. Perfect for creating audio content, enhancing accessibility, or just having fun with your words!"
};
export default function TextToSpeechPage() {
    return <TextToSpeechView />;
};