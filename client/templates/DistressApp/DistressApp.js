Template.DistressApp.helpers({
  'distressCallSent'() {
    return Session.get("distressCallSent") === true;
  },
  'forceLoginActive'() {
    return Session.get('signupComplete') === true || (localStorage.getItem('mobileNumber') && localStorage.getItem('fullName'));
  }
});

Tracker.autorun(function (computation) {
  var userGeoLocation = new ReactiveVar(null);
  userGeoLocation.set(Geolocation.latLng());
  if (userGeoLocation.get()) {
    localStorage.setItem("distressCallCoords", JSON.stringify(Geolocation.latLng()));

    //stop the tracker if we got something
    computation.stop();
  }
});

Meteor.startup(() => {
  GoogleMaps.load();
})
