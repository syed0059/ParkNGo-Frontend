export function formatString(string) {
  words = string.toLowerCase().split(" ");
  result = "";
  for (i = 0; i < words.length; i++) {
    word = words[i];
    first = word.charAt(0);
    if (isAlpha(first)) {
      first = first.toUpperCase();
      formattedword = first + word.slice(1);
    } else {
      formattedword = word.toUpperCase();
    }
    result = result + formattedword + " ";
  }
  return result.trim();
}

var isAlpha = function (ch) {
  return /^[A-Z]$/i.test(ch);
};
