<template>
  <transition name="view">
    <div class="ys-viewer" v-if="isView">
      <div class="bg"></div>
      <div class="viewer-photo">
        <img :src="baseUrl1 + props.photos[nowNumber]" class="photo-img" />
      </div>
      <div class="switch sw-left" @click="changeNumber(0)" v-show="props.nowNumber > 0">
        <span class="iconfont icon-xiangzuo1"></span>
      </div>
      <div class="switch sw-right" @click="changeNumber(1)" v-show="props.nowNumber < photos.length - 1">
        <span class="iconfont icon-xiangyou1"></span>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { baseUrl } from '@/utils/env'
import { ref } from 'vue'

const baseUrl1 = ref(baseUrl)

const props = defineProps({
  photos: {
    default: []
  },
  nowNumber: {
    type: Number,
    default: 0
  },
  isView: {
    default: false
  }
})

// const props = defineProps({photos, nowNumber, isView})

// console.log(props.photos);


const $emit = defineEmits(['viewSwitch'])

const changeNumber = (e: number) => {
  $emit('viewSwitch', e)
}

</script>

<style scoped lang="less">
.view {

  //入场
  &-enter {
    &-from {
      opacity: 0;
    }

    &-active {
      transition: @tr;
    }

    &-to {
      opacity: 1;
    }
  }

  // 出场
  &-leave {
    &-from {
      opacity: 1;
    }

    &-active {
      transition: @tr;
    }

    &-to {
      opacity: 0;
    }
  }
}

.ys-viewer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  .bg {
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(20px);
    height: 100%;
    width: 100%;
  }

  .viewer-photo {
    position: absolute;
    padding: 82px 454px 0px 96px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: center;

    img {
      max-width: 100%;
    }
  }

  .switch {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: @gray-3;
    color: @gray-10;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.5;
    transition: @tr;
    cursor: pointer;

    .iconfont {
      font-size: 24px;
    }

    &:hover {
      opacity: 1;
    }
  }

  .sw-left {
    left: 20px;
  }

  .sw-right {
    right: 380px;
  }
}
</style>