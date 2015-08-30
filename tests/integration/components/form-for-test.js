import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import config from 'ember-easy-form/config';
import setup from 'ember-easy-form/setup';

var validateFunction = function() {
  return Ember.RSVP.resolve();
};

moduleForComponent('form-for', 'Integration | Component | form for', {
  integration: true,
  beforeEach: function() {
    setup();
    var model = {
      firstName: 'Brian',
      lastName: 'Cardarella',
      errors: Ember.Object.create(),
      validate: validateFunction
    };
    this.set('model', model);
  }
});

test('renders a form element', function(assert) {
  this.render(hbs`{{form-for}}`);
  assert.equal(this.$().text().trim(), '');

  this.render(hbs`{{#form-for}}{{/form-for}}`);
  assert.ok(this.$().find('form').get(0));
});

test('uses the defined wrapper', function(assert) {
  config.registerWrapper('my_wrapper', {formClass: 'my-form-class'});

  this.render(hbs`{{#form-for model wrapper="my_wrapper"}}{{/form-for}}`);

  assert.equal(this.$().find('form').attr('class'), 'ember-view my-form-class');
});

test('submitting with invalid model does not call submit action', function(assert) {
  var submitCalled = false;
  this.on('submit', function() {
    submitCalled = true;
  });
  Ember.run(() => {
    this.set('model.isValid', false);
  });
  this.render(hbs`{{#form-for model}}{{/form-for}}`);
  Ember.run(() => {
    this.$().find('form').submit();
  });
  assert.ok(!submitCalled, 'submit should not be called');
});

test('submitting with valid model calls submit action', function(assert) {
  Ember.run(() => {
    this.set('model.isValid', true);
  });
  var submitCalled = false;
  this.on('submit', function() {
    submitCalled = true;
  });

  this.render(hbs`{{#form-for model}}{{/form-for}}`);
  Ember.run(() => {
    // this.$().find('input[type="submit"]').click();
    this.$().find('form').submit();
  });
  assert.ok(submitCalled, 'submit was not called');
});


test('can override the action called by submit on the controller', function(assert) {
  Ember.run(() => {
    this.set('model.isValid', true);
  });
  var submitCalled = false;
  this.on('customSubmit', function() {
    submitCalled = true;
  });

  this.render(hbs`{{#form-for model action="customSubmit"}}{{/form-for}}`);
  Ember.run(() => {
    this.$().find('form').submit();
  });
  assert.ok(submitCalled, 'submit was not called');
});



test('submitting with model that does not have validate method', function(assert) {
  var model = Ember.Object.create();
  Ember.run(() => {
    this.set('model', model);
  });
  var submitCalled = false;
  this.on('submit', function() {
    submitCalled = true;
  });
  this.render(hbs`{{#form-for model}}{{/form-for}}`);
  Ember.run(() => {
    this.$().find('form').submit();
  });
  assert.ok(submitCalled);
});

test('submitting with ember-data model without validations can call submit action on controller', function(assert) {
  Ember.run(() => {
    this.set('model.isValid', false);
    this.set('model.validate', undefined);
  });
  var submitCalled = false;
  this.on('submit', function() {
    submitCalled = true;
  });
  this.render(hbs`{{#form-for model}}{{/form-for}}`);
  Ember.run(() => {
    this.$().find('form').submit();
  });
  assert.ok(submitCalled, 'submit was not called');
});

test('uses the specified model as the basis for {{input}} property lookup', function(assert) {
  this.set('theModel', { foo: "LOL" });
  this.set('foo', 'BORING');

  this.render(hbs`
    {{#form-for theModel}}
      {{form-input "foo" name="easy-input"}}
      <div id="asl">{{foo}}</div>
      {{input id="ember-input" value=foo}}
    {{/form-for}}
  `);

  assert.equal(this.$('input[name="easy-input"]').val(), "LOL", "easy-input uses form-for's model as its context for looking up its property");
  assert.equal(this.$('#ember-input').val(), "BORING", "vanilla ember inputs are unaffected by form-for");
  assert.equal(this.$('#asl').text(), "BORING", "form-for doesn't change context for plain ol bindings");
});

test('uses the specified models validation object', function(assert) {
  var theModel = {
    validate: validateFunction
  };
  this.set('theModel', theModel);
  var submitCalled = false;
  this.on('submit', function() {
    submitCalled = true;
  });
  this.render(hbs`{{#form-for theModel}}{{form-input "foo"}}{{/form-for}}`);

  Ember.run(() => {
    this.$().find('form').submit();
  });
  assert.ok(!submitCalled);
  this.set('theModel.isValid', true);
  Ember.run(() => {
    this.$().find('form').submit();
  });
  assert.ok(submitCalled);
});
