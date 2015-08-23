import Ember from 'ember';
import {humanize} from 'ember-easy-form/utilities';

var ErrorFieldComponent = Ember.Component.extend({
  tagName: 'span',
  layoutName: 'components/easy-form/error-field',

  text: Ember.computed('attrs.text', 'attrs.propertyName', function() {
    return this.get('attrs.text') || humanize(this.get('attrs.propertyName'));
  })
});

ErrorFieldComponent.reopenClass({
  positionalParams: ['propertyName']
});

export default ErrorFieldComponent;