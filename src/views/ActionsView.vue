<script setup lang="ts">
import { ref, onMounted } from 'vue';
import FilesPanel from '../components/FilesPanel.vue'
import axios from 'axios';

// const files = [{key: "Prout", value: "thing/prout/blabla", file_uuid: "zdaz", file_matches: ["187165"] },
//                 {key: "Prout", value:  "thing/prout/blabla", file_uuid: "187165", file_matches: [] }]

const files = ref([]);
                
onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/data');
    console.log(response.data);
    files.value = response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});


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