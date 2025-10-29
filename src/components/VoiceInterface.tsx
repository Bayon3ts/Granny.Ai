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
      {/* Exact reference background gradient */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, #020617 0%, #0B1120 100%)'
      }}>
        {/* Star particles with subtle motion */}
        <div className="absolute inset-0 opacity-50">
          {[...Array(120)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 2 + 0.5}px`,
                height: `${Math.random() * 2 + 0.5}px`,
                background: i % 3 === 0 ? '#6EE7F9' : i % 3 === 1 ? '#A5F3FC' : '#A78BFA',
                animation: `pulse-core ${2 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 3}s`,
                opacity: Math.random() * 0.7 + 0.2,
                boxShadow: `0 0 ${Math.random() * 4 + 2}px currentColor`,
              }}
            />
          ))}
        </div>
        
        {/* Thin horizontal scan lines */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-full h-[1px]"
              style={{
                top: `${(i + 1) * 5}%`,
                background: 'linear-gradient(90deg, transparent, #6EE7F9 50%, transparent)',
                opacity: 0.2,
              }}
            />
          ))}
        </div>
        
        {/* Light grid texture */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'linear-gradient(#6EE7F9 1px, transparent 1px), linear-gradient(90deg, #6EE7F9 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Header - Top Left matching reference */}
      <div className="absolute top-8 left-8 z-20 animate-fade-in">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
            isSpeaking 
              ? 'bg-[#6EE7F9] shadow-[0_0_20px_#6EE7F9] animate-pulse-intense' 
              : 'bg-[#6EE7F9] shadow-[0_0_12px_#6EE7F9]'
          }`} />
          <div>
            <h1 className="text-2xl md:text-3xl font-bold" style={{
              background: 'linear-gradient(135deg, #6EE7F9, #A78BFA)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Granny.AI
            </h1>
            <p className="text-xs md:text-sm font-light tracking-wider" style={{
              color: '#CBD5E1'
            }}>
              The Wise Digital Companion
            </p>
          </div>
        </div>
      </div>

      {/* 3D Animated Core - Centered matching reference proportions */}
      <div className="relative z-10 w-full max-w-5xl aspect-video">
        {/* Five concentric glowing rings with staggered expansion */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {isSpeaking && (
            <>
              <div className="absolute w-64 h-64 border border-[#6EE7F9]/50 rounded-full animate-wave-expand" 
                   style={{ animationDuration: '3s', boxShadow: '0 0 20px rgba(110, 231, 249, 0.3)' }} />
              <div className="absolute w-64 h-64 border border-[#A5F3FC]/40 rounded-full animate-wave-expand" 
                   style={{ animationDelay: '0.6s', animationDuration: '3s', boxShadow: '0 0 15px rgba(165, 243, 252, 0.2)' }} />
              <div className="absolute w-64 h-64 border border-[#6EE7F9]/30 rounded-full animate-wave-expand" 
                   style={{ animationDelay: '1.2s', animationDuration: '3s', boxShadow: '0 0 12px rgba(110, 231, 249, 0.15)' }} />
              <div className="absolute w-64 h-64 border border-[#A5F3FC]/20 rounded-full animate-wave-expand" 
                   style={{ animationDelay: '1.8s', animationDuration: '3s', boxShadow: '0 0 10px rgba(165, 243, 252, 0.1)' }} />
              <div className="absolute w-64 h-64 border border-[#6EE7F9]/15 rounded-full animate-wave-expand" 
                   style={{ animationDelay: '2.4s', animationDuration: '3s', boxShadow: '0 0 8px rgba(110, 231, 249, 0.08)' }} />
            </>
          )}
        </div>
        
        <AnimatedOrb isSpeaking={isSpeaking} />
      </div>

      {/* ElevenLabs Conversational AI Widget */}
      <div className="relative z-10 w-full max-w-4xl flex items-center justify-center">
        <elevenlabs-convai agent-id="agent_8801k8m0db1qed7ax67n2efe693j" />
      </div>

      {/* Talk to Granny button - exact reference styling */}
      <button
        className={`fixed bottom-8 right-8 z-50 px-8 py-4 rounded-full font-medium transition-all duration-300 backdrop-blur-md ${
          isSpeaking 
            ? 'bg-white text-[#020617] shadow-[0_0_30px_rgba(110,231,249,0.8)] scale-105' 
            : 'bg-white text-[#020617] shadow-[0_0_20px_rgba(110,231,249,0.5)] hover:scale-105 hover:shadow-[0_0_35px_rgba(110,231,249,0.7)]'
        }`}
        style={{
          border: isSpeaking ? '1px solid rgba(110, 231, 249, 0.5)' : '1px solid rgba(110, 231, 249, 0.3)',
        }}
        onClick={() => {
          const widget = document.querySelector('elevenlabs-convai');
          if (widget) {
            (widget as any).click?.();
          }
        }}
      >
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full transition-all ${
            isSpeaking 
              ? 'bg-[#6EE7F9] shadow-[0_0_12px_#6EE7F9] animate-pulse-intense' 
              : 'bg-[#6EE7F9] shadow-[0_0_8px_#6EE7F9]'
          }`} />
          <span className="text-sm font-semibold tracking-wide">
            {isSpeaking ? 'Listening...' : 'Talk to Granny'}
          </span>
        </div>
      </button>
    </div>
  );
};
