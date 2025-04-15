import React from 'react';
import Card from '../common/Card';
import GlowingCard from '../common/GlowingCard';
import { ToneOfVoice } from '../../types/models';

interface ToneSelectorProps {
  tones: ToneOfVoice[];
  selectedTone: ToneOfVoice | null;
  onSelectTone: (tone: ToneOfVoice) => void;
}

const ToneSelector: React.FC<ToneSelectorProps> = ({
  tones,
  selectedTone,
  onSelectTone,
}) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-3">Tone of Voice</h3>
      <div className="grid grid-cols-2 gap-2 max-h-[200px] overflow-y-auto pr-1">
        {tones.map((tone) => (
          <div
            key={tone.id}
            className={`cursor-pointer transition-all duration-200 ${
              selectedTone?.id === tone.id
                ? 'ring-2 ring-whatsapp'
                : ''
            }`}
            onClick={() => onSelectTone(tone)}
          >
            <GlowingCard
              className="h-full p-3"
              type="tone"
              disabled={false}
              glow={selectedTone?.id === tone.id}
            >
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-medium text-sm">{tone.name}</h4>
              </div>
              <p className="text-gray-600 text-xs dark:text-gray-300 line-clamp-2">{tone.description}</p>
            </GlowingCard>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToneSelector;
