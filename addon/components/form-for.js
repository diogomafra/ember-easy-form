import Ember from 'ember';

var FormFormComponent = Ember.Component.extend({
  tagName: 'form'
});

FormFormComponent.reopenClass({
  positionalParams: ['model']
});

export default FormFormComponent;