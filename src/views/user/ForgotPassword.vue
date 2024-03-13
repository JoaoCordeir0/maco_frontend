<template>
    <h1 class="fixed top-0 pl-2 pt-4 ml-2">Maco</h1>
  <div class="flex items-center justify-center h-screen px-6 bg-zinc-100">
    <div class="w-full max-w-sm py-5 px-5">
      <div class="space-y-2">
        <p class="font-semibold text-2xl text-gray-800">Esqueceu Senha?</p>
        <p class="text-xs text-gray-400">Nós entendemos, coisas acontecem. Basta inserir seu endereço de e-mail abaixo e enviaremos um link para redefinir sua senha.</p>
      </div>
      <form class="mt-4" @submit.prevent="sendEmail">
        <label class="block">
          <span class="text-sm text-gray-800">Email</span>
          <input type="text"
            class="block w-full mt-1 border-gray-300 rounded-md focus:border-gray-800 focus:ring focus:ring-opacity-40 focus:ring-gray-800"
            v-model="email" />
        </label>

        <div class="mt-6">
          <button type="submit" :disabled="isLoading"
            class="w-full px-4 py-2 text-sm text-center text-white bg-gray-800 rounded-md focus:outline-none hover:bg-gray-700 transition">
            <span v-if="isLoading == false">
              Enviar
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
        <div class="flex justify-center mt-2">
          <button @click="loginPage" class="text-xs underline">Já possui uma conta? Faça seu login.</button>
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

const Toast = Swal.mixin({
    toast: true, position: "top-end", showConfirmButton: false, timer: 3000, timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
});

export default defineComponent({
    setup(){

        const email = ref("");

        // Just to not get errors
        const isLoading = false;

        function loginPage()
        {
          router.push('login');
        }

        async function sendEmail()
        {
          if(email.value == "")
          {
            Toast.fire({
              icon: 'warning',
              title: 'Informe o e-mail!'
            });

            return
          }   
        }

        return{
            email,
            isLoading,
            sendEmail,
            loginPage
        }
        
    }
})

</script>../../hooks/useAuth../../router