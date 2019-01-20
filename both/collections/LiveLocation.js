livelocation = new Meteor.Collection("LiveLocation");

livelocation.allow({
  "insert": () => true,
  "remove": () => true,
  "update": () => true
});