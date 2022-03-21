export function slugify(string) {
  let formattedString = string.toLowerCase();
  formattedString = formattedString.replace(/\W+/g, '-');
  return formattedString;
}

export function camelCaseify(string) {
  string = string.toLowerCase();
  let words = string.replace(/\W+/g, ' ').split(' ');
  const firstWord = words.shift();
  
  words = words.map(word => {
    const letters = word.split('');
    letters[0] = letters[0].toUpperCase();
    return letters.join('');
  });
  
  words.unshift(firstWord);
  return words.join('');
}

export function getValuesFromFieldset(fieldset) {
  const elements = Array.from(fieldset.elements);
  const selectedElements = elements.filter(element => element.checked);
  const values = selectedElements.map(element => element.value);
  return values;
}
