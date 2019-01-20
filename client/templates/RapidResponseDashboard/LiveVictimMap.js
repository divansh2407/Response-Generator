Tracker.autorun(function (computation) {
  var userGeoLocation = new ReactiveVar(null);
  userGeoLocation.set(Geolocation.latLng());
  if (userGeoLocation.get()) {
    Session.set("dashboardUserCoords", Geolocation.latLng());
    //stop the tracker if we got something
    computation.stop();
  }
});

Template.LiveVictimMap.helpers({
  liveVictimMapOptions: function() {
    var duc = Session.get('dashboardUserCoords');

    if (GoogleMaps.loaded()) {
      // automatically initialize map centered at logged in user's location
      return {
        center: new google.maps.LatLng(duc.lat, duc.lng),
        zoom: 8
      };
    }
  },
  victimsAwaitingHelpCount: () => {return DistressSignals.find({"helped": false}).count()}
});

Template.LiveVictimMap.onCreated(function() {
  GoogleMaps.ready('liveVictimMap', function(map) {
    var info_window = new google.maps.InfoWindow({content: ""}),
        markers = {},
        DistressQuery = DistressSignals.find({"helped": false});

    DistressQuery.fetch().forEach((DistressSignal) => {

      // Create a marker for this document
      if(DistressSignal.source == "twitter"){

      var marker = new google.maps.Marker({
        draggable: false,
        animation: google.maps.Animation.DROP,
        position: new google.maps.LatLng(DistressSignal.coords.lat, DistressSignal.coords.lng),
        map: map.instance,
        clickable: true,
        icon:'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
        id: DistressSignal._id
      });

      }
      else{

      var marker = new google.maps.Marker({
        draggable: false,
        animation: google.maps.Animation.DROP,
        position: new google.maps.LatLng(DistressSignal.coords.lat, DistressSignal.coords.lng),
        map: map.instance,
        clickable: true,
        id: DistressSignal._id
      });
    }

      google.maps.event.addListener(marker, 'click', function(marker) {
        console.log(this)
        info_window.setContent(Blaze.toHTMLWithData(Template.DistressMapBubble, document));
        info_window.open(this.getMap(), this);

        $(".helpedBtn").click(function () {
          Meteor.call('finishedHelpingDistressSignal', DistressSignal);
        });
      });

      // Store this marker instance within the markers object.
      markers[marker.id] = marker;
    });

    DistressQuery.observe({
      added: (DistressSignal) => {

        // Create a marker for this document
        if(DistressSignal.source == "twitter"){
        var marker = new google.maps.Marker({
          draggable: false,
          animation: google.maps.Animation.DROP,
          position: new google.maps.LatLng(DistressSignal.coords.lat, DistressSignal.coords.lng),
          map: map.instance,
          clickable: true,
          icon:'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
          id: DistressSignal._id
        });
      }
      else{
        var marker = new google.maps.Marker({
          draggable: false,
          animation: google.maps.Animation.DROP,
          position: new google.maps.LatLng(DistressSignal.coords.lat, DistressSignal.coords.lng),
          map: map.instance,
          clickable: true,
          id: DistressSignal._id
        });

      }
        google.maps.event.addListener(marker, 'click', function(marker) {
          console.log(this)
          info_window.setContent(Blaze.toHTMLWithData(Template.DistressMapBubble, {ctx: DistressSignal}));
          info_window.open(this.getMap(), this);

          $(".helpedBtn").click(function () {
            Meteor.call('finishedHelpingDistressSignal', DistressSignal);
          });
        });

        // Store this marker instance within the markers object.
        markers[marker.id] = marker;
      },
      removed: (observedDoc) => {
        // Remove the marker from the map
        markers[observedDoc._id].setMap(null);

        // Clear the event listener
        google.maps.event.clearInstanceListeners(
          markers[observedDoc._id]);

        // Remove the reference to this marker instance
        delete markers[observedDoc._id];
      }
    });




  });
});
