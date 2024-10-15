import {ArHtmlWriter, HtmlWriter} from '../lib/sgen-html.js'
import {JSGen} from '../lib/sgen-js.js'

class HtmlCssJSGen {
    run(ast, symtab, main_args, opts) { 
        
        const en_html = new HtmlWriter(new JSGen())
        const ar_html = new ArHtmlWriter(new JSGen()) 

        const html_gen = { 
            en: en_html, 
            ar: ar_html
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