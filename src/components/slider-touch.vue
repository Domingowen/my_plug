<template>
  <div class="slider_touch" ref="sliderTouch">
    <!--<div class="slider_touch_content" ref="sliderTouch">-->
    <!--<div class="slider_touch_refresh" v-show="isLoading">刷新页面...</div>-->
    <div class="slider_wrapper" :style="{height:defaultConfig.configHeight}">
      <div class="slider_touch_content" ref="sliderContent" @touchstart="sliderStart" @touchmove="sliderMove"
           @touchend="sliderEnd">
        <slot></slot>
      </div>
    </div>
    <!--<div class="slider_touch_loading" v-show="getMore">加载更多...</div>-->
    <!--</div>-->
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
      pointY: null,
      pointX: null,
      distY: null,
      distX: null,
      el: null,
      elContent: null,
      transformVal: {},
      defaultConfig: {
        sliderY: this.config.sliderY, //  true是Y,false是X,
        configHeight: this.config.configHeight // 这个是可以自定义的
      },
      minY: null,
      minX: null,
      lastTimeDis: null,
      lastDisY: null,
      lastDisX: null,
      lastY: null,
      lastX: null,
      // loading: false,
      isMove: true,
      isFirst: true,
      step: 1,
      deltaX: 0,
      deltaY: 0,
      isRun: true,
      endTime: 0,
      startTime: 0
      // isLoading: false,
      // getMore: false
    };
  },
  props: {
    config: {
      type: Object,
      default () {
        return {
          sliderY: true,
          configHeight: '100%'
        };
      }
    }
  },
  methods: {
    sliderStart () {

      if (this.isRun) {
        this.getClient();
        this.isRun = false;
      }
      let changedTouches = event.changedTouches[0];
      this.pointY = changedTouches.pageY;
      this.pointX = changedTouches.pageX;
      this.startTime = new Date().getTime();
      // this.lastX = this.startX;
      // this.lastY = this.startY;
      // this.el.style.transitionTimingFunction = 'cubic-bezier(0.1, 0.57, 0.1, 1)';
      // this.el.style.transitionDuration = '0ms';
      this.isMove = true;
      this.isFirst = true;
      this.step = 1;
      this.el.style.transitionDuration = '0ms';
    },
    sliderMove (e) {
      if (!this.isMove) {
        return;
      }
      this.startY = transform(this.el, this.transformVal, 'translate3d').Y;
      this.startX = transform(this.el, this.transformVal, 'translate3d').X;
      let changedTouches = event.changedTouches[0];
      let deltaY = changedTouches.pageY - this.pointY;
      let deltaX = changedTouches.pageX - this.pointX;
      this.pointY = changedTouches.pageY;
      this.pointX = changedTouches.pageX;
      this.distY += deltaY;
      this.distX += deltaX;
      let absDistY = Math.abs(this.distY);
      let absDistX = Math.abs(this.distX);
      let timeStamp = new Date().getTime();
      // let disY = changedTouches.pageY - this.startY;
      // let disX = changedTouches.pageX - this.startX;
      // let totalY = parseInt(disY + this.currentStartY);
      // let totalX = parseInt(disX + this.currentStartX);
      let totalY = this.startY + deltaY;
      let totalX = this.startX + deltaX;
      if (timeStamp - this.endTime > 300 && (absDistY < 10 && absDistX < 10)) {
        return;
      }
      if (this.isFirst) {
        this.isFirst = false;
        if (this.defaultConfig.sliderY) {
          if (Math.abs(absDistX) > Math.abs(absDistY)) {
            this.isMove = false;
          }
        } else {
          if (Math.abs(absDistY) > Math.abs(absDistX)) {
            this.isMove = false;
          }
        }
      }
      if (this.defaultConfig.sliderY) {
        if (totalY > 0 || totalY < this.minY) {
          // this.el.style.transitionDuration = '0ms';
          totalY = this.startY + deltaY / 3;
        }
      } else {
        if (totalX > 0 || totalX < this.minX) {
          // this.el.style.transitionDuration = '0ms';
          totalX = this.startX + deltaX / 3;
        }
      }
      // console.log(totalY);
      if (this.isMove) {
        if (this.defaultConfig.sliderY) {
          transform(this.el, this.transformVal, 'translate3d', '0,' + totalY + ',0');
        } else {
          transform(this.el, this.transformVal, 'translate3d', '' + totalX + ',0,0');
        }
      }
      if (timeStamp - this.startTime > 300) {
        // console.log(true);
        this.startTime = timeStamp;
        this.startX = transform(this.el, this.transformVal, 'translate3d').X;
        this.startY = transform(this.el, this.transformVal, 'translate3d').Y;
      }
      // this.lastTimeDis = new Date().getTime() - this.lastTimeDis;
      // this.lastDisX = changedTouches.pageX - this.lastX;
      // this.lastDisY = changedTouches.pageY - this.lastY;
      // this.lastX = changedTouches.pageX;
      // this.lastY = changedTouches.pageY;
    },
    sliderEnd () {
      let changedTouches = event.changedTouches[0];
      let currentY = transform(this.el, this.transformVal, 'translate3d').Y;
      let currentX = transform(this.el, this.transformVal, 'translate3d').X;
      let duration = new Date().getTime() - this.startTime;
      let newX = Math.round(transform(this.el, this.transformVal, 'translate3d').X);
      let newY = Math.round(transform(this.el, this.transformVal, 'translate3d').Y);
      let distanceX = Math.abs(newX - this.startX);
      let distanceY = Math.abs(newY - this.startY);
      this.endTime = new Date().getTime();
      // console.log(duration);
      // console.log(distanceY);


      // console.log(this.lastTimeDis);
      // this.el.style.transtionTimingFunction = 'cubic-bezier(0.1, 0.57, 0.1, 1)';
      // this.el.style.transitionDuration = '300ms';
      // let speedX = (this.lastDisX / this.lastTimeDis) ? (this.lastDisX / this.lastTimeDis) : 0;
      // let speedY = (this.lastDisY / this.lastTimeDis) * 200 ? (this.lastDisY / this.lastTimeDis) * 200 : 0;
      // console.log(Math.round(speedY));
      // console.log(this.lastTimeDis);
      // this.el.style.transitionDuration = '0ms';

      // let currentStartY = transform(this.el, this.transformVal, 'translate3d').Y;
      // let currentStartX = transform(this.el, this.transformVal, 'translate3d').X;
      if (duration < 300) {
        let momentumX = this.getMomentum(currentX, this.startX, duration, this.minX, this.elContent.clientWidth);
        let momentumY = this.getMomentum(currentY, this.startY, duration, this.minY, this.elContent.clientHeight);
        console.log(momentumY);
      }
      if (newY > 0) {
        newY = 0;
        this.el.style.transitionTimingFunction = 'cubic-bezier(0.1, 0.57, 0.1, 1)';
        this.el.style.transitionDuration = '500ms';
        transform(this.el, this.transformVal, 'translate3d', '0,' + newY + ',0');
        return;
      } else if (newY < this.minY) {
        newY = this.minY;
        this.el.style.transitionTimingFunction = 'cubic-bezier(0.1, 0.57, 0.1, 1)';
        this.el.style.transitionDuration = '500ms';
        transform(this.el, this.transformVal, 'translate3d', '0,' + newY + ',0');
        return;
      }
      if (this.defaultConfig.sliderY) {
        transform(this.el, this.transformVal, 'translate3d', '0,' + newY + ',0');
      } else {
        transform(this.el, this.transformVal, 'translate3d', '' + newX + ',0,0');
      }

    },
    getMomentum (current, start, time, lowerMargin, wrapperSize, deceleration) {
      // console.log('current:',current,'start:', start, 'time:', time, 'lowerMargin:',lowerMargin, 'wrapperSize:',wrapperSize, deceleration);
      let distance = current - start,
        speed = Math.abs(distance) / time,
        destination,
        duration;

      deceleration = deceleration === undefined ? 0.0006 : deceleration;

      destination = current + ( speed * speed ) / ( 2 * deceleration ) * ( distance < 0 ? -1 : 1 );
      duration = speed / deceleration;
      // console.log(destination);
      // console.log(destination);
      if ( destination < lowerMargin ) {
        destination = wrapperSize ? lowerMargin - ( wrapperSize / 2.5 * ( speed / 8 ) ) : lowerMargin;
        distance = Math.abs(destination - current);
        duration = distance / speed;

      } else if ( destination > 0 ) {
        destination = wrapperSize ? wrapperSize / 2.5 * ( speed / 8 ) : 0;
        distance = Math.abs(current) + destination;
        duration = distance / speed;
      }

      return {
        destination: Math.round(destination),
        duration: duration
      };
    },
    refreshFn () {
      // setTimeout(() => {
      //   this.isLoading = false;
      // }, 1000);
    },
    loadingData () {
      // setTimeout(() => {
      //   this.getMore = false;
      // }, 1000);
    },
    getClient () {
      this.minY = this.elContent.clientHeight - this.el.offsetHeight <= 0 ? this.elContent.clientHeight - this.el.offsetHeight : 0;
      this.minX = this.elContent.clientWidth - this.el.offsetWidth <= 0 ? this.elContent.clientWidth - this.el.offsetWidth : 0;
    }
  },
  mounted () {
    this.el = this.$refs.sliderContent;
    this.elContent = this.$refs.sliderTouch;
    transform(this.el, this.transformVal, 'translate3d', '0,0,0');
    document.addEventListener('touchstart', () => {
      event.preventDefault();
    });
  }
};
</script>

<style scoped lang="scss">
  .slider_touch {
    position: fixed;
    width: 100%;
    bottom: 0;
    top: 0;
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
    .slider_wrapper {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    .slider_touch_content {

    }
  }
</style>
