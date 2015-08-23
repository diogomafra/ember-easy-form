import Ember from 'ember';
import WrapperMixin from 'ember-easy-form/wrapper-mixin';
import {humanize} from 'ember-easy-form/utilities';

var FormInputComponent = Ember.Component.extend(WrapperMixin, {
  layoutName: Ember.computed.oneWay('wrapperConfig.inputTemplate'),
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