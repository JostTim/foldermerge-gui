<script setup lang="ts">
import File from './File.vue'

interface File {
    key: string;
    value: string;
    file_uuid: string;
    file_matches: string[];
}

interface Folder {
    name: string;
    files: File[];
    folders: Folder[];
}

defineProps<{
    folder: Folder,
}>()


function toggleOpen(target: EventTarget | null) {
    if (target === null) {
        return;
    }
    let element = target as HTMLElement;
    element.classList.toggle('open');
    element.parentNode?.querySelector('.files')?.classList.toggle('open');
    element.parentNode?.querySelector('.folders')?.classList.toggle('open');
}

</script>

<template>
    <div class="folder-container">
        <li class="folder-title highlighteable" @click="toggleOpen($event.currentTarget)">
            {{ folder.name }}
        </li>
        <ul class="files">
            <File :file=file v-for="file in folder.files">
            </File>
        </ul>
        <div class="folders">
            <Folder :folder=folder open=false v-for="folder in folder.folders"></Folder>
        </div>
    </div>
</template>

<style scoped>
.folder-title {
    margin-bottom: 3px;
    cursor: pointer;
    padding: 7px 15px;
    list-style: none;
}

.folder-title:before {
    content: '▶';
    display: inline-block;
    margin-right: 10px;
    transition: transform 0.3s ease;
    transform: rotate(0deg);
}

.folder-title.open:before {
    transform: rotate(90deg);
}

.files {
    margin: 0px;
    padding-left: 30px;
    display: none;
}

.files.open {
    display: block;
}

.folders {
    display: none;
}

.folders.open {
    display: block;
}

.folder-container {
    padding-left: 30px;
}
</style>