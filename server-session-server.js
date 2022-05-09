export const Session = {};

Session.dontPersist = [];

Session.debug = false;

Session.get = (key) => {
  if (!Meteor.user()) throw new Meteor.Error("No user present.");

  if (!Meteor.user().profile?.session)
    throw new Meteor.Error("Session data not yet set in profile.");

  return Meteor.user().profile?.session[key];
};

Session.configure = ({ dontPersist, debug }) => {
  Session.dontPersist = dontPersist;
  Session.debug = debug;
};

Meteor.methods({
  "bratelefant.server.setSession"(keyvalues) {
    check(keyvalues, Object);
    this.unblock();

    if (!Meteor.user()) throw new Meteor.Error("No user present.");

    Meteor.isDevelopment &&
      console.log("Removing non persistent keys", Session.dontPersist);
    Session.dontPersist.forEach((key) => {
      delete keyvalues[key];
    });

    Meteor.isDevelopment && console.log("Server sessions setting ", keyvalues);

    Meteor.users.update(Meteor.user()._id, {
      $set: { "profile.session": keyvalues },
    });
  },
});
