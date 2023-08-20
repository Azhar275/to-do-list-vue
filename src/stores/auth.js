import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('counter_auth', () => {

    let username = ref('')

    //getter
    const getUsername = computed(() => username.value)
    const isLoggedIn = computed(() => !!username.value)

    //action
    function setUsername(string){
        username.value = string
        console.log('success')
    }
    
    return {getUsername, isLoggedIn, setUsername}
})