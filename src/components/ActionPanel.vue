<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  path: string
}>()

// Example data, replace with actual data source
const fileMatches = ref(['uuid1', 'uuid2']);
const files = ref([
  { key: 'Testfile', value: 'C:/test/mapath/Testfile', file_uuid: 'uuid1' },
  { key: 'Video.avi', value: 'C:/ani/path/amafufu/Video.avi', file_uuid: 'uuid2' }
]);


function showCopiedPopup(target: HTMLElement) {
    const popup = document.createElement('div');
    popup.innerText = 'Copied !';
    popup.className = 'copied-popup';
    document.body.appendChild(popup);

    const targetRect = target.getBoundingClientRect();
    const popupRect = popup.getBoundingClientRect();
    popup.style.left = `${targetRect.left + window.scrollX + targetRect.width / 2}px`;
    popup.style.top = `${targetRect.top + window.scrollY - popupRect.height - 3}px`; // Adjust with a small offset if neede

    setTimeout(() => {
        popup.classList.add('fade-out');
    }, 900); // Start fade-out after 900ms

    popup.addEventListener('animationend', () => {
        document.body.removeChild(popup);
    });
}


function copyToClipboard(path: string, target : EventTarget | null) {
    if (target === null) {
        return;
    }
    const separator = path.includes('/') ? '/' : '\\';
    const dirname = path.substring(0, path.lastIndexOf(separator) + 1);
    console.log(dirname);
    navigator.clipboard.writeText(dirname).then(function () {
        console.log('Path copied to clipboard successfully!');
        let element = target as HTMLElement;
        if (element.classList.contains("material-symbols-outlined")){
            // @ts-ignore
            element = element.parentNode.parentNode.querySelector('.category_value');
        }
        element.classList.add('flashing');
        showCopiedPopup(element);
        setTimeout(function () {
            element.classList.remove('flashing');
        }, 50);
    }, function (err) {
        console.error('Unable to copy to clipboard', err);
    });
}

// function copyToClipboard(target: EventTarget | null) {
//     if (target === null) {
//         return;
//     }
//     const element = target as HTMLElement;
//     const path = element.innerText;
//     const separator = path.includes('/') ? '/' : '\\';
//     const dirname = path.substring(0, path.lastIndexOf(separator) + 1);
//     console.log(dirname)
//     navigator.clipboard.writeText(dirname).then(function () {
//         console.log('Path copied to clipboard successfully!');
//         element.classList.add('flashing');
//         setTimeout(function () {
//             element.classList.remove('flashing');
//         }, 50);

//     }, function (err) {
//         console.error('Unable to copy to clipboard', err);
//     });
// }

</script>

<template>

    <div class = "file-container" v-for="file in files" :key="file.file_uuid">
        <table class="file-content hint-target" data-matches-uuids="{file_matches}">
            <tbody>
                <tr class="additional-info">
                    <td>
                        <div :class="`category_key category_${file.key}`">{{file.key}}</div>
                    </td>
                    <td>
                        <div :class="`category_value category_${file.key}`" @click="copyToClipboard(file.value, $event.currentTarget)">{{file.value}}</div>
                    </td>
                    <td>
                        <span class="material-symbols-outlined" @click="copyToClipboard(file.value, $event.currentTarget)">🔗</span>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="stretch"></div>
        <div class="action-button" :id="`${file.file_uuid}_copier`">Copy file to reference 📥</div>
        <div class="action-button" :id="`${file.file_uuid}_deleter`">Delete file 🗑</div>
    </div>
</template>

<style scoped>

.material-symbols-outlined {
    color: inherit;
    cursor: pointer;
    user-select: none;
}

.action-button {
    width: 190px;
    line-height: 30px;
    align-content: center;
    border-radius: 2px;
    text-align: center;
    display: inline-block;
    vertical-align: middle;
    background-color: var(--color-background-mute);
    color: var(--color-text);
    margin-left: 3px;
    transition: border-color 0.3s ease, background-color 0.3s ease;
    border-style: solid;
    border-width: 1px;
    border-color: var(--color-border);
    user-select: none;
}

.action-button:hover {
    cursor: pointer;
    color: var(--color-heading);
    background-color: var(--color-border-hover);
    border-color: var(--color-green);    
}

.action-button:active  {
    background-color: var(--color-green);
    border-color: var(--color-background-mute);
    color: var(--color-heading);
}

.category_value {
    display: inline-block;
    font-weight: normal;
    padding: 2px;
    padding-left: 6px;
    padding-right: 6px;
    border-radius: 5px;
    color: var(--color-heading);
    background-color: var(--color-background-mute);
    border: solid;
    border-width: 1px;
    border-color: var(--color-border);
    transition: background-color 1s ease, color 1s ease, border-color 0.3s ease;
}

.category_value.flashing {
    background-color: var(--color-green) !important;
    color: var(--color-background);
    border-color: var(--color-background) !important;
    transition: background-color 0s, color 0s, border-color 0s;
}

.category_value:hover{
    border-color: var(--color-green);
}

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
    border-radius: 2px;
    border-style: solid;
    border-width: 1px;
    padding: 0px 5px;
    margin-bottom: 0px;
    transition: background-color 0.3s ease, border-color 0.3s ease;
    color: var(--color-text);
    background-color: var(--color-background-mute);
    border-color: var(--color-border);
    overflow: hidden;
    z-index: 1;
}

.file-content:hover {
    color: var(--color-background-soft);
    background-color: var(--color-border-hover);
    border-color: var(--color-green);
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

.file-content:hover .category_value {
    background-color: var(--color-background);
}

.folder-content .file-content:last-child {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}

.folder-content .file-content:first-child {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
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

.stretch{
    margin-top: 19px;
    margin-left:10px;
    margin-right:10px;
    flex-grow:1;
    border-width:1px;
    border-style:solid;
    border-top: 1px;
    border-color: var(--color-border);
    height:1px;
    
}

</style>

<!-- A non scoped style  -->
<style>
.copied-popup {
    position: absolute;
    transform: translateX(-50%);
    background-color: var(--color-background);
    color: var(--color-heading);
    border-color: var(--color-green);
    padding: 4px;
    border-radius: 5px;
    border-style: solid;
    border-width: 1px;
    white-space: nowrap;
    z-index: 10;
    opacity: 1;
    transition: opacity 1s cubic-bezier(1, 0, 0, 1);
}

.copied-popup::after {
    content: '';
    position: absolute;
    bottom: -10px; /* Adjust as needed */
    left: 50%;
    transform: translateX(-50%);
    border-width: 5px;
    border-style: solid;
    border-color: var(--color-green) transparent transparent transparent;
    display: block;
    width: 0;
    height: 0;
    z-index: 9;
}

.fade-out {
    opacity: 0;
}
</style>

