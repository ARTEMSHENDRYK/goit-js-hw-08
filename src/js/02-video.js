import Player from "@vimeo/player";
import throttle from "lodash.throttle";

const iframeRef = document.querySelector("#vimeo-player");
const player = new Player(iframeRef);
const LOCALSTORAGE_KEY = "videoplayer-current-time";

player.on("timeupdate",
  throttle(
    function ({ seconds }) {
      localStorage.setItem(LOCALSTORAGE_KEY, seconds);
    },
    1000, { "trailing": false }
  )
);

player.setCurrentTime(localStorage.getItem(LOCALSTORAGE_KEY) || 0);