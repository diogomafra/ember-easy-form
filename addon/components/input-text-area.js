import Ember from 'ember';
import WrapperMixin from 'ember-easy-form/wrapper-mixin';

var InputTextAreaComponent = Ember.TextArea.extend(WrapperMixin, {
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
  }
});

// InputTextFieldComponent.reopenClass({
//   positionalParams: ['propertyName']
// });

export default InputTextAreaComponent;
