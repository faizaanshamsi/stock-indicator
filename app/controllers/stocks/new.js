import Ember from 'ember';

export default Ember.Controller.extend({
  stock: Ember.computed.alias('model'),

  actions: {
    publishStock: function(stock) {
      var _this = this;
      stock.set('timestamp', new Date());
      stock.save().then(function() {
        _this.transitionToRoute('stocks.index');
      });
    }
  }
});
