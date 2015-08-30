import Ember from 'ember';
import inputField from  'ember-easy-form/keywords/input-field';
var require = Ember.__loader.require;
var registerKeyword = require('ember-htmlbars/keywords').registerKeyword;


export default function() {
  // alert('oooo');
  registerKeyword('input-field', inputField);
}
