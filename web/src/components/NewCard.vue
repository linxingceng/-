<template>
  <div class="new-card">
    <div class="colors" v-show="id == 0">
      <p class="color-li" v-for="(e, index) in cardbgColor1" :key="index" :style="{ background: e }"
        :class="{ colorselected: index == colorSelected }" @click="changeColor(index)"></p>
    </div>

    <!-- 照片 -->
    <div class="add-photo" v-if="id == 1">
      <input type="file" name="file" id="file" multiple="false" @change="showPhoto">
      <div class="add-bt" v-if="url == ''">
        <span class="iconfont icon-jiahao"></span>
      </div>
      <div class="change-bt" v-if="url != ''">
        <span class="iconfont icon-xiugai"></span>
      </div>
      <div class="photo-div"><img :src="url"></div>
    </div>

    <!-- 卡片 -->
    <!-- 文本框，编写留言 -->
    <div class="card-main" :style="{ background: id == 0 ? cardbgColor[colorSelected] : cardBgColor[5] }">
      <textarea placeholder="留言..." class="message" v-model="message"></textarea>
      <input type="text" placeholder="签名" class="name" v-model="name">
    </div>

    <div class="labels">
      <p class="title">选择标签</p>
      <div class="label">
        <p v-for="( e, index) in labels[id]" :key="index" class="label-li"
          :class="{ labelselected: index == labelSelected }" @click="changeLabel(index)">
          {{ e }}</p>
      </div>
    </div>
    <!-- 免责声明 -->
    <div class="shengming">
      <p class="title">免责声明</p>
      <p class="mzsm">
        忆之时光是本人独自开发，为便于与用户交流的留言平台，请不要利用此平台服务制作、上传以下内容: <br />
        1.反对宪法所确定的基本原则;<br />
        2.危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的;<br />
        3.损害国家荣誉和利益的;<br />
        4.煽动民族仇恨，民族歧视，波坏民族团结的;<br />
        5.散布谣言，扰乱社会秩序，破坏社会稳定的;<br />
        6.破坏国家宗教政策，宣扬邪教和封建迷信的;<br />
        7.散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的;<br />
        8.侮辱或者诽谤他人，侵害他人合法权益的;<br />
        8.含有法律，行政法规禁止的其他内容的信息;<br />
      </p>
    </div>
    <!-- 发布按钮 -->
    <div class="footbt">
      <Btn size="max" nom="secondary" class="diuqi" @click="colseModal(0)">丢弃</Btn>
      <Btn size="max" nom="primary" class="queding" @click="submit">确定</Btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { cardBgColor, cardBgColor1, label } from '@/utils/data'
import type { CardBgColorType } from '@/utils/data'
import axios from 'axios';
import { ref, getCurrentInstance, shallowReactive } from 'vue'
import store from '../store/index'
import { getObjectURL } from '../utils/ystime.js'
import { insertWallApi, profileApi } from '@/api/index';
import { useRoute } from 'vue-router'


// 当前选择颜色
const colorSelected = ref<number>(0)
// 标签
const labels = ref<string[][]>(label)
// 标签选中
const labelSelected = ref<number>(0)

// 保存卡片颜色 
const cardbgColor = ref<CardBgColorType>(cardBgColor)
const cardbgColor1 = ref<CardBgColorType>(cardBgColor1)

// 留言信息
const message = ref<string>('')

// 签名
const name = ref<string>('')

// 点击选择颜色
const changeColor = (index: number) => {
  colorSelected.value = index
}

// 点击切换标签
const changeLabel = (index: number) => {
  labelSelected.value = index
}

// 获取父组件传递过来的id,用于label[id]
const props = defineProps({
  id: {
    default: 0.
  }
})

// const iii = getCurrentInstance();
// console.log(iii);


// 关闭窗口
const colseModal = (data: number) => {
  $emit('addClose', data)
}

const $emit = defineEmits(['addClose', 'clickbt'])

// const id = ref<number>()

const $route = useRoute()
const id = ref(Number($route.query.id))



// 获取ip
const user = ref(store.state.user)

// url图片路径
const url = ref('')

// 图片显示
const showPhoto = () => {
  const fileInput = document.getElementById('file');
  if (fileInput instanceof HTMLInputElement && fileInput.type === 'file') {
    const files = fileInput.files;
    if (files && files.length > 0) {
      const file = files[0];
      let aa: any = getObjectURL(file);
      url.value = aa;
    } else {
      console.log('No file selected.');
    }
  }
}


// 图片提交
const updatePhoto = (data: any) => {
  let fileInput = document.getElementById('file');
  if (fileInput instanceof HTMLInputElement && fileInput.type === 'file') {
    const files = fileInput.files;
    if (files && files.length > 0) {
      let formData = new FormData();
      formData.append('file', files[0]);

      // 提交后端
      profileApi(formData).then((res) => {
        // console.log(res);
        data.imgurl = res;

        // 数据存储数据库
        insertWallApi(data).then((result: any) => {
          let cardD = {
            type: id.value,
            message: message.value,
            name: data.name,
            userId: user.value.id,
            moment: new Date(),
            label: labelSelected.value,
            color: 5,
            imgulr: data.imgurl,
            id: result.message.insertId,
            islike: [{ count: 0 }],
            like: [{ count: 0 }],
            comcount: [{ count: 0 }],
            report: [{ count: 0 }],
            revoke: [{ count: 0 }]
          }
          $emit("clickbt", cardD);
          // console.log(cardD);
          message.value = '';
        })
      }
      )
    }
  }
}

// 提交新建wall
const submit = function () {
  let name1 = '匿名';
  if (name.value) {
    name1 = name.value;
  }
  let data = {
    type: id.value,
    message: message.value,
    name: name1,
    userId: store.state.user.id,
    imgurl: '',
    moment: new Date(),
    label: labelSelected.value,
    color: 5,
  };
  // console.log(data);
  if (message.value && id.value == 0) {
    data.color = colorSelected.value;
    insertWallApi(data).then((res: any) => {
      // console.log(res);

      let cardD = {
        type: 0,
        message: message.value,
        name: name1,
        userId: store.state.user.id,
        moment: new Date(),
        label: labelSelected.value,
        color: colorSelected.value,
        imgulr: "",
        id: res.message.insertId,
        islike: [{ count: 0 }],
        like: [{ count: 0 }],
        comcount: [{ count: 0 }],
        report: [{ count: 0 }],
        revoke: [{ count: 0 }]
      }
      $emit("clickbt", cardD);
      message.value = '';
      // $message({ type: 'success', message: '提交记录成功!' })
    })
  } else if (id.value === 1 && url.value) {
    updatePhoto(data);
  }
}

</script>

<style scoped lang="less">
.new-card {
  padding: 0 @padding-20 120px;
  position: relative;

  .colors {
    padding-bottom: @padding-12;
    display: flex;
    align-items: center;

    .color-li {
      width: 24px;
      height: 24px;
      margin-right: @padding-8;
      float: left;
      cursor: pointer;
    }

    .colorselected {
      border: 1px solid @primary-color;
    }
  }

  .add-photo {
    padding-bottom: 20px;
    position: relative;

    #file {
      position: absolute;
      z-index: 10;
      top: -10px;
      height: 74px;
      width: 64px;
      opacity: 0;
      cursor: pointer;
    }

    .add-bt {
      width: 64px;
      height: 64px;
      border: 1px solid @gray-3;
      border-radius: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      .icon-jiahao {
        font-size: 24px;
      }
    }

    .photo-div {
      max-height: 200px;
      width: 100%;
      background: #f0f0f0;
      overflow: hidden;
      display: flex;
      align-items: center;

      img {
        width: 100%;
      }
    }

    .change-bt {
      position: absolute;
      top: 12px;
      left: 12px;
      height: 40px;
      width: 40px;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;

      .icon-xiugai {
        color: #fff;
      }
    }

  }


  .card-main {
    // position: relative;
    height: 240px;
    width: 100%;
    // background: rgba(252, 175, 162, 0.31);
    padding: 12px;
    box-sizing: border-box;
    transition: @tr;
    border-radius: 10px;



    .message {
      background: none;
      border: none;
      resize: none;
      height: 172px;
      width: 100%;
      box-sizing: border-box;
      font-size: 18px;
      padding: @padding-8;
      font-family: '华文行楷';
      color: @gray-2;

    }

    .name {
      width: 100%;
      padding: @padding-8;
      background: none;
      box-sizing: border-box;
      border: 1px solid #fff;
      line-height: 20px;
      font-family: '华文行楷';
      font-size: 16px;
      color: @gray-2;
    }
  }

  .title {
    color: @gray-1;
    font-weight: 600;
    padding-top: 30px;
  }

  .label {
    display: flex;
    flex-wrap: wrap;
    width: 320px;

    .label-li {
      padding: 2px 10px;
      border-radius: 20px;
      margin: @padding-16 @padding-4 0 0;
      cursor: pointer;
      color: @gray-2;
      transition: @tr;
    }

    .labelselected {
      background: #EBEBEB;
      font-weight: 600;
      color: @gray-1;
    }
  }

  .shengming {
    .mzsm {
      padding-top: 10px;
      font-size: 12px;
      color: @gray-3;
      line-height: 24px;
    }
  }

  .footbt {
    padding: @padding-20 0;
    box-sizing: border-box;
    position: fixed;
    bottom: 52px;
    left: 20px;
    // background: rgba(0, 0, 0, 0.1);
    // background: rgba(255, 255, 255, 0.80);
    width: 100%;
    backdrop-filter: blur(10px);

    .queding {
      margin-left: @padding-20;
      width: 200px;
    }
  }

}
</style>