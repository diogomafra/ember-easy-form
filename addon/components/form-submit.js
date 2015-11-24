import Ember from 'ember';
import WrapperMixin from 'ember-easy-form/wrapper-mixin';

var SubmitButtonComponent = Ember.Component.extend(WrapperMixin, {
  attributeBindings: ['type', 'value', 'disabled'],
  tagName: 'input',
  type: 'submit',
  disabled: Ember.computed.not('formForModel.isValid'),
  value: Ember.computed('valueText', function() {
    return this.get('valueText') || 'Submit';
  })
});

SubmitButtonComponent.reopenClass({
  positionalParams: ['valueText']
});

export default SubmitButtonComponent;
