<template>
  <div class="flex">
    <!-- Backdrop -->
    <div :class="isOpen ? 'block' : 'hidden'" @click="isOpen = false"
      class="fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden"></div>
    <!-- End Backdrop -->

    <div :class="isOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'"
      class="fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-white lg:translate-x-0 lg:static lg:inset-0 border-r-2 border-gray">
      <div class="flex items-center justify-center mt-8">
        <div class="flex items-center">
          <!-- Logo -->
          <img src="/logo_maco.png" alt="Logo Maco" width="180">
        </div>
      </div>

      <nav class="mt-10 px-2">                  
        <router-link class="flex items-center px-4 py-2 mt-2 duration-200"
          :class="[$route.name === 'Dashoard' ? activeClass : inactiveClass]" to="/dashboard">
          <font-awesome-icon :icon="['fas', 'chart-line']" />
          <span class="mx-4 font-semibold">Dashoard</span>
        </router-link>   
      </nav>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useSidebar } from "../hooks/useSidebar";

export default defineComponent({
  async setup() {
    const { isOpen } = useSidebar();
    const activeClass = ref(
      "bg-gray-400 bg-opacity-30 text-gray-700 rounded-md"
    );
    const inactiveClass = ref(
      "border-gray-900 text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100 rounded-md"
    );
    let actualIssue: any = '1001'
            
    return {
      isOpen,
      activeClass,
      inactiveClass,
      actualIssue,
    };
  },  
}); 
</script>
