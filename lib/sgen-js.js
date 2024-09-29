/*version: 0.1.5*/
const _=["0","1","2","3","4","5","6","7","8","9"];function v(n){return o(_,n[0])}function c(n){if(v(n))return n;{let t="",e=0;for(;e<n.length;){switch(n[e]){case"\u0660":t+="0";break;case"\u0661":t+="1";break;case"\u0662":t+="2";break;case"\u0663":t+="3";break;case"\u0664":t+="4";break;case"\u0665":t+="5";break;case"\u0666":t+="6";break;case"\u0667":t+="7";break;case"\u0668":t+="8";break;case"\u0669":t+="9";break;case",":t+=".";break;default:p()}e+=1}return t}}function u(n){return n instanceof Array}function o(n,t){return n.includes(t)}function h(n,t){let e=[];const i=(r,s)=>{if(s&&typeof s=="object"){if(e.includes(s))return"[CIRCULAR]";e.push(s)}return s};return t?JSON.stringify(n,i,t):JSON.stringify(n,i)}function p(n){throw new Error(n)}function w(n,t){return n.repeat(t)}const f=`
//------------------------------------------------------------------------------
// js helper functions injected to workaround missing seen features that are yet to be added.
function is_none(x) { return x == null }        
function is_list(x) { return x instanceof Array }
function replace(array, i, v) {  array[i] = v }
function to_int(str) { return parseInt(str) }
function assign(x,y) { x = y }
function concat(x,y,id) { x[id] = x[id].concat(y[id]) }
function del(array, i) { delete array[i] }
function regexp(expr) { return RegExp(expr, 'ug') }
function match_regexp(v, expr) {return expr.exec(v) }
function print(v) { throw new Error('print() is not implemeted')}
function \u0627\u0637\u0628\u0639_\u0633\u0637\u0631(v) { println(v) }
function println(v) {         
    if(v == null ) { console.log("undefined") } else { console.log(v) }
}
function panic(v) { throw new Error(v)}
function clone(obj) { return {...obj} }
function contains(list, el) { return list.includes(el) }
function is_empty(list) { return Array.isArray(list) && list.length === 0 }
function \u0627\u0637\u0628\u0639_\u062A\u0641\u0627\u0635\u064A\u0644(obj, indent) { pprint(obj, indent) }
function pprint(obj, indent) { 
    if( obj == null ) {
        console.log("undefined")
    } else {
        if(indent) {
            console.log(JSON.stringify(obj, null, indent)) 
        } else {
            console.log(JSON.stringify(obj)) 
        }       
    }
}
function to_str(obj, indent) { 
let objects = []
function eliminateCircular(k, v) {
    if (v && typeof v === 'object') {
        if (objects.includes(v)) { return "[CIRCULAR]" } else { objects.push(v) }
    }
    return v
}
if(indent) {
    return JSON.stringify(obj, eliminateCircular, indent)
} else {
    return JSON.stringify(obj, eliminateCircular)
}
}
function repeat(str, times) { return str.repeat(times) }
function c0_to_uppercase(str){ return str.charAt(0).toUpperCase() + str.slice(1) }
function to_lowercase(str) {return str.toLowerCase()}
function \u0639\u0631\u0636_\u0627\u0648\u0644\u064A(code, preview_id){ preview(code, preview_id) }
function preview(code, preview_id) { window.parent.document.querySelector(preview_id).srcdoc = code }
function \u0647\u0627\u062A_\u0627\u0644\u0627\u0641\u0631\u0639(\u0633) {
    return \u0633.__children
}
function \u0627\u062E\u062A\u0631(\u0633,\u062F\u0627\u0644\u0629) {
    return \u0633.filter(\u062F\u0627\u0644\u0629)
}
function \u0647\u0627\u062A(\u0642,\u0641\u0647\u0631\u0633) { return \u0642[\u0641\u0647\u0631\u0633]}
function \u0639\u062F\u062F_\u0627\u0644\u0639\u0646\u0627\u0635\u0631(\u0642) { return \u0642.length}
async function read_url(url) {
    const response = await fetch(url);
    return response.text()
}

//------------------------------------------------------------------------------
`,d={\u0628\u062F\u0621:"main",\u0627\u0637\u0628\u0639_\u0633\u0637\u0631:"println",\u062A\u0639\u0628\u064A\u0631_\u0646\u0645\u0637\u064A:"regex",\u0647\u0630\u0627:"this",\u0645\u0634\u064A\u0651\u062F:"constructor",\u0627\u0646\u0647\u0627\u0621:"panic"},b=4;class k{current;indent_level;stack;astructs;ast;symtab;html_gen;main_args;opts;init(t,e,i,r,s){this.current="",this.indent_level=0,this.stack=[],this.astructs=[],this.ast=t,this.symtab=e,this.html_gen=i,this.main_args=r,this.opts=s}run(){this.strict_mode();let t,e=0;for(;e<this.ast.length;){const i=this.ast[e];if(i){const r=i.v;switch(i.id){case"use":this.write_use(r);break;case"modif":this.write_modifier(r);break;case"main":t=r;break;case"const":this.write_const(r);break;case"fn":this.write_fn(r);break;case"type":this.write_typedef(r);break;default:p("unsupported node: "+this.ast[e].id)}}e+=1}return this.write_helper_fns(),t&&this.write_main(t),this.get_code()}to_en_id(t){!t.v&&!u(t.v)||d[t.v[1]]&&(t.v[1]=d[t.v[1]])}push(){this.stack.push(this.current),this.current=""}pop(){this.current=this.stack.pop()+this.current}pop_prepend(){this.current=this.current+this.stack.pop()}append(t){this.current+=t}appendi(t){this.current+=this.spaces(),this.current+=t}spaces(t){return t||(t=this.indent_level),w(" ",t*b)}strict_mode(){this.append(`"use strict";

`)}write_id_pat(t){const e=t.v.v[1];this.append(e==="_"?"default":e)}write_char_pat(t){this.append("'"+t.v.v[1]+"'")}write_str_pat(t){this.append('"'+t.v.v[1]+'"')}write_tuple_pat(t){this.append("(");let e=0;for(;e<t.v.length;)this.write_pat(t.v[e]),e<t.v.length-1&&this.append(", "),e+=1;this.append(")")}write_pat(t){switch(t.id){case"id":this.write_id_pat(t);break;case"bool":this.append(t.v.v[1]);break;case"int":case"float":this.append(c(t.v.v[1][0]));break;case"char":this.write_char_pat(t);break;case"str":this.write_str_pat(t);break;case"tuple":this.write_tuple_pat(t);break;case"_":this.append("default");break;default:p("unsupported pattern "+h(t))}}write_modifier(t){this.opts.ignore_export||t.v==="+"&&this.appendi("export ")}write_use(t){}write_main(t){this.push(),this.appendi("("),this.write_fn(t,this.main_args),this.appendi(`)()
`),this.pop()}write_params(t){this.append("(");let e=0;for(;e<t.length;)e>0&&this.append(", "),this.write_pat(t[e].v._pat),e+=1;this.append(")")}write_do_block(t){this.append("(()=>"),this.write_block(t),this.append(`)() 
`)}write_block(t){this.append(` {
`),this.push(),this.indent_level+=1;let e=0;const i=t.v.length;for(;e<i;){const r=t.v[e];this.write_stmt(r),e+=1}this.pop(),this.indent_level-=1,this.appendi(`}
`)}write_fn(t,e){this.push(),t.t==="fn"&&this.appendi("static "),this.to_en_id(t.name),this.append("function "+t.name.v[1]),e?this.append("()"):this.write_params(t.params),this.write_body(t.body,t.name==="main",e),this.pop()}write_fields(t){const e=[];t.forEach(i=>{const r=i.v[0].v[1];e.push(r)}),e.forEach(i=>{this.appendi(this.spaces()+""+i+`
`)}),this.write_init(e)}write_init(t){this.append(`
`),this.appendi("constructor(");let e=0;for(;e<t.length;)this.append(t[e]),e<t.length-1&&this.append(", "),e+=1;for(this.append(`) {
`),this.indent_level+=1,e=0;e<t.length;)this.appendi("this."+t[e]+" = "+t[e]+`
`),e+=1;this.appendi(`return this
`),this.indent_level-=1,this.appendi(`}
`)}write_typedef(t){this.appendi("class "+t.name.v[1]+` {
`),this.indent_level+=1,t.fields&&this.write_fields(t.fields),this.indent_level-=1,this.appendi(`}

`)}write_const(t){this.appendi("const "),this.write_pat(t.lhs),this.append(" = "),this.write_expr(t.rhs),this.append(`
`)}write_var(t){this.appendi("let "),this.write_pat(t.lhs),t.rhs&&(this.append(" = "),this.write_expr(t.rhs)),this.append(`
`)}write_ret(t){this.append("return "),t.v&&this.write_expr(t.v)}write_break(t){this.append("break")}write_stmt(t){t.t==="expr"?(this.appendi(""),this.write_expr(t),this.append(`
`)):t.id==="const"?this.write_const(t.v):t.id==="var"?this.write_var(t.v):t.id==="break"?this.write_break(t):p("cannot write stmt: "+h(t))}write_body(t,e,i){if(this.append(` {
`),this.push(),this.indent_level+=1,i)for(const[a,l]of Object.entries(i))this.append(`const ${a} = '${l}'
`);let r=0;const s=t.v.length;for(;r<s;){const a=t.v[r];this.write_stmt(a),r+=1}this.pop(),this.indent_level-=1,this.appendi(`}
`)}write_id(t){this.append(t.v[1])}write_ref(t){const e=t.v.v[1];this.append(e)}write_str(t){const e=t.v.v[1],i=e.indexOf("${")===-1?'"':"`";this.append(i+e+i)}write_str_id(t){this.append(symbol+t.v.v[1]+symbol)}is_call(t){return t.v.id==="bin"&&t.v.v.op.v==="("}write_iret(t){o(["when","while","if","for","return"],t.v.node)||t.v.t==="()"||this.is_call(t)||t.semicolon||this.append("return "),this.is_call(t)?(this.append("const temp_seen_var = "),this.write_expr(t.v),this.append(`
`),this.append("return temp_seen_var")):this.write_expr(t.v)}write_list(t){this.append("[");let e=0;const i=t.v.length;for(;e<i;)this.write_expr(t.v[e]),e<t.v.length-1&&this.append(", "),e+=1;this.append("]")}write_structl(t){const e=t.v;this.append("{");let i=0;for(;i<e.length;){const r=e[i],s=r.k;s.v.v[1]?this.write_id(s.v):this.write_str_id(s.v);const a=r.v;this.append(": "),this.write_expr(a),i<e.length-1&&this.append(", "),i+=1}this.append("}")}write_args(t){this.append("(");let e=0;for(;e<t.v.length;){let i=t.v[e];i.v.op&&i.v.op.v===":"&&(i=i.v.ropr),this.write_expr(i),e<t.v.length-1&&this.append(", "),e+=1}this.append(")")}write_named_arg(t){t.v[0].v[1];const e=t.v[1];this.write_expr(e)}write_tuple(t){this.append("[");let e=0;for(;e<t.v.length;){let i=t.v[e];i.id==="narg"&&(i=t.v[e].v[1]),this.write_expr(i),e<t.v.length-1&&this.append(", "),e+=1}this.append("]")}write_named_tuple(t){this.append("{"),t.v.forEach((e,i)=>{const r=e[0].v[1],s=e[1];this.append(r),this.append(": "),this.write_expr(s),i<t.v.length&&this.append(",")}),this.append("}")}write_when(t){this.appendi("switch("),this.write_expr(t.v.expr),this.append(`) {
`),this.indent_level+=1;let e=0;for(;e<t.v.arms.length;){const i=t.v.arms[e],r=i.v.pats,s=i.v.expr;let a=0;for(;a<r.length;)r[a].id!=="_"&&this.appendi("case "),this.write_pat(r[a]),this.append(` :
`),a+=1;this.indent_level+=1,this.appendi(""),this.write_expr(s),this.append(`
`),this.appendi(`break
`),this.indent_level-=1,e+=1}this.indent_level-=1,this.appendi(`}
`)}write_prefix_uni(t){const e=t.v.op.v;switch(e){case".":if(t.v.opr.v.v[1]==="none"){this.append("null");return}else p("enum variants are not supported, found : (."+t.v.opr.v.v[1]+")");break;case"not":this.append("!");break;case"!":case"-":this.append(e);break;default:p("unsupported op: "+e);break}this.write_expr(t.v.opr)}write_pipe(t){for(;t.length>0;){let e=t.pop();switch(e.id){case"ref":this.write_expr(e),t.length>0&&(this.append("("),this.write_pipe(t),this.append(")"));break;case"call":const i=e.v[0],r=e.v[1];this.write_expr(i),this.append("("),this.write_pipe(t),this.current.slice(-1)!=="("&&r.length>0&&this.append(", "),r.forEach((s,a)=>{this.write_expr(s),a<r.length-1&&this.append(", ")}),this.append(")");break;case"int":case"float":case"str":case"[":case"tuple":case"named_tuple":this.write_expr(e);break;default:throw new Error("syntax error |> :"+h(e))}}}write_call(t){if(this.to_en_id(t.v[0].v),t.v[0].v.v[1]==="html"){const i=this.html_gen.en.write_html(t,"");this.append(` (() => \`${i}\`)() `);return}else if(t.v[0].v.v[1]==="\u0635\u0641\u062D\u0629_\u0627\u0644\u0634\u0628\u0643\u0629"){const i=this.html_gen.ar.write_ar_html(t,"");this.append(`(() => \`${i}\`)()`);return}else this.symtab.structs.includes(t.v[0].v.v[1])&&this.append("new ");this.write_expr(t.v[0]),this.append("(");const e=t.v[1];e&&e.forEach((i,r)=>{this.write_expr(i),r<e.length-1&&this.append(", ")}),t.v[2]&&(e&&this.append(", "),this.write_children(t.v[2])),this.append(")")}write_children(t){!t||t.length===0||(this.append("["),t.forEach(e=>{this.write_expr(e),this.append(",")}),this.append("]"))}write_bin(t){const e=t.v.op.v;switch(e){case"[":this.write_expr(t.v.lopr),this.append("["),this.write_expr(t.v.ropr),this.append("]");break;case"=":this.write_expr(t.v.lopr),this.append("="),this.write_expr(t.v.ropr);break;case":=":this.append("let "),this.write_expr(t.v.lopr),this.append(" = "),this.write_expr(t.v.ropr),this.append(`
`);break;case"::":this.appendi("const "),this.write_expr(t.v.lopr),this.append(" = "),this.write_expr(t.v.ropr),this.append(`
`);break;case":":this.appendi("let "),this.write_expr(t.v.lopr),this.append(`
`);break;case"|>":{let i=[],r=t.v.lopr,s=t.v.ropr;for(;;)if(i.push(r),s.id==="bin"&&s.v.op.v==="|>")r=s.v.lopr,s=s.v.ropr;else{i.push(s);break}this.write_pipe(i);break}case"||>":throw new Error(" ||> : WIP , "+h(t));case":>":throw new Error(" :> : WIP , "+h(t));case"==":case"!=":case"<":case"<=":case">":case">=":case"|":case"||":case"&":case"&&":case"+":case"-":case"/":case"*":case"+=":case"-=":case"*=":case"\\=":case".":this.write_expr(t.v.lopr),this.append(e),(e==="=="||e==="!=")&&this.append("="),this.write_expr(t.v.ropr);break;default:p("cannot write binary operation: "+h(t));break}}write_afn(t){this.push(),this.write_params(t.v.params),this.append("=>"),this.write_body(t.v.body),this.pop()}write_expr(t){switch(t.grouped&&this.append("("),t.id){case"()":break;case";":break;case"ref":this.write_ref(t);break;case"bool":this.append(t.v.v[1]);break;case"int":case"float":this.append(c(t.v[0].v[1]));break;case"char":this.append("'"+t.v.v[1]+"'");break;case"str":this.write_str(t);break;case"return":this.write_ret(t);break;case"iret":this.write_iret(t);break;case"[":this.write_list(t);break;case"{":this.write_structl(t);break;case"args":this.write_args(t);break;case"named_arg":this.write_named_arg(t);break;case"tuple":this.write_tuple(t);break;case"named_tuple":this.write_named_tuple(t);break;case"when":this.write_when(t);break;case"do_block":this.write_do_block(t);break;case"block":this.write_block(t);break;case"prefix":this.write_prefix_uni(t);break;case"call":this.write_call(t);break;case"bin":this.write_bin(t);break;case"afn":this.write_afn(t);break;default:p("cannot write expr: "+h(t))}t.grouped&&this.append(")")}write_helper_fns(){this.append(f)}get_code(){return this.current}}export{k as JSGen};
