<template>
  <div class="slider_touch" ref="sliderTouch" @touchstart="sliderStart" @touchmove="sliderMove" @touchend="sliderEnd">
    <slot></slot>
  </div>
</template>

<script>
import transform from '../api/transform';

export default {
  name: 'slider_touch',
  data () {
    return {
      startY: null,
      startX: null,
      currentStartX: null,
      currentStartY: null,
      el: null,
      transformVal: {},
      defaultConfig: {
        sliderY: true//  true是Y,false是X
      }
    };
  },
  methods: {
    sliderStart () {
      // console.log(event);
      document.addEventListener('touchstart', () => {
        event.preventDefault();
      });
      let changedTouches = event.changedTouches[0];
      this.startY = changedTouches.pageY;
      this.startX = changedTouches.pageX;
      this.currentStartY = transform(this.el, this.transformVal, 'translate3d').Y;
      this.currentStartX = transform(this.el, this.transformVal, 'translate3d').X;
    },
    sliderMove () {
      let changedTouches = event.changedTouches[0];
      let disY = changedTouches.pageY - this.startY;
      let disX = changedTouches.pageX - this.startX;
      let totalY = disY + this.currentStartY;
      let totalX = disX + this.currentStartX;
      if (this.defaultConfig.sliderY) {
        transform(this.el, this.transformVal, 'translate3d', '0,' + totalY + ',0');
      } else {
        transform(this.el, this.transformVal, 'translate3d', '0,' + totalX + ',0');
      }
      // console.log(event);
    },
    sliderEnd () {
      // console.log(event);
    }
  },
  mounted () {
    this.el = this.$refs.sliderTouch;
    transform(this.el, this.transformVal, 'translate3d', '0,0,0');
  }
};
</script>
<style scoped lang="scss">
  .slider_touch {
    overflow: hidden;
    position: absolute;
    width: 100%;
    height: 100%;
  }
</style>
