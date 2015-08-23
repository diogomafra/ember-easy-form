import { module, test } from 'qunit';
import {
  humanize
} from  'ember-easy-form/utilities';

module('Unit | utilities');

test('humanizes string', function(assert) {
  assert.equal(humanize('firstName'), 'First name');
});

// test('mutation of options - only property', function(assert) {
//   assert.equal(Ember.EasyForm.processOptions('firstName'), 'firstName');
// });

// test('mutation of options - property and options', function(assert) {
//   var options = {hash: {placeholder: 'First name'}};
//   assert.deepEqual(Ember.EasyForm.processOptions('firstName', options), {hash: {placeholder: 'First name', property: 'firstName'}});
// });

// test('mutation of options - property and translation options (e.g. placeholderTranslation, labelTranslation, etc) without Ember.I18n', function(assert) {
//   var options = {hash: {placeholderTranslation: 'users.first_name'}};
//   assert.deepEqual(Ember.EasyForm.processOptions('firstName', options), {hash: {placeholderTranslation: 'users.first_name', property: 'firstName'}});
// });

// test('mutation of options - property and translation options (e.g. placeholderTranslation, labelTranslation, etc) with Ember.I18n', function(assert) {
//   Ember.I18n = {
//     t: function(key) {
//       return Ember.EasyForm.humanize(key);
//     }
//   };
//   var options = {hash: {placeholderTranslation: 'users.first_name'}};
//   assert.deepEqual(Ember.EasyForm.processOptions('firstName', options), {hash: {placeholder: 'Users.first name', property: 'firstName'}});

//   delete Ember.I18n;
// });