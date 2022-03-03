import React from 'react';

class MaterialTypeFieldset extends React.Component {
  render() {
    return (
      <fieldset id="material-types-fieldset">
        <legend>Material type:</legend>
        <div class="fieldset-option-container">
          <input type="checkbox" id="material-news" value="News" />
            <label for="material-news">News</label>
        </div>
        <div class="fieldset-option-container">
          <input type="checkbox" id="material-interview" value="Interview" />
            <label for="material-interview">Interview</label>
        </div>
        <div class="fieldset-option-container">
          <input type="checkbox" id="material-archives" value="Archives" />
            <label for="material-archives">Archives</label>
        </div>
        <div class="fieldset-option-container">
          <input type="checkbox" id="material-editorial" value="Editorial" />
            <label for="material-editorial">Editorial</label>
        </div>
        <div class="fieldset-option-container">
          <input type="checkbox" id="material-oped" value="Op-Ed" />
            <label for="material-oped">Op-Ed</label>
        </div>
      </fieldset>
    );
  }
}

export default MaterialTypeFieldset;
