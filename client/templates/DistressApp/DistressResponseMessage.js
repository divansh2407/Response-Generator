Template.DistressResponseMessage.helpers({
  'victimCoords'() {
    return JSON.parse(localStorage.getItem("distressCallCoords"));
  }
});
