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
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden" style={{ background: '#0a0e1a' }}>
      {/* Header - Top Left with JARVIS branding */}
      <div className="absolute top-8 left-8 z-20 animate-fade-in" style={{ animationDelay: '0.8s', animationFillMode: 'both' }}>
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full" style={{
            background: '#00C8FF',
            boxShadow: '0 0 20px #00C8FF, 0 0 40px #00C8FF',
          }} />
          <h1 className="text-xl font-bold tracking-[0.3em] uppercase" style={{
            color: '#00A8E8',
            textShadow: '0 0 30px rgba(0, 200, 255, 0.8)',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}>
            JARVIS
          </h1>
        </div>
      </div>

      {/* Status Indicator - Top Right */}
      <div className="absolute top-8 right-8 z-20 animate-fade-in" style={{ animationDelay: '1s', animationFillMode: 'both' }}>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full" style={{
            background: '#00C8FF',
            boxShadow: '0 0 10px #00C8FF',
          }} />
          <span className="text-sm font-light tracking-widest" style={{ 
            color: '#00C8FF',
            opacity: 0.7,
          }}>
            Online
          </span>
        </div>
      </div>

      {/* 3D Animated Core - Centered */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <AnimatedOrb isSpeaking={isSpeaking} />
      </div>

      {/* ElevenLabs Conversational AI Widget - positioned naturally */}
      <div className="fixed bottom-8 right-8 z-50">
        <elevenlabs-convai agent-id="agent_8801k8m0db1qed7ax67n2efe693j" />
      </div>
    </div>
  );
};
