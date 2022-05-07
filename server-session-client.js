import { Meteor } from "meteor/meteor";
import { Tracker } from "meteor/tracker";
import { Session } from "meteor/session";

Tracker.autorun(() => {
  const keyvalues = {};

  Session.setDefault("bratelefant-server-sessions-ok", false);

  const keys = Object.keys(Session.keys).filter(
    (i) => i !== "bratelefant-server-sessions-ok"
  );

  Meteor.isDevelopment && console.log("got these keys", keys);

  keys.forEach((key) => {
    if (Session.get(key)) {
      keyvalues[key] = Session.get(key);
    }
  });

  // If Session present, store keyvalue pairs in profile
  if (Session.get("bratelefant-server-sessions-ok")) {
    Meteor.isDevelopment && console.log("Server session data is ready");
    Meteor.isDevelopment &&
      console.log("Session key-values, including non persistent values", keyvalues);
    Meteor.call("bratelefant.server.setSession", keyvalues);
    // Otherwise try to restore it from previous session
  } else {
    Session.debug &&
      Meteor.isDevelopment &&
      console.log("Server session data has not been restored yet");
    if (Meteor.user()?.profile?.session) {
      Session.debug &&
        Meteor.isDevelopment &&
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
