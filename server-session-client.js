import { Meteor } from "meteor/meteor";
import { Tracker } from "meteor/tracker";
import { Session } from "meteor/session";

Tracker.autorun(() => {
  const keyvalues = {};

  Session.setDefault("bratelefant-server-sessions-ok", false);

  const keys = Object.keys(Session.keys).filter(
    (i) => i !== "bratelefant-server-sessions-ok"
  );

  console.log("got these keys", keys);

  keys.forEach((key) => {
    if (Session.get(key)) {
      keyvalues[key] = Session.get(key);
    }
  });

  // If Session present, store keyvalue pairs in profile
  if (Session.get("bratelefant-server-sessions-ok")) {
    console.log("Server session data is ready")
    console.log("Storing Session key-values in profile.session", keyvalues);
    Meteor.call("bratelefant.server.setSession", keyvalues);
    // Otherwise try to restore it from previous session
  } else {
    console.log("Server session data has not been restored yet")
    if (Meteor.user()?.profile?.session) {
      console.log("Restore previous session variables from profile");
      Object.entries(Meteor.user()?.profile?.session).forEach(
        ([key, value]) =>
          key !== "" && Session.set(key, Meteor.user()?.profile?.session[key])
      );
      Session.set("bratelefant-server-sessions-ok", true);
    } else {
    }
  }
});
