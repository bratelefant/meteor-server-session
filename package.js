Package.describe({
  name: 'bratelefant:server-session',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Read meteor Session variables on the server side',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/bratelefant/meteor-server-session.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('2.7.1');
  api.use('ecmascript');
  api.mainModule('server-session-server.js', "server");
  api.mainModule('server-session-client.js', "client");
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('server-session');
  api.mainModule('server-session-tests.js');
});
