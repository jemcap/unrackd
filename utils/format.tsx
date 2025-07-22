export const formatFollowers = (count: number) => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  } else if (count >= 1000 && count < 1000000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
};
