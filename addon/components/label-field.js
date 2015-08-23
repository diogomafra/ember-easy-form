import Ember from 'ember';
import WrapperMixin from 'ember-easy-form/wrapper-mixin';
import {humanize} from 'ember-easy-form/utilities';

var LabelFieldComponent = Ember.Component.extend(WrapperMixin, {
  tagName: 'label',
  layoutName: Ember.computed.oneWay('wrapperConfig.labelTemplate'),
  classNameBindings: ['wrapperConfig.labelClass'],
  labelText: Ember.computed('attrs.text', 'attrs.property', 'attrs.propertyName', function() {
    return this.get('attrs.text') || humanize(this.get('attrs.property') || this.get('attrs.propertyName'));
  })
});

LabelFieldComponent.reopenClass({
  positionalParams: ['propertyName']
});

export default LabelFieldComponent;