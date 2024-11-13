import { Excel } from "./components/excel/Excel";
import { Formula } from "./components/formula/Formula";
import { Header } from "./components/header/Header";
import { Modal } from "./components/modal/modal";
import { Table } from "./components/table/Table";
import { Toolbar } from "./components/toolbar/Toolbar";
import { CreateStore } from "./core/createStore";
import { rootReducer } from "./redux/rootReducer";
import { storage } from "./core/utils";
import './scss/index.scss';

const store = new CreateStore(rootReducer, storage('excel-state'))

store.subscribe(state => {
    console.log('appstate', state)
    storage('excel-state', state)
})

const excel = new Excel('#app', {
    components: [ Header, Toolbar, Formula, Table, Modal],
    store
})

excel.render()
