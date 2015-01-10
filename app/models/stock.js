import DS from 'ember-data';

export default DS.Model.extend({
  symbol: DS.attr('string'),
  price: DS.attr('number'),
  timestamp: DS.attr('number')
});
