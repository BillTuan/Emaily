const _ = require("lodash");
const Path = require("path-parser");
const { URL } = require("url");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplate/surveyTemplate");
const mongoose = require("mongoose");

const Survey = mongoose.model("surveys");

module.exports = app => {
  app.get("/api/surveys/thanks", (req, res) => {
    res.send("Thanks for feedback!");
  });

  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(",").map(email => {
        var emaily = email.trim();
        return { email: emaily };
      }),
      _user: req.user.id,
      dateSent: Date.now()
    });

    //Send Email to recipients
    try {
      const mailer = new Mailer(survey, surveyTemplate(survey));
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;

      const user = await req.user.save();
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.post("/api/surveys/webhooks", (req, res) => {
    const p = new Path("/api/surveys/:surveyId/:choice");
    const events = _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      .compact(events)
      .uniqBy(compactEvents, "email", "surveyId")
      .value();

    console.log("====================================");
    console.log(events);
    console.log("====================================");
  });
};
