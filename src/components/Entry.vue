<template lang="pug">
.entry
    .entry-number {{ entryNumber }}
    .question {{ question }}
    .answer {{ answer }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"

@Component
export default class Entry extends Vue {
    @Prop({required: true})
    entryNumber!: number

    @Prop({required: true})
    question!: string
    
    @Prop({required: true})
    answer!: string
}
</script>

<style lang="stylus" src="@/assets/style/common.stylus"></style>
<style scoped lang="stylus">
.entry
    display flex
    flex-direction row
    margin 0
    page-break-inside avoid

    .entry-number
        flex 0 0 3em
        text-align right
        border-right 0.5px solid black
        padding-right 0.5em
        padding-bottom 1.5em

    .question
        flex-grow 1
        border-right 0.5px solid black
        padding-right 0.5em
        padding-left 0.5em
        padding-bottom 1.5em
    
    .answer
        flex 0 0 10em
        padding-left 0.5em
        padding-bottom 1.5em
</style>
