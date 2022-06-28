import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex)

import ievar from './modules/ievar'

const store = new vuex.Store({
    modules: {
        ievar: ievar
    }
})

export default store