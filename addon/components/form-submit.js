import Ember from 'ember';
import WrapperMixin from 'ember-easy-form/wrapper-mixin';

var SubmitButtonComponent = Ember.Component.extend(WrapperMixin, {
  attributeBindings: ['type', 'value', 'disabled'],
  tagName: 'input',
  type: 'submit',
  disabled: Ember.computed.not('formForModel.isValid'),
  value: Ember.computed('textValue', function() {
    return this.get('textValue') || 'Submit';
  })
});

SubmitButtonComponent.reopenClass({
  positionalParams: ['textValue']
});

export default SubmitButtonComponent;
