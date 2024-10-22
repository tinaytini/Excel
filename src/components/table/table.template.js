const CODES = {
    A: 'A'.charCodeAt(0),
    Z: 'Z'.charCodeAt(0)
}

function createCell() {
    return `
        <div class="cell" contenteditable></div>
    `
}

function createCol(col) {
    return `
    <div class="column">
        ${col}
        <div class="col-resize" data-resize="col"></div>
    </div>
    `
}

function createRow(index, content) {
    const resizer = index ? `<div class="row-resize"  data-resize="row"></div>` : ''
    return `
        <div class="row">
            <div class="row_info">
                ${index ? index : ''}
                ${resizer}
            </div>
            <div class="row_data">
            ${content}
            </div>
        </div>
    `
}

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 30) {
    const colsCount = CODES.Z - CODES.A + 1;
    const rows = []

    const cols = new Array(colsCount)
        .fill('')
        .map(toChar) // (_, index) { return String.fromCharCode(CODES.A + index)}
        .map(createCol) //el => createCol(el)
        .join('')

    rows.push(createRow(null, cols))

    const cells = new Array(colsCount)
        .fill('')
        .map(createCell)
        .join('')
    
    for (let i=0; i<rowsCount; i++) {
        rows.push(createRow(i + 1, cells))
    }
    

    return rows.join('')
}