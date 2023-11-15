<template>
  <button :class="[size, nom]" class="ys-button">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
defineProps(['nom', 'size'])

</script>

<style scoped lang="less">
.ys-button {
  text-align: center;
  border: none;
  cursor: pointer;
}

// 大小
.max {
  min-width: 100px;
  height: 48px;
  border-radius: 24px;
  padding: 0 20px;
  // line-height: 48px;
}

.base {
  min-width: 80px;
  height: 36px;
  border-radius: 24px;
  padding: 0 20px;
  // line-height: 36px;
}

.small {
  min-width: 72px;
  height: 32px;
  border-radius: 24px;
  padding: 0 20px;
  // line-height: 32px;
}

// nom
.primary {
  background-color: @gray-1;
  color: @gray-10;
}

.secondary {
  // background-color: @gray-10;
  color: @gray-1;
  border: 1px solid @gray-1;
}

.cprimary {
  background: @primary-color;
  color: @gray-10;
}

.csecondary {
  background: @gray-10;
  color: @gray-1;
}
</style>