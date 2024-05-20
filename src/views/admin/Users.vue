<template>
    <div class="mt-2">
        <div class="bg-white border-2 rounded-xl border-gray px-5 py-5 mt-2 mb-2">
            <div class="flex flex-wrap">
                <div class="w-full grid grid-cols-6 gap-4">                    
                    <div class="col-start-1 col-end-8 ...">
                        <p class="text-gray-500 font-semibold text-xl"><span class="border-b-2"> Listagem de usuários </span>
                            <span v-if="!infoLoaded">
                                <Spinner />
                            </span>
                        </p>
                    </div>
                    <div class="col-end-10 col-span-2 ...">
                        <UserAdminFilter @some-event="loadUsers" />                        
                    </div>                
                </div>               
                <div v-if="infonotnull" class="overflow-x-auto inline-block min-w-full rounded-lg">                    
                    <table class="min-w-full leading-normal mt-5">
                        <thead>
                            <tr>
                                <th class="px-5 text-start border-b-2">Id</th>
                                <th class="px-5 text-start border-b-2">Nome</th>        
                                <th class="px-5 text-start border-b-2">CPF</th>                                
                                <th class="px-5 text-start border-b-2">Curso</th>
                                <th class="px-5 text-start border-b-2">Papel</th>
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
                                    <p class="text-gray-900 whitespace-nowrap">{{ formatCourse(item.courses) }}</p>
                                </td>  
                                <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                    <p class="text-gray-900 whitespace-nowrap">{{ getRole(item.role) }}</p>
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
import { Toast } from "../../hooks/useToast"
import UserAdminFilter from '../../components/filters/UserAdminFilter.vue'

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
        async loadUsers(filter) {                        
            this.infoLoaded = false
            const result = (await userList('admin', filter)).value // Consome a API
            
            if (result[0] != undefined) {
                this.users = result
                this.infonotnull = true
            } else {
                Toast().fire({icon: 'warning', title: 'Nenhum usuário encontrado'})      
            }            
            this.infoLoaded = true
        },             
        formatCPF(cpf) {            
            cpf = cpf.replace(/[^\d]/g, "");                    
            return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
        },
        getRole(id) {
            let paper
            switch(id) {
                case 1: 
                    paper = 'Administrador'
                    break;
                case 2: 
                    paper = 'Revisor'
                    break;
                case 3: 
                    paper = 'Aluno'
                    break;
            }
            return paper
        },
        formatCourse(courses) {            
            let courses_array : string[] = [];
            let courses_str = ''
            for(let c = 0; c < Object.keys(courses).length; c++) {
                try {                    
                    if (! courses_array.includes(courses[c].name)){
                        courses_array.push(courses[c].name)
                    }                                        
                } catch(e) {}                
            }
            courses_array.forEach(item => {
                courses_str += item + ' / '
            });
            return courses_str.slice(0, -3)           
        }
    },
    components: { Spinner, UserAdminFilter }
})
</script>