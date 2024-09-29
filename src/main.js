import {ArHtmlWriter, HtmlWriter} from '../lib/sgen-html.js'
import {JSGen} from '../lib/sgen-js.js'

class HtmlCssJSGen {
    run(ast, symtab, main_args, opts) {
        const html_gen = { 
            en: new HtmlWriter(new JSGen()), 
            ar: new ArHtmlWriter(new JSGen()) 
        }

        const js_gen = new JSGen()
        js_gen.init(
            ast, 
            symtab, 
            html_gen, 
            main_args, 
            opts
        )
        return js_gen.run()
    }
}

export {HtmlCssJSGen}