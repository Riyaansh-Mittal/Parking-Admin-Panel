import { Icon } from '@/components/atoms/Icon';
import { cn } from '@/utils';
import type { IconName } from '@/components/atoms/Icon';

export interface Step {
  id: string;
  label: string;
  description?: string;
  icon?: IconName;
}

export interface StepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
  allowClickToNavigate?: boolean;
}

export const Stepper = ({
  steps,
  currentStep,
  onStepClick,
  allowClickToNavigate = false,
}: StepperProps) => {
  const handleStepClick = (index: number) => {
    if (allowClickToNavigate && onStepClick && index <= currentStep) {
      onStepClick(index);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          const isClickable = allowClickToNavigate && index <= currentStep;

          return (
            <div key={step.id} className="flex flex-1 items-center">
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => handleStepClick(index)}
                  disabled={!isClickable}
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all',
                    isCompleted &&
                      'border-indigo-600 bg-indigo-600 text-white',
                    isActive &&
                      'border-indigo-600 bg-white text-indigo-600',
                    !isActive &&
                      !isCompleted &&
                      'border-slate-300 bg-white text-slate-400',
                    isClickable && 'cursor-pointer hover:border-indigo-700',
                    !isClickable && 'cursor-not-allowed'
                  )}
                >
                  {isCompleted ? (
                    <Icon name="Check" size="sm" />
                  ) : step.icon ? (
                    <Icon name={step.icon} size="sm" />
                  ) : (
                    <span className="text-sm font-semibold">{index + 1}</span>
                  )}
                </button>
                <div className="mt-2 text-center">
                  <p
                    className={cn(
                      'text-sm font-medium',
                      isActive || isCompleted
                        ? 'text-slate-900'
                        : 'text-slate-500'
                    )}
                  >
                    {step.label}
                  </p>
                  {step.description && (
                    <p className="mt-0.5 text-xs text-slate-500">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'mx-4 h-0.5 flex-1 transition-colors',
                    isCompleted ? 'bg-indigo-600' : 'bg-slate-300'
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

Stepper.displayName = 'Stepper';
