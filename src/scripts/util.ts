export function readTextFile(file: File): Promise<string> {
    return new Promise(function (resolve, reject) {
        const fr = new FileReader()
        fr.addEventListener("error", reject)
        fr.addEventListener("load", () => resolve(fr.result as string))
        fr.readAsText(file)
    })
}
