<template>
  <div class="ys-photo-card">
    <img :src="baseUrl + photo.imgurl" class="photo-img" />
    <div class="photo-bg" @click="toDetail"></div>
    <div class="photo-like" @click="clickLike">
      <span class="iconfont icon-aixin" :class="{ islike: photo.islike[0].count > 0 }"></span>
      <span class="like-data">{{ photo.like[0].count }}</span>
    </div>
  </div>
  <solt></solt>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import type { MockType, MockTypeList } from '../api/mock/index'
// 导入label
import { label, cardBgColor } from '@/utils/data'
// 导入label类型
import type { LabelType, CardBgColorType } from '@/utils/data'
// import { photo } from '../../mock/index'
import { baseUrl } from '@/utils/env'
import { insertfeedbackApi } from '@/api/index'

import store from '../store/index'


// // 设置默认数据为空
// const defaultNotedata = ref<MockTypeList>()
// // label变量
// const labeltype = ref<LabelType>(label)
// // 设置卡片的变量
// const cardbgcolor = ref<CardBgColorType>(cardBgColor)

const $emit = defineEmits(['toDetail'])

// 显示详情
const toDetail = () => {
  $emit('toDetail')
}

// 获取父组件传递的数据
const { photo } = defineProps(['photo'])
// const photo = ref(props)
// console.log(photo);


// 点击喜欢
const clickLike = () => {
  if (photo.islike[0].count == 0) {
    const data = {
      wallId: photo.id,
      userId: store.state.user.id,
      type: 1,
      moment: new Date(),
    }
    // console.log(photo.islike[0]);
    insertfeedbackApi(data).then((res) => {
      // console.log(res);
      // 反馈完成
      photo.like[0].count++;
      photo.islike[0].count++;
      // console.log(photo.islike[0].count);
    })
  }
}

watch(photo.islike[0].count, (newValue) => {
  photo.islike[0].count = newValue;
})


</script>

<style scoped lang="less">
.ys-photo-card {
  position: relative;

  .photo-img {
    width: 100%;
  }

  .photo-bg {
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.2);
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: @tr;
    cursor: pointer;
  }

  .photo-like {
    position: absolute;
    left: @padding-8;
    top: @padding-8;
    background: rgba(255, 255, 255, 0.80);
    border-radius: 20px;
    height: 28px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    backdrop-filter: blur(10px);
    opacity: 0;
    transition: @tr;
    cursor: pointer;

    .icon-aixin {
      color: @gray-3;
      padding-right: @padding-4;
    }

    .like-data {
      color: @gray-1;
    }
  }

  &:hover {
    .photo-bg {
      opacity: 1;
    }

    .islike {
      color: @gray-1;
    }

    .photo-like {
      opacity: 1;
    }
  }
}
</style>