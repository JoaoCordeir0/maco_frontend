<template>
    <div class="mt-2">
        <div class="bg-white border-2 rounded-xl border-gray px-5 py-5 mt-2">
            <div class="flex flex-wrap">
                <p class="text-gray-500 font-semibold text-xl border-b-2">Dashboard</p>
                <span v-if="!infoLoad">
                    <Spinner />
                </span>
                
            </div>
        </div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from "vue"
import Spinner from "../components/Spinner.vue"

export default defineComponent({
    async setup() {           
        const infoLoad = ref(false)       
        infoLoad.value = true      
        return {               
            infoLoad,      
        }
    },
    components: { Spinner }
})
</script>
  