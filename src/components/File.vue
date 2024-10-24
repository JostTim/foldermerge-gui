<script setup lang="ts">

import ButtonAPI from './ButtonAPI.vue'
import Path from './Path.vue'

interface File {
    key: string;
    value: string;
    file_uuid: string;
    file_matches: string[];
}


defineProps<{
    file: File
}>()
</script>

<template>
    <div class="file-container">
        <table class="file-content hint-target highlighteable" :data-matches-uuids="file.file_matches">
            <tbody>
                <tr class="additional-info">
                    <td>
                        <div :class="`category_key category_${file.key}`">{{ file.key }}</div>
                    </td>
                    <td>
                        <Path :fullpath="file.value"></Path>
                    </td>

                </tr>
            </tbody>
        </table>
        <div class="stretch"></div>
        <ButtonAPI title="Copy file to reference 📥" :endpoint="`${file.file_uuid}_copier`"></ButtonAPI>
        <ButtonAPI title="Delete file 🗑" :endpoint="`${file.file_uuid}_deleter`"></ButtonAPI>
    </div>
</template>

<style scoped>
.category_key {
    display: inline-block;
    font-weight: bold;
    margin-right: 50px;
    padding: 2px;
    padding-left: 6px;
    padding-right: 6px;
    border-radius: 5px;
    border-style: solid;
    border-color: var(--color-border);
    border-width: 1px;
    color: var(--color-text);
    background-color: var(--color-background-soft);
    transition: background-color 1s ease, color 1s ease, border-color 0.3s ease;
}

.file-content {
    position: relative;
    padding: 0px 2px;
    margin-bottom: 0px;
}

.file-content:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: inherit;
    border-radius: inherit;
    transition: opacity 0.3s ease;
    opacity: 0;
    z-index: -1;
}

.file-content:hover:before {
    opacity: 1;
}

.file-content:hover .category_key {
    background-color: var(--color-background);
    color: var(--color-heading);
}

.file-container {
    display: flex;
    flex-direction: row;
    margin-bottom: 3px;
    align-items: stretch;
}

table {
    margin-bottom: 0px;
}

table tr:last-child {
    margin-bottom: 2px;
}

.stretch {
    margin-top: 19px;
    margin-left: 10px;
    margin-right: 10px;
    flex-grow: 1;
    border-width: 1px;
    border-style: solid;
    border-top: 1px;
    border-color: var(--color-border);
    height: 1px;

}

.files .file-container:first-child .file-content {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}

.files .file-container:last-child .file-content {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
}
</style>
