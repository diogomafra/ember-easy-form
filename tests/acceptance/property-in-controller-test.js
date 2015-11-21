import Ember from 'ember';
import { module, skip } from 'qunit';
import startApp from '../../tests/helpers/start-app';

module('Acceptance | property in controller', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

skip('can specify a property outside of the model if a keyword is used as a prefix', function(assert) {
  visit('/person');

  andThen(() => {
    assert.equal(find('.welcomeMessage > input').val(), 'Hello');
  });

  andThen(() => {
    fillIn('.welcomeMessage > input', 'Hi');
  });

  andThen(() => {
    assert.equal(find('.bound-values .welcome-message').text(), 'Hi');
  });
});

skip('select collection can use controller scope if prefix', function(assert) {
  visit('/person');

  andThen(() => {
    assert.equal(find('.city > select').val(), 'Boston');
    assert.equal(find('.city > select option').text(), "BostonOcalaPortland");
  });

  andThen(() => {
    fillIn('.city > select', 'Portland');
  });

  andThen(() => {
    assert.equal(find('.city > select').val(), 'Portland');
  });
});
