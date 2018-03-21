<template>
  <div class="pic_list">
    <slider-touch>
      <ul class="pic_content">
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
    </slider-touch>
  </div>
</template>

<script>
import SliderTouch from '@/components/slider-touch';
export default {
  name: 'pic_touch',
  data () {
    return {
    };
  },
  components: {
    SliderTouch
  },
  methods: {
  }
};
</script>

<style scoped lang="scss">
  .pic_content{
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
</style>
