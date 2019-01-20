Meteor.methods({
  'addDistressSignal'(distress) {
    var wat = DistressSignals.insert(distress);
    console.log(wat);
    return wat;
  },
  'finishedHelpingDistressSignal'(distressSignal) {
    DistressSignals.update(distressSignal._id, {'$set': {'helped': true}});
  }
});
