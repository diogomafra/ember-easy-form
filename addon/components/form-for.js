import Ember from 'ember';
import WrapperMixin from 'ember-easy-form/wrapper-mixin';

var FormFormComponent = Ember.Component.extend(WrapperMixin, {
  classNameBindings: ['wrapperConfig.formClass'],
  wrapper: 'default',
  tagName: 'form',
  init() {
    this._super(...arguments);
    this.action = this.action || 'submit';
  },
  submit: function(e) {
    e.preventDefault();
    if (Ember.isNone(this.get('model.validate'))) {
      this.sendAction();
    } else {
      if (this.get('model.isValid')) {
        this.sendAction();
      }
    }
  }
});

FormFormComponent.reopenClass({
  positionalParams: ['model']
});

export default FormFormComponent;
