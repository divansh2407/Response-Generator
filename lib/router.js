FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render("DistressApp");
  }
});

FlowRouter.route('/dashboard', {
  action: function() {
    BlazeLayout.render("RapidResponseDashboard");
  }
});
