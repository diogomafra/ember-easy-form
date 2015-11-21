import Ember from 'ember';
import BaseComponent from 'ember-easy-form/components/base';

// var HintFieldComponent = Ember.Component.extend(WrapperMixin, {
//   tagName: 'span',
//   hintText: Ember.computed.reads('text'),
//   classNameBindings: ['wrapperConfig.hintClass'],
//   layoutName: Ember.computed.oneWay('wrapperConfig.hintTemplate')
// });

var HintFieldComponent = BaseComponent.extend({
  tagName: 'span',
  classNameBindings: ['wrapperConfig.hintClass'],
  layoutName: Ember.computed.oneWay('wrapperConfig.hintTemplate'),
  hintText: Ember.computed.oneWay('text')
});


HintFieldComponent.reopenClass({
  positionalParams: ['propertyName']
});

export default HintFieldComponent;