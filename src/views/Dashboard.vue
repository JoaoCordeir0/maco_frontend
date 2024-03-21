<template>
    <div class="mt-2">
        <div class="bg-white border-2 rounded-xl border-gray px-5 py-5 mt-2">
            <div class="flex flex-wrap">
                <p class="text-gray-500 font-semibold text-xl border-b-2">Dashboard</p>
                <span v-if="!infoLoaded">
                    <Spinner />
                </span>
                
                <div class="w-full">  
                    <div v-if="roleUser == '1:ADMIN'">
                        <h1 class="mt-5">Bem vindo adm </h1>
                    </div>   
                    <div v-if="roleUser == '2:ADVISOR'">
                        <h1 class="mt-5">Bem vindo revisor </h1>
                    </div>   
                    <div v-if="roleUser == '3:AUTHOR'">
                        <h1 class="mt-5">Bem vindo author </h1>
                    </div>   
                </div>   
            </div>
        </div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from "vue"
import Spinner from "../components/Spinner.vue"
import { getUserRole } from "../hooks/useAuth";

export default defineComponent({
    async setup() {           
        const infoLoaded = ref(false)       
        const roleUser = ref()
        roleUser.value = getUserRole()

        infoLoaded.value = true      
        return {               
            infoLoaded,   
            roleUser,   
        }
    },    
    components: { Spinner }
})
</script>
  