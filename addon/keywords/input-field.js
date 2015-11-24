import Ember from 'ember';
import config from 'ember-easy-form/config';
import {getTypeForValue, assign} from 'ember-easy-form/utilities';

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
    // TODO: Ember 2.* uses getState()
    var state = morph.getState ? morph.getState() : morph.state;
    hash.type = state.type;
    hash.property = state.property;
    if (!hash.name) {
      hash.name = state.property;
    }
    env.hooks.component(morph, env, scope, state.componentName, params, hash, { default: template, inverse }, visitor);
  },

  rerender(...args) {
    this.render(...args);
  }
};
