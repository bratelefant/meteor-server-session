// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by server-session.js.
import { name as packageName } from "meteor/server-session";

// Write your tests here!
// Here is an example.
Tinytest.add('server-session - example', function (test) {
  test.equal(packageName, "server-session");
});
