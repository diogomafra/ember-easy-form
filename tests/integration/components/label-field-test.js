import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('label-field', 'Integration | Component | label field', {
  integration: true
});

test('renders a label field', function(assert) {
  this.render(hbs`{{label-field "firstName"}}`);

  assert.equal(this.$().find('label').text(), 'First name');
});


test('renders a label field with custom text', function(assert) {
  this.render(hbs`{{label-field text="Some text"}}`);

  assert.equal(this.$().find('label').text(), 'Some text');
});

// test('uses the wrapper config', function() {
//   Ember.EasyForm.Config.registerWrapper('my_wrapper', {labelClass: 'my-label'});
//   view = Ember.View.create({
//     template: templateFor('{{#form-for controller wrapper="my_wrapper"}}{{label-field firstName}}{{/form-for}}'),
//     container: container,
//     controller: controller
//   });
//   append(view);
//   ok(view.$().find('label.my-label').get(0), 'labelClass not defined');
// });

// test('uses the defined template name', function() {
//   Ember.TEMPLATES['custom-label-template'] = templateFor('My custom label | {{view.labelText}}');
//   Ember.EasyForm.Config.registerWrapper('my_wrapper', {labelTemplate: 'custom-label-template'});

//   view = Ember.View.create({
//     template: templateFor('{{#form-for controller wrapper="my_wrapper"}}{{label-field firstName}}{{/form-for}}'),
//     container: container,
//     controller: controller
//   });
//   append(view);
//   equal(view.$().text(), "My custom label | First name");
// });











// module('label-field helpers', {
//   setup: function() {
//     container = new Ember.Container();
//     container.optionsForType('template', { instantiate: false });
//     container.resolver = function(fullName) {
//       var name = fullName.split(':')[1];
//       return Ember.TEMPLATES[name];
//     };
//     model = {
//       firstName: 'Brian',
//     };
//     controller = Ember.ObjectController.create();
//     controller.set('content', model);
//   },
//   teardown: function() {
//     Ember.run(function() {
//       view.destroy();
//       view = null;
//     });
//     Ember.lookup = original_lookup;
//   }
// });

// var append = function(view) {
//   Ember.run(function() {
//     view.appendTo('#qunit-fixture');
//   });
// };
