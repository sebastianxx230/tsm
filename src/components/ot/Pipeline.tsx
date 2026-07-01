import { Check } from 'lucide-react';
import { pipelineStages, type PipelineStage } from '../../data/mockData';

interface PipelineProps {
  current: PipelineStage;
  onStageClick?: (stage: PipelineStage) => void;
}

export default function Pipeline({ current, onStageClick }: PipelineProps) {
  const currentIndex = pipelineStages.indexOf(current);

  return (
    <div className="flex items-center overflow-x-auto scrollbar-thin pb-1">
      {pipelineStages.map((stage, idx) => {
        const isCompleted = idx < currentIndex;
        const isActive = idx === currentIndex;
        const isLast = idx === pipelineStages.length - 1;

        return (
          <div key={stage} className="flex items-center shrink-0">
            <button
              onClick={() => onStageClick?.(stage)}
              className={`group flex items-center gap-2 px-3.5 py-1.5 rounded-md text-sm font-medium transition-all ${
                isActive
                  ? 'bg-brand-600 text-white shadow-sm'
                  : isCompleted
                    ? 'bg-brand-50 text-brand-700 hover:bg-brand-100'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {isCompleted ? (
                <span className="w-4 h-4 rounded-full bg-brand-500 flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                </span>
              ) : (
                <span
                  className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isActive ? 'bg-white/25 text-white' : 'bg-white text-gray-400'
                  }`}
                >
                  {idx + 1}
                </span>
              )}
              {stage}
            </button>
            {!isLast && (
              <div className={`w-6 h-px mx-0.5 ${isCompleted ? 'bg-brand-400' : 'bg-gray-200'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
