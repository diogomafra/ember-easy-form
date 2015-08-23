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
