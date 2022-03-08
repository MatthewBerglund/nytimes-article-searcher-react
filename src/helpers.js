export function slugify(string) {
  let formattedString = string.toLowerCase();
  formattedString = formattedString.replace(/\W+/g, '-');
  return formattedString;
}

export function camelCaseify(string) {
  const words = string.replace(/\W+/g, ' ').split(' ');
  const firstWord = words.shift().toLowerCase();
  words.unshift(firstWord);
  return words.join('');
}
