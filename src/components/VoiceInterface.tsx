import { useEffect } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'elevenlabs-convai': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { 'agent-id': string }, HTMLElement>;
    }
  }
}

export const VoiceInterface = () => {
  useEffect(() => {
    // Load the ElevenLabs widget script
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
    script.async = true;
    script.type = 'text/javascript';
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
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

      {/* ElevenLabs Conversational AI Widget */}
      <div className="w-full max-w-4xl flex-1 flex items-center justify-center">
        <elevenlabs-convai agent-id="agent_8801k8m0db1qed7ax67n2efe693j" />
      </div>
    </div>
  );
};
