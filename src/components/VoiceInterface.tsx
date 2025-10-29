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
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 md:p-12 overflow-hidden">
      {/* Animated background with stars */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background">
        <div className="absolute inset-0 opacity-30">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full animate-pulse-core"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                opacity: Math.random() * 0.7 + 0.3,
              }}
            />
          ))}
        </div>
        
        {/* Tech grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(180,148,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(180,148,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      </div>

      {/* Header */}
      <div className="relative z-10 text-center space-y-2 animate-fade-in mb-8">
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(180,148,246,0.5)]">
          Granny.AI
        </h1>
        <p className="text-lg md:text-xl text-primary/80 font-light tracking-wide">
          The Wise Digital Companion
        </p>
      </div>

      {/* 3D Animated Core */}
      <div className="relative z-10 w-full max-w-3xl aspect-video mb-12">
        {/* Pulsing waves */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {isSpeaking && (
            <>
              <div className="absolute w-64 h-64 border-2 border-primary/30 rounded-full animate-wave-expand" />
              <div className="absolute w-64 h-64 border-2 border-primary/20 rounded-full animate-wave-expand" style={{ animationDelay: '0.5s' }} />
              <div className="absolute w-64 h-64 border-2 border-primary/10 rounded-full animate-wave-expand" style={{ animationDelay: '1s' }} />
            </>
          )}
        </div>
        
        {/* Core glow */}
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${isSpeaking ? 'opacity-100' : 'opacity-60'}`}>
          <div className="w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
        </div>
        
        <AnimatedOrb isSpeaking={isSpeaking} />
      </div>

      {/* ElevenLabs Conversational AI Widget */}
      <div className="relative z-10 w-full max-w-4xl flex items-center justify-center">
        <elevenlabs-convai agent-id="agent_8801k8m0db1qed7ax67n2efe693j" />
      </div>

      {/* Talk to JARVIS floating button */}
      <button
        className={`fixed bottom-8 right-8 z-50 px-6 py-3 rounded-full font-medium backdrop-blur-sm transition-all duration-300 ${
          isSpeaking 
            ? 'bg-gradient-to-r from-primary to-secondary text-background shadow-[0_0_30px_rgba(180,148,246,0.8)] scale-110' 
            : 'bg-gradient-to-r from-primary/80 to-secondary/80 text-background shadow-[0_0_20px_rgba(180,148,246,0.4)] hover:scale-105'
        }`}
        onClick={() => {
          // ElevenLabs widget handles the interaction
          const widget = document.querySelector('elevenlabs-convai');
          if (widget) {
            (widget as any).click?.();
          }
        }}
      >
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isSpeaking ? 'bg-background animate-pulse-intense' : 'bg-background/80'}`} />
          {isSpeaking ? 'Listening...' : 'Talk to Granny'}
        </div>
      </button>
    </div>
  );
};
