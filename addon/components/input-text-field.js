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
    // var model = this.get('formForModel');
    var propertyName = (this.get('property') || this.get('propertyName'));
    var dependentKey = 'formForModel.' + propertyName;
    // console.log(`prop: ${propertyName} - ${this.get(dependentKey)}`);
    this.set('value', Ember.computed(dependentKey, function() {
      return this.get(dependentKey);
    }));
    // var forcedType = this.get('as');
    // var value = this.get('value');
    // var type = getTypeForValue(forcedType, propertyName, model, value);
    // this.set('type', type);
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
