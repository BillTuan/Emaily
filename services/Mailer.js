const sendgrid = require("sendgrid");
const helper = sendgrid.mail;
const key = require("../config/key.js");

class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super();
    this.from_email = new helper.Email("no-reply@email.com");
    this.subject = subject;
    this.body = new helper.Content("text/html", content);
    this.recipients = this.formatAddresses(recipients);

    this.addContent(this.body);
    this.addClickTracking();
    this.addRecipients();
  }

  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      return new helper.Email(email);
    });
  }

  addClickTracking() {
    const trackingSetting = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSetting.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSetting);
  }

  addRecipients() {
    const personalize = new helper.Personalization();
    this.recipients.forEach(function(email) {
      personalize.addTo(email);
    });
    this.addPersonalization(personalize);
  }
}

module.exports = Mailer;
