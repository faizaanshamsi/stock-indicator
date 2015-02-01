import Ember from 'ember';
import largeMove from 'stock-indicator/utils/large-move';

export default Ember.Controller.extend({
  stocks: Ember.computed.alias('model'),

  stockDidMove: function() {
    var stocks = this.get('stocks').toArray();
    var length = stocks.get('length');

    var currentTick = stocks.get('lastObject').get('price');
    var lastTick = stocks[length - 2].get('price');

    return largeMove(currentTick, lastTick);
  }.property('stocks.[]'),

  actions: {

  }
});
