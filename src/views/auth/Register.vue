<template>
    <img src="/logo_maco.png" title="Maco: Magnoli & Cordeiro" alt="Logo Maco" width="150" class="hidden lg:block top-0 pl-2 pt-2 rounded-full" style="margin-bottom: -145px;">
    <div class="flex items-center justify-center h-screen px-3 bg-zinc-100">
        <div class="w-full max-w-xl md:h-auto overflow-y-auto bg-white border-t-2 shadow-xl rounded-xl border-gray py-2 px-2 md:py-4 md:px-4 mt-2">            
            <form class="p-5 m-auto overflow-y-auto" @submit.prevent="sendRegister">
                <div class="space-y-2 flex mb-2">
                    <a href="#" onclick="history.go(-1)" class="mt-3 mr-3"><font-awesome-icon :icon="['fas', 'arrow-left']" /></a>
                    <p class="font-semibold text-lg md:text-2xl text-gray-800">
                        Cadastro de alunos
                    </p>            
                </div>

                <div class="grid grid-cols-12 gap-3">
                    <div class="col-span-12 md:col-span-6">
                        <span class="text-sm text-gray-800">Nome <span class="text-red-500 font-semibold">*</span></span>
                        <input type="text"
                            maxlength="100"
                            class="block w-full mt-1 border-gray-300 rounded-md focus:border-gray-800 focus:ring focus:ring-opacity-40 focus:ring-gray-800"
                            v-model="name" />
                    </div>
                    <div class="col-span-12 md:col-span-6">
                        <span class="text-sm text-gray-800">Sobrenome <span class="text-red-500 font-semibold">*</span></span>
                        <input type="text"
                            maxlength="100"
                            class="block w-full mt-1 border-gray-300 rounded-md focus:border-gray-800 focus:ring focus:ring-opacity-40 focus:ring-gray-800"
                            v-model="lastname" />
                    </div>
                </div>

                <div class="grid grid-cols-12 mt-3">
                    <div class="col-span-12">
                        <span class="text-sm text-gray-800">E-mail <span class="text-red-500 font-semibold">*</span></span>
                        <input type="email"
                            maxlength="100"
                            class="block w-full mt-1 border-gray-300 rounded-md focus:border-gray-800 focus:ring focus:ring-opacity-40 focus:ring-gray-800"
                            v-model="email" />
                    </div>
                </div>

                <div class="grid grid-cols-12 gap-3 mt-3">
                    <div class="col-span-12 md:col-span-6">
                        <span class="text-sm text-gray-800">CPF <span class="text-red-500 font-semibold">*</span></span>
                        <input type="text"
                            maxlength="14"
                            @input="formatCPF"
                            class="block w-full mt-1 border-gray-300 rounded-md focus:border-gray-800 focus:ring focus:ring-opacity-40 focus:ring-gray-800"
                            v-model="cpf" />
                    </div>
                    <div class="col-span-12 md:col-span-6">
                        <span class="text-sm text-gray-800">RA <span class="text-red-500 font-semibold">*</span></span>
                        <input type="text"
                            maxlength="7"
                            @input="formatRA"
                            class="block w-full mt-1 border-gray-300 rounded-md focus:border-gray-800 focus:ring focus:ring-opacity-40 focus:ring-gray-800"
                            v-model="ra" />
                    </div>
                </div>

                <div class="grid grid-cols-12 gap-3 mt-3">
                    <div class="col-span-12 md:col-span-6">
                        <span class="text-sm text-gray-800">Senha <span class="text-red-500 font-semibold">*</span></span>
                        <div class="relative w-full">
                            <input :type="type_input_1 ? 'text' : 'password'"
                                class="block w-full mt-1 border-gray-300 rounded-md focus:border-gray-800 focus:ring focus:ring-opacity-40 focus:ring-gray-800"
                                v-model="pass1" />
                            <button class="absolute inset-y-0 right-0 pr-3 flex items-center" type="button" @click="type_input_1 = !type_input_1">
                                <font-awesome-icon :icon="['fas', 'eye']" class="icon-color" />
                            </button>  
                        </div>                      
                    </div>
                    <div class="col-span-12 md:col-span-6">
                        <span class="text-sm text-gray-800">Confirme a senha <span class="text-red-500 font-semibold">*</span></span>
                        <div class="relative w-full">
                            <input :type="type_input_2 ? 'text' : 'password'"
                                class="block w-full mt-1 border-gray-300 rounded-md focus:border-gray-800 focus:ring focus:ring-opacity-40 focus:ring-gray-800"
                                v-model="pass2" />
                            <button class="absolute inset-y-0 right-0 pr-3 flex items-center" type="button" @click="type_input_2 = !type_input_2">
                                <font-awesome-icon :icon="['fas', 'eye']" class="icon-color" />
                            </button>  
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-12 gap-3 mt-3">
                    <div class="col-span-12">
                        <span class="text-sm text-gray-700">Curso <span class="text-red-500 font-semibold">*</span></span>
                        <select v-model="course" class="block w-full mt-1 border-gray-300 rounded-md focus:border-gray-800 focus:ring focus:ring-opacity-40 focus:ring-gray-800">                
                            <option value="" selected disabled>Selecione o curso</option>
                            <option v-for="course in courses" :value="course.id">{{ course.name }}</option>                                                
                        </select>  
                    </div>
                </div>

                <div class="mt-6">
                    <button type="submit" :disabled="isLoading"
                        class="w-full px-4 py-2 text-sm text-center text-white bg-gray-800 rounded-md focus:outline-none hover:bg-gray-700 transition">
                        <span v-if="!isLoading">
                            Cadastrar
                        </span>
                        <span v-else>
                            <Loading />
                        </span>
                    </button>
                </div>
            </form>
        </div>
    </div>

</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from "vue"
import router from "../../router"
import Loading from "../../components/Loading.vue"
import { Toast } from "../../hooks/useToast"
import { IUserState, userAdd } from "../../hooks/useUser"
import { courseList } from "../../hooks/useCourse"

export default defineComponent({
    setup() {
        const state: IUserState = reactive({
            isLoading: false,
            message: '',
        })
        const name = ref("")
        const lastname = ref("")
        const cpf = ref("")        
        const email = ref("")
        const ra = ref("")
        const pass1 = ref("")
        const pass2 = ref("")
        const course = ref("")
        const courses = ref()
        const type_input_1 = ref(false)
        const type_input_2 = ref(false)

        async function sendRegister(){                      
            if (name.value == '' || lastname.value == '' || cpf.value == '' || email.value == '' || ra.value == '' || pass1.value == '' || pass2.value == '' || course.value == '') {
                Toast().fire({icon: 'warning', title: 'Preencha todas as informações!'})
                return
            } 
            if (pass1.value.length < 8) {
                Toast().fire({icon: 'error', title: 'Senha deve conter pelo menos 8 caracteres!'})
                return
            }
            if (pass1.value != pass2.value) {
                Toast().fire({icon: 'error', title: 'Senhas não são iguais!'})
                return
            }   
            
            state.isLoading = true
            const result = await userAdd({                
                name: name.value + " " + lastname.value,
                cpf: cpf.value,
                ra: ra.value,
                email: email.value,
                password: pass1.value,              
                course: course.value,  
            })
            state.isLoading = false
            if (result.status == 'success') {
                Toast().fire({icon: 'success', title: 'Usuário criado!'})
                router.push('/login')
            } else {
                Toast().fire({icon: 'error', title: result.message})
            }     
        }

        return {
            ...toRefs(state),
            name,
            lastname,
            cpf,
            email,
            ra,
            pass1,
            pass2,         
            course,   
            courses,
            type_input_1,
            type_input_2,
            sendRegister,            
        }
    },
    methods: {
        async getCourses() {
            this.courses = (await courseList('/public/')).value            
        },
        formatCPF() {            
            let cpf = this.cpf.replace(/\D/g, '');                        
            if (cpf.length <= 11) {
                cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
                cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
                cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            }            
            this.cpf = cpf;
        },
        formatRA() {            
            let ra = this.ra.replace(/\D/g, '');            
            if (ra.length <= 6) {
                ra = ra.replace(/(\d{5})(\d)/, '$1-$2');
            }
            this.ra = ra;
        }
    },
    beforeMount() {
        this.getCourses()
    },
    components: { Loading }
})
</script>