const CODES = {
    A: 'A'.charCodeAt(0),
    Z: 'Z'.charCodeAt(0)
}

function createCell(row) {
    return function(_, col) {
        return `
        <div   
            class="cell" 
            contenteditable 
            data-type="cell"
            data-col="${col}"
            data-id="${row}:${col}"
        ></div>
    `
    }
    
}

function createCol(col, index) {
    return `
    <div class="column" data-type="resizable" data-col="${index}">
        ${col}
        <div class="col-resize" data-resize="col"></div>
    </div>
    `
}

function createRow(index, content) {
    const resizer = index ? `<div class="row-resize"  data-resize="row"></div>` : ''
    return `
        <div class="row" data-type="resizable">
            <div class="row_info" >
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

    for (let row=0; row<rowsCount; row++) {
        const cells = new Array(colsCount)
        .fill('')
        .map(createCell(row))
        .join('')
    
    rows.push(createRow(row + 1, cells))
    }
    

    return rows.join('')
}