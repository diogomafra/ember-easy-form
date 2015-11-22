import Ember from 'ember';
import BaseComponent from 'ember-easy-form/components/base';
import hbs from 'htmlbars-inline-precompile';

// const templateWithSelection = hbs(`TESTE{{view 'select' content=collection selection=selection prompt=prompt optionValuePath=optionValuePath optionLabelPath=optionLabelPath}}`);
// const templateWithouSelection = hbs(`TESTE{{view 'select' content=collection prompt=prompt optionValuePath=optionValuePath optionLabelPath=optionLabelPath}}`);

export default BaseComponent.extend({
    tagName: '',
    optionValuePath: 'content',
    optionLabelPath: 'content',
    selection: Ember.computed.alias('modelValue'),
    layout: hbs(`TESTE{{view 'select' content=collection selection=selection prompt=prompt optionValuePath=optionValuePath optionLabelPath=optionLabelPath}}`),

    init: function() {
      this._super(...arguments);
      this.get('classNameBindings').clear();
      var propertyName = this.get('property');
      Ember.Binding.from('formForModel.' + propertyName).to('modelValue').connect(this);

      // if (this.hasOwnProperty('selection')) {
      //   this.layout = templateWithSelection;
      // } else {
      //   this.layout = templateWithouSelection;
      // }
    }
});
