export function unsluggify(string: string): string {
    return (string.charAt(0).toUpperCase() + string.slice(1)).replace('-', ' ')
}

export function shuffle(array: any[]): any[] {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1))
        var temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }

    return array
}
