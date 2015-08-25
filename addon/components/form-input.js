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
  }),
  name: Ember.computed('property', 'propertyName', function() {
    return this.get('property') || this.get('propertyName');
  }),
  init() {
    this._super(...arguments);
    var property = this.get('propertyName');
    this.classNameBindings.push('showError:' + this.get('wrapperConfig.fieldErrorClass'));
    // Ember.defineProperty(this, 'showError', Ember.computed.and('canShowValidationError', 'formForModel.errors.' + property + '.firstObject'));
    Ember.defineProperty(this, 'showError', Ember.computed('canShowValidationError', 'formForModel.errors.' + property + '.[]', function() {
      var errors = this.get('formForModel.errors.' + property);
      var canShowValidationError = this.get('canShowValidationError');
      return !!(canShowValidationError && errors && errors[0]);
    }));
  },
  focusOut: function() {
    this.set('hasFocusedOut', true);
    this.showValidationError();
  },
  showValidationError: function() {
    if (this.get('hasFocusedOut')) {
      var property = this.get('propertyName');
      if (Ember.isEmpty(this.get('formForModel.errors.' + property))) {
        this.set('canShowValidationError', false);
      } else {
        this.set('canShowValidationError', true);
      }
    }
  }
});

FormInputComponent.reopenClass({
  positionalParams: ['propertyName'],
});

export default FormInputComponent;