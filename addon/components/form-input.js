import Ember from 'ember';
import BaseComponent from 'ember-easy-form/components/base';
import {humanize} from 'ember-easy-form/utilities';

var allOptions =  ['as', 'collection', 'optionValuePath', 'optionLabelPath',
'selection', 'multiple', 'name', 'placeholder', 'prompt', 'disabled'];

var FormInputComponent = BaseComponent.extend({
  layoutName: Ember.computed.oneWay('wrapperConfig.inputTemplate'),

  model: Ember.computed(function() {
    var component = this.nearestWithProperty('model');
    return Ember.get(component, 'model');
  }),

  value: Ember.computed('model', 'propertyName', function() {
    var propertyName = this.get('propertyName');
    if (!propertyName) {
      throw "Defina a propriedade";
    }
    return Ember.get(this.get('model'), propertyName);
  }),

  hintText: Ember.computed.reads('hint'),

  labelText: Ember.computed('propertyName', 'label', function() {
    var propertyName = this.get('propertyName');
    if (!propertyName) {
      throw "Defina a propriedade";
    }
    return this.get('label') || humanize(propertyName);
  }),

  name: Ember.computed('property', 'propertyName', function() {
    var propertyName = this.get('propertyName');
    if (!propertyName) {
      throw "Defina a propriedade";
    }
    return this.get('property') || propertyName;
  }),

  init: function() {
    this._super(...arguments);
    var property = this.get('propertyName');

    this.classNameBindings.push('showError:' + this.get('wrapperConfig.fieldErrorClass'));
    Ember.defineProperty(this, 'showError', Ember.computed('canShowValidationError', 'formForModel.errors.' + property + '.[]', function() {
      var errors = this.get('formForModel.errors.' + property);
      var canShowValidationError = this.get('canShowValidationError');
      return !!(canShowValidationError && errors && errors[0]);
    }));

    var bindInputOptions = function() {
      var values = {};
      for (var i = 0; i < allOptions.length; i++) {
        values[allOptions[i]] = this.get(allOptions[i]);
      }
      return values;
    };
    Ember.defineProperty(this, 'inputOptions', Ember.computed.apply(null, allOptions.concat(bindInputOptions)));
  },
  setupValidationDependencies: Ember.on('init', function() {
    // debugger;
    var keys = this.get('formForModel._dependentValidationKeys'), key;
    if (keys) {
      var propertyName = this.get('propertyName');
      for(key in keys) {
        if (keys[key].indexOf(propertyName) > -1) {
          this._keysForValidationDependencies.pushObject(key);
        }
      }
    }
  }),
  _keysForValidationDependencies: Ember.A(),
  dependentValidationKeyCanTrigger: false,
  tagName: 'div',
  classNames: ['string'],
  classNameBindings: ['wrapperConfig.inputClass', 'propertyName'],
  // didInsertElement: function() {
  //   var name = 'label-field-'+this.elementId,
  //       label = this.get(name);
  //   if (!label) { return; }
  //   this.set(name+'.for', this.get('input-field-'+this.elementId+'.elementId'));
  // },
  // concatenatedProperties: ['inputOptions', 'bindableInputOptions'],
  // inputOptions: ['as', 'collection', 'optionValuePath', 'optionLabelPath', 'selection', 'value', 'multiple', 'name'],
  // bindableInputOptions: ['placeholder', 'prompt', 'disabled'],
  // defaultOptions: {
  //   name: function(){
  //     if (this.property) {
  //       return this.property;
  //     }
  //   }
  // },
  // inputOptionsValues: Ember.computed(function() {
  //   var options = {}, i, key, keyBinding, value, inputOptions = this.inputOptions, bindableInputOptions = this.bindableInputOptions, defaultOptions = this.defaultOptions;
  //   for (i = 0; i < inputOptions.length; i++) {
  //     key = inputOptions[i];
  //     if (this[key]) {
  //       if (typeof(this[key]) === 'boolean') {
  //         this[key] = key;
  //       }
  //
  //       options[key] = this[key];
  //     }
  //   }
  //   for (i = 0; i < bindableInputOptions.length; i++) {
  //     key = bindableInputOptions[i];
  //     keyBinding = key + 'Binding';
  //     if (this[key] || this[keyBinding]) {
  //       options[keyBinding] = 'view.' + key;
  //     }
  //   }
  //
  //   for (key in defaultOptions) {
  //     if (!defaultOptions.hasOwnProperty(key)) { continue; }
  //     if (options[key]) { continue; }
  //
  //     if (value = defaultOptions[key].apply(this)) {
  //       options[key] = value;
  //     }
  //   }
  //
  //   return options;
  // }),
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
  },
  input: function() {
    this._keysForValidationDependencies.forEach(function(key) {
     this.get('parentView.childViews').forEach(function(view) {
       if (view.get('propertyName') === key) {
         view.showValidationError();
       }
     }, this);
    }, this);
  }
});

FormInputComponent.reopenClass({
  positionalParams: ['propertyName'],
});

export default FormInputComponent;