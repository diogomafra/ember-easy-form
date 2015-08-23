import Ember from 'ember';
import WrapperMixin from 'ember-easy-form/wrapper-mixin';

var FormFormComponent = Ember.Component.extend(WrapperMixin, {
  classNameBindings: ['wrapperConfig.formClass'],
  wrapper: 'default',
  tagName: 'form'
});

FormFormComponent.reopenClass({
  positionalParams: ['model']
});

export default FormFormComponent;