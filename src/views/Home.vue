<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')

const joinChat = () => {
  if (username.value.trim()) {
    router.push({ name: 'Chat', params: { username: username.value } })
  }
}
</script>

<template>
  <div class="home">
    <h1>Welcome to the Chat App</h1>
    <input v-model="username" placeholder="Enter your username" @keyup.enter="joinChat">
    <button @click="joinChat">Join Chat</button>
  </div>
</template>