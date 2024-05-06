<template>
    <div class="mt-2">
        <div class="bg-white border-2 rounded-xl border-gray px-5 py-5 mt-2">
            <div class="flex flex-wrap">
                <p class="text-gray-500 font-semibold text-xl border-b-2">Eventos disponíveis</p>     
                <span v-if="!infoLoaded">
                    <Spinner />
                </span>         
                <div v-if="infonotnull" class="w-full mt-5">                         
                    <div class="border-2 rounded p-2 mb-2" v-for="item in events">                        
                        <div class="w-full grid grid-cols-6 gap-4">                    
                            <div class="col-start-1 col-end-8 ...">
                                <div class="mt-1">
                                    {{ item.name }} - <b>{{ formatDate(item.start) }}</b> até <b>{{ formatDate(item.end) }}</b>
                                </div>
                            </div>
                            <div class="col-end-10 col-span-2 ...">
                                <a :href="'submit/' + item.id" class="bg-green-700 text-white ps-2 pe-2 pt-1 pb-1 rounded-md"> 
                                    <font-awesome-icon :icon="['fas', 'newspaper']" /> Iniciar nova submissão
                                </a>                                
                            </div>                
                        </div>
                    </div>                     
                </div>
                <div v-else class="overflow-x-auto inline-block min-w-full rounded-lg mt-5">                    
                   <p>Nenhum evento disponível</p>
                </div>
            </div>
        </div>
    </div>

    <div v-if="showIncomplete" class="mt-2">
        <div class="bg-white border-2 rounded-xl border-gray px-5 py-5 mt-2">
            <div class="flex flex-wrap">
                <p class="text-gray-500 font-semibold text-xl border-b-2">Meus artigos incompletos</p>     
                <span v-if="!infoLoaded">
                    <Spinner />
                </span>         
                <div v-if="infonotnull" class="w-full mt-5">                         
                    <div class="border-2 rounded p-2 mb-2" v-for="item in articles">                        
                        <div class="w-full grid grid-cols-6 gap-4">                    
                            <div class="col-start-1 col-end-8 ...">
                                <div class="mt-1">
                                    {{ item.title }}
                                </div>
                            </div>
                            <div class="col-end-10 col-span-2 ...">
                                <a :href="'submit/' + item.id" class="bg-blue-700 text-white ps-2 pe-2 pt-1 pb-1 rounded-md"> 
                                    <font-awesome-icon :icon="['fas', 'newspaper']" /> Continuar submissão
                                </a>                                
                            </div>                
                        </div>
                    </div>                     
                </div>
                <div v-else class="overflow-x-auto inline-block min-w-full rounded-lg mt-5">                    
                   <p>Nenhum evento disponível</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from 'vue';
import { IEventState, eventActiveList } from '../../hooks/useEvent';
import { submissionsList } from '../../hooks/useArticle';
import Spinner from "../../components/Spinner.vue"
import Swal from "sweetalert2"
import { format } from 'date-fns';

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
        const showIncomplete = ref(false)
        const events = ref()
        const articles = ref()

        return {
            ...toRefs(state),         
            events, 
            infoLoaded,
            infonotnull,
            showIncomplete,
            articles,
        }
    }, 
    methods: {
        async loadevents() {
            const result = (await eventActiveList()).value
            
            if(result[0]) {
                this.events = result   
                this.infonotnull = true             
            } else {
                Toast.fire({icon: 'warning', title: 'Nenhum evento encontrado'})      
            }            
            this.infoLoaded = true                 
        },       
        async loadArticlesIncomplete() {
            const result = (await submissionsList('author', 'article_status=1')).value

            if(result[0] != undefined) {
                this.articles = result
                this.showIncomplete = true
            } else {                
            }                    
        },
        formatDate(date) {
            return format(new Date(date), 'dd/MM/yyyy')
        }
    },  
    beforeMount() {
        this.loadevents() 
        this.loadArticlesIncomplete()
    },
    components: { Spinner }
})
</script>