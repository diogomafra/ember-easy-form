import { moduleForComponent, test } from 'ember-qunit';
import { skip } from 'qunit';
import hbs from 'htmlbars-inline-precompile';
import config from 'ember-easy-form/config';

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

test('uses the wrapper config', function(assert) {
  config.registerWrapper('my_wrapper', {hintClass: 'my-hint'});

  this.render(hbs`{{#form-for controller wrapper="my_wrapper"}}{{hint-field firstName text="Some text"}}{{/form-for}}`);

  assert.ok(this.$().find('span.my-hint').get(0), 'hintClass not defined');
});

test('uses the defined template name', function(assert) {
  this.container.register('template:custom-hint-template', hbs`My custom hint | {{view.hintText}}`);
  config.registerWrapper('my_wrapper', {hintTemplate: 'custom-hint-template'});

  this.render(hbs`{{#form-for controller wrapper="my_wrapper"}}{{hint-field firstName text="My text"}}{{/form-for}}`);

  assert.equal(this.$().text(), "My custom hint | My text");
});
