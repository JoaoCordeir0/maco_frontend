<template>
  <img src="/logo_maco.png" alt="Logo Maco" width="100" class="fixed top-0 pl-2 pt-2">  
  <div class="flex items-center justify-center h-screen px-6 bg-zinc-100">
    <div class="w-full max-w-sm bg-white border-2 rounded-xl border-gray px-5 py-5 mt-2">
      <div class="space-y-2">
        <p class="font-semibold text-2xl text-gray-800">Alterar Senha</p>
        <p class="text-xs text-gray-400">Digite sua nova senha no campo abaixo e a confirme.</p>
      </div>
      <form class="mt-4" @submit.prevent="sendEmail">
        <label class="block">
          <span class="text-sm text-gray-800">Nova Senha</span>
          <input type="text"
            class="block w-full mt-1 border-gray-300 rounded-md focus:border-gray-800 focus:ring focus:ring-opacity-40 focus:ring-gray-800"
            v-model="email" />
        </label>

        <label class="block">
          <span class="text-sm text-gray-800">Confirmar Senha</span>
          <input type="text"
            class="block w-full mt-1 border-gray-300 rounded-md focus:border-gray-800 focus:ring focus:ring-opacity-40 focus:ring-gray-800"
            v-model="email" />
        </label>

        <div class="mt-6">
          <button type="submit" :disabled="isLoading"
            class="w-full px-4 py-2 text-sm text-center text-white bg-gray-800 rounded-md focus:outline-none hover:bg-gray-700 transition">
            <span v-if="!isLoading">
              Alterar
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
import Loading from "../../components/Loading.vue"
import { Toast } from "../../hooks/useToast"

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
            Toast().fire({
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
    },
    components: { Loading }
})
</script>