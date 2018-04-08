<template>
 <div class="modal_wrapper">
   <div class="modal_cover" v-if="msgModal.modalStatus"></div>
   <transition name="modal">
     <div class="modal_container" v-if="modalStatus">
       <div class="modal_header">
         <span>{{msgModal.modalTitle}}</span>
         <span></span>
       </div>
       <div class="modal_text">
         {{msgModal.modalText}}
       </div>
       <div class="modal_btn">
         <button @click="cancel">取消</button>
         <button @click="confirm">确定</button>
       </div>
     </div>
   </transition>
 </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex';
export default {
  name: 'modal',
  data () {
    return {};
  },
  methods: {
    ...mapMutations(['STATEMENT']),
    cancel () {
      this.STATEMENT({
        name: 'msgModal',
        type: 'modalStatus',
        data: false
      });
    },
    confirm () {
      this.STATEMENT({
        name: 'msgModal',
        type: 'modalStatus',
        data: false
      });
    }
  },
  computed: {
    ...mapState(['msgModal'])
  }
};
</script>
<style scoped lang="scss">
  .modal_wrapper {
    .modal_cover{
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 10;
      background-color: rgba(000,000,000,0.7);
      width: 100%;
      height: 100%;
    }
    .modal_container {
      position: fixed;
      z-index: 11;
      left: 50%;
      top: 50%;
      width: 7rem;
      transform: translate3d(-50%, -50%,0);
      background-color: #ffffff;
      border-radius: 3px;
      .modal_header {
        display: flex;
        align-items: center;
        span:nth-child(1) {
          font-size: 0.5rem;
          padding: 0.2rem 0.2rem 0.2rem 0.2rem;
        }
      }
      .modal_text {
        font-size: 0.4rem;
        text-align: center;
        padding: 0.4rem 0;
      }
      .modal_btn {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: 0.24rem 0.4rem;
        button {
          outline: none;
          border: none;
          border-radius: 3px;
        }
        button:nth-child(1) {
          border: 1px solid #dcdfe6;
          background-color: #fff;
          padding: 0.16rem 0.5rem;
          margin-right: 0.2rem;
        }
        button:nth-child(2) {
          color: #fff;
          background-color: #409eff;
          border:1px solid #409eff;
          padding: 0.16rem 0.5rem;
        }
      }
    }
  }
  .modal-enter {
    transform: translate3d(0, -30px, 0);
    opacity: 0;
  }
  .modal-enter-active, .modal-leave-active {
    transition: 0.5s all;
  }
  .modal-enter-to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  .modal-leave {
    opacity: 0;
  }
  .modal-leave-to {
    opacity: 1;
    transform: translate3d(0, -10px, 0);
  }
</style>
