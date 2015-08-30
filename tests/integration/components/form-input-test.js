import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import config from 'ember-easy-form/config';
import setup from 'ember-easy-form/setup';

var ErrorsObject = Ember.Object.extend({
  unknownProperty: function(property) {
    this.set(property, Ember.A([]));
    return this.get(property);
  }
});

moduleForComponent('form-input', 'Integration | Component | form input', {
  integration: true,
  beforeEach: function() {
    setup();
    this.set('model', {
      firstName: 'Brian',
      lastName: 'Cardarella'
    });
  }
});

test('renders semantic form elements', function(assert) {
  this.render(hbs`{{#form-for model}}{{form-input "firstName"}}{{/form-for}}`);

  assert.equal(this.$().find('label').text(), 'First name');
  assert.equal(this.$().find('input').val(), 'Brian');
  assert.equal(this.$().find('input').attr('type'), 'text');
});

test('does not render error tag when context does not have errors object', function(assert) {
  this.render(hbs`{{#form-for model}}{{form-input "firstName"}}{{/form-for}}`);

  assert.ok(this.$().find('label').text(), 'First name');
  assert.equal(this.$().find('input').val(), 'Brian');
  assert.equal(this.$().find('input').attr('type'), 'text');

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
    this.set('model.errors', ErrorsObject.create());
  });
  Ember.run(() => {
    this.get('model.errors.firstName').pushObject("can't be blank");
  });

  this.render(hbs`{{#form-for model}}{{form-input "firstName"}}{{/form-for}}`);

  assert.ok(!this.$().find('div.fieldWithErrors').get(0));
  assert.ok(!this.$().find('span.error').get(0));

  Ember.run(() => {
    // view._childViews[0].trigger('input');
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
    this.$('input:first').blur();
  });
  assert.ok(!this.$().find('div.fieldWithErrors').get(0));
  assert.ok(!this.$().find('span.error').get(0));

  Ember.run(() => {
    this.get('model.errors.firstName').pushObject("can't be blank");
    // view._childViews[0].trigger('input');
  });
  assert.ok(!this.$().find('div.fieldWithErrors').get(0));
  assert.ok(!this.$().find('span.error').get(0));

  Ember.run(() => {
    this.$('input:first').blur();
  });
  assert.ok(this.$().find('div.fieldWithErrors').get(0));
  assert.equal(this.$().find('span.error').text(), "can't be blank");
});

// test('renders errors properly with dependent keys', function() {
//   var passwordView, confirmationView;
//   model['errors'] = ErrorsObject.create();
//   model['_dependentValidationKeys'] = {
//     passwordConfirmation: ['password']
//   };

//   Ember.run(function() {
//     get(model,'errors.passwordConfirmation').pushObject("does not match password");
//   });

//   view = Ember.View.create({
//     template: templateFor('{{input password}}{{input passwordConfirmation}}'),
//     container: container,
//     controller: controller
//   });
//   append(view);
//   passwordView = view._childViews[0];
//   confirmationView = view._childViews[1];

//   ok(!confirmationView.$().hasClass('fieldWithErrors'));
//   ok(!confirmationView.$().find('span.error').get(0));

//   Ember.run(function() {
//     passwordView.trigger('input');
//   });
//   ok(!confirmationView.$().hasClass('fieldWithErrors'));
//   ok(!confirmationView.$().find('span.error').get(0));

//   Ember.run(function() {
//     passwordView.trigger('focusOut');
//   });
//   ok(!confirmationView.$().hasClass('fieldWithErrors'));
//   ok(!confirmationView.$().find('span.error').get(0));

//   Ember.run(function() {
//     confirmationView.trigger('focusOut');
//   });
//   ok(confirmationView.$().hasClass('fieldWithErrors'));
//   ok(confirmationView.$().find('span.error').get(0));

//   Ember.run(function() {
//     get(model, 'errors.passwordConfirmation').clear();
//     confirmationView.trigger('focusOut');
//   });
//   ok(!confirmationView.$().hasClass('fieldWithErrors'));
//   ok(!confirmationView.$().find('span.error').get(0));

//   Ember.run(function() {
//     get(model, 'errors.passwordConfirmation').pushObject("does not match password");
//     passwordView.trigger('input');
//   });
//   ok(confirmationView.$().hasClass('fieldWithErrors'));
//   ok(confirmationView.$().find('span.error').get(0));
// });

test('allows label text to be set', function(assert) {
  this.render(hbs`{{#form-for model}}{{form-input "firstName" label="Your First Name"}}{{/form-for}}`);

  assert.equal(this.$().find('label').text(), 'Your First Name');
});

test('allows hint text to be set', function(assert) {
  this.render(hbs`{{#form-for model}}{{form-input "firstName" hint="My hint text"}}{{/form-for}}`);

  assert.equal(this.$().find('span.hint').text(), 'My hint text');
});

test('does not show hint span when there is no hint', function(assert) {
  this.render(hbs`{{#form-for model}}{{form-input "firstName"}}{{/form-for}}`);

  assert.equal(this.$().find('span.hint').length, 0);
});


test('block form for input', function(assert) {
  this.render(hbs`{{#form-for model}}{{#form-input "firstName"}}{{label-field "firstName"}}{{input-field "firstName"}}{{error-field "firstName"}}{{/form-input}}{{/form-for}}`);

  var input = this.$().find('input');
  var label = this.$().find('label');

  assert.equal(label.text(), 'First name');
  assert.equal(input.val(), 'Brian');
  assert.equal(input.attr('type'), 'text');
  // TODO - diogo - set the property 'for'
  // assert.equal(label.prop('for'), input.prop('id'));
});

test('block form for input without label', function(assert) {
  this.render(hbs`{{#form-for model}}{{#form-input "firstName"}}{{input-field "firstName"}}{{/form-input}}{{/form-for}}`);
  assert.equal(this.$().find('input').val(), 'Brian');
  assert.equal(this.$().find('input').attr('type'), 'text');
});

test('sets input attributes property', function(assert) {
  this.render(hbs`{{#form-for model}}{{form-input "receiveAt" as="email" placeholder="Your email" disabled=true}}{{/form-for}}`);

  var input = this.$().find('input');
  assert.equal(input.prop('type'), 'email');
  assert.equal(input.prop('placeholder'), 'Your email');
  assert.equal(input.prop('disabled'), true);
});

// test('binds label to input field', function() {
//   view = Ember.View.create({
//     template: templateFor('{{input firstName}}'),
//     container: container,
//     controller: controller
//   });
//   append(view);
//   var input = view.$().find('input');
//   var label = view.$().find('label');
//   equal(input.prop('id'), label.prop('for'));
// });

test('uses the wrapper config', function(assert) {
  config.registerWrapper('my_wrapper', {inputClass: 'my-input', errorClass: 'my-error', fieldErrorClass: 'my-fieldWithErrors'});

  Ember.run(() => {
    this.set('model.errors', ErrorsObject.create());
    this.get('model.errors.firstName').pushObject("can't be blank");
  });

  this.render(hbs`{{#form-for model wrapper="my_wrapper"}}{{form-input "firstName"}}{{/form-for}}`);
  Ember.run(() => {
    this.$('input:first').blur();
  });

  assert.ok(this.$().find('div.my-input').get(0), 'inputClass not defined');
  assert.ok(this.$().find('div.my-fieldWithErrors').get(0), 'fieldErrorClass not defined');
  assert.ok(this.$().find('span.my-error').get(0), 'errorClass not defined');
});

test('uses the defined template name', function(assert) {
  this.container.register('template:custom-input-template', hbs`My custom template | {{label-field property=propertyName text=labelText}}`);
  config.registerWrapper('my_wrapper', {inputTemplate: 'custom-input-template'});

  this.render(hbs`{{#form-for model wrapper="my_wrapper"}}{{form-input "firstName"}}{{/form-for}}`);

  assert.equal(this.$().text(), 'My custom template | First name');
});

// TODO: DIOGO - falta fazer o binding no placeholder. Ainda não funciona.
// test('sets input attributes property as bindings', function(assert) {
//   Ember.run(() => {
//     this.setProperties({
//       placeholder: 'A placeholder',
//       label: 'A label',
//       hint: 'A hint',
//       prompt: 'A prompt'
//     });
//   });
//
//   this.render(hbs`{{#form-for model}}{{form-input "firstName" placeholder=placeholder label=label hint=hint}}{{/form-for}}`);
//
//   assert.equal(this.$().find('input').prop('placeholder'), 'A placeholder');
//   assert.equal(this.$().find('label').text(), 'A label');
//   assert.equal(this.$().find('.hint').text(), 'A hint');
//
//   Ember.run(() => {
//     this.setProperties({
//       placeholder: 'Write your first name',
//       label: 'First name (not a last name)',
//       hint: 'Usually different than your last name'
//     });
//   });
//   assert.equal(this.$().find('input').prop('placeholder'), this.get('placeholder'));
//   assert.equal(this.$().find('label').text(), this.get('label'));
//   assert.equal(this.$().find('.hint').text(), this.get('hint'));
// });

// test('sets select prompt property as bindings', function() {
//   view = Ember.View.create({
//     template: templateFor('{{input firstName as="select" labelBinding="label" hintBinding="hint" promptBinding="prompt"}}'),
//     container: container,
//     controller: controller
//   });
//   append(view);

//   equal(view.$().find('option').text(), controller.get('prompt'));
//   equal(view.$().find('label').text(), controller.get('label'));
//   equal(view.$().find('.hint').text(), controller.get('hint'));

//   Ember.run(function() {
//     controller.setProperties({
//       prompt: 'Select an option',
//       label: 'First name (not a last name)',
//       hint: 'Usually different than your last name'
//     });
//   });

//   equal(view.$().find('option').text(), controller.get('prompt'));
//   equal(view.$().find('label').text(), controller.get('label'));
//   equal(view.$().find('.hint').text(), controller.get('hint'));
// });


test('defaults the name property', function(assert) {
  this.render(hbs`{{#form-for model}}{{form-input "firstName"}}{{/form-for}}`);

  assert.equal(this.$().find('input').prop('name'), 'firstName');
});


test('allows specifying the name property', function(assert) {
  this.render(hbs`{{#form-for model}}{{form-input "firstName" name="some-other-name"}}{{/form-for}}`);

  assert.equal(this.$().find('input').prop('name'), "some-other-name");
});

test('scopes property lookup to model declared in form-for', function(assert) {
  this.set('someOtherModel', Ember.Object.create({firstName: 'Robert'}));

  this.render(hbs`{{#form-for someOtherModel}}{{form-input "firstName"}}{{/form-for}}`);

  assert.equal(this.$().find('input').val(), "Robert");
});

// test('can specify a property outside of the model if a keyword is used as a prefix', function(){
//   controller.set('someOtherModel', Ember.Object.create({firstName: 'Robert'}));

//   view = Ember.View.create({
//     template: templateFor('{{#form-for someOtherModel}}{{input controller.firstName}}{{/form-for}}'),
//     container: container,
//     controller: controller
//   });
//   append(view);

//   equal(view.$().find('input').val(), "Brian");
// });

// test('select collection can use controller scope if prefix', function() {
//   controller.set('someOtherModel', Ember.Object.create({ city: 'Ocala' }));

//   controller.set('cities', Ember.A("Boston Ocala Portland".w()));

//   view = Ember.View.create({
//     template: templateFor('{{#form-for someOtherModel}}{{input city as="select" collection="controller.cities"}}{{/form-for}}'),
//     container: container,
//     controller: controller
//   });
//   append(view);

//   equal(view.$('option').text(), "BostonOcalaPortland");
//   equal(view.$('option:selected').text(), "Ocala");
// });

test('sets input as="date" attributes properly', function(assert) {
  this.render(hbs`{{#form-for model}}{{form-input "receiveAt" as="date"}}{{/form-for}}`);
  assert.equal(this.$().find('input').prop('type'), 'date');
});

// module('{{input}} without property argument', {
//   setup: prepare,
//   teardown: cleanup
// });

// test('allows using the {{input}} helper', function() {
//   view = Ember.View.create({
//     template: templateFor('{{input name="first-name"}}'),
//     container: container,
//     controller: controller
//   });
//   append(view);

//   equal(view.$().find('input').prop('name'), "first-name");
// });

// test('{{ember-input}} uses the original Ember {{input}} helper', function(){
//   view = Ember.View.create({
//     template: templateFor('{{ember-input name="first-name"}}'),
//     container: container,
//     controller: controller
//   });
//   append(view);

//   equal(view.$().find('input').prop('name'), "first-name");
// });

test('adds a class to the parent div for the property name', function(assert) {
  this.render(hbs`{{#form-for model}}{{form-input "firstName" labelClass="blammo"}}{{/form-for}}`);
  assert.equal(this.$().find('div.input.firstName input').val(), 'Brian');
});



















// var templateFor = function(template) {
//   return Ember.Handlebars.compile(template);
// };
// var originalLookup = Ember.lookup, lookup;
// ErrorsObject = Ember.Object.extend({
//   unknownProperty: function(property) {
//     this.set(property, Ember.makeArray());
//     return this.get(property);
//   }
// });

// function prepare(){
//   container = new Ember.Container();
//   container.optionsForType('template', { instantiate: false });
//   container.resolver = function(fullName) {
//     var name = fullName.split(':')[1];
//     return Ember.TEMPLATES[name];
//   };
//   model = {
//     firstName: 'Brian',
//     lastName: 'Cardarella'
//   };
//   controller = Ember.ObjectController.create({
//     placeholder: 'A placeholder',
//     label: 'A label',
//     hint: 'A hint',
//     prompt: 'A prompt'
//   });
//   controller.set('content', model);
// }

// function cleanup(){
//   Ember.run(function() {
//     view.destroy();
//     view = null;
//   });
//   Ember.lookup = originalLookup;
// }

// module('input helpers', {
//   setup: prepare,
//   teardown: cleanup
// });
