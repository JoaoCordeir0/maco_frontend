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
                        <a v-if="comments != ''" href="#" v-on:click="showCommentsModal()" class="mr-4 bg-cyan-600 text-white rounded-md py-1 px-3">Comentários <font-awesome-icon size="xl" :icon="['fas', 'comment-dots']" /></a>
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
                        <span v-if="!authorLoaded">
                            <Spinner />
                        </span>                                
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
                                <span v-if="!keywordLoaded">
                                    <Spinner />
                                </span>
                            </div>
                            <div class="flex">
                                <input type="text" :disabled="!infoLoaded"
                                class="block w-72 max-h-10 mt-1 border-gray-300 rounded-md focus:border-gray-800 focus:ring focus:ring-opacity-40 focus:ring-gray-800"
                                v-model="keyword" />
                                <button class="ms-2 mt-2 mb-3 bg-blue-600 text-white ps-2 pe-2 pt-1 pb-1 rounded-md"> 
                                    Adicionar palavra <font-awesome-icon :icon="['fas', 'circle-plus']" />
                                </button> 
                            </div>                          
                        </label>
                    </form>
                </div> 
                <div class="... bg-white border-2 rounded-xl border-gray px-5 pb-5 pt-3 mt-2">                      
                    <label class="block">
                        <span class="text-sm text-gray-700">Referências bibliográficas <span class="text-red-500 font-semibold">*</span></span>
                        <span v-if="!referenceLoaded">
                            <Spinner />
                        </span>
                        <div class="flex mb-1" v-for="ref in references">
                            <input type="text" :value="ref.reference"
                                class="block w-full max-h-10 mt-1 border-gray-300 rounded-md focus:border-gray-800 focus:ring focus:ring-opacity-40 focus:ring-gray-800"/>
                            <a href="#" v-on:click="editReference()" class="ms-2 mt-1 bg-blue-600 text-white ps-2 pe-2 pt-1 pb-1 rounded-md">                                 
                                <font-awesome-icon class="mt-1" size="lg" :icon="['fas', 'pen-to-square']" />
                            </a> 
                            <a href="#" v-on:click="delReference(ref.id)" class="ms-2 mt-1 bg-red-600 text-white ps-2 pe-2 pt-1 pb-1 rounded-md"> 
                                <font-awesome-icon class="mt-1" size="lg" :icon="['fas', 'trash-can']" />
                            </a> 
                        </div>
                    </label>
                    <div class="mt-4 w-full flex justify-center">
                        <button type="button" v-on:click="showReferenceModal" class="bg-blue-600 text-white ps-2 pe-2 pt-1 pb-1 rounded-md"> 
                            Adicionar referência <font-awesome-icon :icon="['fas', 'circle-plus']" />
                        </button> 
                    </div>  
                </div>                          
            </div>            
            <div v-if="activeBtnByRole('author')" class="flex justify-end">
                <button type="button" :disabled="isLoading" v-on:click="submitAticle('author')"
                    class="absolute bottom-6 right-6 px-12 py-2 text-sm text-center text-white bg-gray-900 rounded-md focus:outline-none font-bold">
                    <span v-if="!isLoading">
                        <font-awesome-icon :icon="['fas', 'floppy-disk']" /> &nbsp; Enviar
                    </span>
                    <span v-else>
                        <Loading />
                    </span>
                </button>                
            </div>   
            <div v-if="activeBtnByRole('advisor')" class="flex justify-end">
                <div class="absolute bottom-6 right-6">
                    <button type="button" class="px-12 py-2 mr-2 text-sm text-center text-white bg-blue-800 rounded-md focus:outline-none font-bold">                                    
                        <font-awesome-icon :icon="['fas', 'file-word']" /> &nbsp; Exportar                                     
                    </button>

                    <button v-on:click="approveArticle()" type="button" class="px-12 py-2 mr-2 text-sm text-center text-white bg-green-800 rounded-md focus:outline-none font-bold">                                    
                        <font-awesome-icon :icon="['fas', 'arrow-up-from-bracket']" /> &nbsp; Aprovar                                     
                    </button>

                    <button v-on:click="returnToAuthor()" type="button" class="px-12 py-2 mr-2 text-sm text-center text-white bg-orange-800 rounded-md focus:outline-none font-bold">                                    
                        <font-awesome-icon :icon="['fas', 'right-left']" /> &nbsp; Devolver para o aluno                                     
                    </button>

                    <button type="button" :disabled="isLoading" v-on:click="submitAticle('advisor')"
                        class="px-12 py-2 text-sm text-center text-white bg-gray-900 rounded-md focus:outline-none font-bold">
                        <span v-if="!isLoading">
                            <font-awesome-icon :icon="['fas', 'floppy-disk']" /> &nbsp; Salvar
                        </span>
                        <span v-else>
                            <Loading />
                        </span>
                    </button>
                </div>
            </div>         
        </form>        
    </div>

    <!-- Modal dos comentarios -->
    <Modal v-show="isModalCommentsVisible" @some-event="showCommentsModal">
        <template #header>
            <p class="text-xl">Comentários</p>
        </template>
        <template #body>
            <div class="px-5 pb-5 pt-1">                
                <div class="flex items-start gap-2.5 mt-3" v-for="comment in comments">
                    <span class="text-gray-700"><font-awesome-icon size="xl" :icon="['fas', 'user']" /></span>
                    <!-- <img class="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="Jese image"> -->
                    <div class="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                        <div class="flex items-center space-x-2 rtl:space-x-reverse">
                            <span class="text-sm font-semibold text-gray-900 dark:text-white">{{ comment.name }}</span>
                            <span class="text-sm font-normal text-gray-500 dark:text-gray-400">{{ formatDateComments(comment.created_at) }}</span>
                        </div>
                        <p class="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{{ comment.comment }}</p>                        
                    </div>                               
                </div>            
            </div>
        </template>
    </Modal>

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

    <!-- Modal de adição de referências -->
    <Modal v-show="isModalReferenceVisible" @some-event="showReferenceModal">
        <template #header>
            <p class="text-xl">Referências bibliográficas</p>
        </template>
        <template #body>
            <div class="px-5 py-5 mt-0">
                <form @submit.prevent="">
                    <label class="block">
                        <span class="text-sm text-gray-700">Informe a referência:</span>                        
                        <input type="text"
                            class="block w-full mt-1 border-gray-300 rounded-md focus:border-gray-800 focus:ring focus:ring-opacity-40 focus:ring-gray-800"
                            placeholder="Exemplo: João V. Cordeiro 2024"                                                        
                            v-model="reference"/>                                                    
                    </label>   
                    <div class="mt-4 w-full flex justify-center">
                        <button type="submit" v-on:click="addReference()" class="bg-blue-600 text-white ps-2 pe-2 pt-1 pb-1 rounded-md"> 
                            Adicionar <font-awesome-icon :icon="['fas', 'circle-plus']" />
                        </button> 
                    </div>  
                </form>                                    
            </div>
        </template>
    </Modal>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from 'vue';
import router from "../../router"
import { IArticleState, articleAdd, submissionDetails, articleEditStatus, articleAddComment, authorDelete, articleAddAuthor, articleEditKeywords, articleAddReference, articleDelReference, articleSubmit } from '../../hooks/useArticle';
import { eventDetails } from '../../hooks/useEvent';
import { userList } from '../../hooks/useUser';
import Swal from "sweetalert2"
import Spinner from "../../components/Spinner.vue"
import { Toast } from '../../hooks/useToast';
import Modal from '../../components/Modal.vue';
import Loading from '../../components/Loading.vue';
import { format } from 'date-fns';
import { getUserRole } from '../../hooks/useAuth';

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
        const references = ref("")
        const reference = ref("")
        const course = ref("")   
        const comments = ref("")   
        const article_status = ref("")  
        const infoLoaded = ref(false)
        const keywordLoaded = ref(false)
        const referenceLoaded = ref(false)
        const authorLoaded = ref(false)
        const eventName = ref("")
        const allowedChars = ref("")
        const isModalAuthorVisible = ref(false)
        const isModalReferenceVisible = ref(false)
        const isModalCommentsVisible = ref(false)      
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
            references,
            reference,
            course,    
            comments,
            article_status,     
            infoLoaded,      
            keywordLoaded,
            referenceLoaded,
            authorLoaded,
            eventName,      
            allowedChars,   
            isModalAuthorVisible,
            isModalReferenceVisible,
            isModalCommentsVisible,
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
            const resultArticle = await submissionDetails(getUserRole(true).toLowerCase(), articleID)                            
            if (resultArticle.value == undefined) {            
                Toast().fire({icon: 'error', title: 'Artigo não encontrado!'})         
            }

            this.eventID = resultArticle.value['event']                
            const resultEvent = await eventDetails(this.eventID)               
            
            this.title = resultArticle.value['title'] != ' ' ? resultArticle.value['title'] : ''
            this.authors = resultArticle.value['authors']
            this.advisors = resultArticle.value['advisors'] != ' ' ? resultArticle.value['advisors'] : ''
            this.keywords = resultArticle.value['keywords'] != ' ' ? (resultArticle.value['keywords']).split(';') : []
            this.summary = resultArticle.value['summary'] != ' ' ? resultArticle.value['summary'] : ''        
            this.references = resultArticle.value['references']
            this.comments = resultArticle.value['comments'][0] != undefined ? resultArticle.value['comments'] : ''
            this.eventName = ' - ' + resultEvent.value['name']
            this.allowedChars = ' Número de caracteres permitidos: ' + resultEvent.value['number_characters']
            this.infoLoaded = true   
            this.authorLoaded = true
            this.keywordLoaded = true       
            this.referenceLoaded = true 
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
            Toast().fire({icon: 'info', title: 'Carregando...'})
            this.authorLoaded = false

            const result = await articleAddAuthor(this.getArticleID(), authorID)

            if (result.status == 'success') {
                this.isModalAuthorVisible = false
                this.loadAuthors()
                Toast().fire({icon: 'success', title: 'Author inserido com sucesso'})
            }
        },
        async loadAuthors() {
            const result = await submissionDetails(getUserRole(true).toLowerCase(), this.getArticleID())                            
            this.authors = result.value['authors']
            this.authorLoaded = true
        },
        async addKeyword() {
            if (this.keyword.trim().length === 0) {            
                Toast().fire({icon: 'warning', title: 'Informe a palavra-chave'})                         
                return
            } 

            Toast().fire({icon: 'info', title: 'Carregando...'})
            this.keywordLoaded = false

            let keys = this.keywords.toString().replaceAll(',', ';') 
            if (keys != '') {
                keys = keys + '; ' + this.keyword
            } else {
                keys = this.keyword
            }
            const result = await articleEditKeywords(this.getArticleID(), keys)

            if (result.status == 'success') {                
                this.loadKeywords()
                this.keyword = ''
                Toast().fire({icon: 'success', title: 'Palavra inserida com sucesso'})
            }            
        },
        async loadKeywords() {
            const result = await submissionDetails(getUserRole(true).toLowerCase(), this.getArticleID())                            
            this.keywords = result.value['keywords'] != ' ' ? (result.value['keywords']).split(';') : []   
            this.keywordLoaded = true        
        },
        async addReference() {
            if (this.reference.trim().length === 0) {            
                Toast().fire({icon: 'warning', title: 'Informe a referência bibliográfica'})                         
                return
            } 
            Swal.fire({
                title: "Tem certeza?",
                html: `Você está prestes a inserir a referência: "<b>${this.reference}</b>" Está certo disso?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sim, adicionar!",
                cancelButtonText: "Cancelar",
            }).then(async (result) => {
                if (result.isConfirmed) {  
                    Toast().fire({icon: 'info', title: 'Carregando...'}) 
                    this.referenceLoaded = false             
                    const result = await articleAddReference(this.getArticleID(), this.reference)

                    if (result.status == 'success') {                                      
                        Toast().fire({icon: 'success', title: 'Referência bibliográfica inserida com sucesso!'})                
                    }  
                    this.isModalReferenceVisible = false
                    this.loadReferences()                     
                }
            })     
        },
        async loadReferences() {
            const result = await submissionDetails(getUserRole(true).toLowerCase(), this.getArticleID())                            
            this.references = result.value['references'] 
            this.referenceLoaded = true        
        },
        async delKeyword(key_by_remove) {  
            Toast().fire({icon: 'info', title: 'Carregando...'})
            this.keywordLoaded = false

            let keys = (this.keywords.filter(item => item !== key_by_remove)).toString().replaceAll(',', ';')
      
            const result = await articleEditKeywords(this.getArticleID(), keys == '' ? ' ' : keys)

            if (result.status == 'success') {                
                this.loadKeywords()
                Toast().fire({icon: 'success', title: 'Palavra removida com sucesso'})
            }                        
        },
        async delReference(refID) {            
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
                    Toast().fire({icon: 'info', title: 'Carregando...'})  
                    this.referenceLoaded = false                 
                    const result = await articleDelReference(this.getArticleID(), refID)

                    if (result.status == 'success') {                                      
                        Toast().fire({icon: 'success', title: 'Referência excluída com sucesso!'})                
                    }  
                    this.loadReferences()                     
                }
            })             
        },
        async submitAticle(role) {
            if (this.title == '') {
                Toast().fire({icon: 'warning', title: 'Informe o título'})
                return
            }
            if (this.summary == '') {
                Toast().fire({icon: 'warning', title: 'Informe o resumo'})
                return
            }
            this.isLoading = true

            const result1 = await articleSubmit(this.getArticleID(), this.title, this.summary)

            if (role == 'author') {
                const result2 = await articleEditStatus(this.getArticleID(), 2)
            
                if (result1.status == 'success' && result2.status == 'success') {                
                    router.push('/events')
                    Toast().fire({icon: 'success', title: 'Artigo submetido com sucesso'})
                } else {
                    Toast().fire({icon: 'error', title: result1.message + result2.message})
                }  
            } else if (role == 'advisor') {
                if (result1.status == 'success') {                
                    Toast().fire({icon: 'success', title: 'Artigo salvo com sucesso'})
                } else {
                    Toast().fire({icon: 'error', title: result1.message})
                }  
                this.isLoading = false
            }
            
        },
        async returnToAuthor() {
            const { value: comment } = await Swal.fire({
                input: "textarea",
                icon: "question",
                inputLabel: "Informe o que deve ser corrigido no artigo.",               
                showCancelButton: true,
                cancelButtonColor: "#d33",
                cancelButtonText: "Cancelar",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Confirmar",
                inputValidator: (value) => {
                    return new Promise((resolve) => {
                        if (value) {
                            resolve();
                        } else {
                            resolve("Preencha essa informação!)");
                        }
                    });
                }
            })

            if (comment) {
                Swal.fire({
                    title: "Tem certeza?",
                    html: `Você está prestes a devolver este artigo para os autores. Está certo disso?`,
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Sim, devolver para o aluno!",
                    cancelButtonText: "Cancelar",
                }).then(async (result) => {
                    if (result.isConfirmed) { 
                        Toast().fire({icon: 'info', title: 'Carregando...'})

                        const resultStatus = await articleEditStatus(this.getArticleID(), 3)
                        const resultComment = await articleAddComment(this.getArticleID(), comment)

                        if (resultStatus.status == 'success' && resultComment.status == 'success') {                
                            Toast().fire({icon: 'success', title: 'Artigo devolvido para o aluno!'})     
                            router.push('/submissions')
                        } else {
                            Toast().fire({icon: 'error', title: resultStatus.message + ' ' + resultComment.message})  
                        }                            
                    }
                })      
            }                  
        },
        async approveArticle() {
            Swal.fire({
                title: "Tem certeza?",
                html: `Você está prestes a aprovar o artigo "<b>${this.title}</b>". Está certo disso?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sim, aprovar o artigo!",
                cancelButtonText: "Cancelar",
            }).then(async (result) => {
                if (result.isConfirmed) {        
                    Toast().fire({icon: 'info', title: 'Carregando...'})            

                    const result = await articleEditStatus(this.getArticleID(), 4)
                    
                    if (result.status == 'success') {                
                        Toast().fire({icon: 'success', title: 'Artigo aprovado!'})     
                        router.push('/submissions')
                    } else
                        Toast().fire({icon: 'error', title: result.message})  
                }
            });            
        },
        editReference() {
            
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
                    this.authorLoaded = false                 
                    const result = await authorDelete(this.getArticleID(), authorID)

                    if (result.status == 'success') {                                      
                        Toast().fire({icon: 'success', title: 'Autor excluído com sucesso!'})                
                    }  
                    this.loadAuthors()               
                }
            })     
        },     
        activeBtnByRole(role) {
            return this.infoLoaded && getUserRole(true).toLowerCase() == role
        },
        formatDateComments(date) {
            return format(new Date(date), 'dd/MM hh:m')
        }, 
        showBtnDelAuthor(author) {
            return author != localStorage.getItem('user-id')
        },      
        showAuthorModal () {            
            this.isModalAuthorVisible = !this.isModalAuthorVisible
        },      
        showReferenceModal() {
            this.isModalReferenceVisible = !this.isModalReferenceVisible
        },
        showCommentsModal() {
            this.isModalCommentsVisible = !this.isModalCommentsVisible
        },
    },
    beforeMount() {              
        this.loadPageSettings()             
        this.pageTitle = 'Submissão'               
    },    
    components: { Spinner, Loading, Modal }
})
</script>