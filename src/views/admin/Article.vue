<template>
    <div class="mt-2">
        <div class="bg-white border-2 rounded-xl border-gray px-5 py-5 mt-2">
            <div class="flex flex-wrap">
                <p class="text-gray-500 font-semibold text-xl border-b-2"> {{ pageTitle }} - {{ id }}  <span class="ml-3 bg-cyan-500 rounded pl-2 pr-2 text-white">{{ article_status }}</span> </p>
                <span v-if="!infoLoaded">
                    <Spinner />
                </span>
                <div class="w-full">                    
                    <form class="mt-4" @submit.prevent="saveArticle">
                        <div class="grid grid-cols-1 gap-4 md:grid-cols-1 xl:grid-cols-1">
                            <div class="...">
                                <label class="block">
                                    <span class="text-sm text-gray-700">Título do Artigo <span class="text-red-500 font-semibold">*</span></span>
                                    <input type="text"
                                        class="block w-full mt-1 border-gray-300 rounded-md focus:border-gray-800 focus:ring focus:ring-opacity-40 focus:ring-gray-800"
                                        v-model="title" />
                                </label>
                            </div>
                            <div class="...">
                                <label class="block">
                                    <span class="text-sm text-gray-700">Nome dos autores <span class="text-red-500 font-semibold">*</span></span>
                                    <input type="text"
                                        class="block w-full mt-1 border-gray-300 rounded-md focus:border-gray-800 focus:ring focus:ring-opacity-40 focus:ring-gray-800"
                                        v-model="authors" />
                                </label>
                            </div>  
                            <div class="...">
                                <label class="block">
                                    <span class="text-sm text-gray-700">Nome dos orientadores <span class="text-red-500 font-semibold">*</span></span>
                                    <input type="text"
                                        class="block w-full mt-1 border-gray-300 rounded-md focus:border-gray-800 focus:ring focus:ring-opacity-40 focus:ring-gray-800"
                                        v-model="advisors" />
                                </label>
                            </div>    
                            <div class="...">
                                <label class="block">
                                    <span class="text-sm text-gray-700">Palavras chaves <span class="text-red-500 font-semibold">*</span></span>
                                    <input type="text"
                                        class="block w-full mt-1 border-gray-300 rounded-md focus:border-gray-800 focus:ring focus:ring-opacity-40 focus:ring-gray-800"
                                        v-model="keywords" />
                                </label>
                            </div>   
                            <div class="...">                      
                                <label class="block">
                                    <span class="text-sm text-gray-700">Resumo <span class="text-red-500 font-semibold">*</span></span>
                                    <textarea name="" id="" cols="30" rows="5" v-model="summary"
                                        class="block w-full mt-1 border-gray-300 rounded-md focus:border-gray-800 focus:ring focus:ring-opacity-40 focus:ring-gray-800"></textarea>
                                </label>
                            </div>                           
                        </div>
                        <div v-if="infoLoaded" class="mt-5">
                            <div class="flex justify-end">
                                <button type="button" class="px-12 py-2 mr-2 text-sm text-center text-white bg-blue-800 rounded-md focus:outline-none font-bold">                                    
                                    <font-awesome-icon :icon="['fas', 'file-word']" /> &nbsp; Exportar                                     
                                </button>

                                <button type="submit" :disabled="isLoading"
                                    class="px-12 py-2 text-sm text-center text-white bg-gray-900 rounded-md focus:outline-none font-bold">
                                    <span v-if="!isLoading">
                                        <font-awesome-icon :icon="['fas', 'floppy-disk']" /> &nbsp; Salvar
                                    </span>
                                    <span v-else>
                                        <Loading />
                                    </span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from 'vue';
import router from "../../router"
import { IArticleState, submissionDetails } from '../../hooks/useArticle';
import Spinner from "../../components/Spinner.vue"
import { Toast } from '../../hooks/useToast';
import Loading from '../../components/Loading.vue';

export default defineComponent({
    setup(){
        const state: IArticleState = reactive({
            isLoading: false,
            message: ''
        })

        const infoLoaded = false
        const pageTitle = ref("")
        const id = ref("")
        const title = ref("")
        const authors = ref("")
        const advisors = ref("")
        const keywords = ref("")
        const summary = ref("")
        const status = ref("")
        const course = ref("")      
        const article_status = ref("")  

        async function saveArticle() {
            state.isLoading = true            
        }

        return {
            ...toRefs(state),
            infoLoaded,
            pageTitle,
            id,
            title,
            authors,
            advisors,
            keywords,
            summary,
            status,
            course,    
            article_status,        
            saveArticle
        }
    }, 
    methods: {
        async loadArticle() {
            const result = await submissionDetails('admin', this.$route.params.action)                                

            if (result.value['title'] == undefined) 
                Toast().fire({icon: 'error', title: 'Artigo não encontrado!'})
            
            this.id = result.value['id']
            this.title = result.value['title']
            this.authors = result.value['authors']    
            this.advisors = result.value['advisors']       
            this.keywords = result.value['keywords'] 
            this.summary = result.value['summary']
            this.article_status = result.value['status']
            this.infoLoaded = true          
        },       
    },
    beforeMount() {
        switch (router.currentRoute.value.params.action) {                  
            default:
                this.pageTitle = 'Detalhes do artigo'
                this.loadArticle()                
        }
    },
    components: { Spinner, Loading }
})

</script>