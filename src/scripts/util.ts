import {
    detect,
    convert,
    RawType,
} from "encoding-japanese"

export function readTextFile(file: File): Promise<string> {
    return new Promise(function (resolve, reject) {
        const fr = new FileReader()
        fr.addEventListener("error", () => reject("File-Read Error"))
        fr.addEventListener("load", () => {
            try {
                const encoding = detect(fr.result as RawType)
                const text = convert(fr.result as RawType, {
                    from: encoding,
                    to: "UNICODE",
                    type: "string"
                }) as string
                resolve(text)
            } catch {
                reject("Encoding Error")
            }
        })
        fr.readAsBinaryString(file)
    })
}
