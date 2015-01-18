import Ember from 'ember';

var ref = new window.Firebase("https://stock-indicator.firebaseio.com/");

export function initialize(container, app) {
  app.register('auth:main', auth, { singleton: true });
  app.inject('controller', 'auth', 'auth:main');
  app.inject('route', 'auth', 'auth:main');
}

var auth = Ember.Object.extend({
  authed: false,
  init: function() {
    return ref.onAuth(function(authData) {
      if (!authData) {
        this.set("authed", false);
        this.set("authData", null);
        this.set("user", null);
        return false;
      }
      this.set("authed", true);
      this.set("authData", authData);
      // return this.afterAuthentication(authData.uid);
    }.bind(this));;
  },

  // afterAuthentication: function(userId) {
  //   debugger
  // },

  login: function() {
    console.log('anything')
    ref.authWithOAuthRedirect("twitter", function(error, authData){});
  },

  logout: function() {
    ref.unauth()
  }
});

export default {
  name: 'auth',
  initialize: initialize
};
