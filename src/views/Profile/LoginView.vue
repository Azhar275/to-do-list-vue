<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../../stores/auth';
import router from '../../router';

const auth = useAuthStore()

const initialInput = {
    username : ''
}

const usernameInput = ref({...initialInput})

const resetForm = () => {
    usernameInput.value = initialInput
}

const submitForm = () => {
    auth.setUsername(usernameInput.value.username)
    console.log(usernameInput.value.username)
    resetForm()
    router.replace({
        name: 'Authenticated',
        params: { id: auth.getUsername }
    })
}

</script>

<template>
  <div>
    <h1>Login</h1>

    <!-- conditional rendering using v-if directive -->
    <form v-if="!auth.getUsername" method="post" @submit.prevent="() => submitForm()" @reset="() => resetForm()">
      <input class="input" v-model="usernameInput.username" placeholder="input username" required/>
    </form>

    <!-- conditional rendering using v-else directive -->
    <h3 v-else>{{ auth.getUsername }}</h3>
  </div>
</template>