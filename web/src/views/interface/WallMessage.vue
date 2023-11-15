<template>
  <div class="wall-message">
    <p class="title">{{ WallType[id].name }}</p>
    <p class="slogan">{{ WallType[id].slogan }}</p>
    <div class="label">
      <p class="label-list" :class="{ lbselected: nlabel == -1 }" @click="selectNote(-1)">全部</p>
      <p class="label-list" :class="{ lbselected: nlabel == index }" v-for="(item, index) in Label[id]" :key="index"
        @click="selectNote(index)">{{
          item
        }}</p>
    </div>
    <div class="card" :style="{ width: cardWidth + 'px' }" v-if="id == 0">
      <NoteCard v-for="(e, index) in cards" :key="index" :noteData="e" class="card-inner" :width="'288px'"
        :class="{ cardselected: cardSelected == index }" @toDetail="selectedCard(index)">
      </NoteCard>
    </div>
    <div class="photo" v-if="id == 1">
      <PhotoCard v-for="(e, index) in cards" :key="index" class="phpto-card" @toDetail="selectedCard(index)" :photo="e">
      </PhotoCard>
    </div>

    <!-- 卡片状态 -->
    <div class="none-msg" v-show="isOk == 0">
      <img :src="none[id].url">
      <p>{{ none[id].msg }}</p>
    </div>

    <!-- 加载动画 -->
    <div class="loading" v-show="isOk == -1">
      <div id="lottie">
      </div>
      <p>加载中...</p>
    </div>

    <!-- 加载完成 -->
    <p class="bottom-tip" v-show="isOk == 2">没有更多了...</p>

    <div class="add" :style="{ bottom: addBottom + 'px' }" @click="addCard" v-show="!modal">
      <span class="iconfont icon-jiahao"></span>
    </div>
    <Ysmodal :title="title" @close="closeModal" :isModal="modal">
      <NewCard :id="id" @addClose="closeModal" v-if="cardSelected == -1" @clickbt="newCard"></NewCard>
      <CardDetail v-if="cardSelected != -1" :card="cards[cardSelected]"></CardDetail>
    </Ysmodal>
    <YsViewer :isView="view" :photos="photoArr" :nowNumber="cardSelected" @viewSwitch="viewSwitch"></YsViewer>
  </div>
</template>

<script setup lang="ts">
// 引入工具类中的标签数据
import { wallType, label, none } from '@/utils/data'
// 引入工具类中的标签类型
import type { WallTypeType, LabelType } from '@/utils/data'
// 引入ref
import { onMounted, ref, watch, onUnmounted, nextTick } from 'vue'
// 引入路由
import { useRoute } from 'vue-router'

// 引入note模拟数据
// import { note, photo } from '../../../mock/index'
import type { MockTypeMap, MockType, MockTypeList } from '../../api/mock/index'
import type { findWallPage } from '../../api/card/index'

// 导入加载动画
import lottie from 'lottie-web'
import loadAnimationData from '../../assets/images/load.json'

import { findWallPageApi } from '../../api/index'

import store from '../../store/index'

// 使用路由
const $route = useRoute();

// 定义墙类别变量
const WallType = ref<WallTypeType>(wallType)
// 定义标签类别变量
const Label = ref<LabelType>(label)

// 当前对应的标签
const nlabel = ref<number>(-1)

// mock模拟数据
// const noteData = ref<MockTypeList>(note.data)
// const noteData = ref('')

// 卡片模块宽度
const cardWidth = ref<number>(0)
const wWidth = ref<number>(0)

// 添加按钮的bottom值
const addBottom = ref<number>(30)

// 添加留言墙留言变量
const title = ref<string>('留言墙')

// 是否调用弹窗
const modal = ref<boolean>(false);


// 预览大图
const view = ref<boolean>(false)

// 点击卡片
let cardSelected = ref<number>(-1)

// 存放图片
const photoArr = ref<number[]>([])


// 是否加载中 -1 为加载中，0为没有拿到数据
const isOk = ref<number>(-1)


// 选择墙id
const id: any = ref($route.query.id)

// 卡片信息
const cards = ref<MockType[]>([]);


// 切换图片
const viewSwitch = (e: number) => {
  if (e == 0) {
    cardSelected.value--;
  } else {
    cardSelected.value++;
  }
}

// 选择方法
const selectNote = (e: number) => {
  nlabel.value = e;
  // 清空当前数据
  cards.value = [];
  page.value = 1;
  getUser();
}

// 卡片模块宽度
const getCardWidth = () => {
  // 页面宽度
  wWidth.value = document.body.clientWidth

  // 计算一行的宽度，保证容器排列
  cardWidth.value = Math.floor((wWidth.value - 120) / 300) * 300
}

// 监听滚动条滚动，用来设置addButtom的位置
const scrollBottom = () => {
  // 距离顶部高度
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  // 屏幕高度
  let clientHeight = document.documentElement.clientHeight || document.body.clientHeight
  // 内容高度
  let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
  if (scrollTop + clientHeight + 230 >= scrollHeight) {
    addBottom.value = scrollTop + clientHeight + 230 - scrollHeight;
  } else {
    addBottom.value = 30;
  }

  // 加载更多
  if (scrollTop + clientHeight == scrollHeight) {
    getUser();
  }
}

// 添加卡片的标题
const addCard = () => {
  if (cardSelected.value == -1) {
    title.value = '写留言'
  } else {
    title.value = '写留言'
    cardSelected.value = -1;
  }
  modal.value = true;
}

// 监听 $route 变化，更新 id
watch(() => $route.query.id,
  (newId) => {
    id.value = Number(newId);
    modal.value = false;
    view.value = false;
    nlabel.value = -1;
    cardSelected.value = -1;
    cards.value = [];
    page.value = 1;
    photoArr.value = [];
    getWallCard(id.value);
  }
);


// 切换开关
const closeModal = () => {
  modal.value = false;
  if (id.value == 1) {
    view.value = false;
  }
}

// 选择卡片
let selectedCard = (e: any) => {
  title.value = ""
  if (e == cardSelected.value) {
    cardSelected.value = -1;
    modal.value = false;
    if (id.value == 1) {
      view.value = false;
    }
  } else {
    cardSelected.value = e;
    modal.value = true;

    if (id.value == 1) {
      view.value = true
    }
  }
}

// 前端插入卡片
const newCard = (e: any) => {
  // console.log(e);
  cards.value.unshift(e)
  cards.value = [];
  page.value = 1;
  photoArr.value = [];
  getWallCard(id.value);
  closeModal();
}

// 加载动画
const loading = () => {
  if (isOk.value == -1) {
    nextTick(async () => {
      let params1: any = {
        container: document.getElementById("lottie"),
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: loadAnimationData,
      };
      lottie.loadAnimation(params1);
    })
  }
}



const page = ref(1)
const pagesize = ref(10)

const user = ref(store.state.user)


// 渲染页面
const getWallCard = async (id: any) => {
  // 只有page>0才执行
  if (page.value > 0) {
    isOk.value = -1;
    let data = {
      type: id,
      page: page.value,
      pagesize: pagesize.value,
      userId: store.state.user.id,
      label: nlabel.value,
    }
    findWallPageApi(data).then((res: any) => {
      cards.value = cards.value.concat(res.message);

      // 设置下一次的page
      // console.log(res.message);
      if (res.message.length) {
        page.value++;
      } else {
        page.value = 0;
      }
      if (cards.value.length > 0) {
        isOk.value = 1;
        if (page.value == 0) {
          isOk.value = 2;
        }
      } else {
        isOk.value = 0;
      }

      // 如果为图片将图片单独拿出来
      if (id == 1) {
        for (let i = 0; i < cards.value.length; i++) {
          // 将id=1的所有的图片路径保存在photoArr中
          photoArr.value.push(cards.value[i].imgurl)
        }
      }
    })
  }
}

// 异步渲染页面
const getUser = () => {
  let timer = setInterval(() => {
    if (user) {
      clearInterval(timer)
      getWallCard(id.value)
    }
  }, 200)
}


onMounted(() => {
  getCardWidth();

  // 调用getUser 异步渲染页面
  getUser();

  // 加载动画
  loading();

  // 监听屏幕宽度变化
  window.addEventListener('resize', getCardWidth);
  // 监听滚动高度变化
  window.addEventListener('scroll', scrollBottom);
})

onUnmounted(() => {
  // 监听屏幕宽度变化
  window.addEventListener('resize', getCardWidth);
  // 监听滚动高度变化
  window.addEventListener('scroll', scrollBottom);
})
</script>

<style scoped lang="less">
.wall-message {
  min-height: 600px;
  padding-top: 52px;

  .title {
    padding-top: 48px;
    padding-bottom: @padding-8;
    font-size: 56px;
    color: @gray-1;
    text-align: center;
    font-weight: 600;
  }

  .slogan {
    color: @gray-2;
    text-align: center;
  }

  .label {
    display: flex;
    justify-content: center;
    margin-top: 40px;

    .label-list {
      padding: 0 14px;
      display: flex;
      align-items: center;
      height: 30px;
      margin: @padding-4;
      color: @gray-2;
      box-sizing: border-box;
      cursor: pointer;
    }

    .lbselected {
      color: @gray-1;
      font-weight: 600;
      border: 1px solid @gray-1;
      border-radius: 14px;
    }
  }

  .card {
    display: flex;
    flex-wrap: wrap;
    padding-top: 28px;
    margin: auto;

    .card-inner {
      margin: 6px;
      border-radius: 10px;
    }

    .cardselected {
      border: 1px solid @primary-color;
      transform: translateY(-10px);
      transition: @tr;
    }
  }

  .photo {
    width: 88%;
    margin: 0 auto;
    padding-top: @padding-20;
    columns: 6;
    column-gap: @padding-4;
  }

  .phpto-card {
    margin-bottom: @padding-4;
    break-inside: avoid;
  }

  .add {
    width: 56px;
    height: 56px;
    background-color: @gray-1;
    box-shadow: 0px 4px 8px 0px ragb(0, 0, 0, 0.08);
    border-radius: 28px;
    position: fixed;
    right: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: @tr;
    cursor: pointer;

    .icon-jiahao {
      color: @gray-10;
      font-size: 24px;
      color: @gray-3;
      padding-top: 0px;
    }
  }

  .none-msg {
    width: 100%;
    text-align: center;
    margin-top: 200px;
    position: absolute;
    top: 200px;

    img {
      display: inline;
    }

    p {
      font-family: serif;
      font-weight: 700;
      font-size: 24px;
      color: @gray-3;
    }
  }

  .loading {
    text-align: center;
    width: 100%;

    p {
      margin-top: -42px;
      font-family: serif;
      font-size: 24px;
      color: @gray-3;
    }
  }

  #lottie {
    margin-top: 20px;
    height: 200px;
  }

  .bottom-tip {
    text-align: center;
  }
}
</style>