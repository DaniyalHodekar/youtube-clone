export default function formatCount(count){
    let views = (count / 1e3).toFixed();
    let char = "K";
    if (views > 1000) {
      views /= 1000;
      views = views.toFixed(1);
      char = "M";
    }
    return [views, char];

}