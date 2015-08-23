import Ember from 'ember';
import layout from 'ember-easy-form/templates/components/form-input';
import {humanize} from 'ember-easy-form/utilities';

var FormInputComponent = Ember.Component.extend({
  layout: layout,
  value: Ember.computed('model', 'propertyName', function() {
    var propertyName = this.get('propertyName');
    return Ember.get(this.get('model'), propertyName);
  }),
  model: Ember.computed(function() {
    var component = this.nearestWithProperty('model');
    return Ember.get(component, 'model');
  }),
  propertyName: Ember.computed.reads('attrs.propertyName'),
  hintText: Ember.computed.reads('attrs.hint'),
  labelText: Ember.computed('attrs.propertyName', 'attrs.label', function() {
    return this.get('attrs.label') || humanize(this.get('attrs.propertyName'));
  })
});

FormInputComponent.reopenClass({
  positionalParams: ['propertyName'],
});

export default FormInputComponent;