import Ember from 'ember';
import config from './config';

export default Ember.Mixin.create({
  // classNameBindings: ['property'],
  wrapper: Ember.computed(function() {
    var wrapperView = this.nearestWithProperty('wrapper');
    if (wrapperView) {
      return wrapperView.get('wrapper');
    } else {
      return 'default';
    }
  }),
  wrapperConfig: Ember.computed('attrs.wrapper', 'wrapper', function() {
    return config.getWrapper(this.get('attrs.wrapper') || this.get('wrapper'));
  }),

  formForModel: Ember.computed(function(){
    var componentWithModel = this.nearestWithProperty('model');
    if (!componentWithModel) {
      return;
    }
    var model = Ember.get(componentWithModel, 'model');
    return model;
  })
});

