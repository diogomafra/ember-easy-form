import Ember from 'ember';
import WrapperMixin from 'ember-easy-form/wrapper-mixin';
import {humanize} from 'ember-easy-form/utilities';

var FormInputComponent = Ember.Component.extend(WrapperMixin, {
  classNameBindings: ['wrapperConfig.inputClass'],
  layoutName: Ember.computed.oneWay('wrapperConfig.inputTemplate'),
  value: Ember.computed('model', 'propertyName', function() {
    var propertyName = this.get('propertyName');
    return Ember.get(this.get('model'), propertyName);
  }),
  model: Ember.computed(function() {
    var component = this.nearestWithProperty('model');
    return Ember.get(component, 'model');
  }),
  hintText: Ember.computed.reads('hint'),
  labelText: Ember.computed('propertyName', 'label', function() {
    return this.get('label') || humanize(this.get('propertyName'));
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

    var allOptions =  ['as', 'collection', 'optionValuePath', 'optionLabelPath', 'selection', 'multiple', 'name',
    'placeholder', 'prompt', 'disabled'];
    var fun = function() {
      var values = {};
      for (var i = 0; i < allOptions.length; i++) {
        values[allOptions[i]] = this.get(allOptions[i]);
      }
      return values;
    };
    Ember.defineProperty(this, 'inputOptions', Ember.computed.apply(null, allOptions.concat(fun)));
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
