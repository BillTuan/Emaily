import React, { Component } from "react";

class SurveyField extends Component {
  render() {
    const { input, label, meta: { touched, error } } = this.props;
    return (
      <div>
        <label>{label}</label>
        <input {...input} style={{ marginBottom: 5 }} />
        <div className="red-text" style={{ marginBottom: 20 }}>
          {touched && error}
        </div>
      </div>
    );
  }
}

export default SurveyField;
