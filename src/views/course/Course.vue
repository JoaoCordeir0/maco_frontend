<template>               
    <div class="mt-2">
        <div class="bg-white border-2 rounded-xl border-gray px-5 py-5 mt-2">
            <div class="flex flex-wrap">
                <p class="text-gray-500 font-semibold text-xl border-b-2"> {{ pageTitle }} </p>
                <span v-if="!infoLoad">
                    <Spinner />
                </span>
                <div class="w-full">                    
                    <form class="mt-4 mt-10" @submit.prevent="saveCourse">
                        <div class="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-3">
                            <div class="...">
                                <label class="block">
                                    <span class="text-sm text-gray-700">Nome do curso <span class="text-red-500 font-semibold">*</span></span>
                                    <input type="text"
                                        class="block w-full mt-1 border-gray-300 rounded-md focus:border-gray-800 focus:ring focus:ring-opacity-40 focus:ring-gray-800"
                                        v-model="name" />
                                </label>
                            </div>
                            <div class="...">
                                <label class="block">
                                    <span class="text-sm text-gray-700">Descrição do curso</span>
                                    <input type="text"
                                        class="block w-full mt-1 border-gray-300 rounded-md focus:border-gray-800 focus:ring focus:ring-opacity-40 focus:ring-gray-800"
                                        v-model="description" />
                                </label>
                            </div>                           
                        </div>
                        <div v-if="infoLoad" class="mt-5">
                            <div class="flex justify-end">
                                <button v-if="isEdit" type="button" v-on:click="delCategory(id)" class="px-12 py-2 mr-2 text-sm text-center text-white bg-red-800 rounded-md focus:outline-none font-bold">                                    
                                    <font-awesome-icon :icon="['fas', 'trash']" /> &nbsp; Excluir                                    
                                </button>

                                <button type="submit" :disabled="isLoading"
                                    class="px-12 py-2 text-sm text-center text-white bg-gray-900 rounded-md focus:outline-none font-bold">
                                    <span v-if="isLoading == false">
                                        <font-awesome-icon :icon="['fas', 'floppy-disk']" /> &nbsp; Salvar
                                    </span>
                                    <span v-if="isLoading == true">
                                        <svg aria-hidden="true"
                                            class="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                                            viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                fill="currentColor" />
                                            <path
                                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                fill="currentFill" />
                                        </svg>
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
import { defineComponent, ref, reactive, toRefs } from "vue"
import router from "../../router"
import { ICourseState, courseAdd, courseDetails, courseEdit } from "../../hooks/useCourse"
import Spinner from "../../components/Spinner.vue"
import Swal from "sweetalert2"

const Toast = Swal.mixin({
    toast: true, position: "top-end", showConfirmButton: false, timer: 3000, timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
});

export default defineComponent({
    setup() {
        const state: ICourseState = reactive({
            isLoading: false,
            message: '',
        })

        const infoLoad = false
        const pageTitle = ref("")
        const id = ref("")
        const name = ref("")
        const description = ref("")        
        const isEdit = false
       
        async function saveCourse() {
            state.isLoading = true

            if (name.value == "") {
                Toast.fire({icon: 'warning', title: 'Informe o nome do curso!'})
                state.isLoading = false
                return
            }            

            if (router.currentRoute.value.params.action == 'add') {        
                const result = await courseAdd({
                    name: name.value,
                    description: description.value,                    
                })
                if (result.status == 'success')
                    Toast.fire({icon: 'success', title: 'Curso gravado!'})
                else
                    Toast.fire({icon: 'error', title: result.message})
            } else {
                const result = await courseEdit({
                    id: id.value,
                    name: name.value,
                    description: description.value,                    
                })
                if (result.status == 'success')
                    Toast.fire({icon: 'success', title: 'Curso editado!'})
                else
                    Toast.fire({icon: 'error', title: result.message})
            }
            
            state.isLoading = false
            router.push('/course-list')
        }

        return {
            ...toRefs(state),
            infoLoad,
            pageTitle,
            id,
            name,
            description,
            isEdit,
            saveCourse,
        }
    },
    methods: {
        async loadCourse() {
            const result = await courseDetails(this.$route.params.action)                                

            if (result.value['name_pt'] == undefined) 
                Toast.fire({icon: 'error', title: 'Curso não encontrado!'})
            
            this.id = result.value['id']
            this.name = result.value['name']
            this.description = result.value['description']            
            this.infoLoad = true          
        },
        async delCategory(id) {
            Swal.fire({
                title: "Tem certeza?",
                text: "Você não poderá reverter isso!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sim, excluir!",
                cancelButtonText: "Cancelar",
            }).then(async (result) => {
                if (result.isConfirmed) {      
                    // em dev                                  
                }
            });            
        }
    },
    beforeMount() {
        switch (router.currentRoute.value.params.action) {
            case 'add':
                this.pageTitle = 'Inserir curso'
                this.infoLoad = true
                break;            
            default:
                this.pageTitle = 'Editar curso'
                this.loadCourse()
                this.isEdit = true
        }
    },
    components: { Spinner }
})
</script>