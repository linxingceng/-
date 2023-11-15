<template>
  <div class="card-detail">
    <div class="top-bt">
      <p class="revoke">联系博主撕掉该标签</p>
      <p class="report">举报</p>
    </div>
    <NoteCard :noteData="props.card"></NoteCard>
    <div class="form">
      <textarea class="message" placeholder="请输入..." v-model="discuss"></textarea>
      <div class="bt">
        <input type="text" class="name" placeholder="签名" v-model="name">
        <Btn size="min" nom="primary" class="queding" :class="{ notallowed: !isDis }" @click="submit">评论</Btn>
      </div>
    </div>
    <p class="title">评论{{ props.card.comcount[0].count }}</p>
    <div class="commont">
      <div class="commont-li" v-for="(e, index) in comments" :key="index">
        <div class="user-head" :style="{ backgroundImage: portrait[e.imgurl] }"></div>
        <div class="comm-m">
          <div class="m-top">
            <p>{{ e.name }}</p>
            <p class="time">{{ dataOne(e.moment) }}</p>
          </div>
          <div class="mm">{{ e.comment }}</div>
        </div>
      </div>
      <p class="more" @click="getComment" v-show="nowpage > 0">加载更多...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import type { MockType } from '@/api/mock/index';
// import { commont } from '../../mock/index';
import { portrait } from '@/utils/data'
import { dataOne } from '@/utils/ystime';
import { insertcommentApi, findCommentPageApi } from '@/api/index'
import store from '@/store/index'
// 头像背景色
// const bgcommont = ref(commont.data)
const comments = ref<any>([])

// 输入内容
const discuss = ref('')

// 用户名
const name = ref('匿名')

const user = ref(store.state.user)

// 当前页
const nowpage = ref(1)

// 一页多少条
const pagesize = ref(2)

// 获取数据
const props = defineProps({
  card: {
    type: Object, // 指定 card 的类型
    required: true,
  },
});

const isDis = computed(() => {
  if (discuss.value && name.value) {
    return true;
  } else {
    return false;
  }
})


// const cards = ref(props.card)

// 提交评论
const submit = () => {
  if (isDis.value) {
    // 如果有用户就用头像，没有就用随机头像
    let img = Math.floor(Math.random() * 14);

    let data = {
      wallId: props.card.id,
      userId: user.value.id,
      imgurl: img,
      moment: new Date(),
      name: name.value,
      comment: discuss.value
    };
    console.log(data.wallId);
    insertcommentApi(data).then(() => {
      comments.value.unshift(data);
      props.card.comcount[0].count++;
      // 清空评论框
      discuss.value = '';
      name.value = '匿名'
    })
  }
}

watch(props, () => {
  // 卡片发送变化
  nowpage.value = 1;
  comments.value = [];
  getComment();
  // console.log(111);
})

// 获取评论
const getComment = () => {
  if (nowpage.value > 0) {
    let data = {
      id: props.card.id,
      page: nowpage.value,
      pagesize: pagesize.value,
    }

    findCommentPageApi(data).then((res: any) => {
      comments.value = comments.value.concat(res.message);
      // console.log(res);
      // console.log(data);

      // console.log(comments.value);
      // 设置下一次的page
      if (res.message.length == pagesize.value) {
        nowpage.value++;
      } else {
        nowpage.value = 0;
      }
    })
  }
}
// getComment();
// console.log(props.card.id);



// const card = card1 || defaultNotedata;

onMounted(() => {
  getComment();
})


</script>

<style scoped lang="less">
.card-detail {
  position: relative;
  padding: 0 @padding-20;

  .top-bt {
    position: fixed;
    top: 0;
    left: 0;
    padding: @padding-20;
    display: flex;

    .revoke {
      color: @primary-color;
      cursor: pointer;
      padding-right: 30px;
      font-size: @size-16;
    }

    .report {
      font-size: @size-16;
      color: @warning-color;
      cursor: pointer;
    }
  }

  .form {
    .message {
      background: none;
      resize: none;
      height: 56px;
      width: 100%;
      margin-top: 20px;
      box-sizing: border-box;
      padding: @padding-8;
      font-family: '华文行楷';
    }

    .bt {
      display: flex;
      padding-top: 6px;
      justify-content: space-between;

      .queding {
        border-radius: 24px;
        width: 80px;
      }

      .notallowed {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }

    .name {
      width: 200px;
      padding: @padding-8;
      background: none;
      box-sizing: border-box;
      border: 1px solid rgba(148, 148, 148, 1);
      line-height: 20px;
      font-family: '华文行楷';
    }
  }

  .title {
    font-weight: 600;
    padding-top: 20px;
  }

  .more {
    color: @gray-2;
    text-align: center;
    padding-top: @padding-20;
    cursor: pointer;
  }

  .commont-li {
    display: flex;
    padding-top: 30px;

    .user-head {
      flex: none;
      width: 28px;
      height: 28px;
      border-radius: 20px;
      // background-image: linear-gradient(180deg, rgba(245, 65, 65, 0.50) 0%, #F43F3F 100%);
    }

    .comm-m {
      padding-left: @padding-8;
    }

    .m-top {
      display: flex;
      align-items: center;
    }

    .name {
      font-weight: 600;
    }

    .time {
      font-size: @size-12;
      padding-left: @padding-4;
      color: @gray-3;
    }
  }

  .mm {
    padding-top: @padding-4;
  }
}
</style>