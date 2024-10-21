import { defineStore } from 'pinia'

interface Message {
  sender: string
  content: string
  isPrivate: boolean
}

export const useChatStore = defineStore('chat', {
  state: () => ({
    messages: [] as Message[],
    users: [] as string[]
  }),
  actions: {
    addMessage(message: Message) {
      this.messages.push(message)
    },
    setUsers(users: string[]) {
      this.users = users
    }
  }
})