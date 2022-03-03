import React from 'react';

class NewsdeskFieldset extends React.Component {
  render() {
    return (
      <fieldset id="newsdesk-fieldset">
          <legend>News desk:</legend>
          <div className="fieldset-option-container">
            <input type="checkbox" id="newsdesk-arts" value="Arts" />
            <label htmlFor="newsdesk-arts">Arts</label>
          </div>
          <div className="fieldset-option-container">
            <input type="checkbox" id="newsdesk-business" value="Business" />
            <label htmlFor="newsdesk-business">Business</label>
          </div>
          <div className="fieldset-option-container">
            <input type="checkbox" id="newsdesk-culture" value="Culture" />
            <label htmlFor="newsdesk-culture">Culture</label>
          </div>
          <div className="fieldset-option-container">
            <input type="checkbox" id="newsdesk-financial" value="Financial" />
            <label htmlFor="newsdesk-financial">Financial</label>
          </div>
          <div className="fieldset-option-container">
            <input type="checkbox" id="newsdesk-food" value="Food" />
            <label htmlFor="newsdesk-food">Food</label>
          </div>
          <div className="fieldset-option-container">
            <input type="checkbox" id="newsdesk-fashion" value="Fashion & Style" />
            <label htmlFor="newsdesk-fashion">Fashion & Style</label>
          </div>
          <div className="fieldset-option-container">
            <input type="checkbox" id="newsdesk-health" value="Health & Fitness" />
            <label htmlFor="newsdesk-health">Health & Fitness</label>
          </div>
          <div className="fieldset-option-container">
            <input type="checkbox" id="newsdesk-home" value="Home & Garden" />
            <label htmlFor="newsdesk-home">Home & Garden</label>
          </div>
          <div className="fieldset-option-container">
            <input type="checkbox" id="newsdesk-politics" value="Politics" />
            <label htmlFor="newsdesk-politics">Politics</label>
          </div>
          <div className="fieldset-option-container">
            <input type="checkbox" id="newsdesk-science" value="Science" />
            <label htmlFor="newsdesk-science">Science</label>
          </div>
          <div className="fieldset-option-container">
            <input type="checkbox" id="newsdesk-sports" value="Sports" />
            <label htmlFor="newsdesk-sports">Sports</label>
          </div>
          <div className="fieldset-option-container">
            <input type="checkbox" id="newsdesk-travel" value="Travel" />
            <label htmlFor="newsdesk-travel">Travel</label>
          </div>
        </fieldset>
    );
  }
}

export default NewsdeskFieldset;
