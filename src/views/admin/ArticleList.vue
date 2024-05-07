<template>
    <div class="mt-2">
        <div class="bg-white border-2 rounded-xl border-gray px-5 py-5 mt-2 mb-2">
            <div class="flex flex-wrap">              
                <div class="w-full grid grid-cols-6 gap-4">                    
                    <div class="col-start-1 col-end-8 ...">
                        <p class="text-gray-500 font-semibold text-xl"><span class="border-b-2">Listagem de artigos</span>
                            <span v-if="!infoLoaded">
                                <Spinner />
                            </span>
                        </p>
                    </div>
                    <div class="col-end-10 col-span-2 ...">
                        <ArticleAdminFilter @some-event="loadArticles" />
                    </div>                
                </div>
                 
                <div v-if="infonotnull" class="overflow-x-auto inline-block min-w-full rounded-lg">                    
                    <table class="min-w-full leading-normal mt-5">
                        <thead>
                            <tr>
                                <th class="px-5 text-start border-b-2">ID</th>
                                <th class="px-5 text-start border-b-2">Título</th>        
                                <th class="px-5 text-start border-b-2">Curso</th>        
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
                                    <p class="text-gray-900 whitespace-nowrap">{{ formatCourse(item.authors) }}</p>
                                </td>  
                                <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                    <p class="text-gray-900 whitespace-nowrap"><span :class="getColorArticleStatus(item.status)" class="rounded pt-1 pb-1 pr-3 pl-3 text-white">{{ formatArticleStatus(item.status) }}</span></p>
                                </td>                                
                                <td class="px-5 py-5 text-sm bg-white border-b border-gray-200 min-w-72">
                                    <div class="sm:inline-block">                                        
                                        <a :href="`/article/${item.id}`" class="sm:px-5 sm:py-2 px-5 bg-gray-900 m-2 mt-2 text-white rounded"><font-awesome-icon :icon="['fas', 'eye']" /> &nbsp; <span class="hidden lg:inline">Visualizar</span></a>                                        
                                    </div>                                    
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-else class="overflow-x-auto inline-block min-w-full rounded-lg">
                    <p class="mt-5">Nenhum artigo encontrado</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from 'vue';
import { IArticleState, articleList, articleAdd } from '../../hooks/useArticle';
import Spinner from "../../components/Spinner.vue"
import { eventList } from '../../hooks/useEvent';
import ArticleAdminFilter from '../../components/filters/ArticleAdminFilter.vue';
import Swal from "sweetalert2"

const Toast = Swal.mixin({
    toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
})

export default defineComponent({
    async setup(){
        const state: IArticleState = reactive({
            isLoading: false,
            message: '',
        })

        const articles = ref()
        const filter = ref(false);
        const infonotnull = ref(false)
        const infoLoaded = ref(false)

        return {
            ...toRefs(state),
            articles,
            filter,            
            infonotnull,
            infoLoaded,
        }
    },
    methods: {
        async loadArticles(filter){  
            this.infoLoaded = false
            this.infonotnull = false
            this.articles = null

            const result = (await articleList(filter)).value // Consome a API
                
            if(result[0] != undefined) {
                this.articles = result
                this.infonotnull = true
            } else {
                Toast.fire({icon: 'warning', title: 'Nenhum artigo encontrado'})
            }        
            this.infoLoaded = true        
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
                    color = 'bg-grenn-800'
                    break   
            }
            return color;
        },
        formatCourse(authors) {
            let courses : string[] = [];            
            let courses_str = ''
            for(let c = 0; c < Object.keys(authors).length; c++) {
                try {
                    if (! courses.includes(authors[c].course_name)){
                        courses.push(authors[c].course_name)
                    }                                        
                } catch(e) {}                
            }
            courses.forEach(item => {
                courses_str += item + ' / '
            });
            return courses_str.slice(0, -3)         
        }     
    },   
    components: { Spinner, ArticleAdminFilter }
})

</script>