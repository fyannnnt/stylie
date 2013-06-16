define(['src/app', 'src/constants', 'src/ui/incrementer-field'],
    function (app, constant, IncrementerFieldView) {

  function incrementerGeneratorHelper ($el) {
    return new IncrementerFieldView({
      '$el': $el

      ,'onValReenter': _.bind(function (val) {
        this.model.set($el.data('keyframeattr'), +val);
        publish(constant.PATH_CHANGED);
        app.collection.actors.getCurrent(0).updateKeyframeCrosshairViews();
        app.kapi.update();
      }, this)
    });
  }

  return Backbone.View.extend({

    'events': {}

    // TODO: Move this out of the View and make it private.
    ,'KEYFRAME_TEMPLATE': [
      '<li class="keyframe">'
        ,'<h3></h3>'
        ,'<label>'
          ,'<span>X:</span>'
          ,'<input class="quarter-width keyframe-attr-x" type="text" data-keyframeattr="x"></input>'
        ,'</label>'
        ,'<label>'
          ,'<span>Y:</span>'
          ,'<input class="quarter-width keyframe-attr-y" type="text" data-keyframeattr="y"></input>'
        ,'</label>'
        ,'<label>'
          ,'<span>R:</span>'
          ,'<input class="quarter-width keyframe-attr-r" type="text" data-keyframeattr="r"></input>'
        ,'</label>'
      ,'</li>'
    ].join('')

    ,'initialize': function (opts) {
      _.extend(this, opts);
      this.$el = $(this.KEYFRAME_TEMPLATE);
      this.model.keyframeForm = this;
      this.model.on('change', _.bind(this.render, this));
      this.initDOMReferences();
      this.initIncrementers();
      this.render();
    }

    ,'initDOMReferences': function () {
      this.header = this.$el.find('h3');
      this.inputX = this.$el.find('.keyframe-attr-x');
      this.inputY = this.$el.find('.keyframe-attr-y');
      this.inputR = this.$el.find('.keyframe-attr-r');
    }

    ,'initIncrementers': function () {
      this.incrementerViews = {};
      _.each([this.inputX, this.inputY, this.inputR], function ($el) {
        this.incrementerViews[$el.data('keyframeattr')] =
            incrementerGeneratorHelper.call(this, $el);
      }, this);
    }

    ,'render': function () {
      this.header.text(this.model.get('millisecond'));
      if (this.model.get('x') !== parseFloat(this.inputX.val())) {
        this.inputX.val(this.model.get('x'));
      }
      if (this.model.get('y') !== parseFloat(this.inputY.val())) {
        this.inputY.val(this.model.get('y'));
      }
      if (this.model.get('r') !== parseFloat(this.inputR.val())) {
        this.inputR.val(this.model.get('r'));
      }
    }

  });
});
