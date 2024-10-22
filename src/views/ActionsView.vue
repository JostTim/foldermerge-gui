<script setup lang="ts">
import FilesPanel from '../components/FilesPanel.vue'

const files = [{key: "Prout", value: "thing/prout/blabla", file_uuid: "zdaz", file_matches: ["187165"] },
                {key: "Prout", value:  "thing/prout/blabla", file_uuid: "187165", file_matches: [] }]

defineProps<{

}>()

</script>

<template>
    <main>
        <div class="tree_view">
            <FilesPanel :files="files" foldername="Foldername"></FilesPanel>
        </div>
    </main>
</template>