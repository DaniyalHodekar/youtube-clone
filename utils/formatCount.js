export default function formatCount(count) {
  if (count > 1000) {
    let views = (count / 1e3).toFixed();
    let char = "K";
    if (views >= 1000) {
      views /= 1000;
      views = views.toFixed(1);
      char = "M";
    }
    return [views, char];
  }

  return [count, null];
}
