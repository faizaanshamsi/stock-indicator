export default function largeMove (currentTick, lastTick) {
  var percentChange = (currentTick / lastTick) - 1;
  var absPercentChange = Math.abs(percentChange);
  return absPercentChange > 0.05;
}
