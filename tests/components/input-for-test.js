import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import { skip } from 'qunit';
import hbs from 'htmlbars-inline-precompile';
import config from 'ember-easy-form/config';
import setup from 'ember-easy-form/setup';

const ErrorsObject = Ember.Object.extend({
  unknownProperty: function(property) {
    this.set(property, Ember.A([]));
    return this.get(property);
  }
});

moduleForComponent('input-for', 'Integration | Component | form input', {
  integration: true,
  beforeEach: function() {
    setup();
    this.set('model', {
      firstName: 'Brian',
      lastName: 'Cardarella',
      errors: ErrorsObject.create()
    });
  }
});

test('renders semantic form elements', function(assert) {
  this.render(hbs`{{#form-for model}}{{input-for "firstName"}}{{/form-for}}`);
  assert.equal(this.$().find('label').text(), 'First name');
  assert.equal(this.$().find('input').val(), 'Brian');
  assert.equal(this.$().find('input').attr('type'), 'text');
});

test('does not render error tag when context does not have errors object', function(assert) {
  this.render(hbs`{{#form-for model}}{{input-for "firstName"}}{{/form-for}}`);
  assert.ok(!this.$().find('div.fieldWithErrors').get(0));
  assert.ok(!this.$().find('span.error').get(0));
  Ember.run(() => {
    this.$('input:first').blur();
  });
  assert.ok(!this.$().find('div.fieldWithErrors').get(0));
  assert.ok(!this.$().find('span.error').get(0));
});

test('renders error for invalid data', function(assert) {
  Ember.run(() => {
    this.get('model.errors.firstName').pushObject("can't be blank");
  });

  this.render(hbs`{{#form-for model}}{{input-for "firstName"}}{{/form-for}}`);
  assert.ok(!this.$().find('div.fieldWithErrors').get(0));
  assert.ok(!this.$().find('span.error').get(0));

  Ember.run(() => {
    Ember.View.views[this.$().find('.firstName').attr('id')].input();
  });
  assert.ok(!this.$().find('div.fieldWithErrors').get(0));
  assert.ok(!this.$().find('span.error').get(0));

  Ember.run(() => {
    this.$('input:first').blur();
  });
  assert.ok(this.$().find('div.fieldWithErrors').get(0));
  assert.equal(this.$().find('span.error').text(), "can't be blank");

  Ember.run(() => {
    this.get('model.errors.firstName').clear();
  });
  assert.ok(!this.$().find('div.fieldWithErrors').get(0));
  assert.ok(!this.$().find('span.error').get(0));

  Ember.run(() => {
    Ember.View.views[this.$().find('.firstName').attr('id')].focusOut();
  });
  assert.ok(!this.$().find('div.fieldWithErrors').get(0));
  assert.ok(!this.$().find('span.error').get(0));

  Ember.run(() => {
    this.get('model.errors.firstName').pushObject("can't be blank");
    Ember.View.views[this.$().find('.firstName').attr('id')].input();
  });
  assert.ok(!this.$().find('div.fieldWithErrors').get(0));
  assert.ok(!this.$().find('span.error').get(0));

  Ember.run(() => {
    Ember.View.views[this.$().find('.firstName').attr('id')].focusOut();
  });
  assert.ok(this.$().find('div.fieldWithErrors').get(0));
  assert.equal(this.$().find('span.error').text(), "can't be blank");
});

test('renders errors properly with dependent keys', function(assert) {
  this.set('model._dependentValidationKeys', {
    passwordConfirmation: ['password']
  });

  Ember.run(() => {
    this.get('model.errors.passwordConfirmation').pushObject("does not match password");
  });
  this.render(hbs`{{#form-for model}}{{input-for "password"}}{{input-for "passwordConfirmation"}}{{/form-for}}`);
  assert.ok(!this.$().find('.passwordConfirmation').hasClass('fieldWithErrors'));
  assert.ok(!this.$().find('.passwordConfirmation').find('span.error').get(0));
  //
  // Ember.run(() => {
  //   Ember.View.views[this.$().find('.password').attr('id')].input();
  // });
  // assert.ok(!this.$().find('.passwordConfirmation').hasClass('fieldWithErrors'));
  // assert.ok(!this.$().find('.passwordConfirmation').find('span.error').get(0));
  //
  // Ember.run(() => {
  //   Ember.View.views[this.$().find('.password').attr('id')].focusOut();
  // });
  // assert.ok(!this.$().find('.passwordConfirmation').hasClass('fieldWithErrors'));
  // assert.ok(!this.$().find('.passwordConfirmation').find('span.error').get(0));
  //
  // Ember.run(() => {
  //   Ember.View.views[this.$().find('.passwordConfirmation').attr('id')].focusOut();
  // });
  // assert.ok(this.$().find('.passwordConfirmation').hasClass('fieldWithErrors'));
  // assert.ok(this.$().find('.passwordConfirmation').find('span.error').get(0));
  //
  // Ember.run(() => {
  //   this.get('model.errors.passwordConfirmation').clear();
  //   Ember.View.views[this.$().find('.passwordConfirmation').attr('id')].focusOut();
  // });
  // assert.ok(!this.$().find('.passwordConfirmation').hasClass('fieldWithErrors'));
  // assert.ok(!this.$().find('.passwordConfirmation').find('span.error').get(0));
  //
  // Ember.run(() => {
  //   this.get('model.errors.passwordConfirmation').pushObject("does not match password");
  //   Ember.View.views[this.$().find('.password').attr('id')].input();
  // });
  //
  // assert.ok(this.$().find('.passwordConfirmation').hasClass('fieldWithErrors'));
  // assert.ok(this.$().find('.passwordConfirmation').find('span.error').get(0));
});

test('allows label text to be set', function(assert) {
  this.render(hbs`{{#form-for model}}{{input-for "firstName" label="Your First Name"}}{{/form-for}}`);
  assert.equal(this.$().find('label').text(), 'Your First Name');
});

test('allows hint text to be set', function(assert) {
  this.render(hbs`{{#form-for model}}{{input-for "firstName" hint="My hint text"}}{{/form-for}}`);
  assert.equal(this.$().find('span.hint').text(), 'My hint text');
});

test('does not show hint span when there is no hint', function(assert) {
  this.render(hbs`{{#form-for model}}{{input-for "firstName"}}{{/form-for}}`);
  assert.equal(this.$().find('span.hint').length, 0);
});

skip('block form for input', function(assert) {
  this.render(hbs`{{#form-for model}}{{#input-for "firstName"}}{{label-field "firstName"}}{{input-field "firstName"}}{{error-field "firstName"}}{{/input-for}}{{/form-for}}`);

  var input = this.$().find('input');
  var label = this.$().find('label');

  assert.equal(label.text(), 'First name');
  assert.equal(input.val(), 'Brian');
  assert.equal(input.attr('type'), 'text');
  assert.equal(label.prop('for'), input.prop('id'));
});

test('block form for input without label', function(assert) {
  this.render(hbs`{{#form-for model}}{{#input-for "firstName"}}{{input-field "firstName"}}{{/input-for}}{{/form-for}}`);
  assert.equal(this.$().find('input').val(), 'Brian');
  assert.equal(this.$().find('input').attr('type'), 'text');
});

test('sets input attributes property', function(assert) {
  this.render(hbs`{{#form-for model}}{{input-for "receiveAt" as="email" placeholder="Your email" disabled=true}}{{/form-for}}`);
  var input = this.$().find('input');
  assert.equal(input.prop('type'), 'email');
  assert.equal(input.prop('placeholder'), 'Your email');
  assert.equal(input.prop('disabled'), true);
});

skip('binds label to input field', function(assert) {
  this.render(hbs`{{#form-for model}}{{input firstName}}{{/form-for}}`);
  var input = this.$().find('input');
  var label = this.$().find('label');
  assert.equal(input.prop('id'), label.prop('for'));
});

test('uses the wrapper config', function(assert) {
  config.registerWrapper('my_wrapper', {inputClass: 'my-input', errorClass: 'my-error', fieldErrorClass: 'my-fieldWithErrors'});

  Ember.run(() => {
    this.get('model.errors.firstName').pushObject("can't be blank");
  });
  this.render(hbs`{{#form-for model wrapper="my_wrapper"}}{{input-for "firstName"}}{{/form-for}}`);
  Ember.run(() => {
    this.$().find('input').blur();
  });
  assert.ok(this.$().find('div.my-input').get(0), 'inputClass not defined');
  assert.ok(this.$().find('div.my-fieldWithErrors').get(0), 'fieldErrorClass not defined');
  assert.ok(this.$().find('span.my-error').get(0), 'errorClass not defined');
});

test('uses the defined template name', function(assert) {
  this.container.register('template:custom-input-template', hbs`My custom template | {{label-field property=propertyName}}`);
  config.registerWrapper('my_wrapper', {inputTemplate: 'custom-input-template'});

  this.render(hbs`{{#form-for model wrapper="my_wrapper"}}{{input-for "firstName"}}{{/form-for}}`);
  assert.equal(this.$().text(), 'My custom template | First name');
});

test('sets input attributes property as bindings', function(assert) {
  this.setProperties({
    placeholder: 'The placeholder',
    label: 'My label',
    hint: 'Some hint'
  });
  this.render(hbs`{{#form-for model}}{{input-for "firstName" placeholderBinding="placeholder" labelBinding="label" hintBinding="hint"}}{{/form-for}}`);
  assert.equal(this.$().find('input').prop('placeholder'), 'The placeholder');
  assert.equal(this.$().find('label').text(), 'My label');
  assert.equal(this.$().find('.hint').text(), 'Some hint');

  Ember.run(() => {
    this.setProperties({
      placeholder: 'Write your first name',
      label: 'First name (not a last name)',
      hint: 'Usually different than your last name'
    });
  });

  assert.equal(this.$().find('input').prop('placeholder'), 'Write your first name');
  assert.equal(this.$().find('label').text(), 'First name (not a last name)');
  assert.equal(this.$().find('.hint').text(), 'Usually different than your last name');
});

test('sets select prompt property as bindings', function(assert) {
  this.setProperties({
    countries: [],
    label: 'My label',
    hint: 'Some hint',
    prompt: 'The prompt'
  });
  this.render(hbs`{{#form-for model}}{{input-for "firstName" as="select" collection=countries label=label hint=hint prompt=prompt}}{{/form-for}}`);

  assert.equal(this.$().find('option').text(), 'The prompt');
  assert.equal(this.$().find('label').text(), 'My label');
  assert.equal(this.$().find('.hint').text(), 'Some hint');

  Ember.run(() => {
    this.setProperties({
      prompt: 'Select an option',
      label: 'First name (not a last name)',
      hint: 'Usually different than your last name'
    });
  });

  assert.equal(this.$().find('option').text(), 'Select an option');
  assert.equal(this.$().find('label').text(), 'First name (not a last name)');
  assert.equal(this.$().find('.hint').text(), 'Usually different than your last name');
});

test('defaults the name property', function(assert) {
  this.render(hbs`{{#form-for model}}{{input-for "firstName"}}{{/form-for}}`);
  console.log(this.$().html());
  assert.equal(this.$().find('input').prop('name'), "firstName");
});

test('allows specifying the name property', function(assert) {
  this.render(hbs`{{#form-for model}}{{input-for "firstName" name="some-other-name"}}{{/form-for}}`);
  assert.equal(this.$().find('input').prop('name'), "some-other-name");
});

test('scopes property lookup to model declared in form-for', function(assert){
  this.set('someOtherModel', Ember.Object.create({firstName: 'Robert'}));

  this.render(hbs`{{#form-for someOtherModel}}{{input-for "firstName"}}{{/form-for}}`);
  assert.equal(this.$().find('input').val(), "Robert");
});

skip('sets input as="date" attributes properly', function(assert) {
  this.render(hbs`{{#form-for model}}{{input-for "receiveAt" as="date"}}{{/form-for}}`);
  assert.equal(this.$().find('input').prop('type'), "date");
});

skip('allows using the {{input}} helper', function(assert) {
  this.render(hbs`{{#form-for model}}{{input name="first-name"}}{{/form-for}}`);
  assert.equal(this.$().find('input').prop('name'), "first-name");
});

skip('{{ember-input}} uses the original Ember {{input}} helper', function(assert) {
  this.render(hbs`{{ember-input name="first-name"}}`);
  assert.equal(this.$().find('input').prop('name'), "first-name");
});

test('adds a class to the parent div for the property name', function(assert) {
  this.render(hbs`{{#form-for model}}{{input-for "firstName" labelClass="blammo"}}{{/form-for}}`);
  assert.equal(this.$().find('div.input.firstName input').val(), 'Brian');
});
