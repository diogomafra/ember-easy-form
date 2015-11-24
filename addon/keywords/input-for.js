import {assign} from 'ember-easy-form/utilities';

const allOptions =  ['as', 'collection', 'optionValuePath', 'optionLabelPath',
                     'selection', 'multiple', 'name', 'placeholder', 'prompt', 'disabled'];

export default {
  setupState(state, env, scope, params, hash) {
    let savedHash = {};
    for(let i=0; i<allOptions.length; i++) {
      const key = allOptions[i];
      if (hash.hasOwnProperty(key)) {
        savedHash[key] = hash[key];
      }
    }
    return assign({}, state, { savedHash: savedHash });
  },

  render(morph, env, scope, params, hash, template, inverse, visitor) {
    // Use `state` on Ember < 2.2 and `getState()` on Ember >= 2.2
    var state = morph.getState ? morph.getState() : morph.state;
    hash.savedHash = state.savedHash;
    env.hooks.component(morph, env, scope, 'internal-form-input', params, hash, { default: template, inverse }, visitor);
  },

  rerender(...args) {
    this.render(...args);
  }
};
