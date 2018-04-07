<!--面包屑弹窗组件-->
<template>
  <div class="toast">
    <div class="toast_cover" v-if="false"></div>
    <div class="success_container toast_container">
      <transition name="toast">
        <div class="success_toast toast_pop" v-if="successStatus"><span
          class="iconfont icon-chenggong"></span><span>{{success}}</span></div>
      </transition>
    </div>
    <div class="error_container toast_container">
      <transition name="toast">
        <div class="error_toast toast_pop" v-if="errorStatus"><span
          class="iconfont icon-shibai"></span><span>{{error}}</span></div>
      </transition>
    </div>
    <div class="warn_toast toast_container">
      <transition name="toast">
        <div class="warn_toast toast_pop" v-if="warnStatus">
          <span class="iconfont icon-wuuiconsuotanhao"></span><span>{{warn}}</span>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'toast',
  data () {
    return {
      success: this.msgSuccess.msg,
      error: this.msgError.msg,
      warn: this.msgWarn.msg,
      successStatus: this.msgSuccess.successStatus,
      errorStatus: this.msgError.errorStatus,
      warnStatus: this.msgWarn.warnStatus
    };
  },
  methods: {},
  props: {
    msgSuccess: {
      type: Object,
      required: true
    },
    msgError: {
      type: String,
      required: true
    },
    msgWarn: {
      type: String,
      required: true
    }
  }
};
</script>
<style scoped lang="scss">
  .toast {
    .toast_cover {
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      z-index: 10;
      background-color: rgba(000, 000, 000, 0.6);
    }
    .toast_container {
      position: fixed;
      left: 50%;
      top: 10px;
      z-index: 10;
      transform: translate(-50%, 0);
      .toast_pop {
        display: flex;
        align-items: center;
        border-radius: 3px;
        border: 1px solid #fff;
        box-shadow: 0 0 4px #ccc;
        margin-top: 0.2rem;
        /*min-width: 1rem;*/
        min-height: 0.8rem;
        background-color: #fff;
        span:nth-child(2) {
          text-align: center;
          width: 90%;
          font-size: 0.3466rem;
          padding: 0.2rem 0.3rem;
        }
      }
    }
    .success_toast {
    }
    .error_toast {
    }
    .icon-chenggong {
      color: #19be6b;
      font-size: 0.5rem;
      padding-left: 0.3rem;
    }
    .icon-shibai {
      color: #ed3f14;
      font-size: 0.5rem;
      padding-left: 0.3rem;
    }
    .icon-wuuiconsuotanhao {
      color: #ff9900;
      font-size: 0.4rem;
      padding-left: 0.3rem;
    }
  }

  .toast-enter-active, .toast-leave-active {
    transition: 0.5s all;
  }

  .toast-enter {
    transform: translate3d(0, -100px, 0);
    opacity: 0;
  }

  .toast-enter-to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }

  .toast-leave {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }

  .toast-leave-to {
    transform: translate3d(0, -100px, 0);
    opacity: 0;
  }

</style>
