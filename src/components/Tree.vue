<script setup lang="ts">

import Folder from './Folder.vue'

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
    tree: Folder,
}>()
</script>

<template>
    <div class="tree_view">
        <Folder :folder="tree"></Folder>
    </div>
</template>
