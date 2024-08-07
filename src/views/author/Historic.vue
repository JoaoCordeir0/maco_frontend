<template>   
    <div class="mt-2">
        <div class="bg-white border-2 rounded-xl border-gray px-5 py-5 mt-2">
            <div class="flex flex-wrap">
                <p class="text-gray-500 font-semibold text-xl border-b-2">Meus artigos</p>    
                <span v-if="!infoLoaded">
                    <Spinner />
                </span>                      
                <div v-if="!infoNull" class="w-full mt-5"> 
                    <div v-for="item in articles">
                        <div class="border-2 rounded p-2 mb-3" v-if="item.status != 'in_submission' && item.status != 'in_correction'">                        
                            <div class="w-full grid grid-cols-6 gap-4">                    
                                <div class="col-start-1 col-end-8 ...">
                                    <div class="items-center">
                                        <span>{{ item.id }}</span> - {{ item.title }} <span :class="getColorArticleStatus(item.status)" class="rounded pt-1 pb-1 pr-3 pl-3 text-white">{{ formatArticleStatus(item.status) }}</span>
                                    </div>
                                </div>
                                <div class="col-end-10 col-span-2 ...">
                                    <a href="#" v-on:click="viewArticle(item.id, item.event)" class="bg-blue-700 text-white ps-2 pe-2 pt-1 pb-1 rounded-md"> 
                                        <font-awesome-icon :icon="['fas', 'newspaper']" /> Visualizar
                                    </a>                                                                  
                                </div>                
                            </div>
                        </div>  
                    </div>                                                               
                </div>   
                <div v-else class="w-full mt-5"> 
                    <div class="border-2 rounded p-2 mb-3">                        
                        <div class="w-full grid grid-cols-6 gap-4">                    
                            Nenhum artigo                                        
                        </div>
                    </div>   
                </div>            
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from 'vue';
import { IEventState, eventActiveList } from '../../hooks/useEvent';
import { submissionsList, submissionDelete } from '../../hooks/useArticle';
import Spinner from "../../components/Spinner.vue"
import Swal from "sweetalert2"
import { format } from 'date-fns';
import router from '../../router';
import { Toast } from '../../hooks/useToast';

export default defineComponent({
    setup(){
        const state: IEventState = reactive({
            isLoading: false,
            message: ''
        })

        const infoLoaded = ref(false)     
        const infoNull = ref(true)           
        const events = ref()
        const articles = ref()

        return {
            ...toRefs(state),         
            events, 
            infoLoaded,
            infoNull,            
            articles,
        }
    }, 
    methods: {       
        viewArticle(articleID, eventID) {            
            sessionStorage.setItem('article-added', 'y')    
            sessionStorage.setItem('event-id-selected', eventID)
            router.push(`/submit/${articleID}`)
        },       
        async loadUserHistoric() {
            let userid = this.$route.params.userid
            if (userid != undefined) {
                console.log("mexer")
            } else {
                
            }
            
            const result = (await submissionsList('author', 'historic=1')).value

            if(result[0] != undefined) {      
                this.infoNull = false          
                this.articles = result                
            }   
            this.infoLoaded = true                 
        },               
        formatDate(date) {
            return format(new Date(date), 'dd/MM/yyyy')
        },
        formatArticleStatus(status) {
            let newStatus = ''
            switch(status) {
                case 'in_submission':
                    newStatus = 'Em submissão'
                    break
                case 'in_revision':
                    newStatus = 'Em revisão'
                    break
                case 'in_correction':
                    newStatus = 'Em correção'
                    break
                case 'approved':
                    newStatus = 'Aprovado'
                    break  
                case 'finished':
                    newStatus = 'Finalizado'
                    break   
            }
            return newStatus;
        },
        getColorArticleStatus(status) {
            let color = ''
            switch(status) {
                case 'in_submission':
                    color = 'bg-yellow-500'
                    break
                case 'in_revision':
                    color = 'bg-cyan-500'
                    break
                case 'in_correction':
                    color = 'bg-red-500'
                    break
                case 'approved':
                    color = 'bg-green-500'
                    break  
                case 'finished':
                    color = 'bg-gray-900'
                    break   
            }
            return color;
        },
    },  
    beforeMount() {        
        this.loadUserHistoric()        
    },
    components: { Spinner }
})
</script>