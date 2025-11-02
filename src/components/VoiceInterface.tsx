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
      {/* Deep space background with animated starfield */}
      <div className="absolute inset-0">
        {/* Animated star particles */}
        <div className="absolute inset-0 animate-fade-in-slow">
          {[...Array(150)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-flicker"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 2.5 + 0.5}px`,
                height: `${Math.random() * 2.5 + 0.5}px`,
                background: i % 3 === 0 ? '#00C8FF' : i % 3 === 1 ? '#62E5FF' : '#B8E8FF',
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
                opacity: Math.random() * 0.6 + 0.2,
                boxShadow: `0 0 ${Math.random() * 6 + 2}px currentColor`,
              }}
            />
          ))}
        </div>
        
        {/* Horizontal scan lines */}
        <div className="absolute inset-0 opacity-[0.08]">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-full h-[1px]"
              style={{
                top: `${(i + 1) * 3.33}%`,
                background: 'linear-gradient(90deg, transparent, #00C8FF 50%, transparent)',
                opacity: 0.3,
              }}
            />
          ))}
        </div>
        
        {/* Radial lines from center */}
        <div className="absolute inset-0 opacity-5">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 w-[1px] h-full origin-top"
              style={{
                background: 'linear-gradient(180deg, transparent, #00C8FF 50%, transparent)',
                transform: `translateX(-50%) rotate(${i * 30}deg)`,
              }}
            />
          ))}
        </div>
        
        {/* Light grid texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(#00C8FF 1px, transparent 1px), linear-gradient(90deg, #00C8FF 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
      </div>

      {/* Header - Top Left */}
      <div className="absolute top-6 left-6 md:top-8 md:left-8 z-20 animate-fade-in" style={{ animationDelay: '0.8s', animationFillMode: 'both' }}>
        <div className="flex items-center gap-3">
          <div className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
            isSpeaking 
              ? 'animate-pulse-intense' 
              : 'animate-flicker'
          }`} style={{
            background: '#00C8FF',
            boxShadow: isSpeaking ? '0 0 20px #00C8FF' : '0 0 12px #00C8FF',
          }} />
          <div>
            <h1 className="text-xl md:text-3xl font-bold tracking-wide" style={{
              background: 'linear-gradient(135deg, #00C8FF, #A78BFA)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 30px rgba(0, 200, 255, 0.3)',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              letterSpacing: '0.05em',
            }}>
              Granny.AI
            </h1>
            <p className="text-xs md:text-sm font-light tracking-wider" style={{
              color: '#B8E8FF',
              opacity: 0.9,
            }}>
              The Wise Digital Companion
            </p>
          </div>
        </div>
      </div>

      {/* Status Indicator - Top Right */}
      <div className="absolute top-6 right-6 md:top-8 md:right-8 z-20 animate-fade-in" style={{ animationDelay: '1s', animationFillMode: 'both' }}>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full animate-flicker" style={{
            background: '#00F0FF',
            boxShadow: '0 0 15px #00F0FF',
          }} />
          <span className="text-xs md:text-sm font-light tracking-wider" style={{ color: '#E0F7FF' }}>
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

      {/* ElevenLabs Conversational AI Widget */}
      <div className="relative z-10 w-full max-w-4xl flex items-center justify-center">
        <elevenlabs-convai agent-id="agent_8801k8m0db1qed7ax67n2efe693j" />
      </div>

      {/* Hidden ElevenLabs widget trigger */}
      <button
        className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 px-6 py-3 md:px-8 md:py-4 rounded-full font-medium transition-all duration-500 backdrop-blur-xl animate-fade-in ${
          isSpeaking 
            ? 'scale-105' 
            : 'hover:scale-105'
        }`}
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          color: '#02040A',
          border: isSpeaking ? '2px solid #00C8FF' : '1px solid rgba(0, 200, 255, 0.3)',
          boxShadow: isSpeaking 
            ? '0 0 40px rgba(0, 200, 255, 0.8), 0 0 60px rgba(0, 200, 255, 0.4)' 
            : '0 0 25px rgba(0, 200, 255, 0.4)',
          animationDelay: '1.2s',
          animationFillMode: 'both',
        }}
        onClick={() => {
          const widget = document.querySelector('elevenlabs-convai');
          if (widget) {
            (widget as any).click?.();
          }
        }}
      >
        <div className="flex items-center gap-3">
          <div className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all ${
            isSpeaking 
              ? 'animate-pulse-intense' 
              : 'animate-flicker'
          }`} style={{
            background: '#00C8FF',
            boxShadow: isSpeaking ? '0 0 15px #00C8FF' : '0 0 10px #00C8FF',
          }} />
          <span className="text-xs md:text-sm font-semibold tracking-wide">
            {isSpeaking ? 'Listening...' : 'Talk to Granny'}
          </span>
        </div>
      </button>
    </div>
  );
};
