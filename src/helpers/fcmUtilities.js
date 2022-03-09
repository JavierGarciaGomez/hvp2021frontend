export const isLastStep = (activeStep, steps) => {
  return activeStep === steps.length - 1;
};

export const areAllStepsCompleted = (completedSteps, steps) => {
  return totalCompletedSteps(completedSteps) === steps.length;
};

export const totalCompletedSteps = (completedSteps) => {
  return Object.keys(completedSteps).length;
};
