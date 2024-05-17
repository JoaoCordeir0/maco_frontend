<template>
    <div class="mt-2">
        <div class="bg-white border-2 rounded-xl border-gray px-5 py-5 mt-2 mb-2">
            <div class="flex flex-wrap">
                <p class="text-gray-500 font-semibold text-xl border-b-2">Artigos submetidos</p>
                <span v-if="!infoLoaded">
                    <Spinner />
                </span>
                <div v-if="infonotnull" class="overflow-x-auto inline-block min-w-full rounded-lg">                    
                    <table class="min-w-full leading-normal mt-5">
                        <thead>
                            <tr>
                                <th class="px-5 text-start border-b-2">ID</th>
                                <th class="px-5 text-start border-b-2">Título</th>        
                                <th class="px-5 text-start border-b-2">Curso(s)</th> 
                                <th class="px-5 text-start border-b-2">Aluno(s)</th>        
                                <th class="px-5 text-start border-b-2">Status</th>
                                <th class="px-5 text-start border-b-2">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in articles">
                                <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                    <p class="text-gray-900 whitespace-nowrap">{{ item.id }}</p>
                                </td>
                                <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                    <p class="text-gray-900 whitespace-nowrap">{{ item.title }}</p>
                                </td>                                
                                <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                    <p class="text-gray-900 whitespace-nowrap">{{ formatCourseAndAuthors(item.authors, 'course_name') }}</p>
                                </td>  
                                <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                    <p class="text-gray-900 whitespace-nowrap">{{ formatCourseAndAuthors(item.authors, 'name') }}</p>
                                </td>  
                                <td class="px-5 py-5 text-sm border-b border-gray-200">
                                    <p class="text-gray-900 whitespace-nowrap"><span class="bg-cyan-500 rounded pt-1 pb-1 pr-3 pl-3 text-white">Em revisão</span></p>
                                </td>                                
                                <td class="px-5 py-5 text-sm bg-white border-b border-gray-200 min-w-72">
                                    <div class="sm:inline-block">                                        
                                        <a href="#" v-on:click="viewSubmission(item.id, item.event)" class="sm:px-5 sm:py-2 px-5 bg-gray-900 m-2 mt-2 text-white rounded"><font-awesome-icon :icon="['fas', 'eye']" /> &nbsp; <span class="hidden lg:inline">Visualizar</span></a>                                        
                                    </div>                                    
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-else class="overflow-x-auto inline-block min-w-full rounded-lg mt-5">                    
                   <p>Nenhum artigo disponível</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from 'vue';
import { IArticleState, submissionsList } from '../../hooks/useArticle';
import Spinner from "../../components/Spinner.vue"
import { Toast } from '../../hooks/useToast';
import router from '../../router';

export default defineComponent({
    async setup(){
        const state: IArticleState = reactive({
            isLoading: false,
            message: '',
        })

        const articles = ref()
        const infonotnull = ref(false)
        const infoLoaded = ref(false)

        return {
            ...toRefs(state),
            articles,
            infonotnull,
            infoLoaded,
        }
    },
    methods: {
        viewSubmission(articleID, eventID) {            
            sessionStorage.setItem('article-added', 'y')    
            sessionStorage.setItem('event-id-selected', eventID)
            router.push(`/submit/${articleID}`)
        },
        async loadArticles() {
            const result = (await submissionsList('advisor', '')).value // Consome a API

            if(result[0] != undefined) {
                this.articles = result
                this.infonotnull = true
            } else {
                Toast().fire({icon: 'warning', title: 'Nenhum artigo encontrado'})
            }        
            this.infoLoaded = true        
        },              
        formatCourseAndAuthors(data, key) {
            let _array : string[] = [];            
            let _str = ''
            for(let c = 0; c < Object.keys(data).length; c++) {
                try {
                    if (! _array.includes(data[c][key])){
                        _array.push(data[c][key])
                    }                                        
                } catch(e) {}                
            }
            _array.forEach(item => {
                _str += item + ' / '
            });
            return _str.slice(0, -3)         
        }    
    },
    beforeMount(){
        this.loadArticles()
    },
    components: { Spinner }
})

</script>