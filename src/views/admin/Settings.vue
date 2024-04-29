<template>
    <div class="mt-2">
        <div class="bg-white border-2 rounded-xl border-gray px-5 py-5 mt-2">
            <div class="flex flex-wrap">
                <p class="text-gray-500 font-semibold text-xl border-b-2">Configurações de evento</p>     
                <span v-if="!infoLoaded">
                    <Spinner />
                </span>         
                <div v-if="infonotnull" class="w-full mt-5">                         
                    <div class="border-2 rounded p-2 mb-2" v-for="item in events">                        
                        <div class="w-full grid grid-cols-6 gap-4">                    
                            <div class="col-start-1 col-end-8 ...">
                                <div class="mt-1">
                                    {{ item.name }} - <span :class="item.status == 1 ? 'bg-green-700' : 'bg-red-700'" class="ps-2 pe-2 rounded-md text-white">{{ item.status == 1 ? 'Ativo' : 'Inativo' }}</span>
                                </div>
                            </div>
                            <div class="col-end-10 col-span-2 ...">
                                <button class="bg-blue-700 text-white ps-2 pe-2 pt-1 pb-1 rounded-md"> <font-awesome-icon :icon="['fas', 'pen-to-square']" /> Editar</button>                                
                            </div>                
                        </div>

                    </div>                     
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from 'vue';
import { IEventState, eventList } from '../../hooks/useEvent';
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
    setup(){
        const state: IEventState = reactive({
            isLoading: false,
            message: ''
        })

        const infoLoaded = ref(false)     
        const infonotnull = ref(false)   
        const events = ref()

        return {
            ...toRefs(state),         
            events, 
            infoLoaded,
            infonotnull,
        }
    }, 
    methods: {
        async loadevents() {
            const result = (await eventList()).value
            
            if(result[0]) {
                this.events = result   
                this.infonotnull = true             
            } else {
                Toast.fire({icon: 'warning', title: 'Nenhum evento encontrado'})      
            }            
            this.infoLoaded = true                 
        },       
    },  
    beforeMount() {
        this.loadevents() 
    },
    components: { Spinner }
})

</script>