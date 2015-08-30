import Ember from 'ember';
import config from 'ember-easy-form/config';

// https://github.com/emberjs/ember.js/blob/master/packages/ember-metal/lib/assign.js
function assign(original, ...args) {
  for (let i = 0, l = args.length; i < l; i++) {
    let arg = args[i];
    if (!arg) { continue; }

    let updates = Object.keys(arg);

    for (let i = 0, l = updates.length; i < l; i++) {
      let prop = updates[i];
      original[prop] = arg[prop];
    }
  }

  return original;
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

function getTypeForValue(forcedType, property, model, value) {
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


export default {
  setupState(lastState, env, scope, params, hash) {
    let componentName = 'input-text-field';
    let componentAs = env.hooks.getValue(hash.as);
    if (componentAs) {
      let newComponentName = config.getInputType(componentAs);
      if (!newComponentName && componentAs === 'text') {
        newComponentName = 'input-text-area';
      }

      if (newComponentName) {
        // alert(newComponentName);
        componentName = newComponentName;
      }
    }

    let propertyName = env.hooks.getValue(params[0]) || env.hooks.getValue(hash.property);
    let forcedType = env.hooks.getValue(hash.as) || env.hooks.getValue(hash.type);
    var viewWithModel = env.view.hasOwnProperty('model') ? env.view : env.view.nearestWithProperty('model');
    var model = viewWithModel ? Ember.get(viewWithModel, 'model') : null;
    var value = model ? Ember.get(model, propertyName) : null;
    var type = getTypeForValue(forcedType, propertyName, model, value);
    return assign({}, lastState, { componentName, type: type, property: propertyName });
  },

  render(morph, env, scope, params, hash, template, inverse, visitor) {
    var newHash = assign({}, hash, {type: morph.state.type, property: morph.state.property});
    var options = env.hooks.getValue(hash.inputOptions);

    if (options) {
      for (var prop in options) {
        newHash[prop] = options[prop];
      }
    }
    newHash["inputOptions"] = null;

    env.hooks.component(morph, env, scope, morph.state.componentName, params, newHash, { default: template, inverse }, visitor);
  },

  rerender(...args) {
    this.render(...args);
  }
};
