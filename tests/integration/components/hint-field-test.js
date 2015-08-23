import { moduleForComponent, test } from 'ember-qunit';
import { skip } from 'qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('hint-field', 'Integration | Component | hint field', {
  integration: true
});

test('renders a hint field with custom text', function(assert) {
  this.render(hbs`{{hint-field text="Some text"}}`);

  assert.equal(this.$().find('span.hint').text(), 'Some text');
});

skip('does not render a hint field without custom text', function(assert) {
  this.render(hbs`{{hint-field "firstName"}}`);

  assert.equal(this.$().find('span.hint').length, '0', 'The hint element should not have been created');
});


// test('uses the wrapper config', function() {
//   Ember.EasyForm.Config.registerWrapper('my_wrapper', {hintClass: 'my-hint'});
//   view = Ember.View.create({
//     template: templateFor('{{#form-for controller wrapper="my_wrapper"}}{{hint-field firstName text="Some text"}}{{/form-for}}'),
//     container: container,
//     controller: controller
//   });
//   append(view);
//   ok(view.$().find('span.my-hint').get(0), 'hintClass not defined');
// });

// test('uses the defined template name', function() {
//   Ember.TEMPLATES['custom-hint-template'] = templateFor('My custom hint | {{view.hintText}}');
//   Ember.EasyForm.Config.registerWrapper('my_wrapper', {hintTemplate: 'custom-hint-template'});

//   view = Ember.View.create({
//     template: templateFor('{{#form-for controller wrapper="my_wrapper"}}{{hint-field firstName text="My text"}}{{/form-for}}'),
//     container: container,
//     controller: controller
//   });
//   append(view);
//   equal(view.$().text(), "My custom hint | My text");
// });







// module('hint-field helpers', {
//   setup: function() {
//     container = new Ember.Container();
//     container.optionsForType('template', { instantiate: false });
//     container.resolver = function(fullName) {
//       var name = fullName.split(':')[1];
//       return Ember.TEMPLATES[name];
//     };
//     model =  { firstName: 'Brian' };
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
