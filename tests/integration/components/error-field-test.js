import { moduleForComponent/*, test*/ } from 'ember-qunit';
// import hbs from 'htmlbars-inline-precompile';

moduleForComponent('error-field', 'Integration | Component | error field', {
  integration: true
});

// test('it renders', function(assert) {
//   assert.expect(2);

//   // Set any properties with this.set('myProperty', 'value');
//   // Handle any actions with this.on('myAction', function(val) { ... });

//   this.render(hbs`{{error-field}}`);

//   assert.equal(this.$().text().trim(), '');

//   // Template block usage:
//   this.render(hbs`
//     {{#error-field}}
//       template block text
//     {{/error-field}}
//   `);

//   assert.equal(this.$().text().trim(), 'template block text');
// });




// test('error helper should bind to first error message in array', function() {
//   view = Ember.View.create({
//     template: templateFor('{{error-field firstName}}'),
//     container: container,
//     controller: controller
//   });
//   append(view);
//   equal(view.$().find('span.error').text(), '');
//   Ember.run(function() {
//     get(model, 'errors.firstName').pushObject("can't be blank");
//   });
//   equal(view.$().find('span.error').text(), "can't be blank");
//   Ember.run(function() {
//     get(model, 'errors.firstName').unshiftObject('is invalid');
//   });
//   equal(view.$().find('span.error').text(), 'is invalid');
//   Ember.run(function() {
//     get(model, 'errors.firstName').clear();
//   });
//   equal(view.$().find('span.error').text(), '');
// });

// test('uses the wrapper config', function() {
//   Ember.EasyForm.Config.registerWrapper('my_wrapper', {errorClass: 'my-error'});
//   view = Ember.View.create({
//     template: templateFor('{{#form-for controller wrapper="my_wrapper"}}{{error-field firstName}}{{/form-for}}'),
//     container: container,
//     controller: controller
//   });
//   append(view);
//   Ember.run(function() {
//     model.errors.set('firstName', ["can't be blank"]);
//   });
//   ok(view.$().find('span.my-error').get(0), 'errorClass not defined');
// });

// test('uses the defined template name', function() {
//   Ember.TEMPLATES['custom-error-template'] = templateFor('My custom error | {{view.errorText}}');
//   Ember.EasyForm.Config.registerWrapper('my_wrapper', {errorTemplate: 'custom-error-template'});

//   view = Ember.View.create({
//     template: templateFor('{{#form-for model wrapper="my_wrapper"}}{{error-field firstName}}{{/form-for}}'),
//     container: container,
//     controller: controller
//   });
//   append(view);
//   Ember.run(function() {
//     model.errors.set('firstName', ["can't be blank"]);
//   });
//   equal(view.$().text(), "My custom error | can't be blank");
// });



// module('error-field helpers', {
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
//       errors: ErrorsObject.create()
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
