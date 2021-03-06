# Get Session values on the server side

Now you can use `Session.get(key)` on the meteor server side. As a side effect, Session values are now persistent between page reloads.

# How to use

Define the Sessions keys to be mirrored to the Server in `settings.json`:

    { 
        "public" : {
            "bratelefant" : {                
                    "serverkeys": ["key1", "key2"]
            }
        }
    }

In your client script, be sure to set defaults for all Session keys, even undefined ones.

    Session.setDefault("editing", undefined)

Now on the server side, use Session values like so:

    import { Session } from "meteor/bratelefant:server-session";

    console.log(Session.get("editing"))

If you like to prevent some key from persist sessions, you can configure this in the `Meteor.startup()` hook on your meteor server:

    Session.configure({
        dontPersist: ["editing"]
    })

# How is this implemented?

This package is using a `Tracker.autorun` on the client side to store all session key-value-pairs in the users profile.
