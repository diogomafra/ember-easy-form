import Ember from 'ember';
import config from 'ember-easy-form/config';
import {getTypeForValue} from 'ember-easy-form/utilities';

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


export default {
  setupState(lastState, env, scope, params, hash) {
    // Set all attributes
    var options = env.hooks.getValue(hash.inputOptions);
    if (options) {
      for (var prop in options) {
        if (options.hasOwnProperty(prop)) {
          hash[prop] = options[prop];
        }
      }
    }
    hash.inputOptions = null;

    // Find the component name
    let componentName;
    let componentAs = env.hooks.getValue(hash.as);
    if (componentAs) {
      componentName = config.getInputType(componentAs);
      if (!componentName && componentAs === 'text') {
        componentName = 'input-text-area';
      }
      if (!componentName && componentAs === 'select') {
        componentName = 'form-select';
      }
    }
    if (!componentName) {
      componentName = 'input-text-field';
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
    hash.type = morph.state.type;
    hash.property = morph.state.property;
    if (!hash.name) {
      hash.name = morph.state.property;
    }
    env.hooks.component(morph, env, scope, morph.state.componentName, params, hash, { default: template, inverse }, visitor);
  },

  rerender(...args) {
    this.render(...args);
  }
};