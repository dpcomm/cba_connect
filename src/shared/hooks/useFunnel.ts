import { useState } from 'react';

interface FunnelOptions<T> {
  steps: T[];
  initialStep?: T;
}

export function useFunnel<T extends string>({ steps, initialStep }: FunnelOptions<T>) {
  const [currentStep, setCurrentStep] = useState<T>(initialStep || steps[0]);

  const currentIndex = steps.indexOf(currentStep);

  const hasNext = currentIndex < steps.length - 1;
  const hasPrev = currentIndex > 0;

  const next = () => {
    if (hasNext) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const prev = () => {
    if (hasPrev) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const goTo = (step: T) => {
    if (steps.includes(step)) {
      setCurrentStep(step);
    }
  };

  return {
    currentStep,
    stepIndex: currentIndex,
    steps,
    hasNext,
    hasPrev,
    next,
    prev,
    goTo,
  };
}
