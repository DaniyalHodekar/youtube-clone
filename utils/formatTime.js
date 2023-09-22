export default function formatTime(string) {
  let st = new Set(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
  let i = string.length - 1;
  let res = "";

  while (i >= 0) {
    let time = "";

    switch (string[i]) {
      case "S": {
        i--;
        while (st.has(string[i])) {
          time = string[i] + time;
          i--;
        }
        if (Number(time) < 10) {
          res = "0" + time;
        } else {
          res = res + time;
        }
        break;
      }
      case "M": {
        i--;
        if (res.length <= 0) {
          res = "00";
        }
        while (st.has(string[i])) {
          time = string[i] + time;
          i--;
        }

        res = time + ":" + res;

        break;
      }
      case "H": {
        i--;
        if (res.length <= 0) {
          res = "00";
        }
        while (st.has(string[i])) {
          time = string[i] + time;
          i--;
        }

        res = time + ":" + res;

        break;
      }
      default: {
        if (res.length === 2) {
          return "0:" + res;
        }
        return res;
      }
    }
  }

  if (res.length === 2) {
    return "0:" + res;
  }
  return res;
}
