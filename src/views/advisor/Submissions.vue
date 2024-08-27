<template>
    <div class="mt-2">
        <div class="bg-white border-2 rounded-xl border-gray px-5 py-5 mt-2 mb-2">
            <div class="flex flex-wrap">
                <div class="w-full grid grid-cols-6 gap-4">                    
                    <div class="col-start-1 col-end-8 ...">
                        <p class="text-gray-500 font-semibold text-xl"><span class="border-b-2"> {{ pageTitle }} </span>
                            <span v-if="!infoLoaded">
                                <Spinner />
                            </span>
                        </p>
                    </div>
                    <div class="col-end-10 col-span-2 ...">
                        <ArticleAdminFilter @some-event="loadArticles" v-if="getRole() == 'admin'" />
                        <ArticleAdvisorFilter @some-event="loadArticles" v-if="getRole() == 'advisor'" />
                    </div>                
                </div>
                <div v-if="infonotnull" class="overflow-x-auto inline-block min-w-full rounded-lg">                    
                    <table class="min-w-full leading-normal mt-5">
                        <thead>
                            <tr>
                                <th class="px-5 text-start border-b-2">ID</th>
                                <th class="px-5 text-start border-b-2">Título</th>        
                                <th class="px-5 text-start border-b-2">Curso(s)</th> 
                                <th class="px-5 text-start border-b-2">Autores(s)</th>        
                                <th class="px-5 text-start border-b-2">Status</th>
                                <th class="px-5 text-center border-b-2">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in articles">
                                <td class="px-5 py-2 text-sm bg-white border-b border-gray-200">
                                    <p class="text-gray-900 whitespace-nowrap">{{ item.id }}</p>
                                </td>
                                <td class="px-5 py-2 text-sm bg-white border-b border-gray-200">
                                    <p class="text-gray-900 whitespace-nowrap">{{ item.title == ' ' ? 'Título não informado' : item.title }}</p>
                                </td>                                
                                <td class="px-5 py-2 text-sm bg-white border-b border-gray-200">
                                    <p class="text-gray-900 whitespace-nowrap">{{ formatCourseAndAuthors(item.authors, 'course_name') }}</p>
                                </td>  
                                <td class="px-5 py-2 text-sm bg-white border-b border-gray-200">
                                    <p class="text-gray-900 whitespace-nowrap">{{ formatCourseAndAuthors(item.authors, 'name') }}</p>
                                </td>  
                                <td class="px-5 py-2 text-sm border-b border-gray-200">
                                    <p class="text-gray-900 whitespace-nowrap"><span :class="getColorArticleStatus(item.status)" class="rounded pt-1 pb-1 pr-3 pl-3 text-white">{{ formatArticleStatus(item.status) }}</span></p>
                                </td>                                
                                <td class="px-5 py-2 text-sm bg-white border-b border-gray-200 min-w-60 text-center">
                                    <div class="sm:inline-block">                                          
                                        <button title="Exportar artigo" v-on:click="exportArticle(item.id)" class="bg-blue-800 text-white rounded p-2 ps-3 pe-3 me-2 w-10"><font-awesome-icon :icon="['fas', 'file-word']" /></button>
                                        <Certificate v-if="item.status == 'finished'" :article="item"/>                                        
                                        <button title="Visualizar o artigo" v-on:click="viewSubmission(item.id, item.event)" class="bg-gray-900 text-white rounded p-2 ps-3 pe-3 w-10"><font-awesome-icon :icon="['fas', 'eye']" /></button>
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
import { IArticleState, articleExport, articleList } from '../../hooks/useArticle';
import Spinner from "../../components/Spinner.vue"
import { Toast } from '../../hooks/useToast';
import router from '../../router';
import ArticleAdminFilter from '../../components/filters/ArticleAdminFilter.vue';
import { getUserRole } from '../../hooks/useAuth';
import ArticleAdvisorFilter from '../../components/filters/ArticleAdvisorFilter.vue';
import Certificate from '../../components/Certificate.vue';

export default defineComponent({
    async setup(){
        const state: IArticleState = reactive({
            isLoading: false,
            message: '',
        })

        const pageTitle = 'Listagem de artigos'
        const articles = ref()
        const infonotnull = ref(false)
        const infoLoaded = ref(false)

        return {
            ...toRefs(state),
            pageTitle,
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
        async loadArticles(filter) {        
            this.infoLoaded = false
            this.infonotnull = false
            this.articles = null

            let result = (await articleList(getUserRole(true).toLowerCase(), filter)).value                                 
                            
            if(result[0] != undefined) {
                this.articles = result
                this.infonotnull = true
            } else {
                Toast().fire({icon: 'warning', title: 'Nenhum artigo encontrado com os filtros utilizados'})
            }        
            this.infoLoaded = true      
        },
        async exportArticle(articleID) {
            const result = await articleExport(articleID)
            if (result) {
                Toast().fire({icon: 'success', title: 'Artigo exportado'})
            } else {
                Toast().fire({icon: 'error', title: 'Erro ao exportar artigo'})
            }
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
        },
        formatArticleStatus(status) {
            let newStatus = ''
            switch(status) {
                case 'in_submission':
                    newStatus = 'Em submissão'
                    break
                case 'in_revision':
                    newStatus = 'Em revisão'
                    break
                case 'in_correction':
                    newStatus = 'Em correção'
                    break
                case 'approved':
                    newStatus = 'Aprovado'
                    break  
                case 'finished':
                    newStatus = 'Finalizado'
                    break   
            }
            return newStatus;
        },
        getColorArticleStatus(status) {
            let color = ''
            switch(status) {
                case 'in_submission':
                    color = 'bg-yellow-500'
                    break
                case 'in_revision':
                    color = 'bg-cyan-500'
                    break
                case 'in_correction':
                    color = 'bg-red-500'
                    break
                case 'approved':
                    color = 'bg-green-500'
                    break  
                case 'finished':
                    color = 'bg-gray-900'
                    break   
            }
            return color;
        },
        getRole() {            
            return getUserRole(true).toLowerCase()
        }
    },
     beforeMount(){
        if (getUserRole(true) == 'ADVISOR') {            
            this.pageTitle = 'Submissões aguardando revisão'
        }
        if (getUserRole(true) == 'AUTHOR') {
            router.push('/events')
        }
    },
    components: { Spinner, ArticleAdminFilter, ArticleAdvisorFilter, Certificate }
})

</script>