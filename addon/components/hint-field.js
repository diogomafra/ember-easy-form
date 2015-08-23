import Ember from 'ember';
import WrapperMixin from 'ember-easy-form/wrapper-mixin';

var HintFieldComponent = Ember.Component.extend(WrapperMixin, {
  tagName: 'span',
  hintText: Ember.computed.reads('attrs.text'),
  classNameBindings: ['wrapperConfig.hintClass'],
  layoutName: Ember.computed.oneWay('wrapperConfig.hintTemplate')
});

HintFieldComponent.reopenClass({
  positionalParams: ['propertyName']
});

export default HintFieldComponent;