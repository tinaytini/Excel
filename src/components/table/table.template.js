const CODES = {
    A: 'A'.charCodeAt(0),
    Z: 'Z'.charCodeAt(0)
}
const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function getWidth(state = {}, index) {
    return (state[index] || DEFAULT_WIDTH) + 'px'
}

function getHeight(state = {}, index) {
    return (state[index] || DEFAULT_HEIGHT) + 'px'
}

function createCell(state, row) {
    return function(_, col) {
        const id = `${row}:${col}`
        const width = `${getWidth(state.colState, col)}`
        const data = state.dataState[id]
        console.log(state)
        return `
        <div   
            class="cell" 
            contenteditable 
            data-type="cell"
            data-col="${col}"
            data-id="${id}"
            style="width: ${width}"
        >${data || ''}</div>
    `
    }
    
}

function createCol({col, index, width}) {
    return `
    <div 
        class="column" 
        data-type="resizable" 
        data-col="${index}"
        style="width:${width}"
    >
        ${col}
        <div 
            class="col-resize" 
            data-resize="col"
        ></div>
    </div>
    `
}

function createRow(index, content, state) {
    const resizer = index ? `<div class="row-resize"  data-resize="row"></div>` : ''
    const height = getHeight(state, index)
    return `
        <div 
            class="row" 
            data-type="resizable" 
            data-row="${index}"
            style="height: ${height}"
        >
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

function withWidthFrom(state) {
    return function(col, index) {
        return {
            col, index, width: getWidth(state.colState, index)
        }
    }
}

export function createTable(rowsCount = 30, state) {
    console.log(state)
    const colsCount = CODES.Z - CODES.A + 1;
    const rows = []

    const cols = new Array(colsCount)
        .fill('')
        .map(toChar) // (_, index) { return String.fromCharCode(CODES.A + index)}
        .map(withWidthFrom(state))
        .map(createCol)
        .join('')

    rows.push(createRow(null, cols))

    for (let row=0; row<rowsCount; row++) {
        const cells = new Array(colsCount)
        .fill('')
        .map(createCell(state, row))
        .join('')
    
    rows.push(createRow(row + 1, cells, state.rowState))
    }
    

    return rows.join('')
}