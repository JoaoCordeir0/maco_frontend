<template>
  <img src="/logo_maco.png" alt="Logo Maco" width="100" class="fixed top-0 pl-2 pt-2">  
  <div class="flex items-center justify-center h-screen px-6 bg-zinc-100">
    <div class="w-full max-w-sm bg-white border-2 rounded-xl border-gray px-5 py-5">
      <div class="space-y-2">
        <p class="font-semibold text-2xl text-gray-800">Login</p>
        <p class="text-xs text-gray-400">Insira seu e-mail e senha para entrar.</p>
      </div>
      <form class="mt-4" @submit.prevent="login">
        <label class="block">
          <span class="text-sm text-gray-800">Email</span>
          <input type="text"
            class="block w-full mt-1 border-gray-300 rounded-md focus:border-gray-800 focus:ring focus:ring-opacity-40 focus:ring-gray-800"
            v-model="username" />
        </label>

        <label class="block mt-3">
          <span class="text-sm text-gray-800">Senha</span>
          <input type="password"
            class="block w-full mt-1 border-gray-300 rounded-md focus:border-gray-800 focus:ring focus:ring-opacity-40 focus:ring-gray-800"
            v-model="password" />
          <div class="flex justify-end mt-2">
            <button type="button" @click="forgotPasswordPage" class="text-xs underline" >Esqueceu a senha?</button>
          </div>
        </label>

        <div class="mt-6">
          <button type="submit" :disabled="isLoading"
            class="w-full px-4 py-2 text-sm text-center text-white bg-gray-800 rounded-md focus:outline-none hover:bg-gray-700 transition">
            <span v-if="!isLoading">
              Entrar
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
import { ILoginState, apiLogin } from "../../hooks/useAuth"
import router from "../../router"
import Swal from "sweetalert2"
import { Toast } from "../../hooks/useToast"
import Loading from "../../components/Loading.vue"

export default defineComponent({
  setup() {
    const state: ILoginState = reactive({
      isLoading: false,
      message: '',
      token: '',
    });

    const username = ref("");
    const password = ref("");

    function forgotPasswordPage(){
      router.push('forgotpassword');
    }

    async function login() {
      state.isLoading = true

      if (username.value == "" || password.value == "") {        
        Toast().fire({icon: 'warning', title: 'Informe o e-mail e a senha!'})              
        state.isLoading = false
        return
      }     

      const result = await apiLogin(username.value, password.value)

      state.message = result.value['message']
      state.token = result.value['token']

      if (state.token != undefined) {        
        state.isLoading = false
        let timerInterval;
        Swal.fire({
            toast: true, 
            position: "top-end", 
            showConfirmButton: false, 
            icon: "success",
            title: "Sucesso! Redirecionando...",            
            timer: 1000,
            timerProgressBar: true,
            didOpen: () => {},
            willClose: () => {
                clearInterval(timerInterval);
            }
            }).then((result) => {            
            if (result.dismiss === Swal.DismissReason.timer) {
                location.href = '/dashboard'
            }
        });        
      } else {              
        Toast().fire({icon: 'error', title: 'Usuário ou senha incorretos!'})      
        state.isLoading = false
      }
    }

    return {
      ...toRefs(state),
      username,
      password,
      login,
      forgotPasswordPage
    }
  },
  beforeMount() {
    if (localStorage.getItem('user-auth-day') != undefined && localStorage.getItem('user-auth-day') == (new Date()).getDate().toString()) {      
      Swal.fire({        
        icon: 'success', 
        title: 'Bem vindo',
        toast: true, 
        position: "top-end", 
        showConfirmButton: false, 
        timer: 3000, 
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
      })
      router.push('dashboard')      
    }
  }, 
  components: { Loading }
});
</script>
