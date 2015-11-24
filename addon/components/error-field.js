import Ember from 'ember';
import WrapperMixin from 'ember-easy-form/wrapper-mixin';

var ErrorFieldComponent = Ember.Component.extend(WrapperMixin, {
  tagName: 'span',
  classNameBindings: ['wrapperConfig.errorClass'],
  init: function() {
    this._super();
    var propertyName = this.get('propertyName') || this.get('property');
    Ember.Binding.from('formForModel.errors.' + propertyName).to('errors').connect(this);
  },
  layoutName: Ember.computed.oneWay('wrapperConfig.errorTemplate'),
  errorText: Ember.computed('errors.[]', function() {
    var errors = this.get('errors');
    return errors ? errors[0] : null;
  })
});

ErrorFieldComponent.reopenClass({
  positionalParams: ['propertyName']
});

export default ErrorFieldComponent;
