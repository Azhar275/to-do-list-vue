import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { certCookies, setCookies } from '../plugins/cookies'
import * as s$auth from '../services/auth'

export const d$auth = defineStore('counter_auth', () => {

    const user = reactive({
        id: undefined,
        name: undefined,
        role: undefined
    }) 

    // let username = ref('')

    // //getter
    // const getUsername = computed(() => username.value)
    // const isLoggedIn = computed(() => !!username.value)
    const g$user = computed(() => user)
    const isLoggedIn = computed(() => !!user.id)

    // //action
    // function setUsername(string){
    //     username.value = string
    //     console.log('success')
    // }
    async function a$setUser(){
        try {
            const { id, name, role } = certCookies()
            user.id = id
            user.name = name
            user.role = role
            return 'User Authenticated!'
          } catch ({ message }) {
            user.id = undefined
            user.name = undefined
            user.role = undefined
            throw message
          }
    }

    async function a$login(body){
        try {
            const { data } = await s$auth.login(body)
            setCookies('CERT', data.token, { datetime: data.expiresAt })
            return true
          } catch ({ error, message }) {
            throw message ?? error
          }
    }
    
    // return {getUsername, isLoggedIn, setUsername}
    return {user, g$user, isLoggedIn, a$setUser, a$login}
})