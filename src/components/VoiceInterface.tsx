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
      {/* Deep dark background */}
      <div className="absolute inset-0 bg-[#0a0e1a]">
        {/* Subtle star field */}
        <div className="absolute inset-0 opacity-40">
          {[...Array(80)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-[#4fc3f7]"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                animation: `pulse-core ${2 + Math.random() * 3}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 3}s`,
                opacity: Math.random() * 0.6 + 0.2,
              }}
            />
          ))}
        </div>
        
        {/* Faint horizontal tech lines */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[#4fc3f7] to-transparent"
              style={{
                top: `${(i + 1) * 8}%`,
                opacity: 0.3,
              }}
            />
          ))}
        </div>
      </div>

      {/* Header - Top Left like reference */}
      <div className="absolute top-8 left-8 z-20 animate-fade-in">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
            isSpeaking 
              ? 'bg-[#4fc3f7] shadow-[0_0_20px_#4fc3f7] animate-pulse-intense' 
              : 'bg-[#7dd3c0] shadow-[0_0_10px_#7dd3c0]'
          }`} />
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#4fc3f7] via-[#b794f6] to-[#7dd3c0] bg-clip-text text-transparent">
              Granny.AI
            </h1>
            <p className="text-xs md:text-sm text-[#4fc3f7]/60 font-light tracking-wider">
              The Wise Digital Companion
            </p>
          </div>
        </div>
      </div>

      {/* 3D Animated Core - Centered */}
      <div className="relative z-10 w-full max-w-4xl aspect-video">
        {/* Pulsing expanding waves when speaking */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {isSpeaking && (
            <>
              <div className="absolute w-72 h-72 border border-[#4fc3f7]/40 rounded-full animate-wave-expand" />
              <div className="absolute w-72 h-72 border border-[#4fc3f7]/25 rounded-full animate-wave-expand" style={{ animationDelay: '0.4s' }} />
              <div className="absolute w-72 h-72 border border-[#4fc3f7]/15 rounded-full animate-wave-expand" style={{ animationDelay: '0.8s' }} />
            </>
          )}
        </div>
        
        <AnimatedOrb isSpeaking={isSpeaking} />
      </div>

      {/* ElevenLabs Conversational AI Widget */}
      <div className="relative z-10 w-full max-w-4xl flex items-center justify-center">
        <elevenlabs-convai agent-id="agent_8801k8m0db1qed7ax67n2efe693j" />
      </div>

      {/* Talk to Granny floating button - matching reference style */}
      <button
        className={`fixed bottom-8 right-8 z-50 px-8 py-4 rounded-full font-medium transition-all duration-300 border ${
          isSpeaking 
            ? 'bg-white text-[#0a0e1a] border-white shadow-[0_0_40px_rgba(79,195,247,0.8)] scale-105' 
            : 'bg-white/90 text-[#0a0e1a] border-white/90 shadow-[0_0_25px_rgba(79,195,247,0.5)] hover:scale-105 hover:shadow-[0_0_35px_rgba(79,195,247,0.7)]'
        }`}
        onClick={() => {
          // ElevenLabs widget handles the interaction
          const widget = document.querySelector('elevenlabs-convai');
          if (widget) {
            (widget as any).click?.();
          }
        }}
      >
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full transition-all ${
            isSpeaking 
              ? 'bg-[#4fc3f7] shadow-[0_0_10px_#4fc3f7] animate-pulse-intense' 
              : 'bg-[#7dd3c0] shadow-[0_0_8px_#7dd3c0]'
          }`} />
          <span className="text-sm font-semibold tracking-wide">
            {isSpeaking ? 'Listening...' : 'Talk to Granny'}
          </span>
        </div>
      </button>
    </div>
  );
};
