<template>
<div class="home">
  <slider-touch>
    <ul class="homelist">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </slider-touch>
</div>
</template>

<script>
import SliderTouch from '@/components/slider-touch';
export default {
  name: 'index',
  components: {
    SliderTouch
  }
};
</script>

<style scoped lang="scss">
  ul,li{
    margin: 0;
    padding: 0;
  }
  .homelist{
    li{
      width: 100%;
      height: 3rem;
      background-color: brown;
      margin-bottom: 0.2rem;
    }
  }
</style>
