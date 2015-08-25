import Ember from 'ember';
import WrapperMixin from 'ember-easy-form/wrapper-mixin';

var FormFormComponent = Ember.Component.extend(WrapperMixin, {
  classNameBindings: ['wrapperConfig.formClass'],
  wrapper: 'default',
  tagName: 'form',
  init() {
    this._super(...arguments);
    this.action = 'submit';
  },
  didInsertElement: function() {
    this.$().on('submit', () => {
      this.sendAction('submit');
      return false;
    });
  }
});

FormFormComponent.reopenClass({
  positionalParams: ['model']
});

export default FormFormComponent;
