<script setup lang="ts">
import { useTimeStore } from '@/store/timer';


const timreStore = useTimeStore()

function savechanges() {
    setTimeout(()=>{
        localStorage.setItem('timers', JSON.stringify(timreStore.timers))
    }, 50)
}
</script>

<template>
    <button @click="savechanges()">
        <slot></slot>
    </button>
</template>

<style>
button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #0056b3;
}

button:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
}
</style>./Button.vue