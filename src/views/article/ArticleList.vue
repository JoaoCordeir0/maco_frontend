<template>
    <div class="mt-2">
        <div class="bg-white border-2 rounded-xl border-gray px-5 py-5 mt-2 mb-2">
            <div class="flex flex-wrap">
                <p class="text-gray-500 font-semibold text-xl border-b-2">Listagem de artigos</p>
                <div class="overflow-x-auto inline-block min-w-full rounded-lg">                    
                    <table class="min-w-full leading-normal mt-5">
                        <thead>
                            <tr>
                                <th class="px-5 text-start border-b-2">Id</th>
                                <th class="px-5 text-start border-b-2">Título</th>        
                                <th class="px-5 text-start border-b-2">Autores</th>                                
                                <th class="px-5 text-start border-b-2">Revisor</th>
                                <th class="px-5 text-start border-b-2">Palavras Chaves</th>
                                <th class="px-5 text-start border-b-2">Resumo</th>
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
                                    <p class="text-gray-900 whitespace-nowrap">{{ item.author }}</p>
                                </td>  
                                <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                    <p class="text-gray-900 whitespace-nowrap">{{ item.advisor }}</p>
                                </td>  
                                <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                    <p class="text-gray-900 whitespace-nowrap">{{ item.keywords }}</p>
                                </td>  
                                <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                    <p class="text-gray-900 whitespace-nowrap">{{ item.summary }}</p>
                                </td>  
                                <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                    <p class="text-gray-900 whitespace-nowrap">{{ item.status }}</p>
                                </td>                                
                                <td class="px-5 py-5 text-sm bg-white border-b border-gray-200 min-w-72">
                                    <div class="sm:inline-block">                                        
                                        <a :href="`/article/${item.id}`" class="sm:px-5 sm:py-2 px-5 bg-gray-900 m-2 mt-2 text-white rounded"><font-awesome-icon :icon="['fas', 'pen-to-square']" /> <span class="hidden lg:inline">Editar</span></a>
                                        <a href="#del" class="sm:px-5 sm:py-2 px-5 bg-red-800 m-2 mt-2 text-white rounded"><font-awesome-icon :icon="['fas', 'trash']" /> <span class="hidden lg:inline">Excluir</span></a>
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
import { IArticleState, articleList, articleAdd } from '../../hooks/useArticle';
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

        return {
            ...toRefs(state),
            articles
        }
    },
    methods: {
        async loadArticles(){
            const result = (await articleList()).value // Consome a API

            if(result.toString() != 'Not found')
                this.articles = result
            else
                Toast.fire({icon: 'warning', title: 'Nenhum artigo encontrado'})
        }
    },
    beforeMount(){
        this.loadArticles()
    }
})

</script>