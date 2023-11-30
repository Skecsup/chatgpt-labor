const handleGlobalSentiment = (
  currentSentiment: number,
  previousSentiment: number
) => {
  if (currentSentiment >= -1 && currentSentiment <= -0.7) {
    return "Current sentiment is in the range of -1 to -0.7";
  } else if (currentSentiment >= 0.7 && currentSentiment <= 1) {
    return "Current sentiment is in the range of 0.7 to 1";
  } else if (currentSentiment > previousSentiment) {
    return "Current sentiment is greater than 1";
  } else if (currentSentiment < previousSentiment) {
    return "Current sentiment is smaller than -1 or between -0.7 and 0.7";
  }
};
