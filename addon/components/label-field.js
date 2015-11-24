import Ember from 'ember';
import WrapperMixin from 'ember-easy-form/wrapper-mixin';
import {humanize} from 'ember-easy-form/utilities';

var LabelFieldComponent = Ember.Component.extend(WrapperMixin, {
  tagName: 'label',
  attributeBindings: ['for'],
  classNameBindings: ['wrapperConfig.labelClass'],
  labelText: Ember.computed('text', 'property', function() {
    return this.get('text') || humanize(this.get('property') || this.get('propertyName'));
  }),
  layoutName: Ember.computed.oneWay('wrapperConfig.labelTemplate')
});


LabelFieldComponent.reopenClass({
  positionalParams: ['propertyName']
});

export default LabelFieldComponent;
