<template>
  <transition name="down">
    <div class="Ys-message" v-if="isShow">
      <div class="ys-m-i">
        <i class="iconfont" :class="style[type].icon"></i>
        <span class="text">{{ message }}</span>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
const props = defineProps({
  message: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: "warning",
  }
})

const type = ref(props.type)

// 定义一个对象,包含三种情况的样式,对象key就是类型字符串
const style: any = {
  warning: {
    icon: "icon-warning",
  },
  error: {
    icon: "icon-error",
  },
  success: {
    icon: "icon-success",
  }
}

// 定义一个数据控制显示隐藏,默认是隐藏,组件挂载完毕显示
const isShow = ref(false);

onMounted(() => {
  // 需调用钩子函数,等dom渲染完毕后,再进行赋值,如果去setup中直接赋值,则会被直接渲染
  isShow.value = true;
  setTimeout(() => {
    isShow.value = false;
  }, 3000)
})

</script>

<style scoped lang="less">
.down {
  &-enter {
    &-from {
      transform: translateY(-30px);
      opacity: 0;
    }

    &-active {
      transition: all 0.3s;
    }

    &-to {
      transform: translateY(0px);
      opacity: 1;
    }
  }

  &-leave {
    &-from {
      transform: translateY(0px);
      opacity: 1;
    }

    &-active {
      transition: all 0.3s;
    }

    &-to {
      transform: translateY(-30px);
      opacity: 0;
    }
  }
}

.Ys-message {
  width: 100%;
  height: 40px;
  position: fixed;
  z-index: 9999;
  top: 20px;
  line-height: 40px;
  display: flex;
  justify-content: center;

  .ys-m-i {
    padding: 0 20px;
    border-radius: 4px;
    color: @gray-1;
    background: @gray-10;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }

  i {
    margin-right: 6px;
    vertical-align: middle;
  }

  .text {
    vertical-align: middle;
  }
}

.icon-success {
  color: @success-color;
}

.icon-warning {
  color: @warning-color;
}

.icon-error {
  color: @error-color;
}
</style>