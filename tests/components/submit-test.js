import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('submit', 'Integration | Component | submit button', {
  integration: true
});

test('renders submit button', function(assert) {
  this.render(hbs`{{submit}}`);
  assert.equal(this.$().find('input').prop('value'), 'Submit');
  assert.equal(this.$().find('input').prop('type'), 'submit');
});

test('renders as button', function(assert) {
  this.render(hbs`{{submit as="button"}}`);
  assert.equal(this.$().find('button').text(), 'Submit');
  assert.equal(this.$().find('button').prop('type'), 'submit');
});

test('has custom value as button', function(assert) {
  this.render(hbs`{{submit "Create" as="button"}}`);
  assert.equal(this.$().find('button').text(), 'Create');
});

test('submit as button disabled state is bound to models valid state', function(assert) {
  var model = Ember.Object.create({
    firstName: 'Brian',
    lastName: 'Cardarella'
  });
  Ember.run(() => {
    Ember.set(model,'isValid', false);
    this.set('model', model);
  });

  this.render(hbs`{{#form-for model}}{{submit as="button"}}{{/form-for}}`);
  assert.equal(this.$().find('button').prop('disabled'), true);
  Ember.run(function() {
    Ember.set(model,'isValid', true);
  });
  assert.equal(this.$().find('button').prop('disabled'), false);
});

test('custom value', function(assert) {
  this.render(hbs`{{submit "Create"}}`);
  assert.equal(this.$().find('input').prop('value'), 'Create');
});

test('submit button disabled state is bound to models valid state', function(assert) {
  var model = Ember.Object.create({
    firstName: 'Brian',
    lastName: 'Cardarella'
  });
  Ember.run(() => {
    Ember.set(model,'isValid', false);
    this.set('model', model);
  });

  this.render(hbs`{{#form-for model}}{{submit}}{{/form-for}}`);
  assert.equal(this.$().find('input').prop('disabled'), true);
  Ember.run(function() {
    Ember.set(model,'isValid', true);
  });

  assert.equal(this.$().find('input').prop('disabled'), false);
});
