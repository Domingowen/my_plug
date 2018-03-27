<template>
  <div class="slider_touch">
    <div class="slider_touch_content" ref="sliderTouch">
      <div class="slider_touch_refresh" v-show="isLoading">刷新页面...</div>
      <div ref="sliderContent" @touchstart="sliderStart" @touchmove="sliderMove"
           @touchend="sliderEnd">
        <slot></slot>
      </div>
      <div class="slider_touch_loading" v-show="getMore">加载更多...</div>
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
        sliderY: true //  true是Y,false是X
      },
      minY: null,
      minX: null,
      lastTimeDis: null,
      lastDisY: null,
      lastDisX: null,
      lastY: null,
      lastX: null,
      loading: false,
      iNow: 0,
      isMove: true,
      isFirst: true,
      step: 1,
      isLoading: false,
      getMore: false
    };
  },
  methods: {
    sliderStart () {
      document.addEventListener('touchstart', () => {
        event.preventDefault();
      });
      this.minY = document.documentElement.clientHeight - this.el.offsetHeight <= 0 ? document.documentElement.clientHeight - this.el.offsetHeight : 0;
      this.minX = document.documentElement.clientWidth - this.el.offsetWidth <= 0 ? document.documentElement.clientWidth - this.el.offsetWidth : 0;
      let changedTouches = event.changedTouches[0];
      this.startY = changedTouches.pageY;
      this.startX = changedTouches.pageX;
      this.currentStartY = transform(this.el, this.transformVal, 'translate3d').Y;
      this.currentStartX = transform(this.el, this.transformVal, 'translate3d').X;
      this.lastTimeDis = new Date().getTime();
      this.lastX = this.startX;
      this.lastY = this.startY;
      this.el.style.transition = 'none';
      this.isMove = true;
      this.isFirst = true;
      this.step = 1;
    },
    sliderMove () {
      if (this.loading) {
        return;
      }
      if (!this.isMove) {
        return;
      }
      let changedTouches = event.changedTouches[0];
      let disY = changedTouches.pageY - this.startY;
      let disX = changedTouches.pageX - this.startX;
      let totalY = disY + this.currentStartY;
      let totalX = disX + this.currentStartX;
      if (this.isFirst) {
        this.isFirst = false;
        if (this.defaultConfig.sliderY) {
          if (Math.abs(disX) > Math.abs(disY)) {
            this.isMove = false;
          }
        } else {
          if (Math.abs(disY) > Math.abs(disX)) {
            this.isMove = false;
          }
        }
      }
      if (this.defaultConfig.sliderY) {
        if (totalY > 0) {
          this.step = 1 - totalY / document.documentElement.clientHeight;
          totalY = parseInt(totalY * this.step);
        }
        if (totalY < this.minY) {
          let over = this.minY - totalY;
          this.step = 1 - over / document.documentElement.clientHeight;
          over = parseInt(this.step * over);
          totalY = this.minY - over;
        }
      } else {
        if (totalX > 0) {
          this.step = 1 - totalX / document.documentElement.clientWidth;
          totalX = parseInt(totalX * this.step);
        }
        if (totalX < this.minX) {
          let over = this.minX - totalX;
          this.step = 1 - over / document.documentElement.clientWidth;
          over = parseInt(this.step * over);
          totalX = this.minX - over;
        }
      }
      if (this.isMove) {
        if (this.defaultConfig.sliderY) {
          transform(this.el, this.transformVal, 'translate3d', '0,' + totalY + ',0');
          if (totalY > 50) {
            // console.log(totalY);
            // this.isLoading = true;
          }
          if (totalY < this.minY - 50) {
            // this.getMore = true;
          }
        } else {
          transform(this.el, this.transformVal, 'translate3d', '' + totalX + ',0,0');
        }
      }

      this.lastTimeDis = new Date().getTime() - this.lastTimeDis;
      this.lastDisX = changedTouches.pageX - this.lastX;
      this.lastDisY = changedTouches.pageY - this.lastY;
      this.lastX = changedTouches.pageX;
      this.lastY = changedTouches.pageY;
      // console.log(event);
    },
    sliderEnd () {
      if (this.loading) {
        return;
      }
      let speedX = (this.lastDisX / this.lastTimeDis) * 100 ? (this.lastDisX / this.lastTimeDis) * 100 : 0;
      let speedY = (this.lastDisY / this.lastTimeDis) * 100 ? (this.lastDisY / this.lastTimeDis) * 100 : 0;
      let currentStartY = transform(this.el, this.transformVal, 'translate3d').Y;
      let currentStartX = transform(this.el, this.transformVal, 'translate3d').X;
      let targetY = currentStartY + speedY;
      let targetX = currentStartX + speedX;
      // console.log(targetY);
      // console.log(this.minY);
      if (targetY > 50) {
        // this.isLoading = true;
        // this.refreshFn();
      } else {
        // this.isLoading = false;
      }
      if (targetY < this.minY - 50) {
        // this.getMore = true;
        // this.loadingData();
      } else {
        // this.getMore = false;
      }
      if (targetY > 0) {
        targetY = 0;
      } else if (targetY < this.minY) {
        if (this.minY > 0) {
          targetY = 0;
        } else {
          targetY = this.minY;
        }
      }
      if (targetX > 0) {
        targetX = 0;
      } else if (targetX < this.minX) {
        if (this.minX > 0) {
          targetX = 0;
        } else {
          targetX = this.minX;
        }
      }
      this.el.style.transition = '1s all';
      if (this.defaultConfig.sliderY) {
        transform(this.el, this.transformVal, 'translate3d', '0,' + targetY + ',0');
      } else {
        transform(this.el, this.transformVal, 'translate3d', '' + targetX + ',0,0');
      }
      // console.log(event);
    },
    refreshFn () {
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    },
    loadingData () {
      setTimeout(() => {
        this.getMore = false;
      }, 1000);
    }
  },
  mounted () {
    this.el = this.$refs.sliderContent;
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
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    .slider_touch_refresh {
      font-size: 0.5rem;
      text-align: center;
      height: 1rem;
      line-height: 1rem;
    }
    .slider_touch_loading {
      font-size: 0.5rem;
      text-align: center;
      height: 2rem;
      line-height: 2rem;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
    }
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
