<template>
  <div class="slider_nav">
    <div class="slider_nav_header">
      <ul class="nav_header_list" ref="sliderNav" @touchstart="sliderStart(elNav)" @touchmove="sliderMove(elNav)"
          @touchend="sliderEnd(elNav)">
        <li>手机</li>
        <li>电器</li>
        <li>家居家装</li>
        <li>洗护</li>
        <li>母婴</li>
        <li>美妆</li>
        <li>鞋子</li>
        <li>衣服</li>
        <li>外套</li>
      </ul>
    </div>
    <div class="slider_nav_content" ref="sliderContent" @touchstart="sliderStart" @touchmove="sliderMove"
         @touchend="sliderEnd">
      <div class="loading">
        内容正在加载中.....
      </div>
      <ul class="nav_content_list">
        <li>
          <div>
            <img
              src="http://yanxuan.nosdn.127.net/2f5e870593c18043e80a21ad885b0616.png?imageView&quality=65&thumbnail=330x330"
              alt="沙发">
          </div>
        </li>
        <li>
          <div>
            <img
              src="http://yanxuan.nosdn.127.net/2f5e870593c18043e80a21ad885b0616.png?imageView&quality=65&thumbnail=330x330"
              alt="沙发">
          </div>
        </li>
        <li>
          <div>
            <img
              src="http://yanxuan.nosdn.127.net/2f5e870593c18043e80a21ad885b0616.png?imageView&quality=65&thumbnail=330x330"
              alt="沙发">
          </div>
        </li>
        <li>
          <div>
            <img
              src="http://yanxuan.nosdn.127.net/2f5e870593c18043e80a21ad885b0616.png?imageView&quality=65&thumbnail=330x330"
              alt="沙发">
          </div>
        </li>
        <li>
          <div>
            <img
              src="http://yanxuan.nosdn.127.net/2f5e870593c18043e80a21ad885b0616.png?imageView&quality=65&thumbnail=330x330"
              alt="沙发">
          </div>
        </li>
        <li>
          <div>
            <img
              src="http://yanxuan.nosdn.127.net/2f5e870593c18043e80a21ad885b0616.png?imageView&quality=65&thumbnail=330x330"
              alt="沙发">
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import transform from '@/api/transform';

export default {
  name: 'slider_nav',
  data () {
    return {
      elNav: null,
      elContent: null,
      transformVal: {},
      startX: null,
      startY: null,
      currentTransformY: null,
      currentTransformX: null,
      lastTime: null,
      lastTimeDis: null,
      lastDisX: null,
      lastX: null,
      minY: null,
      minX: null,
      isMove: true,
      isFirst: true,
      step: 1,
      defaultConfig: {
        sliderY: false
      }
    };
  },
  methods: {
    sliderStart (el) {
      this.minY = document.documentElement.clientHeight - this.elNav.offsetHeight;
      this.minX = document.documentElement.clientWidth - this.elNav.offsetWidth;
      let changedTouches = event.changedTouches[0];
      this.startY = changedTouches.pageY;
      this.startX = changedTouches.pageX;
      this.currentTransformY = transform(this.el, this.transformVal, 'translate3d').Y;
      this.currentTransformX = transform(this.el, this.transformVal, 'translate3d').X;
      this.lastTime = new Date().getTime();
      this.step = 1;
      this.isMove = true;
      this.isFirst = true;
      this.lastX = this.startX;
      el.style.transition = 'none';
    },
    sliderMove (el) {
      if (!this.isMove) {
        return;
      }
      let changedTouches = event.changedTouches[0];
      let disY = changedTouches.pageY - this.startY;
      let disX = changedTouches.pageX - this.startX;
      let totalY = disY + this.currentTransformY;
      let totalX = disX + this.currentTransformX;

      this.lastTimeDis = new Date().getTime() - this.lastTime;
      this.lastDisX = changedTouches.pageX - this.lastX;
      this.lastX = changedTouches.pageX;
      this.lastTime = new Date().getTime();

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

        }
      } else {
        if (totalX > 0) {
          this.step = 1 - totalX / document.documentElement.clientWidth;
          totalX = parseInt(totalX * this.step);
        }
        if (totalX < this.minX) {
          // console.log(this.minX - totalX);
          let over = this.minX - totalX;
          this.step = 1 - over / document.documentElement.clientWidth;
          over = parseInt(this.step * over);
          totalX = this.minX - over;
        }
      }
      if (this.isMove) {
        if (this.defaultConfig.sliderY) {
          transform(el, this.transformVal, 'translate3d', '0,' + totalY + ',0');
        } else {
          transform(el, this.transformVal, 'translate3d', '' + totalX + ',0,0');
        }
      }
    },
    sliderEnd (el) {
      let speedX = (this.lastDisX / this.lastTimeDis) * 100;
      // console.log(speedX);
      let transformX = transform(el, this.transformVal, 'translate3d').X;
      // let transformY = transform(el, this.transformVal, 'translate3d').Y;
      let targetX = transformX + speedX;
      // let time = Math.abs(speedX * .9);
      // time = time < 300 ? 300 : time;
      // console.log(targetX);
      console.log(this.minX);
      if (targetX > 0) {
        targetX = 0;
      }
      if (targetX < this.minX) {
        targetX = this.minX;
      }

      el.style.transition = 0.5 + 's';
      if (this.defaultConfig.sliderY) {
        transform(el, this.transformVal, 'translate3d', '0,' + 0 + ',0');
      } else {
        transform(el, this.transformVal, 'translate3d', '' + targetX + ',0,0');
      }
    }
  },
  mounted () {
    this.elNav = this.$refs.sliderNav;
    this.elContent = this.$refs.sliderContent;
    transform(this.elNav, this.transformVal, 'translate3d', '0,0,0');
    transform(this.elContent, this.transformVal, 'translate3d', '0,0,0');

  }
};
</script>

<style scoped lang="scss">
  .slider_nav {
    .slider_nav_header {
      width: 100%;
      overflow: hidden;
      .nav_header_list {
        display: flex;
        align-items: center;
        width: 13rem;
        li {
          font-size: 0.4rem;
          list-style: none;
          margin-left: 0.5rem;
          height: 1rem;
          line-height: 1rem;
          text-align: center;
        }
      }
    }
    .slider_nav_content {
      position: relative;
      .loading {
        text-align: center;
        font-size: 0.5rem;
      }
      .nav_content_list {
        display: flex;
        list-style: none;
        flex-wrap: wrap;
        li {
          width: 50%;
          div {
            padding: 0.2rem;
          }
          img {
            border-radius: 5px;
            background-color: #f4f4f4;
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
</style>
