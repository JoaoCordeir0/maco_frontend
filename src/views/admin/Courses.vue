<template>
    <div class="mt-2">
        <div class="bg-white border-2 rounded-xl border-gray px-5 py-5 mt-2 mb-2">
            <div class="flex flex-wrap">
                <div class="w-full grid grid-cols-6 gap-4">                    
                    <div class="col-start-1 col-end-8 ...">
                        <p class="text-gray-500 font-semibold text-xl"><span class="border-b-2">Listagem de cursos</span>
                            <span v-if="!infoLoaded">
                                <Spinner />
                            </span>
                        </p>
                    </div>
                    <div class="col-end-10 col-span-2 ...">
                        <a href="/course/add" class="bg-green-700 text-white ps-2 pe-2 pt-1 pb-1 rounded-md"> 
                            <font-awesome-icon :icon="['fas', 'file-circle-plus']" /> Criar novo curso
                        </a>
                    </div>                
                </div>    
                <div v-if="infonotnull" class="overflow-x-auto inline-block min-w-full rounded-lg">                    
                    <table class="min-w-full leading-normal mt-5">
                        <thead>
                            <tr>
                                <th class="px-5 text-start border-b-2">ID</th>
                                <th class="px-5 text-start border-b-2">Nome</th>        
                                <th class="px-5 text-start border-b-2">Descrição</th>                                
                                <th class="px-5 text-start border-b-2">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in courses">
                                <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                    <p :class="!item.status ? 'text-red-500' : ''" class="text-gray-900 whitespace-nowrap">{{ item.id }}</p>
                                </td>
                                <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                    <p :class="!item.status ? 'text-red-500' : ''" class="text-gray-900 whitespace-nowrap">{{ item.name }}</p>
                                </td>                                
                                <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                    <p :class="!item.status ? 'text-red-500' : ''" class="text-gray-900 whitespace-nowrap">{{ item.description }}</p>
                                </td>                                
                                <td class="px-5 py-5 text-sm bg-white border-b border-gray-200 min-w-72">
                                    <div class="sm:inline-block">                                        
                                        <a :href="`/course/${item.id}`" class="sm:px-5 sm:py-2 px-5 bg-gray-900 m-2 mt-2 text-white rounded"><font-awesome-icon :icon="['fas', 'pen-to-square']" /> <span class="hidden lg:inline">Editar</span></a>                                        
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
import { defineComponent, ref, reactive, toRefs } from "vue"
import Spinner from "../../components/Spinner.vue"
import { ICourseState, courseList } from "../../hooks/useCourse"
import Swal from "sweetalert2"
import { Toast } from "../../hooks/useToast"

export default defineComponent({
    async setup() {
        const state: ICourseState = reactive({
            isLoading: false,
            message: '',
        })
        const infoLoaded = ref(false)        
        const infonotnull = ref(false)
        const courses = ref()
       
        return {
            ...toRefs(state),
            courses,
            infonotnull,
            infoLoaded,            
        }
    },
    methods: {
        async loadCourses() {                        
            const result = (await courseList()).value // Consome a API

            if(result.length != 1) {
                this.courses = result
                this.infonotnull = true
            } else {
                Toast().fire({icon: 'warning', title: 'Nenhum curso encontrado'})      
            }            
            this.infoLoaded = true                                          
        },                    
    },
    beforeMount() {
        this.loadCourses()
    },
    components: { Spinner }
})
</script>