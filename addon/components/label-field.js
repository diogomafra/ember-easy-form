import Ember from 'ember';
import BaseComponent from 'ember-easy-form/components/base';
import {humanize} from 'ember-easy-form/utilities';

// var LabelFieldComponent = Ember.Component.extend(WrapperMixin, {
//   tagName: 'label',
//   layoutName: Ember.computed.oneWay('wrapperConfig.labelTemplate'),
//   classNameBindings: ['wrapperConfig.labelClass'],
//   labelText: Ember.computed('text', 'property', 'propertyName', function() {
//     return this.get('text') || humanize(this.get('property') || this.get('propertyName'));
//   })
// });

var LabelFieldComponent = BaseComponent.extend({
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