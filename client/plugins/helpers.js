import Vue from 'vue'
import helpers from '~/helpers/general-helpers.js'


const plugin = {
    install () {
        Vue.helpers = helpers
        Vue.prototype.$helpers = helpers
    }
}
Vue.use(plugin)

