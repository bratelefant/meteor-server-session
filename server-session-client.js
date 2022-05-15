import { Meteor } from "meteor/meteor";
import { Tracker } from "meteor/tracker";
import { Session } from "meteor/session";

export const ServerSession = {};

ServerSession.serverkeys = [];

/**
 * Use this to configure Server Session keys during startup of the client
 * @param {[String]} keys Store those keys on the server side
 */
ServerSession.setServerKeys = (keys) => {
  ServerSession.serverkeys = keys;
};

Tracker.autorun(() => {
  const keyvalues = {};
  const serverkeys = ServerSession.serverkeys || [];

  Meteor.isDevelopment && console.log("Server Session autorun triggered.");
  Session.setDefault("bratelefant-server-sessions-ok", false);

  const keys = serverkeys.filter((i) => i !== "bratelefant-server-sessions-ok");

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
      console.log(
        "Session key-values, including non persistent values",
        keyvalues
      );
    Meteor.call("bratelefant.server.setSession", keyvalues, (err, res) => {
      if (err) console.warn(err);
    });
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
      // otherwise: session not restorable (i.e. not present in profile) and session not ready: store keyvalues
    } else {
      Meteor.call("bratelefant.server.setSession", keyvalues, (err, res) => {
        if (err) console.warn(err);
      });
    }
  }
});
