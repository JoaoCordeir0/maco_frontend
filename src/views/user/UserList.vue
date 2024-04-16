<template>
    <div class="mt-2">
        <div class="bg-white border-2 rounded-xl border-gray px-5 py-5 mt-2 mb-2">
            <div class="flex flex-wrap">
                <p class="text-gray-500 font-semibold text-xl border-b-2">Listagem de usuários</p>
                <span v-if="!infoLoaded">
                    <Spinner />
                </span>
                <div v-if="infonotnull" class="overflow-x-auto inline-block min-w-full rounded-lg">                    
                    <table class="min-w-full leading-normal mt-5">
                        <thead>
                            <tr>
                                <th class="px-5 text-start border-b-2">Id</th>
                                <th class="px-5 text-start border-b-2">Nome</th>        
                                <th class="px-5 text-start border-b-2">CPF</th>                                
                                <th class="px-5 text-start border-b-2">Curso</th>
                                <th class="px-5 text-start border-b-2">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in users">
                                <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                    <p class="text-gray-900 whitespace-nowrap">{{ item.id }}</p>
                                </td>
                                <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                    <p class="text-gray-900 whitespace-nowrap">{{ item.name }}</p>
                                </td>                                
                                <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                    <p class="text-gray-900 whitespace-nowrap">{{ formatCPF(item.cpf) }}</p>
                                </td>  
                                <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                    <p class="text-gray-900 whitespace-nowrap">{{ item.course }}</p>
                                </td>                              
                                <td class="px-5 py-5 text-sm bg-white border-b border-gray-200 min-w-72">
                                    <a :href="`/user/${item.id}`" class="sm:px-5 sm:py-2 px-5 bg-gray-900 m-2 mt-2 text-white rounded"><font-awesome-icon :icon="['fas', 'eye']" /> &nbsp; <span class="hidden lg:inline">Visualizar</span></a>                                        
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
import { IUserState, userList, userDel } from "../../hooks/useUser"
import Swal from "sweetalert2"

const Toast = Swal.mixin({
    toast: true, position: "top-end", showConfirmButton: false, timer: 3000, timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
});

export default defineComponent({
    async setup() {
        const state: IUserState = reactive({
            isLoading: false,
            message: '',
        })
        const infoLoaded = ref(false)        
        const infonotnull = ref(false)
        const users = ref()
       
        return {
            ...toRefs(state),
            users,
            infonotnull,
            infoLoaded,            
        }
    },
    methods: {
        async loadUsers() {                        
            const result = (await userList()).value // Consome a API
            
            if (result[0] != undefined) {
                this.users = result
                this.infonotnull = true
            } else {
                Toast.fire({icon: 'warning', title: 'Nenhum usuário encontrado'})      
            }            
            this.infoLoaded = true                                          
        },             
        formatCPF(cpf) {            
            cpf = cpf.replace(/[^\d]/g, "");                    
            return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
        }
    },
    beforeMount() {
        this.loadUsers()
    },
    components: { Spinner }
})
</script>