import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import config from 'ember-easy-form/config';

moduleForComponent('error-field', 'Integration | Component | error field', {
  integration: true,
  beforeEach: function() {
    let ErrorsObject = Ember.Object.extend({
      unknownProperty: function(property) {
        this.set(property, Ember.A([]));
        return this.get(property);
      }
    });

    this.set('model', {
      firstName: 'Brian',
      lastName: 'Cardarella',
      errors: ErrorsObject.create()
    });
  }
});

test('error helper should bind to first error message in array', function(assert) {
  let model = this.get('model');

  this.render(hbs`{{#form-for model}}{{error-field "firstName"}}{{/form-for}}`);

  assert.equal(this.$().find('span.error').text(), '');
  Ember.run(function() {
    Ember.get(model, 'errors.firstName').pushObject("can't be blank");
  });
  assert.equal(this.$().find('span.error').text(), "can't be blank");
  Ember.run(function() {
    Ember.get(model, 'errors.firstName').unshiftObject('is invalid');
  });
  assert.equal(this.$().find('span.error').text(), 'is invalid');
  Ember.run(function() {
    Ember.get(model, 'errors.firstName').clear();
  });
  assert.equal(this.$().find('span.error').text(), '');
});

test('uses the wrapper config', function(assert) {
  config.registerWrapper('my_wrapper', {errorClass: 'my-error'});

  this.render(hbs`{{#form-for model wrapper="my_wrapper"}}{{error-field firstName}}{{/form-for}}`);
  var model = this.get('model');
  Ember.run(function() {
    Ember.set(model, 'errors.firstName', ["can't be blank"]);
  });

  assert.ok(this.$().find('span.my-error').get(0), 'errorClass not defined');
});

test('uses the defined template name', function(assert) {
  this.container.register('template:custom-error-template', hbs`My custom error | {{errorText}}`);
  config.registerWrapper('my_wrapper', {errorTemplate: 'custom-error-template'});

  this.render(hbs`{{#form-for model wrapper="my_wrapper"}}{{error-field "firstName"}}{{/form-for}}`);
  var model = this.get('model');
  Ember.run(function() {
    Ember.set(model, 'errors.firstName', ["can't be blank"]);
  });

  assert.equal(this.$().text(), "My custom error | can't be blank");
});

