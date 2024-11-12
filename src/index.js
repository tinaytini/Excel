import { Excel } from "./components/excel/Excel";
import { Formula } from "./components/formula/Formula";
import { Header } from "./components/header/Header";
import { Modal } from "./components/modal/modal";
import { Table } from "./components/table/Table";
import { Toolbar } from "./components/toolbar/Toolbar";
import { CreateStore } from "./core/createStore";
import { rootReducer } from "./redux/rootReducer";
import './scss/index.scss';

const store = new CreateStore(rootReducer)

const excel = new Excel('#app', {
    components: [ Header, Toolbar, Formula, Table, Modal],
    store
})

excel.render()
