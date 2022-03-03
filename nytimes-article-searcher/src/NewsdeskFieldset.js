import React from 'react';

class NewsdeskFieldset extends React.Component {
  render() {
    return (
      <fieldset id="newsdesk-fieldset">
          <legend>News desk:</legend>
          <div class="fieldset-option-container">
            <input type="checkbox" id="newsdesk-arts" value="Arts" />
            <label for="newsdesk-arts">Arts</label>
          </div>
          <div class="fieldset-option-container">
            <input type="checkbox" id="newsdesk-business" value="Business" />
            <label for="newsdesk-business">Business</label>
          </div>
          <div class="fieldset-option-container">
            <input type="checkbox" id="newsdesk-culture" value="Culture" />
            <label for="newsdesk-culture">Culture</label>
          </div>
          <div class="fieldset-option-container">
            <input type="checkbox" id="newsdesk-financial" value="Financial" />
            <label for="newsdesk-financial">Financial</label>
          </div>
          <div class="fieldset-option-container">
            <input type="checkbox" id="newsdesk-food" value="Food" />
            <label for="newsdesk-food">Food</label>
          </div>
          <div class="fieldset-option-container">
            <input type="checkbox" id="newsdesk-fashion" value="Fashion & Style" />
            <label for="newsdesk-fashion">Fashion & Style</label>
          </div>
          <div class="fieldset-option-container">
            <input type="checkbox" id="newsdesk-health" value="Health & Fitness" />
            <label for="newsdesk-health">Health & Fitness</label>
          </div>
          <div class="fieldset-option-container">
            <input type="checkbox" id="newsdesk-home" value="Home & Garden" />
            <label for="newsdesk-home">Home & Garden</label>
          </div>
          <div class="fieldset-option-container">
            <input type="checkbox" id="newsdesk-politics" value="Politics" />
            <label for="newsdesk-politics">Politics</label>
          </div>
          <div class="fieldset-option-container">
            <input type="checkbox" id="newsdesk-science" value="Science" />
            <label for="newsdesk-science">Science</label>
          </div>
          <div class="fieldset-option-container">
            <input type="checkbox" id="newsdesk-sports" value="Sports" />
            <label for="newsdesk-sports">Sports</label>
          </div>
          <div class="fieldset-option-container">
            <input type="checkbox" id="newsdesk-travel" value="Travel" />
            <label for="newsdesk-travel">Travel</label>
          </div>
        </fieldset>
    );
  }
}

export default NewsdeskFieldset;
