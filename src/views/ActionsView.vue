<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Tree from '../components/Tree.vue'
import axios from 'axios';

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

const tree = ref<Folder>({
  name: '',
  files: [],
  folders: []
});

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/data');
    console.log(response.data);
    tree.value = response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});
</script>

<template>
  <main>
    <Tree :tree="tree"></Tree>
  </main>
</template>