<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const username = route.params.username as string
const messages = ref<{ sender: string; content: string; isPrivate: boolean }[]>([])
const newMessage = ref('')
const recipient = ref('')
const ws = ref<WebSocket | null>(null)

const sendMessage = () => {
  if (newMessage.value.trim() && ws.value?.readyState === WebSocket.OPEN) {
    const message = {
      sender: username,
      content: newMessage.value,
      recipient: recipient.value || 'all'
    }
    ws.value.send(JSON.stringify(message))
    newMessage.value = ''
    recipient.value = ''
  }
}

onMounted(() => {
  const wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:8080/ws'
  ws.value = new WebSocket(wsUrl)
  
  ws.value.onopen = () => {
    console.log('Connected to WebSocket')
    ws.value?.send(JSON.stringify({ type: 'join', username }))
  }
  
  ws.value.onmessage = (event) => {
    const message = JSON.parse(event.data)
    messages.value.push(message)
  }
})

onUnmounted(() => {
  ws.value?.close()
})
</script>

<template>
  <!-- ... (rest of the template remains unchanged) ... -->
</template>

<style scoped>
/* ... (styles remain unchanged) ... */
</style>