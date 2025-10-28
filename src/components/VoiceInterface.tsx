import { useEffect, useState } from "react";
import { AnimatedOrb } from "./AnimatedOrb";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'elevenlabs-convai': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { 'agent-id': string }, HTMLElement>;
    }
  }
}

export const VoiceInterface = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    // Load the ElevenLabs widget script
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
    script.async = true;
    script.type = 'text/javascript';
    document.body.appendChild(script);

    // Listen for ElevenLabs widget events
    const handleWidgetEvent = (event: any) => {
      if (event.detail?.type === 'speaking') {
        setIsSpeaking(event.detail.isSpeaking);
      }
    };

    window.addEventListener('elevenlabs-speaking', handleWidgetEvent);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      window.removeEventListener('elevenlabs-speaking', handleWidgetEvent);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 md:p-12">
      {/* Header */}
      <div className="text-center space-y-2 animate-fade-in mb-8">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
          Granny.Ai
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground">
          Your caring companion, always listening
        </p>
      </div>

      {/* 3D Animated Orb */}
      <div className="w-full max-w-2xl aspect-video mb-8">
        <AnimatedOrb isSpeaking={isSpeaking} />
      </div>

      {/* ElevenLabs Conversational AI Widget */}
      <div className="w-full max-w-4xl flex items-center justify-center">
        <elevenlabs-convai agent-id="agent_8801k8m0db1qed7ax67n2efe693j" />
      </div>
    </div>
  );
};
