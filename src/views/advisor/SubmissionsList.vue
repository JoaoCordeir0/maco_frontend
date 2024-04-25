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
                                <th class="px-5 text-start border-b-2">Id</th>
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
                                    <p class="text-gray-900 whitespace-nowrap">{{ item.course }}</p>
                                </td>  
                                <td class="px-5 py-5 text-sm border-b border-gray-200">
                                    <p class="text-gray-900 whitespace-nowrap"><span class="bg-cyan-500 rounded pt-1 pb-1 pr-3 pl-3 text-white">{{ item.status }}</span></p>
                                </td>                                
                                <td class="px-5 py-5 text-sm bg-white border-b border-gray-200 min-w-72">
                                    <div class="sm:inline-block">                                        
                                        <a :href="`/submission/${item.id}`" class="sm:px-5 sm:py-2 px-5 bg-gray-900 m-2 mt-2 text-white rounded"><font-awesome-icon :icon="['fas', 'eye']" /> &nbsp; <span class="hidden lg:inline">Visualizar</span></a>                                        
                                    </div>                                    
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from 'vue';
import router from "../../router"
import { IArticleState, articleList, articleAdd, submissionsList } from '../../hooks/useArticle';
import Spinner from "../../components/Spinner.vue"
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
        async loadArticles() {
            const result = (await submissionsList()).value // Consome a API
                
            if(result.length != 1) {
                this.articles = result
                this.infonotnull = true
            } else {
                Toast.fire({icon: 'warning', title: 'Nenhum artigo encontrado'})
            }        
            this.infoLoaded = true        
        }
    },
    beforeMount(){
        this.loadArticles()
    },
    components: { Spinner }
})

</script>