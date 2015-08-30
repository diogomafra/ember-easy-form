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

  // formForModel: Ember.computed(function(){
  //   var componentWithModel = this.nearestWithProperty('model');
  //   if (!componentWithModel) {
  //     return;
  //   }
  //   var model = Ember.get(componentWithModel, 'model');
  //   return model;
  // }),

  init(...args) {
    this._super(...args);

    var pathToProperty = 'model';
    var currentView = this;
    while(currentView && !('model' in currentView)) {
      pathToProperty = 'parentView.' + pathToProperty;
      currentView = Ember.get(currentView, 'parentView');
    }
    if (currentView) {
      Ember.defineProperty(this, 'formForModel', Ember.computed.alias(pathToProperty));
    } else {
      this.set('formForModel', null);
    }
  }
});
