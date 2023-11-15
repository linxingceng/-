import { createVNode, render } from 'vue'
import YsMessage1 from './YsMessage.vue'

const divVNode = createVNode('div', { class: 'xtx-message-container' })
render(divVNode, document.body)

const div = divVNode.el as Element

const YsMessage = ({ message, type }: any) => {
  // 1. 动态创建虚拟DOM   createVNode(h) 函数
  const comVNode = createVNode(YsMessage1, { message, type })
  // 2. 渲染到body页面中  render 函数
  // render(comVNode, document.body)
  render(comVNode, div)
  // 3. 提示在 3s 秒自动卸载
  setTimeout(() => {
    render(null, div)
  }, 6000)
}

export default YsMessage