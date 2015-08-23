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
  // templateForName: function(name) {
  //   var template;

  //   if (this.container) {
  //     template = this.container.lookup('template:' + name);
  //   }

  //   return template || config.getTemplate(name);
  // },
  // formForModel: function(){
  //   var formForModelPath = this._keywords.formForModelPath;

  //   if (formForModelPath === 'context' || formForModelPath === 'controller' || formForModelPath === 'this') {
  //     return this.get('context');
  //   } else if (formForModelPath) {
  //     return this.get('context.' + formForModelPath);
  //   } else {
  //     return this.get('context');
  //   }
  // }.property()
});

