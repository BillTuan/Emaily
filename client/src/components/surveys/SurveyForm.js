import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField";
import _ from "lodash";
import { Link } from "react-router-dom";
import validateEmail from "../../utils/validateEmail";

const FIELDS = [
  { label: "Survey title", name: "title" },
  { label: "Subject line", name: "subject" },
  { label: "Email body", name: "body" },
  { label: "Recipient list", name: "emails" }
];
class SurveyForm extends Component {
  renderFields() {
    return _.map(FIELDS, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={SurveyField}
          type="text"
          name={name}
          label={label}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">arrow_forward</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const error = {};

  error.emails = validateEmail(values.emails || "");

  _.each(FIELDS, ({ name }) => {
    if (!values[name]) {
      error[name] = "You must provide a " + name;
    }
  });

  return error;
}

export default reduxForm({
  validate,
  form: "surveyForm"
})(SurveyForm);
