import Ember from 'ember';
import ENV from 'stock-indicator/config/environment';

console.log(ENV.FIREBASE_URL);
var ref = new window.Firebase(ENV.FIREBASE_URL);

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
    }.bind(this));
  },

  // afterAuthentication: function(userId) {
  //   debugger
  // },

  login: function() {
    console.log('login');
    ref.authWithOAuthRedirect("twitter", function(error, authData){
      //should do something here
    });
  },

  logout: function() {
    ref.unauth();
  }
});

export default {
  name: 'auth',
  initialize: initialize
};
