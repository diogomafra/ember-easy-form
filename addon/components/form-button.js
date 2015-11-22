import Ember from 'ember';
import BaseComponent from 'ember-easy-form/components/base';

// var SubmitButtonComponent = Ember.Component.extend(WrapperMixin, {
//   attributeBindings: ['type', 'value', 'disabled'],
//   tagName: 'input',
//   type: 'submit',
//   disabled: Ember.computed.not('formForModel.isValid'),
//   value: Ember.computed('valueText', function() {
//     return this.get('valueText') || 'Submit';
//   })
// });

// var SubmitButtonComponent = BaseComponent.extend({
//   attributeBindings: ['type', 'value', 'disabled'],
//   tagName: 'button',
//   type: 'submit',
//   disabled: Ember.computed.not('formForModel.isValid'),
//   value: Ember.computed('valueText', function() {
//     return this.get('valueText') || 'Submit';
//   })
// });

var SubmitButtonComponent = BaseComponent.extend({
  tagName: 'button',
  layoutName: 'components/easy-form/button',
  attributeBindings: ['type', 'disabled'],
  type: 'submit',
  disabled: Ember.computed.not('formForModel.isValid'),
  text: Ember.computed('valueText', function() {
    return this.get('valueText') || 'Submit';
  })
});





SubmitButtonComponent.reopenClass({
  positionalParams: ['valueText']
});

export default SubmitButtonComponent;