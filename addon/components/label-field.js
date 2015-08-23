import Ember from 'ember';
import layout from 'ember-easy-form/templates/components/label-field';
import {humanize} from 'ember-easy-form/utilities';

var LabelFieldComponent = Ember.Component.extend({
  tagName: 'label',
  layout: layout,

  text: Ember.computed('attrs.text', 'attrs.property', 'attrs.propertyName', function() {
    return this.get('attrs.text') || humanize(this.get('attrs.property') || this.get('attrs.propertyName'));
  })
});

LabelFieldComponent.reopenClass({
  positionalParams: ['propertyName']
});

export default LabelFieldComponent;