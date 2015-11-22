import Ember from 'ember';
// import InputHelper from 'ember-easy-form/helpers/input';
// import EasyFormInputHelper from 'ember-easy-form/helpers/easy-form-input';
// import SubmitHelper from 'ember-easy-form/helpers/submit';
import inputField from  'ember-easy-form/keywords/input-field';
import input from  'ember-easy-form/keywords/input-for';
import submit from  'ember-easy-form/keywords/submit';

var require = Ember.__loader.require;
var registerKeyword = require('ember-htmlbars/keywords').registerKeyword;

var registered = false;

export default function() {
  if (!registered) {
    registerKeyword('input-field', inputField);
    registerKeyword('input-for', input);
    registerKeyword('submit', submit);

    // Ember.Handlebars.helpers['ember-input'] = Ember.Handlebars.helpers['input'];
    // Ember.Handlebars.registerHelper('easy-form-input', EasyFormInputHelper);
    // Ember.Handlebars.registerHelper('input', InputHelper);
    registered = true;
  }
}