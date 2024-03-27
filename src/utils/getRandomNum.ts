/**
 *  Returns a random number used to set Interval for Enemies spawning
 * @param min
 * @param max
 * @returns
 */
export default function getRandomNumber(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}
