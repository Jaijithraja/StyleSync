import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sun, Cloud, Plus, Calendar, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { eventsApi, outfitsApi } from '@/lib/api';
import { Event, Outfit } from '@/lib/supabase';
import TwinklingStars from '@/components/TwinklingStars';

const Planner = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [events, setEvents] = useState<(Event & { outfit?: Outfit })[]>([]);
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState({
    temperature: 22,
    condition: 'Sunny',
    description: 'Sunny and clear',
  });

  useEffect(() => {
    if (user) {
      loadEvents();
      loadWeather();
    }
  }, [user]);

  const loadEvents = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const eventsData = await eventsApi.getUpcoming(user.id, 10);
      setEvents(eventsData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load events",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadWeather = async () => {
    // In a real app, you would call a weather API here
    // For now, we'll use mock data
    setWeather({
      temperature: 22,
      condition: 'Sunny',
      description: 'Sunny and clear',
    });
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return Sun;
      case 'cloudy':
      case 'overcast':
        return Cloud;
      default:
        return Sun;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const quickSuggestions = [
    { name: 'Rainy Day', description: 'Jacket + Boots', icon: '🌧️' },
    { name: 'Sunny Day', description: 'Light & Airy', icon: '☀️' },
    { name: 'Cold Weather', description: 'Layers + Coat', icon: '🧥' },
    { name: 'Hot Weather', description: 'Light & Breathable', icon: '🌞' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gradient-start to-gradient-end relative">
      <TwinklingStars count={8} />
      
      <div className="relative z-10">
        {/* Header */}
        <header className="flex items-center p-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/home')}
            className="mr-4"
          >
            <ArrowLeft size={24} />
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Outfit Planner</h1>
        </header>

        {/* Today's Weather */}
        <div className="px-6 mb-6">
          <div className="bg-white/80 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-foreground mb-3">Today's Weather</h2>
            <div className="flex items-center space-x-4">
              {React.createElement(getWeatherIcon(weather.condition), {
                className: "text-yellow-500",
                size: 40
              })}
              <div>
                <p className="text-2xl font-bold text-foreground">{weather.temperature}°C</p>
                <p className="text-muted-foreground">{weather.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="px-6 mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Upcoming Events</h2>
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading events...</p>
            </div>
          ) : events.length > 0 ? (
            <div className="space-y-4">
              {events.map((event) => (
                <div key={event.id} className="bg-white/80 rounded-xl p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-foreground">{event.title}</h3>
                    {event.weather_condition && (
                      <span className="text-sm text-muted-foreground capitalize">
                        {event.weather_condition}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-3">
                    <Calendar size={16} />
                    <span>{formatDate(event.date)}</span>
                    {event.location && (
                      <>
                        <MapPin size={16} />
                        <span>{event.location}</span>
                      </>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="text-lg">👔</div>
                      <span className="text-sm font-medium text-foreground">
                        Outfit: {event.outfit?.name || 'Not planned'}
                      </span>
                    </div>
                    
                    {!event.outfit && (
                      <Button
                        size="sm"
                        className="text-xs bg-primary hover:bg-primary/90"
                        onClick={() => navigate('/randomise')}
                      >
                        + Plan outfit
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">📅</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No upcoming events</h3>
              <p className="text-muted-foreground mb-4">Add some events to start planning your outfits</p>
              <Button onClick={() => navigate('/home')}>
                <Plus size={20} className="mr-2" />
                Add Event
              </Button>
            </div>
          )}
        </div>

        {/* Quick Suggestions */}
        <div className="px-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Quick Suggestions</h2>
          <div className="grid grid-cols-2 gap-4">
            {quickSuggestions.map((suggestion, index) => (
              <div key={index} className="bg-white/60 rounded-2xl p-4 text-center">
                <div className="text-3xl mb-2">{suggestion.icon}</div>
                <h3 className="font-semibold text-foreground text-sm mb-1">{suggestion.name}</h3>
                <p className="text-xs text-muted-foreground">{suggestion.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Add Button */}
        <Button
          className="fixed bottom-8 right-8 w-14 h-14 bg-primary hover:bg-primary/90 rounded-full shadow-lg"
        >
          <Plus size={24} />
        </Button>
      </div>
    </div>
  );
};

export default Planner;