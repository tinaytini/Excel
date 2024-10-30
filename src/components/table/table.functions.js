import { range } from "../../core/utils"
export function matrix(target, current) {
    const cols = range(current.col, target.col)
    const rows = range(current.row, target.row)
    console.log(rows)
    const $ids = cols.reduce((acc, col) => {
        rows.forEach(row => acc.push(`${row}:${col}`))
        return acc
    }, [])

    return $ids
}

// export function rowValue(target) {


// }