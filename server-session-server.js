export const Session = {};

Session.get = (key) => {
  if (!Meteor.user()) throw new Meteor.Error("No user present.");
  if (!Meteor.user().profile?.session)
    throw new Meteor.Error("Session data not yet set in profile.");
  return Meteor.user().profile?.session[key];
};

Meteor.methods({
  "bratelefant.server.setSession"(keyvalues) {
    check(keyvalues, Object);
    if (!Meteor.user()) throw new Meteor.Error("No user present.");

    Meteor.users.update(Meteor.user()._id, {
      $set: { "profile.session": keyvalues },
    });
  },
});
