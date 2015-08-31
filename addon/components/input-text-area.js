import Ember from 'ember';
import WrapperMixin from 'ember-easy-form/wrapper-mixin';

var InputTextAreaComponent = Ember.TextArea.extend(WrapperMixin, {
  init() {
    this._super(...arguments);
    var propertyName = this.get('property');
    var dependentKey = 'formForModel.' + propertyName;
    this.set('value', Ember.computed(dependentKey, {
      get: function() {
        return this.get(dependentKey);
      },
      set: function(key, value) {
        this.set(dependentKey, value);
        return value;
      }
    }));
  }
});

export default InputTextAreaComponent;
