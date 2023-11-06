import { basename } from "node:path";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderComponent, renderToString } from "vue/server-renderer";
import { defineStore, createPinia } from "pinia";
import { ref, defineComponent, mergeProps, useSSRContext, watch, unref, createSSRApp } from "vue";
import { createRouter as createRouter$1, createMemoryHistory } from "vue-router";
const style = "";
const useSearchStore = defineStore("searchStore", () => {
  const loader = ref(false);
  const searchResult = ref(null);
  const getResult = async (search) => {
    loader.value = true;
    const result = await fetch(`https://nominatim.openstreetmap.org/?q=${search}&format=json`);
    const data = await result.json();
    searchResult.value = data;
    loader.value = false;
  };
  return {
    searchResult,
    getResult,
    loader
  };
});
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Card",
  __ssrInlineRender: true,
  props: {
    result: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "card" }, _attrs))} data-v-a883e6a9><div class="card__top" data-v-a883e6a9><p class="card__name" data-v-a883e6a9>${ssrInterpolate(__props.result.name)}</p><p class="card__type" data-v-a883e6a9>Type: ${ssrInterpolate(__props.result.type)}</p></div><div class="card__content" data-v-a883e6a9><div class="card__full-name" data-v-a883e6a9>${ssrInterpolate(__props.result.display_name)}</div></div></div>`);
    };
  }
});
const Card_vue_vue_type_style_index_0_scoped_a883e6a9_lang = "";
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/Card.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const Card = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-a883e6a9"]]);
const Search_vue_vue_type_style_index_0_scoped_5f97a8a3_lang = "";
const _sfc_main$1 = {
  __name: "Search",
  __ssrInlineRender: true,
  setup(__props) {
    const searchStore = useSearchStore();
    const searchText = ref("");
    let timer = null;
    watch(
      () => searchStore.searchResult,
      () => {
        clearTimeout(timer);
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<!--[--><input type="text" class="search"${ssrRenderAttr("value", searchText.value)} placeholder="Пиши свой поиск" data-v-5f97a8a3>`);
      if (unref(searchStore).loader) {
        _push(`<span class="search__preloader" data-v-5f97a8a3>Ищу...</span>`);
      } else {
        _push(`<!---->`);
      }
      if (((_a = unref(searchStore).searchResult) == null ? void 0 : _a.length) === 0 && !unref(searchStore).loader) {
        _push(`<span class="search__info" data-v-5f97a8a3>Ничего не нашел :(</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(unref(searchStore).searchResult, (result) => {
        _push(`<div class="search__item" data-v-5f97a8a3>`);
        _push(ssrRenderComponent(Card, { result }, null, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--><!--]-->`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/Search.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const Search = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-5f97a8a3"]]);
const Search$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Search
}, Symbol.toStringTag, { value: "Module" }));
const App_vue_vue_type_style_index_0_scoped_2807b10e_lang = "";
const _sfc_main = {
  __name: "App",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))} data-v-2807b10e><h1 class="container__title" data-v-2807b10e>Прочешем места? 🍺</h1>`);
      _push(ssrRenderComponent(Search, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/App.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2807b10e"]]);
const routes = [
  {
    path: "/",
    component: () => Promise.resolve().then(() => Search$1)
  }
];
const createRouter = () => createRouter$1({
  history: createMemoryHistory("/"),
  routes
});
function createApp() {
  const app = createSSRApp(App);
  const pinia = createPinia();
  app.use(pinia);
  const router = createRouter();
  app.use(router);
  return { app, router };
}
async function render(url, manifest) {
  const { app, router } = createApp();
  await router.push(url);
  await router.isReady();
  const ctx = {};
  const html = await renderToString(app, ctx);
  const preloadLinks = renderPreloadLinks(ctx.modules, manifest);
  return [html, preloadLinks];
}
function renderPreloadLinks(modules, manifest) {
  let links = "";
  const seen = /* @__PURE__ */ new Set();
  modules.forEach((id) => {
    const files = manifest[id];
    if (files) {
      files.forEach((file) => {
        if (!seen.has(file)) {
          seen.add(file);
          const filename = basename(file);
          if (manifest[filename]) {
            for (const depFile of manifest[filename]) {
              links += renderPreloadLink(depFile);
              seen.add(depFile);
            }
          }
          links += renderPreloadLink(file);
        }
      });
    }
  });
  return links;
}
function renderPreloadLink(file) {
  if (file.endsWith(".js")) {
    return `<link rel="modulepreload" crossorigin href="${file}">`;
  } else if (file.endsWith(".css")) {
    return `<link rel="stylesheet" href="${file}">`;
  } else if (file.endsWith(".woff")) {
    return ` <link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`;
  } else if (file.endsWith(".woff2")) {
    return ` <link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`;
  } else if (file.endsWith(".gif")) {
    return ` <link rel="preload" href="${file}" as="image" type="image/gif">`;
  } else if (file.endsWith(".jpg") || file.endsWith(".jpeg")) {
    return ` <link rel="preload" href="${file}" as="image" type="image/jpeg">`;
  } else if (file.endsWith(".png")) {
    return ` <link rel="preload" href="${file}" as="image" type="image/png">`;
  } else {
    return "";
  }
}
export {
  render
};
