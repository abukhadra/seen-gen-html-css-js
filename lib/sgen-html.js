const HYPHENATED = [
  "min_width",
  "min_height",
  "background_color",
  "background_image",
  "background_position",
  "background_repeat",
  "background_size",
  "background_attachment",
  "_webkite_background_size",
  "aspect_ratio",
  "border_right",
  "border_left",
  "border_top",
  "border_bottom",
  "border_radius",
  "border_style",
  "margin_top",
  "margin_bottom",
  "margin_right",
  "margin_left",
  "align_items",
  "text_align",
  "justify_content",
  "justify_items",
  "text_justify",
  "object_fit",
  "font_size",
  "font_family",
  "box_sizing",
  "scrollbar_width",
  "user_select",
  "_ms_user_select",
  "_webkit_user_select",
  "_moz_user_select",
  "box_shadow",
  "_webkit_box_shadow",
  "_moz_box_shadow",
  "no_repeat",
  "border_box",
  "space_between",
  "flex_direction",
  "inter_word"
];
const BOOL_ATTRS = [
  "readonly"
];
const ELEMENTS_WITH_DIR = [
  "html",
  "body",
  "div",
  "span",
  "p",
  "textarea",
  "field"
];
const MAGHRIB_DIGIT = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
function is_maghrib_num(n) {
  return contains(MAGHRIB_DIGIT, n[0]);
}
function to_maghrib_num(n) {
  if (!is_maghrib_num(n)) {
    let v = "";
    let i = 0;
    while (i < n.length) {
      const c = n[i];
      switch (c) {
        case "٠":
          v += "0";
          break;
        case "١":
          v += "1";
          break;
        case "٢":
          v += "2";
          break;
        case "٣":
          v += "3";
          break;
        case "٤":
          v += "4";
          break;
        case "٥":
          v += "5";
          break;
        case "٦":
          v += "6";
          break;
        case "٧":
          v += "7";
          break;
        case "٨":
          v += "8";
          break;
        case "٩":
          v += "9";
          break;
        case ",":
          v += ".";
          break;
        default:
          panic();
      }
      i += 1;
    }
    return v;
  } else {
    return n;
  }
}
function is_list(x) {
  return x instanceof Array;
}
function contains(list, el) {
  return list.includes(el);
}
function to_str(obj, indent) {
  let objects = [];
  const eliminateCircular = (k, v) => {
    if (v && typeof v === "object") {
      if (objects.includes(v)) {
        return "[CIRCULAR]";
      } else {
        objects.push(v);
      }
    }
    return v;
  };
  {
    return JSON.stringify(obj, eliminateCircular);
  }
}
function panic(v) {
  throw new Error(v);
}
class HtmlWriter {
  jsGen;
  constructor(jsGen) {
    jsGen.init();
    this.jsGen = jsGen;
    return this;
  }
  write_html(el, page) {
    switch (el.id) {
      case "call":
        let tag = el.v[0].v.v[1];
        let attrs = el.v[1] || [];
        let children = el.v[2] || [];
        if (tag === "br") {
          return page += "<br>";
        }
        switch (tag) {
          case "select":
            page = this.write_css(attrs, page) + "} ";
            break;
          case "font_face":
            page = this.write_css_fontface(attrs, page);
            break;
          case "keyframes":
            page = this.write_css_keyframes(attrs, children, page);
            break;
          default:
            page += `<${tag}`;
            attrs.forEach((attr, i) => {
              if (i === 0 && attr.id === "str") {
                page += ` id='${attr.v.v[1]}'`;
              } else if (attr.id === "named_arg") {
                const attr_name = attr.v[0].v[1];
                if (BOOL_ATTRS.includes(attr_name)) {
                  page += ` ${attr_name} `;
                } else {
                  page += ` ${attr_name}= `;
                  if (attr.v[1].id === "str") {
                    page += `'${attr.v[1].v.v[1]}'`;
                  } else if (attr.v[1].id === "int" || attr.v[1].id === "float") {
                    const num = attr.v[1].v[0].v[1];
                    const suffix = attr.v[1].v[1].v[1] || "";
                    page += `${num}${suffix}`;
                  } else if (attr.v[1].id === "bool") {
                    page += `${attr_name}`;
                  } else {
                    panic("not supported: " + to_str(attr));
                  }
                }
              } else {
                panic("not supported: " + to_str(attr));
              }
            });
            page += ">";
            children.forEach((c) => {
              page = this.write_html(c, page);
            });
            page += `</${tag}>`;
        }
        break;
      case "str":
        page += el.v.v[1];
        break;
      default:
        panic("unknown html element: " + to_str(el));
    }
    return page;
  }
  write_css(attrs, page) {
    attrs.forEach((attr) => {
      const k = maybe_hyphenated(attr.v[0].v[1]);
      const v = attr.v[1];
      if (k === "element") {
        page = this.write_css_selector(v, page);
        page += " {";
      } else {
        page += `${k} : `;
        page = this.write_css_attr_value(v, page);
        page += `; `;
      }
    });
    return page;
  }
  write_css_selector(v, page) {
    if (is_list(v.v)) {
      page += " ";
      v.v.forEach((x, i) => {
        page += `${x.v.v[1]} `;
        if (i < v.v.length - 1) {
          page += ",";
        }
      });
    } else {
      page += ` ${v.v.v[1]}`;
    }
    return page;
  }
  write_css_attr_value(v, page) {
    switch (v.id) {
      case "int":
      case "float":
        const num = v.v[0].v[1];
        const suffix = v.v[1] && v.v[1].v[1] || "";
        page += num + suffix;
        break;
      case "prefix":
        page += v.v.op.v;
        page = this.write_css_attr_value(v.v.opr, page);
        break;
      case "postfix":
        page = this.write_css_attr_value(v.v.opr, page);
        page += v.v.op.v;
        break;
      case "str":
        page += v.v.v[1];
        break;
      case "ref":
        page += maybe_hyphenated(v.v.v[1]);
        break;
      case "tuple":
        v.v.forEach((el) => {
          page = this.write_css_attr_value(el, page + " ");
        });
        break;
      case "call":
        const ref = v.v[0].v.v[1];
        const args = v.v[1];
        page += ` ${ref}(`;
        args.forEach((arg) => {
          page = this.write_css_attr_value(arg, page);
        });
        page += `)`;
        break;
      case "bin":
        this.jsGen.write_expr(v);
        const code = this.jsGen.get_code();
        page += "${" + code + "}".trim();
        break;
      default:
        panic(`not supported: html generations:  ${to_str(v)}`);
    }
    return page;
  }
  write_css_fontface(attrs, page) {
    page += `@font-face { `;
    page = write_ar_css(attrs, page);
    page += "}";
    return page;
  }
  write_css_keyframes(attrs, children, page) {
    page += ` @keyframes ${attrs[0].v.v[1]} { `;
    children && children.forEach((c) => {
      const ref = c.v[0].v.v[1];
      const v = c.v[1];
      switch (ref) {
        case "at":
          const percentage = v[0];
          const attrs2 = v[1].v || [];
          page = this.write_css_attr_value(percentage, page);
          page += " {";
          attrs2.forEach((attr) => {
            if (attr.id === "named_tuple") {
              attr.v.forEach((el) => {
                const _k = maybe_hyphenated(el[0].v[1]);
                const _v = el[1];
                page += ` ${_k} : `;
                page = this.write_css_attr_value(_v, page);
                page += `; `;
              });
            } else {
              const _k = maybe_hyphenated(attr[0].v[1]);
              const _v = attr[1];
              page += ` ${_k} : `;
              page = this.write_css_attr_value(_v, page);
              page += `; `;
            }
          });
          page += "} ";
          break;
        default:
          panic("unsupported element: " + to_str(ref));
      }
    });
    page += "}";
    return page;
  }
}
const HTML_tag_en = {
  "صفحة_الشبكة": "html",
  "راس": "head",
  "نسق": "style",
  "متن": "body",
  "منطقة_النص": "textarea",
  "عنوان_راسي٣": "h3",
  "قسم": "div",
  "سطر": "br"
};
const HTML_attr_en = (id) => {
  switch (id) {
    case "صنف":
      return "class";
    case "اعمدة":
      return "cols";
    case "صفوف":
      return "rows";
    case "للقراءة_فقط":
      return "readonly";
    default:
      return id;
  }
};
const CSS_pseudo_en = {
  // FIXME: workaround
  "حوم": "hover"
};
const CSS_fn_en = (id) => {
  switch (id) {
    case "عند":
      return "at";
    case "ازاحة_س":
      return "translateX";
    case "عنوان":
      return "url";
    default:
      return id;
  }
};
const CSS_suffix_en = (id) => {
  switch (id) {
    case "ع_ص":
      return "px";
    case "ع_ط":
      return "vh";
    case "م_ج":
      return "rem";
    case "ث":
      return "s";
    case "٪":
      return "%";
    default:
      return id;
  }
};
const CSS_key_en = (id) => {
  switch (id) {
    case "عنصر":
      return "element";
    case "عرض":
      return "width";
    case "ادنى_عرض":
      return "min_width";
    case "ارتفاع":
      return "height";
    case "ادنى_ارتفاع":
      return "min_height";
    case "لون":
      return "color";
    case "اتجاه":
      return "direction";
    case "خلفية":
      return "background";
    case "لون_الخلفية":
      return "background_color";
    case "صورة_الخلفية":
      return "background_image";
    case "موقع_الخلفية":
      return "background_position";
    case "تكرار_الخلفية":
      return "background_repeat";
    case "ارفاق_الخلفية":
      return "background_attachment";
    case "ملائمة_العنصر":
      return "object_fit";
    case "حجم_الخلفية":
      return "background_size";
    case "_آبل_حجم_الخلفية":
      return "_webkite_background_size";
    case "فائض":
      return "overflow";
    case "عتامة":
      return "opacity";
    case "اظهار":
      return "display";
    case "هامش":
      return "margin";
    case "هامش_علوي":
      return "margin_top";
    case "هامش_سفلي":
      return "margin_bottom";
    case "هامش_ايمن":
      return "margin_right";
    case "هامش_ايسر":
      return "margin_left";
    case "بطانة":
      return "padding";
    case "تحجيم_الصندوق":
      return "box_sizing";
    case "ضبط_المحتوى":
      return "justify_content";
    case "ضبط_العناصر":
      return "justify_items";
    case "ضبط_النص":
      return "text_justify";
    case "محاذاة_العناصر":
      return "align_items";
    case "محاذاة_النص":
      return "text_align";
    case "حجم_الخط":
      return "font_size";
    case "فصيلة_الخط":
      return "font_family";
    case "فجوة":
      return "gap";
    case "حدود":
      return "border";
    case "قطر_الحدود":
      return "border_radius";
    case "نسق_الحدود":
      return "border_style";
    case "حدود_خارجية":
      return "outline";
    case "موضع":
      return "position";
    case "تحريك":
      return "animation";
    case "تحول":
      return "transform";
    case "اعادة_تحجيم":
      return "resize";
    case "مصدر":
      return "src";
    case "نسبة_س_ص":
      return "aspect_ratio";
    case "مرن_باتجاه":
      return "flex_direction";
    case "شريط_التمرير_عرض":
      return "scrollbar_width";
    case "قدرة_اختيار_النص":
      return "user_select";
    case "_مايكروسوفت_قدرة_اختيار_النص":
      return "_ms_user_select";
    case "_آبل_قدرة_اختيار_النص":
      return "_webkit_user_select";
    case "_موزيلا_قدرة_اختيار_النص":
      return "_moz_user_select";
    case "خيال_الصندوق":
      return "box_shadow";
    case "_آبل_خيال_الصندوق":
      return "_webkit_box_shadow";
    case "_موزيلا_خيال_الصندوق":
      return "_moz_box_shadow";
    default:
      return id;
  }
};
const CSS_value_en = (id) => {
  switch (id) {
    case "تلقائي":
      return "auto";
    case "حدود_الصندوق":
      return "border_box";
    case "بلا_قيمة":
      return "none";
    case "مطلق":
      return "absolute";
    case "مرن":
      return "flex";
    case "مخفي":
      return "hidden";
    case "مركز":
      return "center";
    case "مسافة_بين":
      return "space_between";
    case "بداية":
      return "start";
    case "نهاية":
      return "end";
    case "بارز":
      return "ridge";
    case "لا_نهاية":
      return "infinite";
    case "لا_تكرار":
      return "no_repeat";
    case "احتواء":
      return "contain";
    case "قطع":
      return "clip";
    case "ضعف":
      return "double";
    case "ضبط":
      return "justify";
    case "بين_الكلمات":
      return "inter_word";
    case "مهم":
      return "important";
    case "غير_مهم":
      return "!important";
    case "مثبت":
      return "fixed";
    case "من_اليمين":
      return "rtl";
    case "عمودي":
      return "column";
    case "افقي":
      return "row";
    case "سماوي_فاتح":
      return "lightskyblue";
    case "ابيض":
      return "white";
    case "اصفر":
      return "yellow";
    case "اسود":
      return "black";
    case "برتقالي":
      return "orange";
    default:
      return id;
  }
};
const CSS_str_en = (id) => {
  switch (id) {
    case "متن":
      return "body";
    case "صفحة_الشبكة":
      return "html";
    default:
      return id;
  }
};
class ArHtmlWriter {
  jsGen;
  constructor(jsGen) {
    jsGen.init();
    this.jsGen = jsGen;
    return this;
  }
  write_ar_html(el, page) {
    switch (el.id) {
      case "call":
        const id = el.v[0].v.v[1];
        const tag = HTML_tag_en[id] || id;
        const attrs = el.v[1] || [];
        const children = el.v[2] || [];
        if (tag === "br") {
          return page += "<br>";
        }
        switch (tag) {
          case "اختر":
            page = this.write_ar_css(attrs, page) + "} ";
            break;
          case "عرف_خط":
            page = this.write_ar_css_fontface(attrs, page);
            break;
          case "اطارات_رئيسية":
            page = this.write_ar_css_keyframes(attrs, children, page);
            break;
          default:
            page += `<${tag}`;
            if (ELEMENTS_WITH_DIR.includes(tag)) {
              page += ` dir='rtl'`;
            }
            attrs.forEach((attr, i) => {
              if (i === 0 && attr.id === "str") {
                page += ` id='${attr.v.v[1]}'`;
              } else if (attr.id === "named_arg") {
                const attr_name = HTML_attr_en(attr.v[0].v[1]);
                if (BOOL_ATTRS.includes(attr_name)) {
                  page += ` ${attr_name} `;
                } else {
                  page += ` ${attr_name}= `;
                  if (attr.v[1].id === "str") {
                    page += `'${attr.v[1].v.v[1]}'`;
                  } else if (attr.v[1].id === "int" || attr.v[1].id === "float") {
                    const num = to_maghrib_num(attr.v[1].v[0].v[1]);
                    const suffix = attr.v[1].v[1] ? CSS_suffix_en(attr.v[1].v[1].v[1]) || "" : "";
                    page += `${num}${suffix}`;
                  } else if (attr.v[1].id === "bool") {
                    page += `${HTML_attr_en(attr_name)}`;
                  } else {
                    panic("not supported: " + to_str(attr));
                  }
                }
              } else {
                panic("not supported: " + to_str(attr));
              }
            });
            page += ">";
            children.forEach((c) => {
              page = this.write_ar_html(c, page);
            });
            page += `</${tag}>`;
        }
        break;
      case "str":
        page += el.v.v[1];
        break;
      default:
        panic("unknown html element: " + to_str(el));
    }
    return page;
  }
  write_ar_css(attrs, page) {
    attrs.forEach((attr) => {
      const k = maybe_hyphenated(CSS_key_en(attr.v[0].v[1]));
      const v = attr.v[1];
      if (k === "element") {
        page = this.write_ar_css_selector(v, page);
        page += " {";
      } else {
        page += `${k} : `;
        page = this.write_ar_css_attr_value(v, page);
        page += `; `;
      }
    });
    return page;
  }
  write_ar_css_selector(v, page) {
    const translate = (path) => {
      const get_regexp = (k) => RegExp(`(?<![p{L}\\p{N}_])${k}(?![\\p{L}\\p{N}_])`, "ug");
      Object.keys(HTML_tag_en).forEach((k) => {
        path = path.replaceAll(get_regexp(k), HTML_tag_en[k]);
      });
      Object.keys(CSS_pseudo_en).forEach((k) => {
        path = path.replaceAll(get_regexp(k), CSS_pseudo_en[k]);
      });
      return path;
    };
    if (is_list(v.v)) {
      page += " ";
      v.v.forEach((selector, i) => {
        let path = selector.v.v[1];
        page += translate(path);
        if (i < v.v.length - 1) {
          page += ",";
        }
      });
    } else {
      const path = v.v.v[1];
      page += translate(path);
    }
    return page;
  }
  write_ar_css_attr_value(v, page) {
    switch (v.id) {
      case "bool":
        panic();
        break;
      case "int":
      case "float":
        const num = to_maghrib_num(v.v[0].v[1]);
        const suffix = CSS_suffix_en(v.v[1] && v.v[1].v[1]) || "";
        page += num + suffix;
        break;
      case "prefix":
        page += v.v.op.v;
        page = this.write_ar_css_attr_value(v.v.opr, page);
        break;
      case "postfix":
        page = this.write_ar_css_attr_value(v.v.opr, page);
        page += v.v.op.v;
        break;
      case "str":
        page += CSS_str_en(v.v.v[1]);
        break;
      case "ref":
        page += maybe_hyphenated(CSS_value_en(v.v.v[1]));
        break;
      case "tuple":
        v.v.forEach((el) => {
          page = this.write_ar_css_attr_value(el, page + " ");
        });
        break;
      case "call":
        const ref = CSS_fn_en(v.v[0].v.v[1]);
        const args = v.v[1];
        page += ` ${ref}(`;
        args.forEach((arg) => {
          page = this.write_ar_css_attr_value(arg, page);
        });
        page += `)`;
        break;
      case "bin":
        this.jsGen.write_expr(v);
        const code = this.jsGen.get_code();
        page += "${" + code + "}".trim();
        break;
      default:
        panic(`not supported: html generations:  ${to_str(v)}`);
    }
    return page;
  }
  write_ar_css_fontface(attrs, page) {
    page += `@font-face { `;
    page = this.write_ar_css(attrs, page);
    page += "}";
    return page;
  }
  write_ar_css_keyframes(attrs, children, page) {
    page += ` @keyframes ${attrs[0].v.v[1]} { `;
    children && children.forEach((c) => {
      const ref = c.v[0].v.v[1];
      const v = CSS_value_en(c.v[1]);
      switch (ref) {
        case "عند":
          const percentage = v[0];
          const attrs2 = v[1].v || [];
          page = this.write_ar_css_attr_value(percentage, page);
          page += " {";
          attrs2.forEach((attr) => {
            if (attr.id === "named_tuple") {
              attr.v.forEach((el) => {
                const _k = maybe_hyphenated(CSS_key_en(el[0].v[1]));
                const _v = CSS_value_en(el[1]);
                page += ` ${_k} : `;
                page = this.write_ar_css_attr_value(_v, page);
                page += `; `;
              });
            } else {
              const _k = maybe_hyphenated(CSS_key_en(attr[0].v[1]));
              const _v = CSS_value_en(attr[1]);
              page += ` ${_k} : `;
              page = this.write_ar_css_attr_value(_v, page);
              page += `; `;
            }
          });
          page += "} ";
          break;
        default:
          panic("unsupported element: " + to_str(ref));
      }
    });
    page += "}";
    return page;
  }
}
function maybe_hyphenated(id) {
  if (HYPHENATED.includes(id)) {
    return id.replaceAll("_", "-");
  } else {
    return id;
  }
}
export {
  ArHtmlWriter,
  CSS_str_en,
  CSS_value_en,
  HtmlWriter,
  maybe_hyphenated
};
