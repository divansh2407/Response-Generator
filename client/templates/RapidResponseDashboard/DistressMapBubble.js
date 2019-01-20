Template.DistressMapBubble.helpers({
  'getName': () => {return Template.currentData().ctx.fullName;},
  'getMobileNumber': () => {return Template.currentData().ctx.phone;},
  'getReport': () => {return Template.currentData().ctx.report;}
})
