import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('submit-button', 'Integration | Component | submit button', {
  integration: true
});

test('renders submit button', function(assert) {
  this.render(hbs`{{submit-button}}`);

  assert.equal(this.$().find('input').prop('value'), 'Submit');
  assert.equal(this.$().find('input').prop('type'), 'submit');
});



// test('renders submit button', function() {
//   view = Ember.View.create({
//     template: templateFor('{{submit}}'),
//     container: container,
//     context: model
//   });
//   append(view);
//   equal(view.$().find('input').prop('value'), 'Submit');
//   equal(view.$().find('input').prop('type'), 'submit');
// });

// test('renders as button', function() {
//   view = Ember.View.create({
//     template: templateFor('{{submit as="button"}}'),
//     container: container,
//     context: model
//   });
//   append(view);
//   equal(view.$().find('button').text(), 'Submit');
//   equal(view.$().find('button').prop('type'), 'submit');
// });

// test('has custom value as button', function() {
//   view = Ember.View.create({
//     template: templateFor('{{submit "Create" as="button"}}'),
//     container: container,
//     context: model
//   });
//   append(view);
//   equal(view.$().find('button').text(), 'Create');
// });

// test('submit as button disabled state is bound to models valid state', function() {
//   Ember.run(function() {
//     set(model,'isValid', false);
//   });
//   view = Ember.View.create({
//     template: templateFor('{{submit as="button"}}'),
//     container: container,
//     context: model
//   });
//   append(view);
//   equal(view.$().find('button').prop('disabled'), true);
//   Ember.run(function() {
//     set(model,'isValid', true);
//   });
//   equal(view.$().find('button').prop('disabled'), false);
// });

// test('custom value', function() {
//   view = Ember.View.create({
//     template: templateFor('{{submit "Create"}}'),
//     container: container,
//     context: model
//   });
//   append(view);
//   equal(view.$().find('input').prop('value'), 'Create');
// });

// test('submit button disabled state is bound to models valid state', function() {
//   Ember.run(function() {
//     set(model,'isValid', false);
//     model = Ember.Object.create(model);
//   });
//   view = Ember.View.create({
//     template: templateFor('{{submit}}'),
//     container: container,
//     context: model
//   });
//   append(view);
//   equal(view.$().find('input').prop('disabled'), true);
//   Ember.run(function() {
//     set(model,'isValid', true);
//   });
//   equal(view.$().find('input').prop('disabled'), false);
// });















// module('submit helpers', {
//   setup: function() {
//     container = new Ember.Container();
//     container.optionsForType('template', { instantiate: false });
//     container.resolver = function(fullName) {
//       var name = fullName.split(':')[1];
//       return Ember.TEMPLATES[name];
//     };
//     model = {
//       firstName: 'Brian',
//       lastName: 'Cardarella',
//       validate: function() {
//         return valid;
//       },
//     };
//     var Controller = Ember.Controller.extend({
//       actions: {
//         submit: function() {
//           this.incrementProperty('count');
//         }
//       }
//     });
//     controller = Controller.create();
//     controller.set('count', 0);
//   },
//   teardown: function() {
//     Ember.run(function() {
//       view.destroy();
//       view = null;
//     });
//     Ember.lookup = original_lookup;
//   }
// });
