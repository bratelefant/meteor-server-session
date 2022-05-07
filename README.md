# Get Session values on the server side

Now you can use `Session.get(key)` on the meteor server side. As a side effect, Session values are now persistent between page reloads.

# How to use

In your client script, be sure to set defaults for all Session keys, even undefined ones.

    Session.setDefault("editing", undefined)

Now on the server side, use Session values like so:

    import { Session } from "meteor/bratelefant:server-session";

    console.log(Session.get("editing"))

# How is this implemented?

This package is using a `Tracker.autorun` on the client side to store all session key-value-pairs in the users profile.
