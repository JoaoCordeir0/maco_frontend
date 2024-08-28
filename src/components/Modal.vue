<template>
    <transition
          enter-active-class="transition duration-300 ease-out transform"
          enter-from-class="scale-95 opacity-0"
          enter-to-class="scale-100 opacity-100"
          leave-active-class="transition duration-300 ease-in transform"
          leave-from-class="scale-100 opacity-100"
          leave-to-class="scale-95 opacity-0"
    >
        <div id="modal-backdrop" class="overflow-scroll fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div id="modal" class="bg-white rounded-3xl overflow-x-auto flex flex-col sm:w-full md:w-4/6 xl:w-2/6 h-auto" >
                <!-- Modal Header -->
                <header id="modal-header" class="ps-5 pe-3 py-3 flex justify-between items-center border-b-2 border-gray">
                    <slot name="header"></slot>
                    <button type="button" class="w-7 p-2 bg-gray-300 rounded-full" @click="$emit('someEvent')">
                        <font-awesome-icon :icon="['fas', 'xmark']" />
                    </button>            
                </header>          
                
                <!-- Modal Body -->
                <slot name="body"></slot>                
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({})
</script>