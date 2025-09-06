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
      text: 'Hello! I\'m Mish Mish, your personal style assistant! 👋✨ I\'m here to help you create amazing outfits, suggest color combinations, and make you look fabulous! What can I help you with today?',
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

    // Smart AI response based on user input
    setTimeout(() => {
      const userMessage = inputText.toLowerCase();
      let response = "";
      
      // Analyze user input and provide contextual responses
      if (userMessage.includes('hello') || userMessage.includes('hi') || userMessage.includes('hey')) {
        response = "Hello! I'm Mish Mish, your personal style assistant! 👋 I'm here to help you create amazing outfits. What can I help you with today?";
      } else if (userMessage.includes('outfit') || userMessage.includes('wear') || userMessage.includes('clothes')) {
        response = "Great! I love helping with outfits! 🎨 What's the occasion? Are you looking for something casual, formal, or something special?";
      } else if (userMessage.includes('color') || userMessage.includes('blue') || userMessage.includes('red') || userMessage.includes('black') || userMessage.includes('white')) {
        response = "I love that color choice! 💙 Colors can really make an outfit pop. What style are you going for with that color?";
      } else if (userMessage.includes('work') || userMessage.includes('office') || userMessage.includes('business')) {
        response = "Perfect for a professional look! 👔 I'd suggest pairing a nice blouse or shirt with tailored trousers. What's your workplace dress code like?";
      } else if (userMessage.includes('date') || userMessage.includes('romantic') || userMessage.includes('dinner')) {
        response = "Ooh, a date night! 💕 Let's create something that makes you feel confident and beautiful. What's the vibe - elegant, casual, or trendy?";
      } else if (userMessage.includes('party') || userMessage.includes('celebration') || userMessage.includes('night out')) {
        response = "Time to party! 🎉 Let's find something fun and stylish. Are you thinking sparkly, bold, or chic?";
      } else if (userMessage.includes('weather') || userMessage.includes('cold') || userMessage.includes('hot') || userMessage.includes('rain')) {
        response = "Weather is so important for outfit planning! 🌤️ Let me suggest some weather-appropriate pieces. What's the forecast like?";
      } else if (userMessage.includes('help') || userMessage.includes('advice') || userMessage.includes('suggest')) {
        response = "I'm here to help! 🤗 I can suggest outfit combinations, color pairings, or help you plan for any occasion. What do you need help with?";
      } else if (userMessage.includes('thank') || userMessage.includes('thanks')) {
        response = "You're so welcome! 😊 I love helping you look and feel amazing. Is there anything else I can help you with?";
      } else if (userMessage.includes('cute') || userMessage.includes('pretty') || userMessage.includes('beautiful')) {
        response = "Aww, thank you! 💖 You're going to look absolutely stunning! What style are you feeling today?";
      } else {
        // Default intelligent responses
        const defaultResponses = [
          "That's interesting! Tell me more about what you're looking for. I'd love to help you create the perfect look! ✨",
          "I love your style thinking! Let me help you put together something amazing. What's the occasion? 🎯",
          "Great idea! I'm here to make sure you look fabulous. What kind of vibe are you going for? 💫",
          "I'm excited to help you! Let's create something that makes you feel confident and stylish. What's your favorite style? 🌟",
          "That sounds wonderful! I can definitely help you with that. What colors or styles are you drawn to? 🎨",
          "Perfect! I love helping with style decisions. What's the occasion or mood you're going for? 💃",
          "I'm here for you! Let's make sure you look and feel amazing. What kind of outfit are you thinking about? ✨",
          "That's a great question! I'd love to help you figure that out. What's your style personality like? 🌈"
        ];
        response = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
      }
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 800); // Faster response time
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