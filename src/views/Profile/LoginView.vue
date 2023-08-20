<script setup>
import { ref } from 'vue';
// import { useAuthStore } from '../../stores/auth';
import { d$auth } from '../../stores/auth';
import router from '../../router';

const auth = d$auth()

const initialInput = {
    username : '',
    password : ''
}

const usernameInput = ref({...initialInput})

const resetForm = () => {
    usernameInput.value = initialInput
}

// const submitForm = () => {
//     auth.setUsername(usernameInput.value.username)
//     console.log(usernameInput.value.username)
//     resetForm()
//     router.replace({
//         name: 'Authenticated',
//         params: { id: auth.getUsername }
//     })
// }

async function submitForm(){
    try {
        await auth.a$login(usernameInput.value)
        // set user based on cookie
        auth.a$setUser()
        resetForm()
        // redirect to profile after input username
        router.replace({
          name: 'Authenticated',
          params: { id: auth.g$user.id }
        })
      } catch (error) {
        console.error(error)
      }
}

</script>

<template>
  <div>
    <h1>Login</h1>

    <!-- conditional rendering using v-if directive -->
    <form v-if="!auth.isLoggedIn" method="post" @submit.prevent="() => submitForm()" @reset="() => resetForm()">
      <input class="input" v-model="usernameInput.username" placeholder="input username" required/>
      <input class="input" v-model="usernameInput.password" placeholder="input password" type="password" required/>
      <button type="submit">Login</button>
    </form>

    <!-- conditional rendering using v-else directive -->
    <h3 v-else>{{ auth.g$user?.id }}</h3>
  </div>
</template>