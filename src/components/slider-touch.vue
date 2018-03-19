<template>
  <div class="slider_touch">
    <div class="slider_touch_content" ref="sliderTouch" @touchstart="sliderStart" @touchmove="sliderMove"
         @touchend="sliderEnd">
      <div ref="sliderContent">
        <slot></slot>
      </div>
    </div>
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
        sliderY: true
      }, //  true是Y,false是X
      minY: null,
      minX: null,
      lastTimeDis: null,
      lastDisY: null,
      lastDisX: null,
      lastY: null,
      lastX: null
    };
  },
  methods: {
    sliderStart () {
      this.minY = document.documentElement.clientHeight - this.$refs.sliderContent.offsetHeight;
      this.minX = document.documentElement.clientWidth - this.$refs.sliderContent.offsetWidth;
      // console.log(this.$refs.sliderContent.offsetHeight);
      console.log(this.$refs.sliderContent);
      document.addEventListener('touchstart', () => {
        event.preventDefault();
      });
      let changedTouches = event.changedTouches[0];
      this.startY = changedTouches.pageY;
      this.startX = changedTouches.pageX;
      this.currentStartY = transform(this.el, this.transformVal, 'translate3d').Y;
      this.currentStartX = transform(this.el, this.transformVal, 'translate3d').X;
      this.lastTimeDis = new Date().getTime();
      this.lastX = this.startX;
      this.lastY = this.startY;
      this.el.style.transition = 'none';
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
      this.lastTimeDis = new Date().getTime() - this.lastTimeDis;
      this.lastDisX = changedTouches.pageX - this.lastX;
      this.lastDisY = changedTouches.pageY - this.lastY;
      this.lastX = changedTouches.pageX;
      this.lastY = changedTouches.pageY;
      // console.log(event);
    },
    sliderEnd () {
      let speedX = (this.lastDisX / this.lastTimeDis) * 100 ? (this.lastDisX / this.lastTimeDis) * 100 : 0;
      let speedY = (this.lastDisY / this.lastTimeDis) * 100 ? (this.lastDisY / this.lastTimeDis) * 100 : 0;
      this.currentStartY = transform(this.el, this.transformVal, 'translate3d').Y;
      this.currentStartX = transform(this.el, this.transformVal, 'translate3d').X;
      let targetY = this.currentStartY + speedY;
      let targetX = this.currentStartX + speedX;
      // console.log(targetY);
      // console.log(this.minY);
      if (targetY > 0) {
        targetY = 0;
      }
      if (targetY < this.minY) {
        targetY = this.minY;
      }
      if (targetX > 0) {
        targetX = 0;
      }
      if (targetX < this.minX) {
        targetX = this.minX;
      }
      this.el.style.transition = '1s all';
      if (this.defaultConfig.sliderY) {
        transform(this.el, this.transformVal, 'translate3d', '0,' + targetY + ',0');
      } else {
        transform(this.el, this.transformVal, 'translate3d', '0,' + targetX + ',0');
      }
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
<<<<<<< HEAD
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    .slider_touch_content {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
    }
  }
</style>
