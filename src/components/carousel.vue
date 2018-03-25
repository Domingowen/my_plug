<template>
<div class="carousel_module">
  <div class="carousel_content">
    <ul class="carousel_list" ref="carousel" @mousedown="carouselDown">
      <li><img src="http://i1.mifile.cn/a4/xmad_15089303073348_sAUOi.jpg" alt=""></li>
      <li><img src="http://i1.mifile.cn/a4/xmad_15217074759105_hlLSz.jpg" alt=""></li>
      <li><img src="http://i1.mifile.cn/a4/xmad_15206016284836_xjlad.jpg" alt=""></li>
      <li><img src="http://i1.mifile.cn/a4/xmad_15217713812757_pQzOo.jpg" alt=""></li>
      <li><img src="http://i1.mifile.cn/a4/xmad_15217228542312_AMYOT.jpg" alt=""></li>
    </ul>
  </div>
</div>
</template>
<script>
import transform from '@/api/transform';
export default {
  name: 'carousel',
  data () {
    return {
      startX: null,
      currentStartX: null,
      startY: null,
      currentStartY: null,
      iNow: 0,
      iLoopActive: 0,
      el: null,
      transformVal: {},
      controlStyle: 'slide',
      isMove: true,
      elWidth: null,
      elSingleWidth: null,
      loop: true,
      minX: null
    };
  },
  methods: {
    carouselDown () {
      event.preventDefault();
      document.addEventListener('mousemove', this.carouselMove);
      document.addEventListener('mouseup', this.carouselUp);
      this.isMove = true;
      this.elWidth = this.el.offsetWidth;
      this.elSingleWidth = this.el.children[0].offsetWidth;
      this.minX = this.el.children[0].offsetWidth - this.elWidth;
      this.el.style.transition = 'none';
      this.startX = event.pageX;
      this.startY = event.pageY;
      this.currentStartX = transform(this.el, this.transformVal, 'translate3d').X;
      this.currentStartY = transform(this.el, this.transformVal, 'translate3d').Y;
      this.iLoopActive = -Math.round(this.currentStartX / this.elSingleWidth);
      // this.iNow = -Math.round(this.currentStartX / this.elSingleWidth);
      // console.log(this.iNow);
      if (this.loop) {
        if (this.currentStartX === this.minX) {
          transform(this.el, this.transformVal, 'translate3d', '' + -1 * this.el.children[0].offsetWidth + ', 0, 0');
          this.iLoopActive = 1;
        } else if (this.currentStartX === 0) {
          transform(this.el, this.transformVal, 'translate3d', '' + -(this.el.children.length - 2) * this.el.children[0].offsetWidth + ', 0, 0');
          this.iLoopActive = this.el.children.length - 2;
        }
      } else {

      }
      this.currentStartX = transform(this.el, this.transformVal, 'translate3d').X;
      this.currentStartY = transform(this.el, this.transformVal, 'translate3d').Y;
    },
    carouselMove () {
      // console.log(event);
      if (!this.isMove) {
        return;
      }
      let disX = event.pageX - this.startX;
      let totalX = disX + this.currentStartX;
      let disY = event.pageY - this.startY;
      if (Math.abs(disX) < Math.abs(disY)) {
        this.isMove = false;
      }
      let currentX = transform(this.el, this.transformVal, 'translate3d').X;
      if (this.loop) {
        if (Math.abs(disX) > (this.el.children[0].offsetWidth / 8)) {
          let dir = disX / Math.abs(disX);
          if (dir === 1) {
            this.iLoopActive = -Math.ceil(currentX / this.el.children[0].offsetWidth);
          } else {
            this.iLoopActive = -Math.floor(currentX / this.el.children[0].offsetWidth);
          }
        }
      } else {
        if (totalX > 0) {
          totalX = 0;
        } else if (totalX < this.minX) {
          totalX = this.minX;
        }
      }
      if (this.controlStyle === 'slide') {
        transform(this.el, this.transformVal, 'translate3d', '' + totalX + ',0,0');
      }
      if (this.controlStyle === 'shade') {
      }
    },
    carouselUp () {
      // let currentX = transform(this.el, this.transformVal, 'translate3d').X;
      // console.log(currentX);
      // console.log(this.el.children[0].offsetWidth);
      // console.log( -currentX / this.el.children[0].offsetWidth);
      // if(currentX)
      this.el.style.transition = '0.5s all';
      if (this.loop) {
        transform(this.el, this.transformVal, 'translate3d', '' + (-this.iLoopActive * this.el.children[0].offsetWidth) + ', 0, 0');
        let currentX = transform(this.el, this.transformVal, 'translate3d').X;
        this.iNow = -Math.round(currentX / this.el.children[0].offsetWidth);
        this.iNow -= 1;
        if (currentX === this.minX) {
          this.iNow = 0;
        } else if (currentX === 0) {
          this.iNow = 4;
        }
        console.log(this.iNow);

        // console.log(this.iLoopActive - 1);
        // console.log(transform(this.el, this.transformVal, 'translate3d').X);
      } else {
        transform(this.el, this.transformVal, 'translate3d', '' + (-this.iNow * this.el.children[0].offsetWidth) + ', 0, 0');
      }
      document.removeEventListener('mousemove', this.carouselMove);
      document.removeEventListener('mousemove', this.carouselUp);
    },
    changePage (disX) {
    }
  },
  mounted () {
    let el = this.$refs.carousel;
    if (this.loop) {
      let firstDom = el.children[0].cloneNode(true);
      let lastDom = el.children[el.children.length - 1].cloneNode(true);
      el.appendChild(firstDom);
      el.insertBefore(lastDom, el.children[0]);
      this.$nextTick(() => {
        transform(el, this.transformVal, 'translate3d', '' + (-(this.iLoopActive + 1) * el.children[0].offsetWidth) + ',0,0');
      });
    } else {
      transform(el, this.transformVal, 'translate3d', '0,0,0');
    }
    this.el = el;
    let arrList = Array.prototype.slice.call(this.el.children);
    this.el.style.width = arrList.length + '00%';
    // console.log(arrList);
    // arrList.forEach((val, index, arr) => {});
  }
};
</script>
<style scoped lang="scss">
  .carousel_module{
    .carousel_content{
      width: 1226px;
      height: 460px;
      overflow: hidden;
      margin: 0 auto;
      .carousel_list{
        height: 100%;
        display: flex;
        cursor: grab;
        li {
          list-style: none;
          width: 100%;
          height: 100%;
          font-size: 0;
        }
        li.active{
          z-index: 30;
        }
      }
    }
  }
</style>
