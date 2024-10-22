<script setup lang="ts">
import FileActions from './FileActions.vue'

defineProps<{
    files: Array<{ key: string; value: string; file_uuid: string, file_matches: Array<string> }>, foldername: string
}>()


function toggleOpen(target: EventTarget | null){
    if (target === null) {
        return;
    }
    let element = target as HTMLElement;
    // @ts-ignore
    element.parentNode.classList.toggle('open');
}

</script>

<template>
    <div class="folder-container">
        <li class="folder highlighteable" @click="toggleOpen($event.currentTarget)">
            {{foldername}}
        </li>
        <ul class="folder-content">
            <FileActions :file=file v-for="file in files" :key="file.file_uuid">
            </FileActions>
        </ul>
    </div>


</template>

<style scoped>

.folder {
    margin-bottom: 3px;
    cursor: pointer;
    padding: 7px 15px;
    list-style: none;
}

.folder:before {
    content: '▶';
    display: inline-block;
    margin-right: 10px;
    transition: transform 0.3s ease;
    transform: rotate(0deg);
}

.folder-content {
    margin: 2px;
    padding-left: 30px;
    display: none;
}

.folder-container.open .folder::before{
    transform: rotate(90deg);
}

.folder-container.open .folder-content{
    display: block;
}

</style>