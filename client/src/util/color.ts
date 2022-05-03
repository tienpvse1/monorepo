const randomBetween = (min: number, max: number) =>
  min + Math.floor(Math.random() * (max - min + 1));

export const getRandomRgba = (a: number) => {
  const r = randomBetween(0, 255);
  const g = randomBetween(0, 255);
  const b = randomBetween(0, 255);
  return `rgba(${r},${g},${b},${a})`;
};
