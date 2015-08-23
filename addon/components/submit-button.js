import Ember from 'ember';
import WrapperMixin from 'ember-easy-form/wrapper-mixin';

var SubmitButtonComponent = Ember.Component.extend(WrapperMixin, {
  tagName: 'input',
  attributeBindings: ['type', 'value', 'disabled'],
  type: 'submit',
  disabled: Ember.computed.not('formForModel.isValid'),

  value: Ember.computed('attrs.valueText', function() {
    return this.get('attrs.valueText') || 'Submit';
  })
});

SubmitButtonComponent.reopenClass({
  positionalParams: ['valueText']
});

export default SubmitButtonComponent;