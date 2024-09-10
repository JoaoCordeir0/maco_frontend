<template>
    <button type="button" :disabled="isLoading" title="Emitir certificado" v-on:click="exportArticle" class="bg-blue-800 text-white rounded p-2 ps-3 pe-3 me-2" :class="!$props.btnText ? 'w-10' : ''">
        <span v-if="!isLoading">
            <font-awesome-icon :icon="['fas', 'file-word']" /> <span v-if="$props.btnText"> Exportar artigo</span>
        </span>        
        <span v-else>
            <Loading />
        </span>
    </button>   
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Toast } from "../hooks/useToast"
import Loading from './Loading.vue';
import { articleExport } from '../hooks/useArticle';

export default defineComponent({
    props: {
        article: Number,        
        btnText: Boolean,
    },
    async setup(props){              
       
        const isLoading = ref(false)
        
        async function exportArticle() {            
            isLoading.value = true
            const result = await articleExport(props.article)
            if (result) {
                Toast().fire({icon: 'success', title: 'Artigo exportado'})
            } else {
                Toast().fire({icon: 'error', title: 'Erro ao exportar artigo'})
            }            
            isLoading.value = false
        }
        
        return {
            exportArticle,            
            isLoading,
        }    
    },
    components: {
        Loading
    }
})
</script>