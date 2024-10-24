<script setup lang="ts">

const props = defineProps<{
    fullpath: string
}>()

const name = props.fullpath.split('/').pop()
const root = props.fullpath.split('/').slice(0, -1).join('/')

function copyContentToClipboard(target: EventTarget | null) {
    if (target === null) {
        return;
    }
    const element = target as HTMLElement;
    let content = element.innerText
    navigator.clipboard.writeText(content).then(function () {
        console.log('Content ' + content + ' copied to clipboard successfully!')
        flashElement(element);
        showCopiedPopup(element);
    }, function (err) {
        console.error('Unable to copy to clipboard', err);
    });
}

function copyFullpathToClipboard(target: EventTarget | null) {
    if (!target) {
        return;
    }
    const element = target as HTMLElement;
    navigator.clipboard.writeText(props.fullpath).then(function () {
        console.log('Fullpath ' + props.fullpath + ' copied to clipboard successfully!')
        const fullpath_node = element.parentNode?.querySelector('.fullpath')
        if (!fullpath_node) {
            return;
        }
        fullpath_node.querySelectorAll('.cell')?.forEach(cell => {
            transparizeElement(cell);
        });
        showCopiedPopup(fullpath_node);
        flashElement(fullpath_node);
    }, function (err) {
        console.error('Unable to copy to clipboard', err);
    });
}

function flashElement(element: Element) {
    element.classList.add('flashing');
    setTimeout(function () {
        element.classList.remove('flashing');
    }, 50);

}

const timeoutsMap = new WeakMap<Element, number[]>();

function transparizeElement(element: Element) {
    // Retrieve existing timeouts or initialize a new array
    const timeouts = timeoutsMap.get(element) || [];

    // Clear existing timeouts
    timeouts.forEach(clearTimeout);

    element.classList.add('pre-transparized');

    timeouts.push(setTimeout(function () {
        element.classList.add('transparized');
    }, 50));

    timeouts.push(setTimeout(function () {
        element.classList.remove('transparized');
    }, 500));

    timeouts.push(setTimeout(function () {
        element.classList.remove('pre-transparized');
    }, 510));

    // Store the updated timeouts array back in the WeakMap
    timeoutsMap.set(element, timeouts);
}

function showCopiedPopup(target: Element) {
    let parent = target;

    //get parent that is the path class node
    while (!parent.classList.contains('path')) {
        if (!parent.parentElement) {
            return;
        }
        parent = parent.parentElement;
    }
    if (!parent) {
        return;
    }

    const popup = parent.querySelector('.copied-popup') as HTMLElement;

    if (!popup) {
        return;
    }



    const timeouts = timeoutsMap.get(popup) || [];
    timeouts.forEach(clearTimeout);

    popup.classList.remove("hidden");
    popup.classList.remove("fade-out");

    timeouts.push(setTimeout(function () {
        popup.classList.add('fade-out');
    }, 900));

    timeouts.push(setTimeout(function () {
        popup.classList.add('hidden');
    }, 1900));

    timeoutsMap.set(popup, timeouts);

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    const targetRect = target.getBoundingClientRect();

    let left = targetRect.left;
    let top = targetRect.top;

    popup.style.left = `${left}px`;
    popup.style.top = `${top}px`;

    popup.offsetHeight; // Accessing offsetHeight triggers a reflow

    const popupRect = popup.getBoundingClientRect();

    console.log("targetRect");
    console.log(targetRect);
    console.log("popupRect");
    console.log(popupRect);
}

</script>

<template>
    <div class="path">
        <div class="fullpath">
            <span class="cell" @click="copyContentToClipboard($event.currentTarget)">
                {{ root }}
            </span>
            <span>/</span>
            <span class="cell" @click="copyContentToClipboard($event.currentTarget)">
                {{ name }}
            </span>
        </div>
        <span class="copy-button" @click="copyFullpathToClipboard($event.currentTarget)">🔗</span>
        <div class="copied-popup hidden">Copied !</div>
    </div>
</template>

<style scoped>
.copy-button {
    color: inherit;
    cursor: pointer;
    user-select: none;
}

.path {
    display: flex;
    align-items: center;
}

.cell {
    display: inline-block;
    font-weight: normal;
    padding: 2px;
    padding-left: 6px;
    padding-right: 6px;
    background-color: var(--color-background-mute);
}

.cell:hover {
    border-color: var(--color-green);
    background-color: var(--color-background);
}

.fullpath,
.cell {
    margin: 0px;
    transition: background-color 0.5s ease, color 0.5s ease, border-color 0.5s ease;
    border-radius: 5px;
    border-style: solid;
    border-width: 1px;
    border-color: var(--color-border);
    color: var(--color-heading);
}

.fullpath {
    border-color: transparent;
}

.fullpath.flashing {
    color: var(--color-heading);
}

.pre-transparized {
    transition: background-color 0s, color 0s, border-color 0s;
}

.transparized {
    border-color: transparent;
    background-color: transparent;
}

.flashing {
    background-color: var(--color-green) !important;
    color: var(--color-background);
    border-color: var(--color-background) !important;
    transition: background-color 0s, color 0s, border-color 0s;
}

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
    bottom: -10px;
    /* Adjust as needed */
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

.copied-popup.fade-out {
    opacity: 0;
}

.copied-popup.hidden {
    display: none;
    transition: none;
}
</style>