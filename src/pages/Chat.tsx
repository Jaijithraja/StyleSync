import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import TwinklingStars from '@/components/TwinklingStars';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const Chat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m Mish Mish, your style buddy!',
      sender: 'ai',
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');

    // Simulate AI response with more variety
    setTimeout(() => {
      const responses = [
        "That sounds great! I can help you with that. What's your style preference for today?",
        "I love that idea! Let me suggest some outfit combinations for you.",
        "Perfect! Based on your wardrobe, I think you'd look amazing in a casual-chic style.",
        "Great choice! I can help you create the perfect look. What's the occasion?",
        "I'm here to help you look fabulous! What kind of outfit are you thinking about?",
        "That's a wonderful idea! Let me help you put together something stylish.",
        "I love your style sense! Tell me more about what you're looking for.",
        "Excellent! I can definitely help you with that. What's your favorite color today?"
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gradient-start to-gradient-end relative flex flex-col">
      <TwinklingStars count={10} />
      
      {/* Header */}
      <header className="flex items-center p-6 bg-white/80 backdrop-blur-sm border-b border-border relative z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/home')}
          className="mr-4"
        >
          <ArrowLeft size={24} />
        </Button>
        
        <div className="flex items-center space-x-3">
          <img 
            src="/assets/mish-mish.png" 
            alt="Mish Mish avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <h1 className="font-semibold text-lg">Mish Mish</h1>
            <p className="text-sm text-muted-foreground">Your style buddy</p>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 relative z-10">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.sender === 'ai' && (
              <img 
                src="/assets/mish-mish.png" 
                alt="Mish Mish"
                className="w-8 h-8 rounded-full object-cover mr-2 mt-1 flex-shrink-0"
              />
            )}
            <div
              className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                message.sender === 'user'
                  ? 'bg-chat-user text-white'
                  : 'bg-chat-ai text-foreground'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className={`text-xs mt-1 ${
                message.sender === 'user' ? 'text-white/70' : 'text-muted-foreground'
              }`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-6 bg-white/80 backdrop-blur-sm border-t border-border relative z-10">
        <div className="flex items-center space-x-4">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 h-12 rounded-full border-maroon"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button
            onClick={handleSendMessage}
            className="w-12 h-12 rounded-full bg-maroon hover:bg-maroon/90 flex-shrink-0"
          >
            <Send size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;