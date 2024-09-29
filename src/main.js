import {HTMLGen} from '../lib/sgen-html.js'
import {JSGen} from '../lib/sgen-js.js'

class HtmlCssJSGen {
    run(ast, symtab, main_args, opts) {
        const html_gen = HTMLGen()
        const js_gen = JSGen()
        js_gen.init(ast, symtab, html_gen, main_args, opts)
        return js_gen.run()
    }
}

export {HtmlCssJSGen}