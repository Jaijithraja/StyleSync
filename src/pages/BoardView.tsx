import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TwinklingStars from '@/components/TwinklingStars';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const BoardView: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gradient-start to-gradient-end relative">
      <TwinklingStars count={8} />
      <div className="relative z-10 p-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="mr-4">
            <ArrowLeft size={24} />
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Board {id}</h1>
        </div>

        <div className="bg-white/80 rounded-2xl p-6 shadow-sm">
          <p className="text-muted-foreground">This board is empty for now.</p>
        </div>
      </div>
    </div>
  );
};

export default BoardView;
