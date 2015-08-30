import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return {
      firstName: 'Diogo',
      lastName: 'Mafra',
      password: '123456',
      age: 20
    };
  }
});
