<template>
  <div class="ys-node-card" :style="{
    width: width, background: cardbgcolor[noteData.color]
  }">
    <div class="top">
      <p class="time">{{ dataOne(noteData.moment) }}</p>
      <p class="label">{{ labeltype[noteData.type][noteData.label] }}</p>
    </div>
    <p class="message" @click="toDetail">
      {{ noteData.message }}
    </p>
    <div class="foot">
      <div class="foot-left">
        <div class="icon" @click="clickLike">
          <span class="iconfont icon-aixin" :class="{ islike: noteData.islike[0].count > 0 }"></span>
          <span class="value">{{ noteData.like[0].count }}</span>
        </div>
        <div class="icon" v-show="noteData.comcount[0].count > 0">
          <span class="iconfont icon-liuyan"></span>
          <span class="value">{{ noteData.comcount[0].count }}</span>
        </div>
      </div>
      <div class="name">{{ noteData.name }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// import type { MockType, MockTypeList } from '../api/mock/index'
// 导入label
import { label, cardBgColor } from '@/utils/data'
// 导入label类型
import type { LabelType, CardBgColorType } from '@/utils/data'
// 引入时间工具类
import { dataOne } from '@/utils/ystime'
import { insertfeedbackApi } from '@/api/index'
import store from '../store/index'

// label变量
const labeltype = ref<LabelType>(label)
// 设置卡片的变量
const cardbgcolor = ref<CardBgColorType>(cardBgColor)

// 获取父组件传递的数据
const { noteData, width } = defineProps(['noteData', 'width'])

const $emit = defineEmits(['toDetail'])
// 显示详情
const toDetail = () => {
  $emit('toDetail')
}

// 点击喜欢
const clickLike = () => {
  if (noteData.islike[0].count == 0) {
    const data = {
      wallId: noteData.id,
      userId: store.state.user.id,
      type: 0,
      moment: new Date(),
    }

    insertfeedbackApi(data).then((res) => {
      // 反馈完成
      noteData.like[0].count++;
      noteData.islike[0].count++;
    })
  }
}



</script>

<style scoped lang="less">
/* 在线链接服务仅供平台体验和调试使用，平台不承诺服务的稳定性，企业客户需下载字体包自行发布使用并做好备份。 */
// @font-face {
//   font-family: "fa";
//   font-weight: 400;
//   src: url("@/assets/fonts/icon/XR115Yt8AljO.woff") format("woff"),
//     url("@/assets/fonts/icon/XR115Yt8AljO.woff2") format("woff2");
//   font-display: swap;
// }

.ys-node-card {
  height: 240px;
  padding: 10px 20px;
  box-sizing: border-box;
  position: relative;
  border-radius: 10px;


  .top {
    display: flex;
    justify-content: space-between;
    padding-bottom: 16px;

    p {
      font-size: @size-12;
      color: @gray-3;
    }
  }

  .message {
    height: 140px;
    font-family: "华文行楷";
    font-size: 17px;
    color: @gray-2;
    cursor: pointer;
  }

  .foot {
    display: flex;
    justify-content: space-between;
    position: absolute;
    bottom: 15px;
    left: 0;
    padding: 0 20px;
    box-sizing: border-box;
    width: 100%;

    .foot-left {
      display: flex;

      .icon {
        padding-left: @padding-8;
        display: flex;
        align-items: center;

        .value {
          font-size: @size-12;
          color: @gray-2;
          line-height: 16px;
          padding-left: 5px;
        }

        .iconfont {
          font-size: 16px;
          color: @gray-3;
        }

        .icon-aixin {
          cursor: pointer;
          transform: @tr;

          &:hover {
            color: @like-color;
          }
        }

        .islike {
          color: @like-color;
        }
      }
    }

    .name {
      font-family: "华文行楷";
      font-size: 20px;
      color: @gray-2;
    }
  }



}
</style>