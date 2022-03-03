import React from 'react';

class MaterialTypeFieldset extends React.Component {
  render() {
    return (
      <fieldset id="material-types-fieldset">
        <legend>Material type:</legend>
        <div className="fieldset-option-container">
          <input type="checkbox" id="material-news" value="News" />
            <label htmlFor="material-news">News</label>
        </div>
        <div className="fieldset-option-container">
          <input type="checkbox" id="material-interview" value="Interview" />
            <label htmlFor="material-interview">Interview</label>
        </div>
        <div className="fieldset-option-container">
          <input type="checkbox" id="material-archives" value="Archives" />
            <label htmlFor="material-archives">Archives</label>
        </div>
        <div className="fieldset-option-container">
          <input type="checkbox" id="material-editorial" value="Editorial" />
            <label htmlFor="material-editorial">Editorial</label>
        </div>
        <div className="fieldset-option-container">
          <input type="checkbox" id="material-oped" value="Op-Ed" />
            <label htmlFor="material-oped">Op-Ed</label>
        </div>
      </fieldset>
    );
  }
}

export default MaterialTypeFieldset;
