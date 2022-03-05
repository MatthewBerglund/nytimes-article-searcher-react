export function slugify(string) {
  let formattedString = string.toLowerCase();
  formattedString = formattedString.replace(/\W+/g, '-');
  return formattedString;
}
