<script setup>
import { ref } from 'vue';
import { useListStore } from '../stores/lists';


const store = useListStore();
// const list = reactive([
//     {
//         name : 'First List',
//     },
//     {
//         name : 'Second List',
//     },

// ]);
const initialInput = {
    name : '',
    desc : '',
    completed : false
}
// ... digunakan unntuk mengcopy isi object yang lain
let nameInput = ref({ ...initialInput});
let editing = ref(false)
// const addList = (params) => {
//     if(params){
//         list.push({name : params})
//         nameInput.value = ''
//     }
// }

function addForm(params){
    if(editing.value === false){
        store.addList(params)
    } else{
        store.editIndex(editing.value, params)
    }
    resetForm()
}


const resetForm = () => {
    nameInput = ref({...initialInput})
    editing.value = false
}

const detailList = (index) => {
    editing.value = index
    nameInput = {...store.getDetail(index)}
    console.log(editing.value)
}

const toggleCompleted = (index) => {
    const detail = store.getDetail(index)
    store.editIndex(index, {...detail, completed: !detail.completed})
}
</script>


<template>
    <div class="container">
        <h1>test</h1>

        <!-- Data binding with ref -->
        <form @submit.prevent="addForm(nameInput)" method="post" @reset="resetForm()">
            <input class="input" v-model="nameInput.name" type="text" name="name" placeholder="Item name" required>
            <input class="input" v-model="nameInput.desc" type="text" name="desc" placeholder="Description" required>
            <input v-model="completed" type="checkbox" name="completed" id="completed"> Completed
            <button type="submit">{{ editing !== false ? 'Edit' : 'Add'}}</button>
            <button type="reset">Cancel</button>
        </form>
        <!-- <input class="input" v-model="nameInput" type="text" name="name" @keyup.enter="store.addList(nameInput); nameInput=''" placeholder="add new item"> -->

        <ol class="list">
            <template v-for="item, index in store.getList" v-bind:key="index">
                <li @dblclick="toggleCompleted(index)" :class="{strike: item.completed}">
                    <button class="red" @click="store.removeIndex(index)" :disabled="editing !== false">
                        &times;
                    </button>
                    <button class="orange" @click="detailList(index)" :disabled="editing !== false">
                        &#9998;
                    </button>
                    {{ item.name }} {{ item?.desc ? `- ${item.desc}` : '' }}</li>
            </template>
        </ol>

    </div>
</template>

<style lang="scss" scoped>
    .input {
        padding: 0.5rem;
        font-size: 1rem;
    }
    .list {
        margin-block: 0.5rem;
    }
    .strike {
        text-decoration: line-through;
    }
    button {
        &.red {
            color: red;
        }
        &.orange {
            color: orange;
        }
    }
</style>