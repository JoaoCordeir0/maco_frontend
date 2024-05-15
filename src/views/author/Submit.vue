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
        <form class="mt-4 mb-5" aria-disabled="true">
            <div class="grid grid-cols-1 gap-4 md:grid-cols-1 xl:grid-cols-1 mb-14">                
                <div class="... bg-white border-2 rounded-xl border-gray px-5 pb-5 pt-3 mt-2">
                    <label class="block">
                        <span class="text-sm text-gray-700">Título do Artigo <span class="text-red-500 font-semibold">*</span></span>
                        <input type="text" :disabled="!infoLoaded"
                            class="block w-full max-h-10 mt-1 border-gray-300 rounded-md focus:border-gray-800 focus:ring focus:ring-opacity-40 focus:ring-gray-800"
                            v-model="title" />
                    </label>
                </div>                               
                <div class="... bg-white border-2 rounded-xl border-gray px-5 pb-5 pt-3 mt-2">
                    <label class="block">
                        <span class="text-sm text-gray-700">Autores <span class="text-red-500 font-semibold">*</span></span>                                    
                        <div v-for="author in authors" class="grid grid-cols-2 gap-4 md:grid-cols-2 xl:grid-cols-2">                                        
                            <div class="... mt-1">
                                <span class="text-sm text-gray-700">Nome</span>                                    
                                <input :value="author.name" disabled type="text" class="block w-full max-h-10 mt-1 border-gray-300 rounded-md"/>
                            </div>
                            <div class="... mt-1">
                                <span class="text-sm text-gray-700">E-mail</span>                                    
                                <div class="flex">
                                    <input :value="author.email" disabled type="text" class="w-full max-h-10 block mt-1 border-gray-300 rounded-md"/>                                
                                    <a v-if="showBtnDelAuthor(author.id)" href="#" v-on:click="delAuthor(author.id)" class="ms-2 bg-red-600 text-white ps-2 pe-2 pt-1 pb-1 rounded-md"> 
                                        <font-awesome-icon class="mt-2" size="lg" :icon="['fas', 'trash-can']" />
                                    </a> 
                                </div>                                
                            </div>                               
                        </div>  
                        <div class="mt-4 w-full flex justify-center">
                            <button type="button" v-on:click="showAuthorModal" class="bg-blue-600 text-white ps-2 pe-2 pt-1 pb-1 rounded-md"> 
                                Adicionar autor <font-awesome-icon :icon="['fas', 'user-plus']" />
                            </button> 
                        </div>                            
                    </label>
                </div>  
                <div class="... bg-white border-2 rounded-xl border-gray px-5 pb-5 pt-3 mt-2">
                    <label class="block">
                        <span class="text-sm text-gray-700">Nome dos orientadores <span class="text-red-500 font-semibold">*</span></span>
                        <input type="text" :disabled="!infoLoaded"
                            class="block w-full max-h-10 mt-1 border-gray-300 rounded-md focus:border-gray-800 focus:ring focus:ring-opacity-40 focus:ring-gray-800"
                            v-model="advisors" />
                    </label>
                </div>                   
                <div class="... bg-white border-2 rounded-xl border-gray px-5 pb-5 pt-3 mt-2">                      
                    <label class="block">
                        <span class="text-sm text-gray-700">Resumo <span class="text-red-500 font-semibold">*</span> <br> {{ allowedChars }}</span>
                        <textarea name="" id="" cols="30" rows="5" v-model="summary" :disabled="!infoLoaded"
                            class="block w-full mt-1 border-gray-300 rounded-md focus:border-gray-800 focus:ring focus:ring-opacity-40 focus:ring-gray-800"></textarea>
                    </label>
                </div>    
                <div class="... bg-white border-2 rounded-xl border-gray px-5 pb-5 pt-3 mt-2">
                    <form @submit.prevent="addKeyword()">
                        <label class="block">
                            <span class="text-sm text-gray-700">Palavras chaves <span class="text-red-500 font-semibold">*</span></span>
                            <div class="my-2">
                                <span v-for="key in keywords" v-on:click="delKeyword(key)" class="bg-gray-700 rounded-lg text-white rounded border-2 border-gray-700 px-3 mr-2 hover:border-red-800 hover:text-red-800 hover:bg-red-400">
                                    <font-awesome-icon :icon="['fas', 'xmark']" class="mr-2" /> {{ key }}
                                </span>
                                <span v-if="!infoLoaded">
                                    <Spinner />
                                </span>
                            </div>
                            <div class="flex">
                                <input type="text" :disabled="!infoLoaded"
                                class="block w-72 max-h-10 mt-1 border-gray-300 rounded-md focus:border-gray-800 focus:ring focus:ring-opacity-40 focus:ring-gray-800"
                                v-model="keyword" />
                                <button class="ms-2 mt-2 mb-3 bg-blue-600 text-white ps-2 pe-2 pt-1 pb-1 rounded-md"> 
                                    Adicionar palavra <font-awesome-icon class="mt-1" :icon="['fas', 'file-circle-plus']" />
                                </button> 
                            </div>                          
                        </label>
                    </form>
                </div>                         
            </div>            
            <div class="flex justify-end">
                <button type="button" :disabled="isLoading" v-on:click="submitAticle()"
                    class="absolute bottom-6 right-6 px-12 py-2 text-sm text-center text-white bg-gray-900 rounded-md focus:outline-none font-bold">
                    <span v-if="!isLoading">
                        <font-awesome-icon :icon="['fas', 'floppy-disk']" /> &nbsp; Enviar
                    </span>
                    <span v-else>
                        <Loading />
                    </span>
                </button>
            </div>            
        </form>        
    </div>

    <!-- Modal de adição dos autores -->
    <Modal v-show="isModalAuthorVisible" @some-event="showAuthorModal">
        <template #header>
            <p class="text-xl">Adição de autores</p>
        </template>
        <template #body>
            <div class="px-5 py-5 mt-0">
                <form @submit.prevent="">
                    <label class="block">
                        <span class="text-sm text-gray-700">Informe o nome, e-mail ou RA para buscar:</span>
                        <div class="flex">
                            <input type="text"
                            class="block w-full mt-1 border-gray-300 rounded-md focus:border-gray-800 focus:ring focus:ring-opacity-40 focus:ring-gray-800"
                            placeholder="Exemplo: João Vi..."                                                        
                            v-model="search_author_info"/>
                            <button class="bg-gray-300 ml-2 rounded p-3" v-on:click="searchAuthors()"><font-awesome-icon :icon="['fas', 'magnifying-glass']" /></button>  
                        </div>                        
                    </label>   
                </form>

                <span v-if="!search_author_loaded" class="flex justify-center mt-2">
                    <Spinner />
                </span>
                <div v-for="author in search_author_data" class="mt-3">                    
                    <div class="bg-gray-300 p-3 rounded">                        
                        <p>{{ author.name }} - <a :href="author.email" class="text-blue-700">{{ author.email }}</a>
                            <a href="#" v-on:click="addAuthor(author.id)" class="bg-blue-600 text-white px-3 rounded-md float-end">Adicionar <font-awesome-icon :icon="['fas', 'user-plus']" /></a>
                        </p>
                    </div>                    
                </div>    
                <div v-if="!search_author_data" class="bg-gray-300 p-3 rounded mt-3">
                    <p>Nenhum autor encontrado</p>
                </div>
            </div>
        </template>
    </Modal>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from 'vue';
import router from "../../router"
import { IArticleState, articleAdd, submissionDetails, authorDelete, articleAddAuthor, articleEditKeywords } from '../../hooks/useArticle';
import { eventDetails } from '../../hooks/useEvent';
import { userList } from '../../hooks/useUser';
import Swal from "sweetalert2"
import Spinner from "../../components/Spinner.vue"
import { Toast } from '../../hooks/useToast';
import Modal from '../../components/Modal.vue';
import Loading from '../../components/Loading.vue';

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
        const keywords = ref()
        const keyword = ref("")
        const summary = ref("")
        const status = ref("")
        const course = ref("")      
        const article_status = ref("")  
        const infoLoaded = ref(false)
        const eventName = ref("")
        const allowedChars = ref("")
        const isModalAuthorVisible = ref(false)
        const search_author_info = ref("")
        const search_author_data = ref()
        const search_author_loaded = ref(true)

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
            keyword,
            summary,
            status,
            course,    
            article_status,     
            infoLoaded,      
            eventName,      
            allowedChars,   
            isModalAuthorVisible,
            search_author_info,
            search_author_data,
            search_author_loaded,
        }
    }, 
    methods: {   
        getArticleID() {
            return this.$route.params.articleid
        },
        async loadPageSettings() {
            this.eventID = sessionStorage.getItem('event-id-selected')
            this.articleID = this.getArticleID()

            if (this.eventID == undefined && this.articleID == '') {        
                Toast().fire({icon: 'error', title: 'Evento ou artigo não selecionado!'})         
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
            this.infoLoaded = false              
            const resultArticle = await submissionDetails('author', articleID)                            
            if (resultArticle.value == undefined) {            
                Toast().fire({icon: 'error', title: 'Artigo não encontrado!'})         
                router.push('/events')
            }

            this.eventID = resultArticle.value['event']                
            const resultEvent = await eventDetails(this.eventID)               
            
            this.title = resultArticle.value['title'] != ' ' ? resultArticle.value['title'] : ''
            this.authors = resultArticle.value['authors'] != ' ' ? resultArticle.value['authors'] : ''
            this.advisors = resultArticle.value['advisors'] != ' ' ? resultArticle.value['advisors'] : ''
            this.keywords = resultArticle.value['keywords'] != ' ' ? (resultArticle.value['keywords']).split(';') : []
            this.summary = resultArticle.value['summary'] != ' ' ? resultArticle.value['summary'] : ''        
            this.eventName = ' - ' + resultEvent.value['name']
            this.allowedChars = ' Número de caracteres permitidos: ' + resultEvent.value['number_characters']
            this.infoLoaded = true            
        },
        async searchAuthors(){                  
            this.search_author_data = ref()
            if (this.search_author_info == '') {            
                Toast().fire({icon: 'warning', title: 'Informe o nome, RA ou e-mail para buscar!'})                         
                return
            }                   
            this.search_author_loaded = false     
            const result = (await userList('author', { 'user_info': this.search_author_info, 'article_id': this.getArticleID() })).value
            if (result[0] != undefined) {
                this.search_author_data = result
            }            
            this.search_author_loaded = true
        },
        async addAuthor(authorID) {
            const result = await articleAddAuthor(this.getArticleID(), authorID)

            if (result.status == 'success') {
                this.isModalAuthorVisible = false
                this.loadArticle(this.getArticleID())
                Toast().fire({icon: 'success', title: 'Author inserido com sucesso'})
            }
        },
        async addKeyword() {
            if (this.keyword.trim().length === 0) {            
                Toast().fire({icon: 'warning', title: 'Informe a palavra-chave'})                         
                return
            } 

            let keys = this.keywords.toString().replaceAll(',', ';') + '; ' + this.keyword
                        
            const result = await articleEditKeywords(this.getArticleID(), keys)

            if (result.status == 'success') {                
                this.loadArticle(this.getArticleID())
                this.keyword = ''
                Toast().fire({icon: 'success', title: 'Palavra inserida com sucesso'})
            }            
        },
        async delKeyword(key_by_remove) {
            let keys = (this.keywords.filter(item => item !== key_by_remove)).toString().replaceAll(',', ';')
            
            const result = await articleEditKeywords(this.getArticleID(), keys)

            if (result.status == 'success') {                
                this.loadArticle(this.getArticleID())
                Toast().fire({icon: 'success', title: 'Palavra removida com sucesso'})
            }                        
        },
        async submitAticle() {
            this.isLoading = true
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
                    const result = await authorDelete(this.getArticleID(), authorID)

                    if (result.status == 'success') {                                      
                        Toast().fire({icon: 'success', title: 'Autor excluído com sucesso!'})                
                    }  
                    this.loadArticle(this.getArticleID())                     
                }
            })     
        },        
        showBtnDelAuthor(author) {
            return author != localStorage.getItem('user-id')
        },      
        showAuthorModal () {            
            this.isModalAuthorVisible = !this.isModalAuthorVisible
        },      
    },
    beforeMount() {              
        this.loadPageSettings()             
        this.pageTitle = 'Submissão'               
    },    
    components: { Spinner, Loading, Modal }
})

</script>