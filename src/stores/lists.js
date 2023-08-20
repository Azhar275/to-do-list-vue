import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'

export const useListStore = defineStore('counter', () => {
    //state
    const list = reactive([
        {
            name : 'First List',
            desc : 'The first item in the list',
        },
        {
            name : 'Second List',
            desc : 'The second item in the list',
        },
    
    ]);
    //getter
  const getList = computed(() => list)
  // const getDetail = computed((index) => list[index])
  const getDetail = (index) => {
    return list[index]
  }

  //action
  function addList(params) {
    if(params.name != '' && params.desc != ''){
        list.push({ 
            name : params.name,
            desc : params.desc
        })
    }
  }
  
  function removeIndex(params){
    list.splice(params, 1)
  }

  function editIndex(index, data){
    list[index] = data
  }

  return { list, getList, getDetail, addList, removeIndex, editIndex}
})
