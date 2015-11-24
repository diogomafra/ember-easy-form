import Ember from 'ember';
import WrapperMixin from 'ember-easy-form/wrapper-mixin';

var SubmitButtonComponent = Ember.Component.extend(WrapperMixin, {
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
