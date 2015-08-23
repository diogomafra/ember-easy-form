import Ember from 'ember';
import WrapperMixin from 'ember-easy-form/wrapper-mixin';
// import {humanize} from 'ember-easy-form/utilities';

// const { get } = Ember;

function propertyType(model, property) {
  var constructor = model.constructor;
  if (constructor.proto) {
    return Ember.meta(constructor.proto(), false).descs[property];
  } else {
    return null;
  }
}

function getTypeForValue(forcedType, property, model, value) {
  if (forcedType) {
    return forcedType;
  }

  if (property.match(/password/)) {
    return 'password';
  } else if (property.match(/email/)) {
    return 'email';
  } else if (property.match(/url/)) {
    return 'url';
  } else if (property.match(/color/)) {
    return 'color';
  } else if (property.match(/^tel/)) {
    return 'tel';
  } else if (property.match(/search/)) {
    return 'search';
  } else {
    if (propertyType(model, property) === 'number' || typeof(value) === 'number') {
      return 'number';
    } else if (propertyType(property) === 'date' || (!Ember.isNone(value) && value.constructor === Date)) {
      return 'date';
    } else if (propertyType(property) === 'boolean' || (!Ember.isNone(value) && value.constructor === Boolean)) {
      return 'checkbox';
    }
  }

  return "text";
}

var InputFieldComponent = Ember.Component.extend(WrapperMixin, {
  tagName: 'input',
  attributeBindings: ['type', 'value', 'name'],
  name: Ember.computed('property', 'propertyName', function() {
    return this.get('property') || this.get('propertyName');
  }),
  init() {
    this._super(...arguments);
    var model = this.get('formForModel');
    var propertyName = (this.get('property') || this.get('propertyName'));
    var dependentKey = 'formForModel.' + propertyName;
    this.set('value', Ember.computed(dependentKey, function() {
      return this.get(dependentKey);
    }));
    var forcedType = this.get('as');
    var value = this.get('value');
    var type = getTypeForValue(forcedType, propertyName, model, value);
    this.set('type', type);
    if (type === 'checkbox') {
      this.set('checked', Ember.computed.alias(dependentKey));
      this.get('attributeBindings').push('checked');
    }
  }
});

InputFieldComponent.reopenClass({
  positionalParams: ['propertyName']
});

export default InputFieldComponent;