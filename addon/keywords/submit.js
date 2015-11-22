// import Ember from 'ember';
// import config from 'ember-easy-form/config';
// import {getTypeForValue} from 'ember-easy-form/utilities';

// https://github.com/emberjs/ember.js/blob/master/packages/ember-metal/lib/assign.js
// function assign(original, ...args) {
//   for (let i = 0, l = args.length; i < l; i++) {
//     let arg = args[i];
//     if (!arg) { continue; }
//
//     let updates = Object.keys(arg);
//
//     for (let i = 0, l = updates.length; i < l; i++) {
//       let prop = updates[i];
//       original[prop] = arg[prop];
//     }
//   }
//
//   return original;
// }


export default {
  // setupState(lastState, env, scope, params, hash) {
  //   // Find the component name
  //   let savedHash = {};
  //   // inputOptions: ['as', 'collection', 'optionValuePath', 'optionLabelPath', 'selection', 'value', 'multiple', 'name'],
  //   // const bindableInputOptions = ['placeholder', 'prompt', 'disabled'];
  //   // for(let i=0; i<bindableInputOptions.length; i++) {
  //   //   const key = bindableInputOptions[i];
  //   //   if (hash[key]) {
  //   //     savedHash[key] = hash[key];
  //   //   }
  //   // }
  //
  //   const allOptions =  ['as', 'collection', 'optionValuePath', 'optionLabelPath',
  //   'selection', 'multiple', 'name', 'placeholder', 'prompt', 'disabled'];
  //   for(let i=0; i<allOptions.length; i++) {
  //     const key = allOptions[i];
  //     if (hash[key]) {
  //       savedHash[key] = hash[key];
  //     }
  //   }
  //   return assign({}, lastState, { savedHash: savedHash });
  // },

  render(morph, env, scope, params, hash, template, inverse, visitor) {
    // hash.savedHash = morph.state.savedHash;
    let componentName = hash.as === 'button' ? 'form-button' : 'form-submit';
    env.hooks.component(morph, env, scope, componentName, params, hash, { default: template, inverse }, visitor);
  },

  rerender(...args) {
    this.render(...args);
  }
};