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
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 md:p-12 overflow-hidden" style={{ background: '#02040A' }}>
      {/* Pure black background with minimal elements */}
      <div className="absolute inset-0">
        {/* Very subtle star particles */}
        <div className="absolute inset-0 animate-fade-in-slow">
          {[...Array(80)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 1.5 + 0.5}px`,
                height: `${Math.random() * 1.5 + 0.5}px`,
                background: '#00C8FF',
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${3 + Math.random() * 3}s`,
                opacity: Math.random() * 0.3 + 0.1,
                boxShadow: `0 0 ${Math.random() * 3 + 1}px #00C8FF`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Header - Top Left */}
      <div className="absolute top-6 left-6 md:top-8 md:left-8 z-20 animate-fade-in" style={{ animationDelay: '0.8s', animationFillMode: 'both' }}>
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full" style={{
            background: '#00C8FF',
            boxShadow: '0 0 15px #00C8FF, 0 0 30px #00C8FF',
          }} />
          <h1 className="text-base md:text-xl font-semibold tracking-wider uppercase" style={{
            color: '#00C8FF',
            textShadow: '0 0 20px rgba(0, 200, 255, 0.5)',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            letterSpacing: '0.15em',
          }}>
            Granny.AI
          </h1>
        </div>
      </div>

      {/* Status Indicator - Top Right */}
      <div className="absolute top-6 right-6 md:top-8 md:right-8 z-20 animate-fade-in" style={{ animationDelay: '1s', animationFillMode: 'both' }}>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full" style={{
            background: '#00C8FF',
            boxShadow: '0 0 10px #00C8FF',
          }} />
          <span className="text-xs font-light tracking-widest uppercase" style={{ 
            color: '#00C8FF',
            opacity: 0.8,
          }}>
            Online
          </span>
        </div>
      </div>

      {/* 3D Animated Core - Centered */}
      <div className="relative z-10 w-full max-w-6xl aspect-video animate-draw-ring" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
        {/* Voice-reactive expanding waves */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {isSpeaking && (
            <>
              <div className="absolute w-80 h-80 border-2 rounded-full animate-wave-expand" 
                   style={{ 
                     borderColor: 'rgba(0, 200, 255, 0.6)',
                     animationDuration: '2.5s', 
                     boxShadow: '0 0 40px rgba(0, 200, 255, 0.4), inset 0 0 40px rgba(0, 200, 255, 0.2)',
                     mixBlendMode: 'screen',
                   }} />
              <div className="absolute w-80 h-80 border-2 rounded-full animate-wave-expand" 
                   style={{ 
                     borderColor: 'rgba(98, 229, 255, 0.5)',
                     animationDelay: '0.5s', 
                     animationDuration: '2.5s', 
                     boxShadow: '0 0 30px rgba(98, 229, 255, 0.3), inset 0 0 30px rgba(98, 229, 255, 0.15)',
                     mixBlendMode: 'screen',
                   }} />
              <div className="absolute w-80 h-80 border-2 rounded-full animate-wave-expand" 
                   style={{ 
                     borderColor: 'rgba(0, 200, 255, 0.4)',
                     animationDelay: '1s', 
                     animationDuration: '2.5s', 
                     boxShadow: '0 0 25px rgba(0, 200, 255, 0.25)',
                     mixBlendMode: 'screen',
                   }} />
              <div className="absolute w-80 h-80 border-2 rounded-full animate-wave-expand" 
                   style={{ 
                     borderColor: 'rgba(98, 229, 255, 0.3)',
                     animationDelay: '1.5s', 
                     animationDuration: '2.5s', 
                     boxShadow: '0 0 20px rgba(98, 229, 255, 0.2)',
                     mixBlendMode: 'screen',
                   }} />
              <div className="absolute w-80 h-80 border-2 rounded-full animate-wave-expand" 
                   style={{ 
                     borderColor: 'rgba(0, 200, 255, 0.25)',
                     animationDelay: '2s', 
                     animationDuration: '2.5s', 
                     boxShadow: '0 0 15px rgba(0, 200, 255, 0.15)',
                     mixBlendMode: 'screen',
                   }} />
            </>
          )}
        </div>
        
        <AnimatedOrb isSpeaking={isSpeaking} />
      </div>

      {/* ElevenLabs Conversational AI Widget - positioned naturally */}
      <div className="fixed bottom-8 right-8 z-50">
        <elevenlabs-convai agent-id="agent_8801k8m0db1qed7ax67n2efe693j" />
      </div>
    </div>
  );
};
