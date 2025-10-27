import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";

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
        
        setTimeout(() => {
          const assistantMessage: Message = {
            id: (Date.now() + 1).toString(),
            type: "assistant",
            text: "Of course, dear. I'll call your son right away. 💕",
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, assistantMessage]);
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
