<script setup lang="ts">

defineProps<{
    title: string
    endpoint: string
}>()

</script>

<template>
    <div class="action-button highlighteable" :id="endpoint">{{ title }}</div>
</template>

<style scoped>
.action-button {
    width: 190px;
    line-height: 30px;
    align-content: center;
    text-align: center;
    display: inline-block;
    vertical-align: middle;
    margin-left: 3px;
    user-select: none;

}

.action-button:hover {
    cursor: pointer;
    transition: background-color 0.1s ease, border-color 0.1s ease;
}

.action-button:active:hover {
    background-color: var(--color-green);
    border-color: var(--color-text);
    color: var(--color-heading);
    translate: 1px 1px;
}
</style>