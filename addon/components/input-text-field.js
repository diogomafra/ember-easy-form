import Ember from 'ember';
import WrapperMixin from 'ember-easy-form/wrapper-mixin';

var InputTextFieldComponent = Ember.TextField.extend(WrapperMixin, {
  // tagName: 'input',
  // attributeBindings: ['type', 'value', 'name'],
  // name: Ember.computed('property', 'propertyName', function() {
  //   return this.get('property') || this.get('propertyName');
  // }),
  init() {
    this._super(...arguments);
    var propertyName = (this.get('property') || this.get('propertyName'));
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
    if (this.get('type') === 'checkbox') {
      this.set('checked', Ember.computed.alias(dependentKey));
      this.get('attributeBindings').push('checked');
    }
  }
});

// InputTextFieldComponent.reopenClass({
//   positionalParams: ['propertyName']
// });

export default InputTextFieldComponent;
