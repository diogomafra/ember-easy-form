import Ember from 'ember';

var SubmitButtonComponent = Ember.Component.extend({
  tagName: 'input',
  attributeBindings: ['type', 'value'],
  type: 'submit',

  value: Ember.computed('attrs.valueText', function() {
    return this.get('attrs.valueText') || 'Submit';
  })
});

SubmitButtonComponent.reopenClass({
  positionalParams: ['valueText']
});

export default SubmitButtonComponent;