import Ember from 'ember';

let {
  underscore,
  capitalize
} = Ember.String;

export function humanize(string) {
  if (string) {
    return capitalize(underscore(string).split('_').join(' '));
  } else {
    return "";
  }
}

export function getTypeForValue(forcedType, property, model, value) {
  if (forcedType) {
    return forcedType;
  }

  if (!property) {
    return 'text';
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
    } else if (propertyType(model, property) === 'date' || (!Ember.isNone(value) && value.constructor === Date)) {
      return 'date';
    } else if (propertyType(model, property) === 'boolean' || (!Ember.isNone(value) && value.constructor === Boolean)) {
      return 'checkbox';
    }
  }

  return 'text';
}

function propertyType(model, property) {
  if (!model) {
    return null;
  }

  var constructor = model.constructor;
  if (constructor.proto) {
    // TODO - diogo - I think .descs is not valid anymore
    var descs = Ember.meta(constructor.proto(), false).descs;
    return  descs ? descs[property] : null;
  } else {
    return null;
  }
}
