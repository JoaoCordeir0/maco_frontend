<template>
    <button
        @click="filter = !filter"
        class="relative z-10 block h-9 text-bold bg-blue-700 text-white ps-4 pe-4 rounded">
        <font-awesome-icon :icon="['fas', 'filter']" />  <span class="hidden md:inline">Filtros</span>
    </button>
    <div
        v-show="filter"
        @click="filter = false"
        class="fixed inset-0 z-10 w-full h-full">        
    </div>
    <transition
        enter-active-class="transition duration-150 ease-out transform"
        enter-from-class="scale-95 opacity-0"
        enter-to-class="scale-100 opacity-100"
        leave-active-class="transition duration-150 ease-in transform"
        leave-from-class="scale-100 opacity-100"
        leave-to-class="scale-95 opacity-0">
        <div
            v-show="filter"
            class="absolute right-10 z-20 p-3 mt-2 bg-white rounded-md shadow-xl border-2">               
            <p>Filtro por curso</p>
            <select v-model="course" @change="$emit('someEvent', { course: course, event: event })" class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full">
                <option value="0" selected>Todos os cursos</option>    
                <option v-for="item in courses" v-bind:value="item.id">{{ item.name }}</option>                        
            </select>
            <br>
            <p>Filtro por evento</p>
            <select v-model="event" @change="$emit('someEvent', { course: course, event: event })" class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full">
                <!-- <option value="0" selected>Todos os eventos</option> -->
                <option v-for="item in events" v-bind:value="item.id">{{ item.name }}</option>                        
            </select>
        </div>
    </transition>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { courseListByUser } from '../../hooks/useCourse';
import { eventList } from '../../hooks/useEvent';

export default defineComponent({
    async setup(){       
        const events = await eventList()        
        const filter = ref(false);        
        const status = ref(4)
        const course = ref(0)
        const event = ref(events.value[0]['id'])
        const courses = ref()        

        return {            
            filter,            
            status,
            course,
            event,
            events,
            courses,            
        }
    },    
    methods: {
        async loadCourses() {
            const result = await courseListByUser()                                            
            this.courses = result
        },         
    },
    beforeMount() {
        this.loadCourses()              
        this.$emit('someEvent', { course: this.course, event: this.event })
    }  
})
</script>