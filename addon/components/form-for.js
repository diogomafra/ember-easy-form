import Ember from 'ember';
import BaseComponent from 'ember-easy-form/components/base';

// var FormFormComponent = Ember.Component.extend(WrapperMixin, {
//   classNameBindings: ['wrapperConfig.formClass'],
//   wrapper: 'default',
//   tagName: 'form',
//   init() {
//     this._super(...arguments);
//     this.action = this.action || 'submit';
//   },
//   submit: function(e) {
//     e.preventDefault();
//     // TODO - Diogo - it's not calling validate(), create a test for this
//     if (Ember.isNone(this.get('model.validate'))) {
//       this.sendAction();
//     } else {
//       if (this.get('model.isValid')) {
//         this.sendAction();
//       }
//     }
//   }
// });


var FormFormComponent = BaseComponent.extend({
  tagName: 'form',
  attributeBindings: ['novalidate'],
  classNameBindings: ['wrapperConfig.formClass'],
  novalidate: 'novalidate',
  wrapper: 'default',
  init: function() {
    this._super();
    this.action = this.action || 'submit';
  },
  submit: function(event) {
    var _this = this,
        promise;

    if (event) {
      event.preventDefault();
    }

    if (Ember.isNone(this.get('model.validate'))) {
      this.sendAction();
    } else {
      if (!Ember.isNone(this.get('model').validate)) {
        promise = this.get('model').validate();
      } else {
        promise = this.get('model.content').validate();
      }
      promise.then(function() {
        if (_this.get('model.isValid')) {
          _this.sendAction();
        }
      });
    }
  }
});



FormFormComponent.reopenClass({
  positionalParams: ['model']
});

export default FormFormComponent;