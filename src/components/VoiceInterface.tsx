import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  type: "user" | "assistant";
  text: string;
  timestamp: Date;
}

export const VoiceInterface = () => {
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      text: "Hello dear, I'm here to help. Just press the button and speak to me.",
      timestamp: new Date(),
    },
  ]);
  const { toast } = useToast();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playTextToSpeech = async (text: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/text-to-speech`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            text,
            voiceId: "9BWtsMINqrJLrRacOk9x" // Aria voice - warm and caring
          })
        }
      );

      if (!response.ok) {
        const error = await response.json().catch(() => null);
        console.error('TTS failed:', error);
        toast({
          title: "Voice Error",
          description: "Couldn't generate speech. Please try again.",
          variant: "destructive"
        });
        return;
      }

      const blob = await response.blob();
      const audioUrl = URL.createObjectURL(blob);
      
      // Stop any currently playing audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      
      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
        audioRef.current = null;
      };
      
      await audio.play();
    } catch (error) {
      console.error('Error playing TTS:', error);
      toast({
        title: "Playback Error",
        description: "Couldn't play audio. Please check your speakers.",
        variant: "destructive"
      });
    }
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    
    // Demo: simulate voice interaction
    if (!isListening) {
      setTimeout(() => {
        const userMessage: Message = {
          id: Date.now().toString(),
          type: "user",
          text: "Hi Granny, call my son.",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, userMessage]);
        
        setTimeout(async () => {
          const responseText = "Of course, dear. I'll call your son right away. 💕";
          const assistantMessage: Message = {
            id: (Date.now() + 1).toString(),
            type: "assistant",
            text: responseText,
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, assistantMessage]);
          
          // Play the response using ElevenLabs TTS
          await playTextToSpeech(responseText);
          
          setIsListening(false);
        }, 1500);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-6 md:p-12">
      {/* Header */}
      <div className="text-center space-y-2 animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
          Granny.Ai
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground">
          Your caring companion, always listening
        </p>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 w-full max-w-3xl my-8 space-y-4 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`animate-fade-in flex ${
              message.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-6 py-4 shadow-soft ${
                message.type === "user"
                  ? "bg-gradient-to-br from-primary to-accent text-primary-foreground"
                  : "bg-card text-card-foreground border border-border"
              }`}
            >
              <p className="text-lg md:text-xl leading-relaxed">{message.text}</p>
              <span className="text-xs opacity-70 mt-2 block">
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Voice Button */}
      <div className="flex flex-col items-center gap-6">
        {/* Waveform Animation */}
        {isListening && (
          <div className="flex gap-2 h-16 items-end">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-2 bg-gradient-to-t from-primary to-secondary rounded-full animate-wave"
                style={{
                  animationDelay: `${i * 0.1}s`,
                  height: "100%",
                }}
              />
            ))}
          </div>
        )}

        <Button
          onClick={toggleListening}
          size="lg"
          className={`
            relative h-32 w-32 rounded-full shadow-glow
            ${
              isListening
                ? "bg-gradient-to-br from-secondary to-destructive"
                : "bg-gradient-to-br from-primary to-accent"
            }
            hover:scale-110 transition-all duration-300
            ${!isListening && "animate-pulse-soft"}
          `}
        >
          {isListening ? (
            <MicOff className="h-16 w-16 text-primary-foreground" />
          ) : (
            <Mic className="h-16 w-16 text-primary-foreground" />
          )}
        </Button>

        <p className="text-lg md:text-xl text-center text-muted-foreground max-w-md">
          {isListening
            ? "I'm listening, dear... 🎤"
            : "Press the button to speak"}
        </p>
      </div>
    </div>
  );
};
