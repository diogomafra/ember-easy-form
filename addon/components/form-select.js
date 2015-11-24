import Ember from 'ember';
import WrapperMixin from 'ember-easy-form/wrapper-mixin';
import hbs from 'htmlbars-inline-precompile';

export default Ember.Component.extend(WrapperMixin, {
    tagName: '',
    optionValuePath: 'content',
    optionLabelPath: 'content',
    selection: Ember.computed.alias('modelValue'),
    layout: hbs(`{{view 'select' content=collection selection=selection prompt=prompt optionValuePath=optionValuePath optionLabelPath=optionLabelPath}}`),

    init: function() {
      this._super(...arguments);
      // The WrapperMixin defines the classNameBindings, but tag-less components can't use it
      this.get('classNameBindings').clear();
      var propertyName = this.get('property');
      Ember.Binding.from('formForModel.' + propertyName).to('modelValue').connect(this);
    }
});
