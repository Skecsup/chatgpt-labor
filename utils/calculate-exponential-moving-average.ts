export const calculateExponentialMovingAverage = (
  sentimentData: number[]
): number => {
  const smoothingFactor = 0.2;

  const ema = sentimentData.reduce(
    (accumulator, currentValue) =>
      currentValue * smoothingFactor + accumulator * (1 - smoothingFactor),
    sentimentData[0]
  );

  return ema;
};
