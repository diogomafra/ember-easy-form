import Ember from 'ember';
import layout from 'ember-easy-form/templates/components/error-field';
import {humanize} from 'ember-easy-form/utilities';

var ErrorFieldComponent = Ember.Component.extend({
  tagName: 'span',
  layout: layout,

  text: Ember.computed('attrs.text', 'attrs.propertyName', function() {
    return this.get('attrs.text') || humanize(this.get('attrs.propertyName'));
  })
});

ErrorFieldComponent.reopenClass({
  positionalParams: ['propertyName']
});

export default ErrorFieldComponent;