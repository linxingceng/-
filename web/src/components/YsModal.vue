<template>
  <transition name="modal">
    <div class="ys-modal" v-if="isModal">
      <div class="ys-modal-head">
        <p class="modal-name">{{ props.title }}</p>
        <span class="iconfont icon-guanbi" @click="closeModal"></span>
      </div>
      <div class="ys-modal-main">
        <slot></slot>
        <div class="slot"></div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

// 传递给父级，为了关闭
const $emit = defineEmits(['close'])

// 方法将close变量传递给父级
const closeModal = function () {
  $emit('close', "关闭了111")
}

// 接收父级传递过来的变量
// const props = defineProps({
//   title: {
//     default: '标题'
//   },
//   isModal: {
//     default: false,
//   }
// })

const props = defineProps(['title', 'isModal'])



// onMounted(() => {
//   closeModal()
// })

</script>

<style scoped lang="less">
.modal {

  //入场
  &-enter {
    &-from {
      transform: translateX(360px);
    }

    &-active {
      transition: all 1s ease-out;
    }

    &-to {
      transform: translateX(0px);
    }
  }

  // 出场
  &-leave {
    &-from {
      transform: translateX(0px);
    }

    &-active {
      transition: all .5s ease-in;
    }

    &-to {
      transform: translateX(360px);
    }
  }
}

.ys-modal {
  width: 360px;
  height: 100%;
  position: fixed;
  right: 0;
  top: 52px;
  z-index: 998;
  background: rgba(255, 255, 255, 0.80);
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.0.8);
  backdrop-filter: blur(20px);


  .ys-modal-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
    padding-bottom: @padding-20;

    .modal-name {
      font-size: @size-16;
      color: @gray-1;
      font-weight: 600;
    }

    .icon-guanbi {
      color: @gray-2;
      cursor: pointer;
      padding: 5px;
      // border: 1px solid red;
    }
  }

  .ys-modal-main {
    // border: 1px solid red;
    height: 80%;
    overflow-y: auto;
    // padding: @padding-20;
    padding-bottom: 10px;
    box-sizing: border-box;
    margin: 2px;

    // .slot {
    //   height: 50px;
    //   background-color: #eee;
    // }

    &::-webkit-scrollbar {
      // 滚动条整体样式
      width: 4px;
      // 高宽分别对应横竖滚动条的尺寸
      height: 4px;
    }

    &::-webkit-scrollbar-thumb {
      // 滚动条里面小方块
      border-radius: 4px;
      background: rgba(0, 0, 0, 0.2);
    }

    &::-webkit-scrollbar-track {
      // 滚动条里面轨道
      border-radius: 4px;
      background: rgba(0, 0, 0, 0);
    }
  }


}
</style>