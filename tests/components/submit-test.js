import { moduleForComponent, test } from 'ember-qunit';
import { skip } from 'qunit';
import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('form-submit', 'Integration | Component | submit button', {
  integration: true
});

test('renders submit button', function(assert) {
  this.render(hbs`{{form-submit}}`);
  assert.equal(this.$().find('input').prop('value'), 'Submit');
  assert.equal(this.$().find('input').prop('type'), 'submit');
});

skip('renders as button', function(assert) {
  this.render(hbs`{{form-submit as="button"}}`);
  assert.equal(this.$().find('button').text(), 'Submit');
  assert.equal(this.$().find('button').prop('type'), 'submit');
});

skip('has custom value as button', function(assert) {
  this.render(hbs`{{form-submit "Create" as="button"}}`);
  assert.equal(this.$().find('button').text(), 'Create');
});

skip('submit as button disabled state is bound to models valid state', function(assert) {
  Ember.run(() => {
    this.set('isValid', false);
  });
  this.render(hbs`{{form-submit as="button"}}`);
  assert.equal(this.$().find('button').prop('disabled'), true);
  Ember.run(() => {
    this.set('isValid', true);
  });
  assert.equal(this.$().find('button').prop('disabled'), false);
});

test('custom value', function(assert) {
  this.render(hbs`{{form-submit "Create"}}`);
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

  this.render(hbs`{{#form-for model}}{{form-submit}}{{/form-for}}`);

  assert.equal(this.$().find('input').prop('disabled'), true);
  Ember.run(function() {
    Ember.set(model,'isValid', true);
  });
  assert.equal(this.$().find('input').prop('disabled'), false);
});
