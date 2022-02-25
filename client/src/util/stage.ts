export const qualifyStage = (index: number, stageIndex: number) => {
  if (index === stageIndex) return 'process';
  if (index > stageIndex) return 'wait';
  return 'finish';
};
