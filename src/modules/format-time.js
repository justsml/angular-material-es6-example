export default function formatTime(seconds) {
  seconds       = parseFloat(seconds);
  var hours     = parseInt(seconds / 3600, 10) % 24;
  var minutes   = parseInt(seconds / 60, 10) % 60;
  var secs      = parseInt(seconds % 60, 10);
  var fragment  = (minutes < 10 ? "0" + minutes : minutes) + ":" + (secs  < 10 ? "0" + secs : secs);
  return hours > 0 ? ((hours < 10 ? "0" + hours : hours) + ":" + fragment) : fragment;
}
