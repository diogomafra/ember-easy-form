import Ember from 'ember';
import layout from 'ember-easy-form/templates/components/hint-field';

var HintFieldComponent = Ember.Component.extend({
  tagName: 'span',
  classNames: ['hint'],
  layout: layout,
  text: Ember.computed.reads('attrs.text')
});

HintFieldComponent.reopenClass({
  positionalParams: ['propertyName']
});

export default HintFieldComponent;