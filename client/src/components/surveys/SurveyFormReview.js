import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import _ from "lodash";
import FIELDS from "./formFields";
import * as actions from "../../actions";

class SurveyFormReview extends Component {
  reviewFields() {
    return _.map(FIELDS, ({ name, label }) => {
      return (
        <div key={name}>
          <label>{label}</label>
          <div>{this.props.formValues[name]}</div>
        </div>
      );
    });
  }

  render() {
    const { onCancel, formValues, submitSurvey, history } = this.props;
    return (
      <div>
        <h5>PLease comfirm your entries</h5>
        {this.reviewFields()}
        <button
          className="yellow white-text darken-3 btn-flat"
          onClick={onCancel}
        >
          Back
        </button>
        <button
          className="green white-text btn-flat right"
          onClick={() => submitSurvey(formValues, history)}
        >
          Send Survey
          <i className="material-icons right">email</i>
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    formValues: state.form.surveyForm.values
  };
}
export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
