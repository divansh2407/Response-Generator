Template.BigDistressUI.events({
  'click #trigger-button'(ev) {
    ev.preventDefault();

    Meteor.call('addDistressSignal', {
      "coords": JSON.parse(localStorage.getItem('distressCallCoords')),
      "helped": false,
      "report": $('#distress-report').val(),
      "phone": localStorage.getItem("mobileNumber"),
      "fullName": localStorage.getItem("fullName"),
      "source": "Mobile"
    });

    Session.set("distressCallSent", true);
  }
});
