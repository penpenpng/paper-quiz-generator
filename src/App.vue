<template lang="pug">
#app
    #dropbox(
        v-if="csv.length <= 0"
        @dragenter.stop.prevent
        @dragover.stop.prevent
        @drop.stop.prevent="onDrop")
            span Drop CSV Here!
    #paper(v-else)
        Entry(
            v-for="(quiz, i) in csv" :key="i"
            :entry-number="i + 1"
            :question="quiz.question"
            :answer="quiz.answer")
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import parse from "csv-parse/lib/sync"
import { readTextFile } from "@/scripts/util"
import Entry from "@/components/Entry.vue"

@Component({
    components: { Entry }
})
export default class App extends Vue {
    csv: Array<Quiz> = []

    onDrop(ev: DragEvent) {
        if (!ev.dataTransfer) return
        if (ev.dataTransfer.files.length > 1) {
            alert("一度に複数のファイルを読み込むことはできません。")
            return
        }

        const file = ev.dataTransfer.files[0]

        readTextFile(file)
            .then(text => {
                this.csv = parse(text, {columns: ["question", "answer"]})
            })
            .catch(err => alert(`${err}\nTips: 2列のcsvファイルのみ読み込むことができます。`))
    }
}
</script>

<style lang="stylus" src="@/assets/style/common.stylus"></style>
<style scoped lang="stylus">
#dropbox
    display flex
    justify-content center
    align-items center
    width 100vw
    height 100vh
</style>
