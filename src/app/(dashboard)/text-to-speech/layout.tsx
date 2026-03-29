import { TextToSpeechLayout } from "@/features/text-to-speech/views/text-to-speech-layout";

export default function TextToSpeechPage({ children }: { children: React.ReactNode }) {
    return (
        <TextToSpeechLayout>
            {children}
        </TextToSpeechLayout>
    );
};