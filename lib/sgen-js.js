/*version: 0.1.5*/
const l=["0","1","2","3","4","5","6","7","8","9"];function u(n){return o(l,n[0])}function c(n){if(u(n))return n;{let e="",t=0;for(;t<n.length;){switch(n[t]){case"\u0660":e+="0";break;case"\u0661":e+="1";break;case"\u0662":e+="2";break;case"\u0663":e+="3";break;case"\u0664":e+="4";break;case"\u0665":e+="5";break;case"\u0666":e+="6";break;case"\u0667":e+="7";break;case"\u0668":e+="8";break;case"\u0669":e+="9";break;case",":e+=".";break;default:a()}t+=1}return e}}function v(n){return n instanceof Array}function o(n,e){return n.includes(e)}function h(n,e){let t=[];const i=(s,r)=>{if(r&&typeof r=="object"){if(t.includes(r))return"[CIRCULAR]";t.push(r)}return r};return e?JSON.stringify(n,i,e):JSON.stringify(n,i)}function a(n){throw new Error(n)}function w(n,e){return n.repeat(e)}const f=`
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
`,d={\u0628\u062F\u0621:"main",\u0627\u0637\u0628\u0639_\u0633\u0637\u0631:"println",\u062A\u0639\u0628\u064A\u0631_\u0646\u0645\u0637\u064A:"regex",\u0647\u0630\u0627:"this",\u0645\u0634\u064A\u0651\u062F:"constructor",\u0627\u0646\u0647\u0627\u0621:"panic"},b=4;class k{current;indent_level;stack;astructs;ast;symtab;html_gen;main_args;opts;runtime;init(e,t,i,s,r){this.current="",this.indent_level=0,this.stack=[],this.astructs=[],this.ast=e,this.symtab=t,this.html_gen=i,this.main_args=s,this.opts=r}init_with_HTML(e,t,i,s,r){this.init(t,i,e,s,r),this.html_gen=e}init_with_runtime(e,t,i,s,r){this.init(t,i,null,s,r),this.runtime=e}run(){this.strict_mode();let e,t=0;for(;t<this.ast.length;){const i=this.ast[t];if(i){const s=i.v;switch(i.id){case"use":this.write_use(s);break;case"modif":this.write_modifier(s);break;case"main":e=s;break;case"const":this.write_const(s);break;case"fn":this.write_fn(s);break;case"type":this.write_typedef(s);break;default:a("unsupported node: "+this.ast[t].id)}}t+=1}return this.write_helper_fns(),e&&this.write_main(e),this.get_code()}to_en_id(e){!e.v&&!v(e.v)||d[e.v[1]]&&(e.v[1]=d[e.v[1]])}push(){this.stack.push(this.current),this.current=""}pop(){this.current=this.stack.pop()+this.current}pop_prepend(){this.current=this.current+this.stack.pop()}prepend(e){this.current=e+this.current}append(e){this.current+=e}appendi(e){this.current+=this.spaces(),this.current+=e}spaces(e){return e||(e=this.indent_level),w(" ",e*b)}strict_mode(){this.append(`"use strict";

`)}write_id_pat(e){const t=e.v.v[1];this.append(t==="_"?"default":t)}write_char_pat(e){this.append("'"+e.v.v[1]+"'")}write_str_pat(e){this.append('"'+e.v.v[1]+'"')}write_tuple_pat(e){this.append("(");let t=0;for(;t<e.v.length;)this.write_pat(e.v[t]),t<e.v.length-1&&this.append(", "),t+=1;this.append(")")}write_pat(e){switch(e.id){case"id":this.write_id_pat(e);break;case"bool":this.append(e.v.v[1]);break;case"int":case"float":this.append(c(e.v.v[1][0]));break;case"char":this.write_char_pat(e);break;case"str":this.write_str_pat(e);break;case"tuple":this.write_tuple_pat(e);break;case"_":this.append("default");break;default:a("unsupported pattern "+h(e))}}write_modifier(e){this.opts.ignore_export||e.v==="+"&&this.appendi("export ")}write_use(e){}write_main(e){this.push(),this.appendi("("),this.write_fn(e,this.main_args),this.appendi(`)()
`),this.pop()}write_params(e){this.append("(");let t=0;for(;t<e.length;)t>0&&this.append(", "),this.write_pat(e[t].v._pat),t+=1;this.append(")")}write_do_block(e){this.append("(()=>"),this.write_block(e),this.append(`)() 
`)}write_block(e){this.append(` {
`),this.push(),this.indent_level+=1;let t=0;const i=e.v.length;for(;t<i;){const s=e.v[t];this.write_stmt(s),t+=1}this.pop(),this.indent_level-=1,this.appendi(`}
`)}write_fn(e,t){this.push(),e.t==="fn"&&this.appendi("static "),this.to_en_id(e.name),e.is_async&&this.append("async "),this.append("function "+e.name.v[1]),t?this.append("()"):this.write_params(e.params),this.write_body(e.body,e.name==="main",t),this.pop()}write_fields(e){const t=[];e.forEach(i=>{const s=i.v[0].v[1];t.push(s)}),t.forEach(i=>{this.appendi(this.spaces()+""+i+`
`)}),this.write_init(t)}write_init(e){this.append(`
`),this.appendi("constructor(");let t=0;for(;t<e.length;)this.append(e[t]),t<e.length-1&&this.append(", "),t+=1;for(this.append(`) {
`),this.indent_level+=1,t=0;t<e.length;)this.appendi("this."+e[t]+" = "+e[t]+`
`),t+=1;this.appendi(`return this
`),this.indent_level-=1,this.appendi(`}
`)}write_typedef(e){this.appendi("class "+e.name.v[1]+` {
`),this.indent_level+=1,e.fields&&this.write_fields(e.fields),this.indent_level-=1,this.appendi(`}

`)}write_const(e){this.appendi("const "),this.write_pat(e.lhs),this.append(" = "),this.write_expr(e.rhs),this.append(`
`)}write_var(e){this.appendi("let "),this.write_pat(e.lhs),e.rhs&&(this.append(" = "),this.write_expr(e.rhs)),this.append(`
`)}write_ret(e){this.append("return "),e.v&&this.write_expr(e.v)}write_break(e){this.append("break")}write_stmt(e){e.t==="expr"?(this.appendi(""),this.write_expr(e),this.append(`
`)):e.id==="const"?this.write_const(e.v):e.id==="var"?this.write_var(e.v):e.id==="break"?this.write_break(e):a("cannot write stmt: "+h(e))}write_body(e,t,i){if(this.append(` {
`),this.push(),this.indent_level+=1,i)for(const[p,_]of Object.entries(i))this.append(`const ${p} = '${_}'
`);let s=0;const r=e.v.length;for(;s<r;){const p=e.v[s];this.write_stmt(p),s+=1}this.pop(),this.indent_level-=1,this.appendi(`}
`)}write_id(e){this.append(e.v[1])}write_ref(e){const t=e.v.v[1];this.append(t)}write_str(e){const t=e.v.v[1],i=t.indexOf("${")===-1?'"':"`";this.append(i+t+i)}write_str_id(e){this.append(symbol+e.v.v[1]+symbol)}is_call(e){return e.v.id==="bin"&&e.v.v.op.v==="("}write_iret(e){o(["when","while","if","for","return"],e.v.node)||e.v.t==="()"||this.is_call(e)||e.semicolon||this.append("return "),this.is_call(e)?(this.append("const temp_seen_var = "),this.write_expr(e.v),this.append(`
`),this.append("return temp_seen_var")):this.write_expr(e.v)}write_list(e){this.append("[");let t=0;const i=e.v.length;for(;t<i;)this.write_expr(e.v[t]),t<e.v.length-1&&this.append(", "),t+=1;this.append("]")}write_structl(e){const t=e.v;this.append("{");let i=0;for(;i<t.length;){const s=t[i],r=s.k;r.v.v[1]?this.write_id(r.v):this.write_str_id(r.v);const p=s.v;this.append(": "),this.write_expr(p),i<t.length-1&&this.append(", "),i+=1}this.append("}")}write_args(e){this.append("(");let t=0;for(;t<e.v.length;){let i=e.v[t];i.v.op&&i.v.op.v===":"&&(i=i.v.ropr),this.write_expr(i),t<e.v.length-1&&this.append(", "),t+=1}this.append(")")}write_named_arg(e){e.v[0].v[1];const t=e.v[1];this.write_expr(t)}write_tuple(e){this.append("[");let t=0;for(;t<e.v.length;){let i=e.v[t];i.id==="narg"&&(i=e.v[t].v[1]),this.write_expr(i),t<e.v.length-1&&this.append(", "),t+=1}this.append("]")}write_named_tuple(e){this.append("{"),e.v.forEach((t,i)=>{const s=t[0].v[1],r=t[1];this.append(s),this.append(": "),this.write_expr(r),i<e.v.length&&this.append(",")}),this.append("}")}write_when(e){this.appendi("switch("),this.write_expr(e.v.expr),this.append(`) {
`),this.indent_level+=1;let t=0;for(;t<e.v.arms.length;){const i=e.v.arms[t],s=i.v.pats,r=i.v.expr;let p=0;for(;p<s.length;)s[p].id!=="_"&&this.appendi("case "),this.write_pat(s[p]),this.append(` :
`),p+=1;this.indent_level+=1,this.appendi(""),this.write_expr(r),this.append(`
`),this.appendi(`break
`),this.indent_level-=1,t+=1}this.indent_level-=1,this.appendi(`}
`)}write_prefix_uni(e){const t=e.v.op.v;switch(t){case".":if(e.v.opr.v.v[1]==="none"){this.append("null");return}else a("enum variants are not supported, found : (."+e.v.opr.v.v[1]+")");break;case"not":this.append("!");break;case"!":case"-":this.append(t);break;default:a("unsupported op: "+t);break}this.write_expr(e.v.opr)}write_pipe(e){for(;e.length>0;){let t=e.pop();switch(t.id){case"ref":this.write_expr(t),e.length>0&&(this.append("("),this.write_pipe(e),this.append(")"));break;case"call":const i=t.v[0],s=t.v[1];this.write_expr(i),this.append("("),this.write_pipe(e),this.current.slice(-1)!=="("&&s.length>0&&this.append(", "),s.forEach((r,p)=>{this.write_expr(r),p<s.length-1&&this.append(", ")}),this.append(")");break;case"int":case"float":case"str":case"[":case"tuple":case"named_tuple":this.write_expr(t);break;default:throw new Error("syntax error |> :"+h(t))}}}write_runtime_fn(){}write_call(e){const t=this.runtime.get_fn(e);if(t){t._import&&this.prepend(t._import),this.append(t.code);return}if(this.to_en_id(e.v[0].v),e.v[0].v.v[1]==="html"){const s=this.html_gen.en.write_html(e,"");this.append(` (() => \`${s}\`)() `);return}else if(e.v[0].v.v[1]==="\u0635\u0641\u062D\u0629_\u0627\u0644\u0634\u0628\u0643\u0629"){const s=this.html_gen.ar.write_ar_html(e,"");this.append(`(() => \`${s}\`)()`);return}else this.symtab.structs.includes(e.v[0].v.v[1])&&this.append("new ");this.write_expr(e.v[0]),this.append("(");const i=e.v[1];i&&i.forEach((s,r)=>{this.write_expr(s),r<i.length-1&&this.append(", ")}),e.v[2]&&(i&&this.append(", "),this.write_children(e.v[2])),this.append(")")}write_children(e){!e||e.length===0||(this.append("["),e.forEach(t=>{this.write_expr(t),this.append(",")}),this.append("]"))}write_bin(e){const t=e.v.op.v;switch(t){case"[":this.write_expr(e.v.lopr),this.append("["),this.write_expr(e.v.ropr),this.append("]");break;case"=":this.write_expr(e.v.lopr),this.append("="),this.write_expr(e.v.ropr);break;case":=":this.append("let "),this.write_expr(e.v.lopr),this.append(" = "),this.write_expr(e.v.ropr),this.append(`
`);break;case"::":this.appendi("const "),this.write_expr(e.v.lopr),this.append(" = "),this.write_expr(e.v.ropr),this.append(`
`);break;case":":this.appendi("let "),this.write_expr(e.v.lopr),this.append(`
`);break;case"|>":{let i=[],s=e.v.lopr,r=e.v.ropr;for(;;)if(i.push(s),r.id==="bin"&&r.v.op.v==="|>")s=r.v.lopr,r=r.v.ropr;else{i.push(r);break}this.write_pipe(i);break}case"||>":throw new Error(" ||> : WIP , "+h(e));case":>":throw new Error(" :> : WIP , "+h(e));case"==":case"!=":case"<":case"<=":case">":case">=":case"|":case"||":case"&":case"&&":case"+":case"-":case"/":case"*":case"+=":case"-=":case"*=":case"\\=":case".":this.write_expr(e.v.lopr),this.append(t),(t==="=="||t==="!=")&&this.append("="),this.write_expr(e.v.ropr);break;default:a("cannot write binary operation: "+h(e));break}}write_afn(e){this.push(),this.write_params(e.v.params),this.append("=>"),this.write_body(e.v.body),this.pop()}write_expr(e){switch(e.grouped&&this.append("("),e.id){case"()":break;case";":break;case"ref":this.write_ref(e);break;case"bool":this.append(e.v.v[1]);break;case"int":case"float":this.append(c(e.v[0].v[1]));break;case"char":this.append("'"+e.v.v[1]+"'");break;case"str":this.write_str(e);break;case"return":this.write_ret(e);break;case"iret":this.write_iret(e);break;case"[":this.write_list(e);break;case"{":this.write_structl(e);break;case"args":this.write_args(e);break;case"named_arg":this.write_named_arg(e);break;case"tuple":this.write_tuple(e);break;case"named_tuple":this.write_named_tuple(e);break;case"when":this.write_when(e);break;case"do_block":this.write_do_block(e);break;case"block":this.write_block(e);break;case"prefix":this.write_prefix_uni(e);break;case"call":this.write_call(e);break;case"bin":this.write_bin(e);break;case"afn":this.write_afn(e);break;default:a("cannot write expr: "+h(e))}e.grouped&&this.append(")")}write_helper_fns(){this.append(f)}get_code(){return this.current}}export{k as JSGen};
