import Ember from 'ember';
// import {humanize} from 'ember-easy-form/utilities';

var InputFieldComponent = Ember.Component.extend({
  tagName: 'input',
  attributeBindings: ['type', 'value', 'name'],
  type: 'text',
  name: Ember.computed('attrs.property', 'attrs.propertyName', function() {
    return this.get('attrs.property') || this.get('attrs.propertyName');
  }),
  value: Ember.computed('attrs.value', function() {
    return this.get('attrs.value');
  })
});

InputFieldComponent.reopenClass({
  positionalParams: ['propertyName']
});

export default InputFieldComponent;