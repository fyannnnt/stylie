import Lateralus from 'lateralus';
import View from './view';
import template from 'text!./template.mustache';

const Base = Lateralus.Component;

const KeyframeFormComponent = Base.extend({
  name: 'stylie-keyframe-form',
  View,
  template,
});

export default KeyframeFormComponent;
