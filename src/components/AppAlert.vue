<script>
export default {
    name: 'AppAlert',
    props: {
        isOpen: Boolean,
        dismissible: Boolean,
        type: String | null
    },
    emits: ['close']
}
</script>


<template>
    <div v-if="isOpen" class="alert fade show" :class="[{ 'alert-dismissible': dismissibile }, `alert-${type ?? 'danger'}`]"
        role="alert">
        <slot></slot>
        <button v-if="dismissible" type="button" class="btn-close" @click="$emit('close')"></button>
    </div>
</template>