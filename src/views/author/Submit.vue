<template>
    <div class="mt-2">
        <div class="bg-white border-2 rounded-xl border-gray px-5 py-5 mt-2">
            <div class="flex flex-wrap">                                                
                <div class="w-full grid grid-cols-6 gap-4">                    
                    <div class="col-start-1 col-end-8 ...">
                        <p class="text-gray-500 font-semibold text-xl"> <span class="border-b-2">{{ pageTitle }} <span>{{ eventName }}</span></span>
                            <span v-if="!infoLoaded">
                                <Spinner />
                            </span>
                        </p>
                    </div>
                    <div class="col-end-10 col-span-2 ...">
                        <a href="#" class="bg-green-700 text-white rounded-md py-1 px-3">Ajuda <font-awesome-icon :icon="['fas', 'question']" /></a>
                    </div>                
                </div>
            </div>            
        </div>
        <form class="mt-4 mb-5" @submit.prevent="saveArticle">
            <div class="grid grid-cols-1 gap-4 md:grid-cols-1 xl:grid-cols-1">                
                <div class="... bg-white border-2 rounded-xl border-gray px-5 pb-5 pt-3 mt-2">
                    <label class="block">
                        <span class="text-sm text-gray-700">Título do Artigo <span class="text-red-500 font-semibold">*</span></span>
                        <input type="text"
                            class="block w-full mt-1 border-gray-300 rounded-md focus:border-gray-800 focus:ring focus:ring-opacity-40 focus:ring-gray-800"
                            v-model="title" />
                    </label>
                </div>                               
                <div class="... bg-white border-2 rounded-xl border-gray px-5 pb-5 pt-3 mt-2">
                    <label class="block">
                        <span class="text-sm text-gray-700">Autores <span class="text-red-500 font-semibold">*</span></span>                                    
                        <div v-for="author in authors" class="grid grid-cols-2 gap-4 md:grid-cols-2 xl:grid-cols-2">                                        
                            <div class="... mt-1">
                                <span class="text-sm text-gray-700">Nome</span>                                    
                                <input :value="author.name" disabled type="text" class="block w-full mt-1 border-gray-300 rounded-md"/>
                            </div>
                            <div class="... mt-1">
                                <span class="text-sm text-gray-700">E-mail</span>                                    
                                <div class="flex">
                                    <input :value="author.email" disabled type="text" class="w-full block mt-1 border-gray-300 rounded-md"/>                                
                                    <a v-if="showBtnDelAuthor(author.id)" href="#" v-on:click="delAuthor(author.id)" class="ms-2 bg-red-600 text-white ps-2 pe-2 pt-1 pb-1 rounded-md"> 
                                        <font-awesome-icon class="mt-2" size="lg" :icon="['fas', 'trash-can']" />
                                    </a> 
                                </div>                                
                            </div>                               
                        </div>  
                        <div class="mt-4 w-full flex justify-center">
                            <button href="#" v-on:click="" class="bg-blue-600 text-white ps-2 pe-2 pt-1 pb-1 rounded-md"> 
                                Adicionar autor <font-awesome-icon :icon="['fas', 'user-plus']" />
                            </button> 
                        </div>                            
                    </label>
                </div>  
                <div class="... bg-white border-2 rounded-xl border-gray px-5 pb-5 pt-3 mt-2">
                    <label class="block">
                        <span class="text-sm text-gray-700">Nome dos orientadores <span class="text-red-500 font-semibold">*</span></span>
                        <input type="text"
                            class="block w-full mt-1 border-gray-300 rounded-md focus:border-gray-800 focus:ring focus:ring-opacity-40 focus:ring-gray-800"
                            v-model="advisors" />
                    </label>
                </div>                   
                <div class="... bg-white border-2 rounded-xl border-gray px-5 pb-5 pt-3 mt-2">                      
                    <label class="block">
                        <span class="text-sm text-gray-700">Resumo <span class="text-red-500 font-semibold">*</span> <br> {{ allowedChars }}</span>
                        <textarea name="" id="" cols="30" rows="5" v-model="summary"
                            class="block w-full mt-1 border-gray-300 rounded-md focus:border-gray-800 focus:ring focus:ring-opacity-40 focus:ring-gray-800"></textarea>
                    </label>
                </div>    
                <div class="... bg-white border-2 rounded-xl border-gray px-5 pb-5 pt-3 mt-2">
                    <label class="block">
                        <span class="text-sm text-gray-700">Palavras chaves <span class="text-red-500 font-semibold">*</span></span>
                        <input type="text"
                            class="block w-full mt-1 border-gray-300 rounded-md focus:border-gray-800 focus:ring focus:ring-opacity-40 focus:ring-gray-800"
                            v-model="keywords" />
                    </label>
                </div>                         
            </div>
            <div class="mt-5">
                <div class="flex justify-end">
                    <button type="submit" :disabled="isLoading"
                        class="px-12 py-2 text-sm text-center text-white bg-gray-900 rounded-md focus:outline-none font-bold">
                        <span v-if="isLoading == false">
                            <font-awesome-icon :icon="['fas', 'floppy-disk']" /> &nbsp; Enviar
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
            </div>
        </form>        
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from 'vue';
import router from "../../router"
import { IArticleState, articleAdd, submissionDetails, authorDelete } from '../../hooks/useArticle';
import { eventDetails } from '../../hooks/useEvent';
import Swal from "sweetalert2"
import Spinner from "../../components/Spinner.vue"

export default defineComponent({
    setup(){
        const state: IArticleState = reactive({
            isLoading: false,
            message: ''
        })
        
        const eventID = ref()
        const articleID = ref()
        const pageTitle = ref("")
        const id = ref("")
        const title = ref("")
        const authors = ref("")
        const advisors = ref("")
        const keywords = ref("")
        const summary = ref("")
        const status = ref("")
        const course = ref("")      
        const article_status = ref("")  
        const infoLoaded = ref(false)
        const eventName = ref("")
        const allowedChars = ref("")

        return {
            ...toRefs(state),            
            eventID,
            articleID,
            pageTitle,
            id,
            title,
            authors,
            advisors,
            keywords,
            summary,
            status,
            course,    
            article_status,     
            infoLoaded,      
            eventName,      
            allowedChars,   
        }
    }, 
    methods: {   
        async loadPageSettings() {
            this.eventID = sessionStorage.getItem('event-id-selected')
            this.articleID = this.$route.params.articleid

            if (this.eventID == undefined && this.articleID == '') {
                Swal.fire({
                    icon: 'error', 
                    title: 'Evento ou artigo não selecionado!',
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
                router.push('/events')
            }      
           
            if (sessionStorage.getItem('article-added') == 'n' && this.articleID == '') { 
                await this.createArticle()
            } else {
                await this.loadArticle(this.articleID)
            }              
        },  
        async createArticle() {
            const article = await articleAdd({
                'event': this.eventID,
                'title': ' ',
                'authors': ' ',
                'advisors': ' ',
                'keywords': ' ',
                'summary': ' ',
                'status': 1
            })                
            sessionStorage.setItem('article-added', 'y')            
            this.infoLoaded = true                        
            this.loadArticle(article.returnid)
            router.push(`/submit/${article.returnid}`)    
        },  
        async loadArticle(articleID) {                    
            const resultArticle = await submissionDetails('author', articleID)                            
            if (resultArticle.value == undefined) {
                Swal.fire({
                    icon: 'error', 
                    title: 'Artigo não encontrado!',
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
                router.push('/events')
            }

            this.eventID = resultArticle.value['event']                
            const resultEvent = await eventDetails(this.eventID)               
            
            this.title = resultArticle.value['title'] != ' ' ? resultArticle.value['title'] : ''
            this.authors = resultArticle.value['authors'] != ' ' ? resultArticle.value['authors'] : ''
            this.advisors = resultArticle.value['advisors'] != ' ' ? resultArticle.value['advisors'] : ''
            this.keywords = resultArticle.value['keywords'] != ' ' ? resultArticle.value['keywords'] : ''
            this.summary = resultArticle.value['summary'] != ' ' ? resultArticle.value['summary'] : ''        
            this.eventName = ' - ' + resultEvent.value['name']
            this.allowedChars = ' Número de caracteres permitidos: ' + resultEvent.value['number_characters']
            this.infoLoaded = true            
        },
        delAuthor(authorID) {
            Swal.fire({
                title: "Tem certeza?",
                html: `Você está prestes a excluir. Está certo disso?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sim, excluir!",
                cancelButtonText: "Cancelar",
            }).then(async (result) => {
                if (result.isConfirmed) {   
                    this.infoLoaded = false                 
                    const result = await authorDelete(this.$route.params.articleid, authorID)

                    if (result.status == 'success') {                
                        Swal.fire({
                            icon: 'success', 
                            title: 'Author excluído com sucesso',
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
                    }  
                    this.loadArticle(this.$route.params.articleid)                     
                }
            })     
        },
        showBtnDelAuthor(author) {
            return author != localStorage.getItem('user-id')
        },
        async saveArticle() {
            console.log(this.$route.params.articleid) 
            console.log(this.title)           
        },      
    },
    beforeMount() {              
        this.loadPageSettings()             
        this.pageTitle = 'Submissão'               
    },    
    components: { Spinner }
})

</script>