export function fileType(file: string) {
    if(file === "application/pdf") return "file"
    
    let type = ""

    for(let letter of file) {
        if(letter === "/") break

        type = `${type}${letter}`
    }

    return type
}