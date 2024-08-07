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
                        <a v-if="activeBtnByRole('admin') && status == 'approved'" href="#" v-on:click="editMode = !editMode" class="mr-4 bg-gray-900 text-white rounded-md py-1 px-3">{{ editMode ? 'Desabilitar' : 'Habilitar' }} edição <font-awesome-icon size="lg" :icon="['fas', 'pen-to-square']" /> </a>
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
                        <input type="text" :disabled="!infoLoaded || !editMode"
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
                        <div v-if="authors[0] != undefined" class="mb-4">
                            <div v-for="author in authors" class="grid grid-cols-2 gap-4 md:grid-cols-2 xl:grid-cols-2">                                        
                                <div class="... mt-1">
                                    <span class="text-sm text-gray-700">Nome</span>                                    
                                    <input :value="author.name" disabled type="text" class="block w-full max-h-10 mt-1 border-gray-300 rounded-md"/>
                                </div>
                                <div class="... mt-1">
                                    <span class="text-sm text-gray-700">E-mail</span>                                    
                                    <div class="flex">
                                        <input :value="author.email" disabled type="text" class="w-full max-h-10 block mt-1 border-gray-300 rounded-md"/>                                
                                        <a v-if="userIsLogged(author.id) && editMode" href="#" v-on:click="delAuthor(author.id)" class="ms-2 bg-red-600 text-white ps-2 pe-2 pt-1 pb-1 rounded-md"> 
                                            <font-awesome-icon class="mt-2" size="lg" :icon="['fas', 'trash-can']" />
                                        </a> 
                                    </div>                                
                                </div>                               
                            </div>                          
                        </div>
                        <div v-else-if="infoLoaded" class="mb-2">
                            <p class="text-sm"> Nenhum autor inserido. </p>
                        </div>
                        <div v-if="editMode && infoLoaded" class="w-full flex justify-center">
                            <button type="button" v-on:click="showAuthorModal" class="bg-blue-600 text-white ps-2 pe-2 pt-1 pb-1 rounded-md"> 
                                Adicionar autor <font-awesome-icon :icon="['fas', 'user-plus']" />
                            </button> 
                        </div>                            
                    </label>
                </div>  
                <div class="... bg-white border-2 rounded-xl border-gray px-5 pb-5 pt-3 mt-2">                    
                    <label class="block">
                        <span class="text-sm text-gray-700">Co-orientadores</span>    
                        <span v-if="!advisorLoaded">
                            <Spinner />
                        </span>  
                        <div v-if="showCoAdvisorAndAdvisor(1, advisors)" class="mb-4">
                            <div v-for="advisor in advisors"> 
                                <div v-if="advisor.is_coadvisor == 1" class="grid grid-cols-2 gap-4 md:grid-cols-2 xl:grid-cols-2">                                                                        
                                    <div class="... mt-1">
                                        <span class="text-sm text-gray-700">Nome</span>
                                        <input :value="advisor.name" disabled type="text" class="block w-full max-h-10 mt-1 border-gray-300 rounded-md"/>
                                    </div>
                                    <div class="... mt-1">                                    
                                        <span class="text-sm text-gray-700">E-mail</span>                                 
                                        <div class="flex">
                                            <input :value="advisor.email" disabled type="text" class="w-full max-h-10 border-gray-300 block mt-1 rounded-md"/>                                
                                            <a v-if="userIsLogged(advisor.id) && editMode" href="#" v-on:click="delAdvisor(advisor.id)" class="ms-2 bg-red-600 text-white ps-2 pe-2 pt-1 pb-1 rounded-md"> 
                                                <font-awesome-icon class="mt-2" size="lg" :icon="['fas', 'trash-can']" />
                                            </a> 
                                        </div>                                
                                    </div>                                                                
                                </div>                                      
                            </div>                                         
                        </div>      
                        <div v-else-if="infoLoaded">
                            <p class="text-sm">Nenhum co-orientador inserido.</p>
                        </div>                                                                                                                                   
                    </label>
                    <hr class="my-3">
                    <label class="block">
                        <span class="text-sm text-gray-700">Orientadores <span class="text-red-500 font-semibold">*</span></span>    
                        <span v-if="!advisorLoaded">
                            <Spinner />
                        </span>  
                        <div v-if="showCoAdvisorAndAdvisor(0, advisors)" class="mb-4">
                            <div v-for="advisor in advisors"> 
                                <div v-if="advisor.is_coadvisor == 0" class="grid grid-cols-2 gap-4 md:grid-cols-2 xl:grid-cols-2">                                                                        
                                    <div class="... mt-1">
                                        <span class="text-sm text-gray-700">Nome</span>
                                        <input :value="advisor.name" disabled type="text" class="block w-full max-h-10 mt-1 border-gray-300 rounded-md"/>
                                    </div>
                                    <div class="... mt-1">                                    
                                        <span class="text-sm text-gray-700">E-mail</span>                                 
                                        <div class="flex">
                                            <input :value="advisor.email" disabled type="text" class="w-full max-h-10 border-gray-300 block mt-1 rounded-md"/>                                
                                            <a v-if="userIsLogged(advisor.id) && editMode" href="#" v-on:click="delAdvisor(advisor.id)" class="ms-2 bg-red-600 text-white ps-2 pe-2 pt-1 pb-1 rounded-md"> 
                                                <font-awesome-icon class="mt-2" size="lg" :icon="['fas', 'trash-can']" />
                                            </a> 
                                        </div>                                
                                    </div>                                                                
                                </div>                                      
                            </div>                                         
                        </div>      
                        <div v-else-if="infoLoaded">
                            <p class="text-sm">Nenhum orientador inserido.</p>
                        </div>                                                                                                                                   
                    </label>
                    <div v-if="editMode && infoLoaded" class="w-full flex justify-center">
                        <button :disable="infoLoaded" type="button" v-on:click="showAdvisorModal" class="bg-blue-600 text-white ps-2 pe-2 pt-1 pb-1 rounded-md"> 
                            Adicionar orientador <font-awesome-icon :icon="['fas', 'user-plus']" />
                        </button> 
                    </div>   
                </div>                    
                <div class="... bg-white border-2 rounded-xl border-gray px-5 pb-5 pt-3 mt-2">                      
                    <label class="block">
                        <span class="text-sm text-gray-700">Resumo <span class="text-red-500 font-semibold">*</span> <br> Número de caracteres permitidos: {{ allowedChars }} - {{ summary.split('').length }} preenchidos</span>
                        <textarea name="" id="" cols="30" rows="5" v-model="summary" :disabled="!infoLoaded || !editMode"
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
                            <div v-if="isEmpty(keywords)">
                                <p class="text-sm">Nenhuma palavra inserida.</p>
                            </div>
                            <div v-if="editMode && infoLoaded" class="flex">
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
                        <div class="flex mb-1" v-for="(ref, index) in references" :key="index">
                            <input type="text" :value="ref.reference" :ref="'inputRef' + index" :disabled="!infoLoaded || !editMode"
                                class="block w-full max-h-10 mt-1 border-gray-300 rounded-md focus:border-gray-800 focus:ring focus:ring-opacity-40 focus:ring-gray-800"/>
                            <a v-if="editMode" href="#" v-on:click="editReference(ref.id, index)" title="Salvar alterações na referência" class="ms-2 mt-1 bg-gray-900 text-white ps-2 pe-2 pt-1 pb-1 rounded-md">                                 
                                <font-awesome-icon class="mt-1" size="lg" :icon="['fas', 'floppy-disk']" />
                            </a> 
                            <a v-if="editMode" href="#" v-on:click="delReference(ref.id)" title="Excluir referência" class="ms-2 mt-1 bg-red-600 text-white ps-2 pe-2 pt-1 pb-1 rounded-md"> 
                                <font-awesome-icon class="mt-1" size="lg" :icon="['fas', 'trash-can']" />
                            </a> 
                        </div>
                    </label>
                    <div v-if="isEmpty(references)" class="mt-2">
                        <p class="text-sm">Nenhuma referência inserida.</p>
                    </div>
                    <div v-if="editMode && infoLoaded" class="mt-2 w-full flex justify-center">
                        <button type="button" v-on:click="showReferenceModal" class="bg-blue-600 text-white ps-2 pe-2 pt-1 pb-1 rounded-md"> 
                            Adicionar referência <font-awesome-icon :icon="['fas', 'circle-plus']" />
                        </button> 
                    </div>  
                </div>                          
            </div>            
            <div v-if="activeBtnByRole('author') && editMode" class="flex justify-end">
                <button type="button" :disabled="isLoading" v-on:click="submitArticle()"
                    class="absolute bottom-6 right-6 px-12 py-2 text-sm text-center text-white bg-gray-900 rounded-md focus:outline-none font-bold">
                    <span v-if="!isLoading">
                        <font-awesome-icon :icon="['fas', 'floppy-disk']" /> &nbsp; Enviar
                    </span>
                    <span v-else>
                        <Loading />
                    </span>
                </button>                
            </div>   
            <div v-if="activeBtnByRole('advisor') && editMode" class="flex justify-end">
                <div class="absolute bottom-6 right-6">
                    <button v-on:click="exportArticle()" type="button" class="px-12 py-2 mr-2 text-sm text-center text-white bg-blue-800 rounded-md focus:outline-none font-bold">                                    
                        <font-awesome-icon :icon="['fas', 'file-word']" /> &nbsp; Exportar                                     
                    </button>

                    <button v-on:click="approveArticle()" type="button" class="px-12 py-2 mr-2 text-sm text-center text-white bg-green-800 rounded-md focus:outline-none font-bold">                                    
                        <font-awesome-icon :icon="['fas', 'arrow-up-from-bracket']" /> &nbsp; Aprovar                                     
                    </button>

                    <button v-on:click="returnToAuthor()" type="button" class="px-12 py-2 mr-2 text-sm text-center text-white bg-orange-800 rounded-md focus:outline-none font-bold">                                    
                        <font-awesome-icon :icon="['fas', 'right-left']" /> &nbsp; Devolver para o aluno                                     
                    </button>

                    <button type="button" :disabled="isLoading" v-on:click="saveArticle()"
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
            <div v-if="activeBtnByRole('admin') && status == 'approved'" class="flex justify-end">
                <div class="absolute bottom-6 right-6">
                    <button v-on:click="exportArticle()" type="button" class="px-12 py-2 mr-2 text-sm text-center text-white bg-blue-800 rounded-md focus:outline-none font-bold">                                    
                        <font-awesome-icon :icon="['fas', 'file-word']" /> &nbsp; Exportar                                     
                    </button>

                    <button v-on:click="finalizeArticle()" type="button" class="px-12 py-2 mr-2 text-sm text-center text-white bg-green-800 rounded-md focus:outline-none font-bold">                                    
                        <font-awesome-icon :icon="['fas', 'arrow-up-from-bracket']" /> &nbsp; Finalizar                                     
                    </button>                   

                    <button v-if="editMode" type="button" :disabled="isLoading" v-on:click="saveArticle()"
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
                <div v-for="comment in comments">
                    <div class="flex w-full items-start gap-2.5 mt-3" v-if="userIsLogged(comment.user_id)">
                        <span class="text-gray-700"><font-awesome-icon size="xl" :icon="['fas', 'user']" /></span>                    
                        <div class="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                            <div class="flex items-center space-x-2 rtl:space-x-reverse">
                                <span class="text-sm font-semibold text-gray-900 dark:text-white">{{ comment.user_name }}</span>
                                <span class="text-sm font-normal text-gray-500 dark:text-gray-400">{{ formatDateComments(comment.created_at) }}</span>
                            </div>
                            <p class="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{{ comment.comment }}</p>                        
                        </div>                               
                    </div>
                    <div class="flex items-start gap-2.5 mt-3 mb-3 float-end" v-else>                        
                        <div class="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-b-xl rounded-tl-xl dark:bg-green-800">
                            <div class="flex items-center space-x-2 rtl:space-x-reverse">
                                <span class="text-sm font-semibold text-gray-900 dark:text-white">{{ comment.user_name }}</span>
                                <span class="text-sm font-normal text-gray-500 dark:text-gray-400">{{ formatDateComments(comment.created_at) }}</span>
                            </div>
                            <p class="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{{ comment.comment }}</p>                        
                        </div>                               
                        <span class="text-green-800"><font-awesome-icon size="xl" :icon="['fas', 'user']" /></span>                    
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
                    <div class="bg-gray-300 p-2 rounded">                                                
                        <div class="grid grid-cols-3 gap-4">
                            <div class="col-start-1 col-end-8 ...">
                                <p>Nome: {{ author.name }}</p>
                                <p>E-mail: <a :href="author.email" class="text-blue-700">{{ author.email }}</a></p>
                            </div>                            
                            <div class="col-end-10 col-span-2 m-auto">
                                <a href="#" v-on:click="addAuthor(author.id)" class="bg-blue-600 text-white px-3 py-1 rounded-md">Adicionar <font-awesome-icon :icon="['fas', 'user-plus']" /></a>
                            </div>
                        </div>
                    </div>                    
                </div>    
                <div v-if="!search_author_data && search_author_loaded" class="bg-gray-300 p-3 rounded mt-3">
                    <p>Nenhum autor encontrado</p>
                </div>
            </div>
        </template>
    </Modal>

    <!-- Modal de adição dos orientadores -->
    <Modal v-show="isModalAdvisorVisible" @some-event="showAdvisorModal">
        <template #header>
            <p class="text-xl">Adição de orientadores</p>
        </template>
        <template #body>
            <div class="px-5 py-5 mt-0">
                <form @submit.prevent="">
                    <label class="block">
                        <span class="text-sm text-gray-700">Informe o nome ou e-mail para buscar:</span>
                        <div class="flex">
                            <input type="text"
                                class="block w-full mt-1 border-gray-300 rounded-md focus:border-gray-800 focus:ring focus:ring-opacity-40 focus:ring-gray-800"
                                placeholder="Exemplo: João Vi..."                                                        
                                v-model="search_advisor_info"/>
                            <button class="bg-gray-300 ml-2 rounded p-3" v-on:click="searchAdvisors()"><font-awesome-icon :icon="['fas', 'magnifying-glass']" /></button>  
                        </div>                        
                    </label>   
                </form>

                <span v-if="!search_advisor_loaded" class="flex justify-center mt-2">
                    <Spinner />
                </span>                
                <div v-for="advisor in search_advisor_data" class="mt-3">                    
                    <div class="bg-gray-300 p-2 rounded">                        
                        <div class="grid grid-cols-3 gap-4">
                            <div class="col-start-1 col-end-8 ...">
                                <p>Nome: {{ advisor.name }}</p>
                                <p>E-mail: <a :href="advisor.email" class="text-blue-700">{{ advisor.email }}</a></p>
                            </div>                            
                            <div class="col-end-10 col-span-2 m-auto">
                                <a href="#" v-on:click="addAdvisor(advisor.id)" class="bg-blue-600 text-white px-3 py-1 rounded-md">Adicionar <font-awesome-icon :icon="['fas', 'user-plus']" /></a>
                            </div>
                        </div>
                    </div>                    
                </div>    
                <div v-if="!search_advisor_data && search_advisor_loaded" class="bg-gray-300 p-3 rounded mt-3">
                    <p>Nenhum orientador encontrado</p>
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
import { 
    IArticleState, 
    articleAdd, 
    submissionDetails, 
    articleAddAdvisor, 
    articleEditReference,
    articleEditStatus, 
    articleAddComment, 
    articleDelAuthor, 
    articleDelAdvisor,
    articleAddAuthor, 
    articleEditKeywords, 
    articleAddReference, 
    articleDelReference,
    articleSubmit, 
    articleExport
} from '../../hooks/useArticle';
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
        
        const editMode = ref(true)
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
        const advisorLoaded = ref(false)
        const eventName = ref("")
        const allowedChars = ref()
        const isModalAuthorVisible = ref(false)
        const isModalAdvisorVisible = ref(false)
        const isModalReferenceVisible = ref(false)
        const isModalCommentsVisible = ref(false)      
        const search_author_info = ref("")
        const search_author_data = ref()
        const search_author_loaded = ref(true)
        const search_advisor_info = ref("")
        const search_advisor_data = ref()
        const search_advisor_loaded = ref(true)

        return {
            ...toRefs(state),            
            editMode,
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
            advisorLoaded,
            eventName,      
            allowedChars,   
            isModalAuthorVisible,
            isModalAdvisorVisible,
            isModalReferenceVisible,
            isModalCommentsVisible,
            search_author_info,
            search_author_data,
            search_author_loaded,
            search_advisor_info,
            search_advisor_data,
            search_advisor_loaded,
        }
    }, 
    methods: {   
        getArticleID() {
            return this.$route.params.articleid
        },
        async loadPage() {
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
            
            if (getUserRole(true) == 'ADMIN') {
                this.editMode = false
            }
        },  
        async createArticle() {
            Toast().fire({icon: 'info', title: 'Aguarde, estamos configurando seu artigo'})         
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
            Toast().fire({icon: 'success', title: 'Artigo configurado! Preencha os campos'})         
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
            this.status = resultArticle.value['status']
            this.advisors = resultArticle.value['advisors'] != ' ' ? resultArticle.value['advisors'] : ''
            this.keywords = resultArticle.value['keywords'] != ' ' ? (resultArticle.value['keywords']).split(';') : []
            this.summary = resultArticle.value['summary'] != ' ' ? resultArticle.value['summary'] : ''        
            this.references = resultArticle.value['references']
            this.comments = resultArticle.value['comments'][0] != undefined ? resultArticle.value['comments'] : ''
            this.eventName = ' - ' + resultEvent.value['name']
            this.allowedChars = resultEvent.value['number_characters']
            this.infoLoaded = true   
            this.authorLoaded = true
            this.advisorLoaded = true
            this.keywordLoaded = true       
            this.referenceLoaded = true
                        
            if (getUserRole(true) == 'AUTHOR' && ! ['in_submission', 'in_correction'].includes(this.status)) {
                this.editMode = false
            }
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
        async searchAdvisors(){                  
            this.search_advisor_data = ref()            
            if (this.search_advisor_info == '') {            
                Toast().fire({icon: 'warning', title: 'Informe o nome ou e-mail para buscar!'})                         
                return
            }                   
            this.search_advisor_loaded = false     
            const result = (await userList('advisor', { 'user_info': this.search_advisor_info, 'article_id': this.getArticleID() })).value
            if (result[0] != undefined) {
                this.search_advisor_data = result
            }            
            this.search_advisor_loaded = true
        },
        async addAuthor(authorID) {
            Toast().fire({icon: 'info', title: 'Carregando...'})
            this.authorLoaded = false

            const result = await articleAddAuthor(this.getArticleID(), authorID)

            if (result.status == 'success') {
                this.isModalAuthorVisible = false
                this.loadAuthors()
                Toast().fire({icon: 'success', title: 'Autor inserido com sucesso'})
            }
        },
        async addAdvisor(advisorID) {       
            this.search_advisor_info = ""
            this.search_advisor_data = ref()                 
            Swal.fire({                
                html: `Adicionar como:`,
                icon: "question",
                showCancelButton: true,
                showDenyButton: true,
                confirmButtonColor: "#3085d6",
                denyButtonColor: "#111827",
                confirmButtonText: "Orientador",
                denyButtonText: "Co-orientador",
                cancelButtonText: "Cancelar",
            }).then(async (modal) => {     
                if (modal.isConfirmed) {
                    this.advisorLoaded = false
                    const result = await articleAddAdvisor(this.getArticleID(), advisorID, 0)
                    if (result.status == 'success') {
                        this.isModalAdvisorVisible = false
                        this.loadAdvisors()
                        Toast().fire({icon: 'success', title: 'Orientador inserido com sucesso'})
                    }
                } else if (modal.isDenied) {
                    this.advisorLoaded = false
                    const result = await articleAddAdvisor(this.getArticleID(), advisorID, 1)
                    if (result.status == 'success') {
                        this.isModalAdvisorVisible = false
                        this.loadAdvisors()
                        Toast().fire({icon: 'success', title: 'Co-orientador inserido com sucesso'})
                    }
                }                                 
            })               
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
            }).then(async (modal) => {
                if (modal.isConfirmed) {   
                    this.authorLoaded = false                 
                    const result = await articleDelAuthor(this.getArticleID(), authorID)

                    if (result.status == 'success') {                                      
                        Toast().fire({icon: 'success', title: 'Autor excluído com sucesso!'})                
                    }  
                    this.loadAuthors()               
                }
            })     
        },  
        delAdvisor(advisorID) {
            Swal.fire({
                title: "Tem certeza?",
                html: `Você está prestes a excluir. Está certo disso?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sim, excluir!",
                cancelButtonText: "Cancelar",
            }).then(async (modal) => {
                if (modal.isConfirmed) {   
                    this.advisorLoaded = false                 
                    const result = await articleDelAdvisor(this.getArticleID(), advisorID)

                    if (result.status == 'success') {                                      
                        Toast().fire({icon: 'success', title: 'Orientador excluído com sucesso!'})                
                    }  
                    this.loadAdvisors()               
                }
            })     
        },  
        async loadAuthors() {
            const result = await submissionDetails(getUserRole(true).toLowerCase(), this.getArticleID())                            
            this.authors = result.value['authors']
            this.authorLoaded = true
        },
        async loadAdvisors() {
            const result = await submissionDetails(getUserRole(true).toLowerCase(), this.getArticleID())                            
            this.advisors = result.value['advisors']
            this.advisorLoaded = true
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
        async delKeyword(key_by_remove) {  
            if (!this.editMode) {
                Toast().fire({icon: 'info', title: 'Não é possível excluir'})
                return    
            }

            Toast().fire({icon: 'info', title: 'Carregando...'})
            this.keywordLoaded = false

            let keys = (this.keywords.filter(item => item !== key_by_remove)).toString().replaceAll(',', ';')
      
            const result = await articleEditKeywords(this.getArticleID(), keys == '' ? ' ' : keys)

            if (result.status == 'success') {                
                this.loadKeywords()
                Toast().fire({icon: 'success', title: 'Palavra removida com sucesso'})
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
            }).then(async (modal) => {
                if (modal.isConfirmed) {  
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
            }).then(async (modal) => {
                if (modal.isConfirmed) { 
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
        async editReference(refID, index) {            
            const inputRefValue = this.$refs['inputRef' + index] as HTMLInputElement[];
            if (inputRefValue && inputRefValue[0]) {                
                Toast().fire({icon: 'info', title: 'Carregando...'})  
                this.referenceLoaded = false

                const result = await articleEditReference(this.getArticleID(), refID, inputRefValue[0].value)
                    
                if (result.status == 'success') {                
                    Toast().fire({icon: 'success', title: 'Referência atualizada!'})   
                    this.loadReferences()                       
                } else {
                    Toast().fire({icon: 'error', title: result.message})  
                }
            }
        },  
        async submitArticle() {
            if (this.title == '') {
                Toast().fire({icon: 'warning', title: 'Informe o título!'})
                return
            }
            if (this.summary == '') {
                Toast().fire({icon: 'warning', title: 'Informe o resumo!'})
                return
            }
            if (this.summary.length > parseInt(this.allowedChars)) {
                Toast().fire({icon: 'warning', title: 'Resumo excede a quantidade de caracteres!'})
                return
            }
            if (this.isEmpty(this.advisors)) {
                Toast().fire({icon: 'warning', title: 'Informe um orientador!'})
                return
            }
            if (this.isEmpty(this.keywords)) {
                Toast().fire({icon: 'warning', title: 'Informe as palavras chaves!'})
                return
            }
            if (this.isEmpty(this.references)) {
                Toast().fire({icon: 'warning', title: 'Informe as referências bibliográficas!'})
                return
            }
            this.isLoading = true                     
            
            const result = await articleSubmit(this.getArticleID(), this.title, this.summary)

            if (result.status == 'success') {
                if (this.comments[0] != undefined) {
                    const { value: comment } = await Swal.fire({
                        input: "textarea",
                        icon: "question",
                        inputLabel: "Informe o que foi corrigido no artigo",               
                        showCancelButton: true,
                        cancelButtonColor: "#d33",
                        cancelButtonText: "Cancelar",
                        confirmButtonColor: "#3085d6",
                        confirmButtonText: "Confirmar",
                        inputValidator: (value) => {
                            return new Promise((resolve) => {
                                if (value) {
                                    resolve("");
                                } else {
                                    resolve("Preencha essa informação!)");
                                }
                            });
                        }
                    })
                    if (comment) {
                        Swal.fire({
                            title: "Tem certeza?",
                            html: `Você está prestes a enviar esta correção. Está certo disso?`,
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Sim, enviar!",
                            cancelButtonText: "Cancelar",
                        }).then(async (modal) => {
                            if (modal.isConfirmed) { 
                                const result1 = await articleAddComment(this.getArticleID(), comment)
                                const result2 = await articleEditStatus(this.getArticleID(), 2)
                                if (result1.status == 'success' && result2.status == 'success') {                                                    
                                    Toast().fire({icon: 'success', title: 'Artigo submetido com sucesso'})
                                    this.editMode = false
                                } else {
                                    Toast().fire({icon: 'error', title: result1.message + ' ' + result2.message})
                                }   
                                router.push('/events')                           
                            }
                        })      
                    }                                     
                } else {
                    Swal.fire({
                        title: "Tem certeza?",
                        html: `Você está prestes a enviar este artigo. Está certo disso?`,
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Sim, enviar!",
                        cancelButtonText: "Cancelar",
                    }).then(async (modal) => {
                        if (modal.isConfirmed) { 
                            const result = await articleEditStatus(this.getArticleID(), 2)            
                            if (result.status == 'success') {                                                
                                Toast().fire({icon: 'success', title: 'Artigo submetido com sucesso'})
                                this.editMode = false
                            } else {
                                Toast().fire({icon: 'error', title: result.message})
                            }    
                            router.push('/events')
                        }
                    })      
                }         
            } else {
                Toast().fire({icon: 'error', title: result.message})
            }     
            this.isLoading = false                                                
        },      
        async saveArticle() {
            if (this.title == '') {
                Toast().fire({icon: 'warning', title: 'Informe o título'})
                return
            }
            if (this.summary == '') {
                Toast().fire({icon: 'warning', title: 'Informe o resumo'})
                return
            }
            this.isLoading = true

            const result = await articleSubmit(this.getArticleID(), this.title, this.summary)

            if (result.status == 'success') {                
                Toast().fire({icon: 'success', title: 'Artigo salvo com sucesso'})
            } else {
                Toast().fire({icon: 'error', title: result.message})
            }  
            this.isLoading = false            
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
                            resolve("");
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
                }).then(async (modal) => {
                    if (modal.isConfirmed) { 
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
            }).then(async (modal) => {
                if (modal.isConfirmed) {        
                    Toast().fire({icon: 'info', title: 'Carregando...'})            

                    const result = await articleEditStatus(this.getArticleID(), 4)
                    
                    if (result.status == 'success') {                
                        Toast().fire({icon: 'success', title: 'Artigo aprovado!'})     
                        router.push('/submissions')
                    } else {
                        Toast().fire({icon: 'error', title: result.message})  
                    }                        
                }
            });            
        },       
        async finalizeArticle() {
            Swal.fire({
                title: "Tem certeza?",
                html: `Você está prestes a finalizar o artigo "<b>${this.title}</b>". Está certo disso?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sim, finalizar o artigo!",
                cancelButtonText: "Cancelar",
            }).then(async (modal) => {
                if (modal.isConfirmed) {        
                    Toast().fire({icon: 'info', title: 'Carregando...'})            

                    const result = await articleEditStatus(this.getArticleID(), 5)
                    
                    if (result.status == 'success') {                
                        Toast().fire({icon: 'success', title: 'Artigo finalizado!'})
                        router.push('/submissions')                    
                    } else {
                        Toast().fire({icon: 'error', title: result.message})  
                    }                        
                }
            });            
        },          
        async exportArticle() {
            const result = await articleExport(this.getArticleID())
            if (result) {
                Toast().fire({icon: 'success', title: 'Artigo exportado'})
            } else {
                Toast().fire({icon: 'error', title: 'Erro ao exportar artigo'})
            }
        },    
        activeBtnByRole(role) {
            return this.infoLoaded && getUserRole(true).toLowerCase() == role
        },
        formatDateComments(date) {
            return format(new Date(date), 'dd/MM HH:mm')
        }, 
        userIsLogged(author) {            
            return author != localStorage.getItem('user-id')
        },              
        showAuthorModal () {            
            this.search_author_data = ref()
            this.isModalAuthorVisible = !this.isModalAuthorVisible
        },      
        showAdvisorModal () {            
            this.search_advisor_data = ref()
            this.isModalAdvisorVisible = !this.isModalAdvisorVisible
        },
        showReferenceModal() {
            this.isModalReferenceVisible = !this.isModalReferenceVisible
        },
        showCommentsModal() {
            this.isModalCommentsVisible = !this.isModalCommentsVisible
        },
        showCoAdvisorAndAdvisor(flag, advisors) {
            for(let c = 0; c < Object.keys(advisors).length; c++) {
                if (advisors[c].is_coadvisor == flag) {
                    return true
                }             
            }            
            return false
        },
        isEmpty(array) {
            try {
                return Object.keys(array).length == 0
            } catch {
                return false        
            }            
        },
        checkRole() {
            let roles = ['author', 'advisor', 'admin']

            if (! roles.includes(getUserRole(true).toLowerCase())) {
                router.push('/login')
            }
        }
    },
    beforeMount() {                      
        this.checkRole()
        this.loadPage()             
        this.pageTitle = 'Submissão'                  
    },    
    components: { Spinner, Loading, Modal }
})
</script>