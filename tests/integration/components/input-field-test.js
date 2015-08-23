import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('input-field', 'Integration | Component | input field', {
  integration: true,
  beforeEach: function() {
    let countries = [{ id: 1, name: 'South Aftica' }, { id: 2, name: 'United States' }];
    this.set('optionsForCountry', countries);
    this.set('model', {
      firstName: 'Brian',
      lastName: 'Cardarella',
      country: countries[1]
    });
  }
});

test('render text input and sets value propertly', function(assert) {
  this.render(hbs`{{#form-for model}}{{input-field "firstName"}}{{/form-for}}`);

  assert.equal(this.$().find('input').attr('type'), 'text');
  assert.equal(this.$().find('input').val(), 'Brian');
});

test('changes the text when the model value changed', function(assert) {
  this.render(hbs`{{#form-for model}}{{input-field "firstName"}}{{/form-for}}`);

  assert.equal(this.$().find('input').attr('type'), 'text');
  assert.equal(this.$().find('input').val(), 'Brian');
  Ember.run(() => {
    this.set('model.firstName', 'Diogo');
  });
  assert.equal(this.$().find('input').val(), 'Diogo');
});

test('allows setting of input attributes', function(assert) {
  this.render(hbs`{{#form-for model}}{{input-field "secret" type="hidden"}}{{/form-for}}`);
  assert.equal(this.$().find('input').attr('type'), 'hidden');
});

test('auto sets input type to password if name includes password', function(assert) {
  this.render(hbs`{{#form-for model}}{{input-field "passwordConfirmation"}}{{/form-for}}`);
  assert.equal(this.$().find('input').attr('type'), 'password');
});

test('auto sets input type to password if forced password', function(assert) {
  this.render(hbs`{{#form-for model}}{{input-field "token" as="password"}}{{/form-for}}`);
  assert.equal(this.$().find('input').attr('type'), 'password');
});

test('auto sets input type to url if name includes url', function(assert) {
  this.render(hbs`{{#form-for model}}{{input-field "url"}}{{/form-for}}`);
  assert.equal(this.$().find('input').attr('type'), 'url');
});

test('auto sets input type to url if forced url', function(assert) {
  this.render(hbs`{{#form-for model}}{{input-field "website" as="url"}}{{/form-for}}`);
  assert.equal(this.$().find('input').attr('type'), 'url');
});

test('auto sets input type to url if name includes color', function(assert) {
  this.render(hbs`{{#form-for model}}{{input-field "color"}}{{/form-for}}`);
  assert.equal(this.$().find('input').attr('type'), 'color');
});

test('auto sets input type to url if forced to color', function(assert) {
  this.render(hbs`{{#form-for model}}{{input-field "hue" as="color"}}{{/form-for}}`);
  assert.equal(this.$().find('input').attr('type'), 'color');
});

test('auto sets input type to url if name includes tel', function(assert) {
  this.render(hbs`{{#form-for model}}{{input-field "telephone"}}{{/form-for}}`);
  assert.equal(this.$().find('input').attr('type'), 'tel');
});

test('auto sets input type to url if forced to tel', function(assert) {
  this.render(hbs`{{#form-for model}}{{input-field "phoneNumber" as="tel"}}{{/form-for}}`);
  assert.equal(this.$().find('input').attr('type'), 'tel');
});

test('auto sets input type to url if name includes search', function(assert) {
  this.render(hbs`{{#form-for model}}{{input-field "search"}}{{/form-for}}`);
  assert.equal(this.$().find('input').attr('type'), 'search');
});

test('auto sets input type to url if forced to search', function(assert) {
  this.render(hbs`{{#form-for model}}{{input-field "query" as="search"}}{{/form-for}}`);
  assert.equal(this.$().find('input').attr('type'), 'search');
});

test('auto sets input type to url if name includes email', function(assert) {
  this.render(hbs`{{#form-for model}}{{input-field "email"}}{{/form-for}}`);
  assert.equal(this.$().find('input').attr('type'), 'email');
});

test('auto sets input type to url if forced to email', function(assert) {
  this.render(hbs`{{#form-for model}}{{input-field "receivedAt" as="email"}}{{/form-for}}`);
  assert.equal(this.$().find('input').attr('type'), 'email');
});

test('auto sets input type to number if property meta attribute is a number', function(assert) {
  let model = this.get('model');
  model['metaForProperty'] = function(property) {
    var obj = { 'type': 'number' };
    if (property === 'age') {
      return obj;
    }
  };
  Ember.set(model,'age', 30);

  this.render(hbs`{{#form-for model}}{{input-field "age"}}{{/form-for}}`);

  assert.equal(this.$().find('input').attr('type'), 'number');
});

test('auto sets input type to number if property is a number', function(assert) {
  this.set('model.age', 30);
  this.render(hbs`{{#form-for model}}{{input-field "age"}}{{/form-for}}`);
  assert.equal(this.$().find('input').attr('type'), 'number');
});

test('auto sets input type to date if property meta attribute is a date', function(assert) {
  let model = this.get('model');
  model['metaForProperty'] = function(property) {
    var obj = { 'type': 'date' };
    if (property === 'birthday') {
      return obj;
    }
  };
  Ember.set(model,'birthday', new Date());

  this.render(hbs`{{#form-for model}}{{input-field "birthday"}}{{/form-for}}`);

  assert.equal(this.$().find('input').attr('type'), 'date');
});

test('auto sets input type to checkbox if forced to checkbox', function(assert) {
  this.set('model.alive', true);
  this.render(hbs`{{#form-for model}}{{input-field "alive" as="checkbox"}}{{/form-for}}`);
  assert.equal(this.$().find('input').attr('type'), 'checkbox');
  assert.equal(this.$().find('input').is(':checked'), true);
});

test('auto sets input type to boolean if property meta attribute is a boolean', function(assert) {
  let model = this.get('model');
  model['metaForProperty'] = function(property) {
    var obj = { 'type': 'boolean' };
    if (property === 'old') {
      return obj;
    }
  };
  Ember.set(model,'old', false);

  this.render(hbs`{{#form-for model}}{{input-field "old"}}{{/form-for}}`);

  assert.equal(this.$().find('input').attr('type'), 'checkbox');
});


test('does not fail if a controller content constructor does not respond to proto', function(assert) {
  this.set('model', []);
  this.render(hbs`{{#form-for model}}{{input-field "name"}}{{/form-for}}`);
  assert.equal(this.$().find('input').attr('type'), 'text');
});

// test('renders semantic form elements with text area', function() {
//   view = Ember.View.create({
//     template: templateFor('{{input-field firstName as="text"}}'),
//     container: container,
//     controller: controller
//   });
//   append(view);
//   equal(view.$().find('textarea').val(), 'Brian');
// });

// test('uses the custom input type when defined', function() {
//   Ember.EasyForm.Config.registerInputType('my_input', Ember.EasyForm.TextArea);
//   Ember.EasyForm.Config.registerInputType('another_input', Ember.EasyForm.TextField);
//   view = Ember.View.create({
//     template: templateFor('{{input-field firstName as="my_input"}}{{input-field lastName as="another_input"}}'),
//     container: container,
//     controller: controller
//   });
//   append(view);
//   equal(view.$().find('textarea').val(), 'Brian');
//   equal(view.$().find('input').val(), 'Cardarella');
// });

// test('generates a select input and options', function() {
//   view = Ember.View.create({
//     template: templateFor('{{input-field country as="select" collection="optionsForCountry"}}'),
//     container: container,
//     controller: controller
//   });

//   append(view);
//   equal(view.$().find('select').length, 1);
//   equal(view.$().find('select option').length, 2);
// });

// test('generates a select input and options with prompt', function() {
//   view = Ember.View.create({
//     template: templateFor('{{input-field country as="select" collection="optionsForCountry" prompt="Select Country"}}'),
//     container: container,
//     controller: controller
//   });

//   append(view);
//   equal(view.$().find('select').length, 1);
//   equal(view.$().find('select option').length, 3);
// });

// test('generates a select input with correct selection', function() {
//   view = Ember.View.create({
//     template: templateFor('{{input-field country as="select" collection="optionsForCountry" selection="country" optionValuePath="content.id" optionLabelPath="content.name"}}'),
//     container: container,
//     controller: controller
//   });

//   append(view);
//   ok(view.$().find('select option:selected').html().match(/United States/));
// });

// test('generates a select input with correct selection when no selection is specified', function() {
//   view = Ember.View.create({
//     template: templateFor('{{input-field country as="select" collection="optionsForCountry" optionValuePath="content.id" optionLabelPath="content.name"}}'),
//     container: container,
//     controller: controller
//   });

//   append(view);
//   ok(view.$().find('select option:selected').html().match(/United States/));
// });

// test('generates a select input correct value', function() {
//   view = Ember.View.create({
//     template: templateFor('{{input-field country as="select" collection="optionsForCountry" value="country.id" optionValuePath="content.id" optionLabelPath="content.name"}}'),
//     container: container,
//     controller: controller
//   });

//   append(view);
//   ok(view.$().find('select option:selected').html().match(/United States/));
// });

test('auto sets input type to date', function(assert) {
  this.render(hbs`{{#form-for model}}{{input-field "receivedAt" as="date"}}{{/form-for}}`);
  assert.equal(this.$().find('input').attr('type'), 'date');
});

test('auto sets input type to time', function(assert) {
  this.render(hbs`{{#form-for model}}{{input-field "receivedAt" as="time"}}{{/form-for}}`);
  assert.equal(this.$().find('input').attr('type'), 'time');
});











// module('input-field helpers', {
//   setup: function() {
//     container = new Ember.Container();
//     container.optionsForType('template', { instantiate: false });
//     container.resolver = function(fullName) {
//       var name = fullName.split(':')[1];
//       return Ember.TEMPLATES[name];
//     };
//     countries = [{ id: 1, name: 'South Aftica' }, { id: 2, name: 'United States' }];

//     model = {
//       firstName: 'Brian',
//       lastName: 'Cardarella',
//       country: countries[1]
//     };

//     controller = Ember.ObjectController.create();
//     controller.set('content', model);
//     controller.set('optionsForCountry', countries);
//   },
//   teardown: function() {
//     Ember.run(function() {
//       view.destroy();
//       view = null;
//     });
//     Ember.lookup = original_lookup;
//   }
// });