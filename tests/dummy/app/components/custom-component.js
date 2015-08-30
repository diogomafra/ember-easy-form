import Ember from 'ember';
import WrapperMixin from 'ember-easy-form/wrapper-mixin';

export default Ember.Component.extend(WrapperMixin, {
  classNames: ['custom-component'],
  tagName: 'div',
  init() {
    this._super(...arguments);
    var propertyName = this.get('property');
    var dependentKey = 'formForModel.' + propertyName;
    this.set('value', Ember.computed(dependentKey, function() {
      return this.get(dependentKey);
    }));
  }
});
