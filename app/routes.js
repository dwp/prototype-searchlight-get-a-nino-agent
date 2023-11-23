//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/routes
//

const govukPrototypeKit = require("govuk-prototype-kit");
const router = govukPrototypeKit.requests.setupRouter();

// Add your routes here
router.post("/nino-application-type-select", function (req, res) {
  // Make a variable and give it the value from 'how-many-balls'
  var applicationType = req.session.data["type-of-application"];
  // Check whether the variable matches a condition
  if (applicationType == "home-office") {
    res.redirect("GAN/application-selection/view-application-data");
  } 
  else if (applicationType == "prevention"){
    res.redirect("AfN/identity-verification/similar-applications/view-application-full-details-option-4");
  }
  else if (applicationType == "student-loans"){
    res.redirect("AfN/identity-verification/similar-applications/view-application-full-details-option-3");
  }
  else if (applicationType == "emergency"){
    res.redirect("AfN/identity-verification/similar-applications/view-application-full-details-option-2");
  }
  else if (applicationType == "benefits"){
    res.redirect("AfN/identity-verification/similar-applications/view-application-full-details-option-5");
  }
  else {
    res.redirect("AfN/identity-verification/similar-applications/view-application-full-details-option-1");
  }
});

router.post("/search-reference-number-select", function (req, res) {
  req.session.data["reference-number"] == "home-office"
    ? res.redirect("GAN/application-selection/view-application-data")
    : res.redirect(
        "AfN/identity-verification/appointment/view-application-no-upload"
      );
});

router.post("/decision", function (req, res) {
  res.redirect("GAN/decision-selection/decision-select");
});

router.post("/decision-selected", function (req, res) {
  const decision = req.session.data["decision-type"];

  if (decision == "allocate") {
    res.redirect("GAN/decision-selection/allocate/allocate");
  } else if (decision == "traced") {
    res.redirect("GAN/decision-selection/trace/trace");
  } else if (decision == "upgraded") {
    res.redirect("GAN/decision-selection/upgrade/upgrade");
  } else if (decision == "no-nino") {
    res.redirect("GAN/decision-selection/refusal/no-nino-reason-select");
  } else if (decision == "further-information") {
    res.redirect(
      "GAN/decision-selection/further-information/further-information-confirm"
    );
  }
});

router.post("/confirm-decision", function (req, res) {
  res.redirect("GAN/application-selection/nino-application-select");
});

router.post("/no-nino-decision", function (req, res) {
  const decision = req.session.data["refusal-reason"];
  var string = encodeURIComponent("test");
  if (decision == "potential-trace-found") {
    res.redirect("GAN/decision-selection/refusal/no-nino-potential-trace");
  } else if (decision == "deceased") {
    res.redirect("GAN/decision-selection/refusal/no-nino-date-of-death");
  } else if (decision == "invalid-visa") {
    res.redirect("GAN/decision-selection/refusal/no-nino-invalid-visa");
  } else if (decision == "under-16") {
    res.redirect("GAN/decision-selection/refusal/no-nino-under-16");
  } else if (decision == "potential-fraud") {
    res.redirect("GAN/decision-selection/refusal/no-nino-potential-fraud");
  } else if (decision == "channel-islands") {
    res.redirect("GAN/decision-selection/refusal/no-nino-channel-islands");
  }
});

router.post("/further-information-team-decision", function (req, res) {
  res.redirect(
    "decision-selection/further-information/further-information-select"
  );
});

router.post("/further-information-decision", function (req, res) {
  res.redirect(
    "decision-selection/further-information/further-information-confirm"
  );
});

router.post("/afn-further-information-decision", function (req, res) {
  res.redirect(
    "identity-verification/idv-options/further-information-confirm-idv"
  );
});

router.post("/idv", function (req, res) {
  res.redirect("AfN/identity-verification/idv-options/idv-select");
});

router.post("/idv-selected", function (req, res) {
  const decision = req.session.data["idv-decision"];
  if (decision == "yes") {
    res.redirect("AfN/identity-verification/idv-options/idv-confirm-yes");
  } else if (decision == "further-information") {
    res.redirect(
      "AfN/identity-verification/idv-options/further-information-source-idv"
    );
  } else if (decision == "no") {
    res.redirect("AfN/identity-verification/idv-options/idv-confirm-no");
  }
});

router.post("/idv-confirm-yes", function (req, res) {
  let appType = req.session.data['type-of-application']
  if (appType == 'prevention'){
    res.redirect("AfN/identity-verification/view-application-identity-verified-prevent.html")
  } else {
    res.redirect("AfN/identity-verification/appointment/view-application-identity-verified.html")
  }
});

router.post("/idv-confirm-no", function (req, res) {
  res.redirect("GAN/application-selection/nino-application-select");
});

router.post("/previous-applications", function (req, res) {
  var applicationType = req.session.data["type-of-application"];
  if (applicationType === 'prevention') {
  
    res.redirect("fraudulent-warnings/previous-applications-compare-match-no-match.html");
  } else {
    res.redirect("AfN/decision-selection/decision-select");
  }
});

router.post("/afn-decision-select", function (req, res) {
  res.redirect("AfN/decision-selection/decision-select");
});

// router.post('/further-information-source', function (req, res) {
//   res.redirect('AfN/identity-verification/idv-options/further-information-select-idv')
// })

router.post("/further-information-decision-idv", function (req, res) {
  res.redirect(
    "AfN/identity-verification/idv-options/further-information-confirm-idv"
  );
});

router.post("/afn-decision-selected", function (req, res) {
  const decision = req.session.data["decision-type"];

  if (decision == "allocate") {
    res.redirect("AfN/decision-selection/allocate/allocate");
  } else if (decision == "traced") {
    res.redirect("AfN/decision-selection/trace/trace");
  } else if (decision == "upgraded") {
    res.redirect("AfN/decision-selection/upgrade/upgrade");
  } else if (decision == "no-nino") {
    res.redirect("AfN/decision-selection/refusal/no-nino-reason-select");
  } else if (decision == "withdraw") {
    res.redirect("AfN/decision-selection/withdraw/withdraw");
  } else if (decision == "further-information") {
    res.redirect(
      "AfN/decision-selection/further-information/further-information-confirm"
    );
  } else if (decision == "trace-and-allocate") {
res.redirect("AfN/decision-selection/trace-and-allocate-automation/eligibility-select.html")
  }
});

router.post("/afn-refusal-decision", function (req, res) {
  const decision = req.session.data["refusal-reason"];
  if (decision == "no-business-need") {
    res.redirect("AfN/decision-selection/refusal/afn-no-nino-no-business-need");
  } else if (decision == "no-right-to-work") {
    res.redirect("AfN/decision-selection/refusal/afn-no-nino-no-right-to-work");
  } else if (decision == "no-right-to-reside") {
    res.redirect(
      "AfN/decision-selection/refusal/afn-no-nino-no-right-to-reside"
    );
  } else if (decision == "unable-to-prove-identity") {
    res.redirect(
      "AfN/decision-selection/refusal/afn-no-nino-identity-not-proved"
    );
  } else if (decision == "failure-to-respond") {
    res.redirect("AfN/decision-selection/refusal/afn-no-nino-no-response");
  }
  else if (decision == "fraud") {
    res.redirect("GAN/decision-selection/refusal/no-nino-potential-fraud.html");
  }
});

router.post("/further-information-source", function (req, res) {
  const decision = req.session.data["contact-group"];

  if (decision == "applicant") {
    res.redirect(
      "AfN/identity-verification/idv-options/further-information-select-applicant"
    );
  } else if (decision == "home-office") {
    res.redirect(
      "AfN/identity-verification/idv-options/further-information-confirm-idv"
    );
  } else if (decision == "det") {
    res.redirect(
      "AfN/identity-verification/idv-options/further-information-confirm-idv"
    );
  }
  else if (decision == "fraud") {
    res.redirect(
      "GAN/decision-selection/refusal/no-nino-potential-fraud.html"
    );
  }
});

router.post("/afn-further-information-contact", function (req, res) {
  const decision = req.session.data["team-selected"];

  if (decision == "applicant") {
    res.redirect(
      "AfN/decision-selection/further-information/further-information-select-applicant"
    );
  } else if (decision == "home-office") {
    res.redirect(
      "AfN/decision-selection/further-information/further-information-confirm"
    );
  } else if (decision == "det") {
    res.redirect(
      "AfN/decision-selection/further-information/further-information-confirm"
    );
  }
});


router.post("/eligibility-selected", function (req, res) {
  const decision = req.session.data["eligibility-decision"];
  if (decision === "yes") {
    res.redirect("AfN/decision-selection/trace-and-allocate-automation/eligibility-confirm-yes");
  } else if (decision === "no") {
    res.redirect("AfN/decision-selection/trace-and-allocate-automation/eligibility-confirm-no");
  }
});

router.post("/eligible-confirm-no", function (req, res) {
  res.redirect("AfN/decision-selection/refusal/no-nino-reason-select.html")
});

router.post("/eligible-confirm-yes", function (req, res) {
  let output = Math.floor(Math.random() * 4);
  if (output == 0) {
    res.redirect("AfN/decision-selection/allocate/allocate.html")
  } else if (output == 1) {
    res.redirect("AfN/decision-selection/trace/trace.html")
  } else if (output == 2) {
    res.redirect("AfN/decision-selection/fallout/fallout.html")
  } else
  {
    res.redirect("AfN/decision-selection/upgrade/upgrade-needed.html")
  }
});

router.post("/upgrade-needed-decision", function (req, res) {
  res.redirect("AfN/decision-selection/upgrade/upgrade.html")
});

router.post("/fallout", function (req, res) {
  res.redirect("AfN/identity-verification/view-application-identity-verified.html")
});

router.post("/verify-id", function (req, res) {
  res.redirect("AfN/identity-verification/appointment/proven-id.html")
});

router.post("/upload-document", function (req, res) {
  res.redirect("AfN/identity-verification/appointment/upload-document.html")
});

router.post("/check-answers", function (req, res) {
  res.redirect("AfN/identity-verification/appointment/check-your-answers.html")
});
router.post("/document-uploaded", function (req, res) {

    res.redirect("AfN/identity-verification/appointment/view-application-identity-verified.html")

});

