(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/packages/designer/src/state/store.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useDesignerStore",
    ()=>useDesignerStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zustand$40$5$2e$0$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_react$40$19$2e$0$2e$0_use$2d$sync$2d$external$2d$store$40$1$2e$6$2e$0_react$40$19$2e$0$2e$0_$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/zustand@5.0.8_@types+react@19.0.10_react@19.0.0_use-sync-external-store@1.6.0_react@19.0.0_/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
;
const useDesignerStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zustand$40$5$2e$0$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_react$40$19$2e$0$2e$0_use$2d$sync$2d$external$2d$store$40$1$2e$6$2e$0_react$40$19$2e$0$2e$0_$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])((set, get)=>({
        schema: {
            components: []
        },
        selectedId: null,
        viewport: "sm",
        history: {
            stack: [],
            idx: -1,
            max: 100
        },
        setSchema: (s, push = true)=>{
            if (push) {
                const { history } = get();
                const nextStack = [
                    s,
                    ...history.stack.slice(Math.max(0, history.idx))
                ].slice(0, history.max);
                set({
                    schema: s,
                    history: {
                        stack: nextStack,
                        idx: 0,
                        max: history.max
                    }
                });
                return;
            }
            set({
                schema: s
            });
        },
        select: (id)=>set({
                selectedId: id
            }),
        undo: ()=>{
            const { history } = get();
            if (history.idx < history.stack.length - 1) {
                const idx = history.idx + 1;
                set({
                    schema: history.stack[idx],
                    history: {
                        ...history,
                        idx
                    }
                });
            }
        },
        redo: ()=>{
            const { history } = get();
            if (history.idx > 0) {
                const idx = history.idx - 1;
                set({
                    schema: history.stack[idx],
                    history: {
                        ...history,
                        idx
                    }
                });
            }
        }
    }));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/designer/src/panels/LeftPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LeftPanel",
    ()=>LeftPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.1_@babel+core@7.28.5_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$designer$2f$src$2f$state$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/designer/src/state/store.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function generateId(prefix, schema) {
    let i = 1;
    while(schema.components.some((c)=>c.id === `${prefix}-${i}`))i++;
    return `${prefix}-${i}`;
}
function LeftPanel() {
    _s();
    const schema = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$designer$2f$src$2f$state$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDesignerStore"])({
        "LeftPanel.useDesignerStore[schema]": (s)=>s.schema
    }["LeftPanel.useDesignerStore[schema]"]);
    const setSchema = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$designer$2f$src$2f$state$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDesignerStore"])({
        "LeftPanel.useDesignerStore[setSchema]": (s)=>s.setSchema
    }["LeftPanel.useDesignerStore[setSchema]"]);
    const addComponent = (node)=>{
        const withId = {
            ...node,
            id: generateId(node.type, schema)
        };
        setSchema({
            ...schema,
            components: [
                ...schema.components,
                withId
            ]
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "font-medium mb-2",
                children: "物料"
            }, void 0, false, {
                fileName: "[project]/packages/designer/src/panels/LeftPanel.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "border px-2 py-1 rounded",
                        onClick: ()=>addComponent({
                                id: "-",
                                type: "text",
                                properties: {
                                    text: "新文本"
                                }
                            }),
                        children: "文本"
                    }, void 0, false, {
                        fileName: "[project]/packages/designer/src/panels/LeftPanel.tsx",
                        lineNumber: 25,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "border px-2 py-1 rounded",
                        onClick: ()=>addComponent({
                                id: "-",
                                type: "input",
                                attributes: {
                                    placeholder: "请输入"
                                }
                            }),
                        children: "输入框"
                    }, void 0, false, {
                        fileName: "[project]/packages/designer/src/panels/LeftPanel.tsx",
                        lineNumber: 26,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/designer/src/panels/LeftPanel.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/packages/designer/src/panels/LeftPanel.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
_s(LeftPanel, "0yhwEVQpiclaGk7DsbPrIE4OEYk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$designer$2f$src$2f$state$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDesignerStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$designer$2f$src$2f$state$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDesignerStore"]
    ];
});
_c = LeftPanel;
var _c;
__turbopack_context__.k.register(_c, "LeftPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/designer/src/panels/RightPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RightPanel",
    ()=>RightPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.1_@babel+core@7.28.5_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$designer$2f$src$2f$state$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/designer/src/state/store.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function updateNode(schema, id, updater) {
    return {
        ...schema,
        components: schema.components.map((n)=>n.id === id ? updater(n) : n)
    };
}
function RightPanel() {
    _s();
    const schema = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$designer$2f$src$2f$state$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDesignerStore"])({
        "RightPanel.useDesignerStore[schema]": (s)=>s.schema
    }["RightPanel.useDesignerStore[schema]"]);
    const setSchema = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$designer$2f$src$2f$state$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDesignerStore"])({
        "RightPanel.useDesignerStore[setSchema]": (s)=>s.setSchema
    }["RightPanel.useDesignerStore[setSchema]"]);
    const selectedId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$designer$2f$src$2f$state$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDesignerStore"])({
        "RightPanel.useDesignerStore[selectedId]": (s)=>s.selectedId
    }["RightPanel.useDesignerStore[selectedId]"]);
    const selected = schema.components.find((n)=>n.id === selectedId) || null;
    if (!selected) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: "未选择组件"
    }, void 0, false, {
        fileName: "[project]/packages/designer/src/panels/RightPanel.tsx",
        lineNumber: 20,
        columnNumber: 25
    }, this);
    const setProp = (path, value)=>{
        setSchema(updateNode(schema, selected.id, (n)=>{
            if (path === "properties.text") {
                return {
                    ...n,
                    properties: {
                        ...n.properties,
                        text: value
                    }
                };
            }
            if (path === "properties.className") {
                return {
                    ...n,
                    properties: {
                        ...n.properties,
                        className: value
                    }
                };
            }
            if (path === "attributes.placeholder") {
                return {
                    ...n,
                    attributes: {
                        ...n.attributes || {},
                        placeholder: value
                    }
                };
            }
            return n;
        }));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "font-medium",
                children: "属性"
            }, void 0, false, {
                fileName: "[project]/packages/designer/src/panels/RightPanel.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            selected.type === "text" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "block",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm",
                        children: "text"
                    }, void 0, false, {
                        fileName: "[project]/packages/designer/src/panels/RightPanel.tsx",
                        lineNumber: 44,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        className: "border rounded px-2 py-1 w-full",
                        value: selected.properties?.text || "",
                        onChange: (e)=>setProp("properties.text", e.target.value)
                    }, void 0, false, {
                        fileName: "[project]/packages/designer/src/panels/RightPanel.tsx",
                        lineNumber: 45,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/designer/src/panels/RightPanel.tsx",
                lineNumber: 43,
                columnNumber: 9
            }, this),
            selected.type === "input" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "block",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm",
                        children: "placeholder"
                    }, void 0, false, {
                        fileName: "[project]/packages/designer/src/panels/RightPanel.tsx",
                        lineNumber: 50,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        className: "border rounded px-2 py-1 w-full",
                        value: selected.attributes?.placeholder || "",
                        onChange: (e)=>setProp("attributes.placeholder", e.target.value)
                    }, void 0, false, {
                        fileName: "[project]/packages/designer/src/panels/RightPanel.tsx",
                        lineNumber: 51,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/designer/src/panels/RightPanel.tsx",
                lineNumber: 49,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "block",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm",
                        children: "className"
                    }, void 0, false, {
                        fileName: "[project]/packages/designer/src/panels/RightPanel.tsx",
                        lineNumber: 55,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        className: "border rounded px-2 py-1 w-full",
                        value: selected.properties?.className || "",
                        onChange: (e)=>setProp("properties.className", e.target.value)
                    }, void 0, false, {
                        fileName: "[project]/packages/designer/src/panels/RightPanel.tsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/designer/src/panels/RightPanel.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/packages/designer/src/panels/RightPanel.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
_s(RightPanel, "6qFtnCU+18pvWhuUvmtId8Bxlzg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$designer$2f$src$2f$state$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDesignerStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$designer$2f$src$2f$state$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDesignerStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$designer$2f$src$2f$state$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDesignerStore"]
    ];
});
_c = RightPanel;
var _c;
__turbopack_context__.k.register(_c, "RightPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/renderer/src/components/Renderer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Renderer",
    ()=>Renderer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.1_@babel+core@7.28.5_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.1_@babel+core@7.28.5_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
function mergeByViewport(node, viewport) {
    if (!viewport || viewport === "sm" || !node.overrides?.[viewport]) return node;
    const ov = node.overrides[viewport];
    return {
        ...node,
        ...ov,
        properties: {
            ...node.properties,
            ...ov.properties
        }
    };
}
function Renderer({ schema, registry, context, className }) {
    const ctx = context ?? {
        viewport: "sm"
    };
    const renderNode = (node)=>{
        const n = mergeByViewport(node, ctx.viewport);
        const render = registry.get(n.type);
        if (!render) return null;
        return render(n, ctx);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: className,
        children: schema.components.map((n)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Fragment, {
                children: renderNode(n)
            }, n.id, false, {
                fileName: "[project]/packages/renderer/src/components/Renderer.tsx",
                lineNumber: 31,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/packages/renderer/src/components/Renderer.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
_c = Renderer;
var _c;
__turbopack_context__.k.register(_c, "Renderer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/designer/src/utils/grid.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GRID_COLUMNS",
    ()=>GRID_COLUMNS,
    "computeRows",
    ()=>computeRows,
    "rebalanceAfterMove",
    ()=>rebalanceAfterMove,
    "rebalanceRowSpans",
    ()=>rebalanceRowSpans,
    "setSpan",
    ()=>setSpan
]);
const GRID_COLUMNS = 12;
function getSpan(node) {
    const raw = node.properties?.style?.colSpan;
    const n = typeof raw === "string" ? parseInt(raw, 10) : typeof raw === "number" ? raw : undefined;
    if (!n || Number.isNaN(n)) return GRID_COLUMNS; // default full width
    return Math.max(1, Math.min(GRID_COLUMNS, n));
}
function setSpan(node, span) {
    const style = {
        ...node.properties?.style || {},
        colSpan: String(span)
    };
    return {
        ...node,
        properties: {
            ...node.properties || {},
            style
        }
    };
}
function computeRows(components) {
    const rows = [];
    let current = [];
    let used = 0;
    for (const c of components){
        const span = getSpan(c);
        if (used + span > GRID_COLUMNS && current.length > 0) {
            rows.push(current);
            current = [];
            used = 0;
        }
        current.push(c);
        used += span;
    }
    if (current.length) rows.push(current);
    return rows;
}
function rebalanceRowSpans(row) {
    if (row.length === 0) return row;
    const base = Math.max(1, Math.floor(GRID_COLUMNS / row.length));
    const remainder = GRID_COLUMNS - base * row.length;
    return row.map((n, idx)=>setSpan(n, base + (idx < remainder ? 1 : 0)));
}
function rebalanceAfterMove(list, fromIndex, toIndex) {
    const next = [
        ...list
    ];
    const [moved] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, moved);
    const rows = computeRows(next);
    // 仅对受影响的行做均分，这里简单对所有行均分
    const balanced = rows.flatMap((r)=>rebalanceRowSpans(r));
    return balanced;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/designer/src/Canvas.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Canvas",
    ()=>Canvas
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.1_@babel+core@7.28.5_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.1_@babel+core@7.28.5_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$renderer$2f$src$2f$components$2f$Renderer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/renderer/src/components/Renderer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$designer$2f$src$2f$state$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/designer/src/state/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$dnd$2d$kit$2b$core$40$6$2e$3$2e$1_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@dnd-kit+core@6.3.1_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@dnd-kit/core/dist/core.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$dnd$2d$kit$2b$sortable$40$8$2e$0$2e$0_$40$dnd$2d$kit$2b$core$40$6$2e$3$2e$1_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@dnd-kit+sortable@8.0.0_@dnd-kit+core@6.3.1_react-dom@19.0.0_react@19.0.0__react@19.0.0__react@19.0.0/node_modules/@dnd-kit/sortable/dist/sortable.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$dnd$2d$kit$2b$utilities$40$3$2e$2$2e$2_react$40$19$2e$0$2e$0$2f$node_modules$2f40$dnd$2d$kit$2f$utilities$2f$dist$2f$utilities$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@dnd-kit+utilities@3.2.2_react@19.0.0/node_modules/@dnd-kit/utilities/dist/utilities.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$designer$2f$src$2f$utils$2f$grid$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/designer/src/utils/grid.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
const viewportEditorStyles = {
    sm: "w-[370px]",
    md: "w-[818px]",
    lg: "w-[1074px]"
};
function getSpan(node) {
    const raw = node.properties?.style?.colSpan;
    const n = typeof raw === "string" ? parseInt(raw, 10) : typeof raw === "number" ? raw : undefined;
    if (!n || Number.isNaN(n)) return __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$designer$2f$src$2f$utils$2f$grid$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GRID_COLUMNS"];
    return Math.max(1, Math.min(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$designer$2f$src$2f$utils$2f$grid$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GRID_COLUMNS"], n));
}
function SortableItem({ id, children, selected, onClick }) {
    _s();
    const { attributes, listeners, setNodeRef, transform, transition } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$dnd$2d$kit$2b$sortable$40$8$2e$0$2e$0_$40$dnd$2d$kit$2b$core$40$6$2e$3$2e$1_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSortable"])({
        id
    });
    const style = {
        transform: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$dnd$2d$kit$2b$utilities$40$3$2e$2$2e$2_react$40$19$2e$0$2e$0$2f$node_modules$2f40$dnd$2d$kit$2f$utilities$2f$dist$2f$utilities$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CSS"].Transform.toString(transform),
        transition
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: setNodeRef,
        style: style,
        ...attributes,
        ...listeners,
        onClick: onClick,
        className: `rounded ${selected ? "ring-2 ring-blue-500" : ""}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/packages/designer/src/Canvas.tsx",
        lineNumber: 41,
        columnNumber: 5
    }, this);
}
_s(SortableItem, "FTUh0JV0KNM2MI3tYtLrQh0rr1U=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$dnd$2d$kit$2b$sortable$40$8$2e$0$2e$0_$40$dnd$2d$kit$2b$core$40$6$2e$3$2e$1_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSortable"]
    ];
});
_c = SortableItem;
function Canvas({ registry, viewport }) {
    _s1();
    const schema = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$designer$2f$src$2f$state$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDesignerStore"])({
        "Canvas.useDesignerStore[schema]": (s)=>s.schema
    }["Canvas.useDesignerStore[schema]"]);
    const setSchema = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$designer$2f$src$2f$state$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDesignerStore"])({
        "Canvas.useDesignerStore[setSchema]": (s)=>s.setSchema
    }["Canvas.useDesignerStore[setSchema]"]);
    const selectedId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$designer$2f$src$2f$state$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDesignerStore"])({
        "Canvas.useDesignerStore[selectedId]": (s)=>s.selectedId
    }["Canvas.useDesignerStore[selectedId]"]);
    const select = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$designer$2f$src$2f$state$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDesignerStore"])({
        "Canvas.useDesignerStore[select]": (s)=>s.select
    }["Canvas.useDesignerStore[select]"]);
    const ids = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Canvas.useMemo[ids]": ()=>schema.components.map({
                "Canvas.useMemo[ids]": (n)=>n.id
            }["Canvas.useMemo[ids]"])
    }["Canvas.useMemo[ids]"], [
        schema.components
    ]);
    const rows = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Canvas.useMemo[rows]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$designer$2f$src$2f$utils$2f$grid$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["computeRows"])(schema.components)
    }["Canvas.useMemo[rows]"], [
        schema.components
    ]);
    const pointer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$dnd$2d$kit$2b$core$40$6$2e$3$2e$1_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSensor"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$dnd$2d$kit$2b$core$40$6$2e$3$2e$1_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PointerSensor"], {
        activationConstraint: {
            distance: 8
        }
    });
    const sensors = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Canvas.useMemo[sensors]": ()=>[
                pointer
            ]
    }["Canvas.useMemo[sensors]"], [
        pointer
    ]);
    const onDragEnd = (event)=>{
        const { active, over } = event;
        if (!over || active.id === over.id) return;
        const oldIndex = ids.indexOf(active.id);
        const newIndex = ids.indexOf(over.id);
        // 先移动，再按行重新分配 colSpan
        const moved = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$dnd$2d$kit$2b$sortable$40$8$2e$0$2e$0_$40$dnd$2d$kit$2b$core$40$6$2e$3$2e$1_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["arrayMove"])(schema.components, oldIndex, newIndex);
        const flat = [];
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$designer$2f$src$2f$utils$2f$grid$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["computeRows"])(moved).forEach((row)=>{
            const base = Math.max(1, Math.floor(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$designer$2f$src$2f$utils$2f$grid$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GRID_COLUMNS"] / row.length));
            const remainder = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$designer$2f$src$2f$utils$2f$grid$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GRID_COLUMNS"] - base * row.length;
            row.forEach((n, idx)=>{
                const span = base + (idx < remainder ? 1 : 0);
                const style = {
                    ...n.properties?.style || {},
                    colSpan: String(span)
                };
                flat.push({
                    ...n,
                    properties: {
                        ...n.properties || {},
                        style
                    }
                });
            });
        });
        setSchema({
            ...schema,
            components: flat
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "px-4 pb-10",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `mx-auto ${viewportEditorStyles[viewport]} bg-white border rounded-md shadow-sm p-4`,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-2 text-sm text-slate-500",
                    children: "拖拽条目可重排；按行自动均分 colSpan；多于一行将自动换行。"
                }, void 0, false, {
                    fileName: "[project]/packages/designer/src/Canvas.tsx",
                    lineNumber: 82,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$dnd$2d$kit$2b$core$40$6$2e$3$2e$1_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DndContext"], {
                    sensors: sensors,
                    collisionDetection: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$dnd$2d$kit$2b$core$40$6$2e$3$2e$1_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["closestCenter"],
                    onDragEnd: onDragEnd,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$dnd$2d$kit$2b$sortable$40$8$2e$0$2e$0_$40$dnd$2d$kit$2b$core$40$6$2e$3$2e$1_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SortableContext"], {
                        items: ids,
                        strategy: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$dnd$2d$kit$2b$sortable$40$8$2e$0$2e$0_$40$dnd$2d$kit$2b$core$40$6$2e$3$2e$1_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["verticalListSortingStrategy"],
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: rows.map((row, rIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "grid",
                                        gridTemplateColumns: `repeat(${__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$designer$2f$src$2f$utils$2f$grid$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GRID_COLUMNS"]}, minmax(0, 1fr))`,
                                        gap: 12
                                    },
                                    children: row.map((n)=>{
                                        const span = getSpan(n);
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                gridColumn: `span ${span} / span ${span}`
                                            },
                                            className: "border rounded p-2 bg-white",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableItem, {
                                                id: n.id,
                                                selected: selectedId === n.id,
                                                onClick: ()=>select(n.id),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2 mb-2",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs text-slate-500",
                                                            children: n.type
                                                        }, void 0, false, {
                                                            fileName: "[project]/packages/designer/src/Canvas.tsx",
                                                            lineNumber: 94,
                                                            columnNumber: 29
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/packages/designer/src/Canvas.tsx",
                                                        lineNumber: 93,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$renderer$2f$src$2f$components$2f$Renderer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Renderer"], {
                                                        schema: {
                                                            components: [
                                                                n
                                                            ]
                                                        },
                                                        registry: registry,
                                                        context: {
                                                            viewport
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/packages/designer/src/Canvas.tsx",
                                                        lineNumber: 96,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/packages/designer/src/Canvas.tsx",
                                                lineNumber: 92,
                                                columnNumber: 25
                                            }, this)
                                        }, n.id, false, {
                                            fileName: "[project]/packages/designer/src/Canvas.tsx",
                                            lineNumber: 91,
                                            columnNumber: 23
                                        }, this);
                                    })
                                }, `row-${rIndex}`, false, {
                                    fileName: "[project]/packages/designer/src/Canvas.tsx",
                                    lineNumber: 87,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/packages/designer/src/Canvas.tsx",
                            lineNumber: 85,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/packages/designer/src/Canvas.tsx",
                        lineNumber: 84,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/packages/designer/src/Canvas.tsx",
                    lineNumber: 83,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/packages/designer/src/Canvas.tsx",
            lineNumber: 81,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/packages/designer/src/Canvas.tsx",
        lineNumber: 80,
        columnNumber: 5
    }, this);
}
_s1(Canvas, "6oZY0Pl0+QbieDQXrzVg3zGw4r0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$designer$2f$src$2f$state$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDesignerStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$designer$2f$src$2f$state$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDesignerStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$designer$2f$src$2f$state$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDesignerStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$designer$2f$src$2f$state$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDesignerStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$dnd$2d$kit$2b$core$40$6$2e$3$2e$1_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSensor"]
    ];
});
_c1 = Canvas;
var _c, _c1;
__turbopack_context__.k.register(_c, "SortableItem");
__turbopack_context__.k.register(_c1, "Canvas");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/designer/src/Designer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Designer",
    ()=>Designer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.1_@babel+core@7.28.5_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.1_@babel+core@7.28.5_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$designer$2f$src$2f$state$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/designer/src/state/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$designer$2f$src$2f$panels$2f$LeftPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/designer/src/panels/LeftPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$designer$2f$src$2f$panels$2f$RightPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/designer/src/panels/RightPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$designer$2f$src$2f$Canvas$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/designer/src/Canvas.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function Designer({ value, defaultValue, onChange, registry, viewport = "sm", showJSON }) {
    _s();
    const setSchema = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$designer$2f$src$2f$state$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDesignerStore"])({
        "Designer.useDesignerStore[setSchema]": (s)=>s.setSchema
    }["Designer.useDesignerStore[setSchema]"]);
    const schema = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$designer$2f$src$2f$state$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDesignerStore"])({
        "Designer.useDesignerStore[schema]": (s)=>s.schema
    }["Designer.useDesignerStore[schema]"]);
    const isControlled = value !== undefined;
    // Sync from props into internal store
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Designer.useEffect": ()=>{
            if (isControlled && value) {
                if (schema !== value) setSchema(value, false);
            } else if (!isControlled && defaultValue) {
                if (schema !== defaultValue) setSchema(defaultValue, false);
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["Designer.useEffect"], [
        isControlled,
        value,
        defaultValue
    ]);
    // Emit changes only when uncontrolled
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Designer.useEffect": ()=>{
            if (!isControlled && onChange) onChange(schema);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["Designer.useEffect"], [
        schema,
        isControlled
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col w-full h-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-14 border-b flex items-center px-4 shrink-0 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "font-medium",
                        children: "Form Builder"
                    }, void 0, false, {
                        fileName: "[project]/packages/designer/src/Designer.tsx",
                        lineNumber: 42,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ml-auto text-sm text-slate-500",
                        children: "Designer"
                    }, void 0, false, {
                        fileName: "[project]/packages/designer/src/Designer.tsx",
                        lineNumber: 43,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/designer/src/Designer.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex w-full h-[calc(100vh-56px)] bg-dotted",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                        className: "w-[300px] border-r p-3 shrink-0 overflow-auto hidden md:block",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$designer$2f$src$2f$panels$2f$LeftPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LeftPanel"], {}, void 0, false, {
                            fileName: "[project]/packages/designer/src/Designer.tsx",
                            lineNumber: 50,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/packages/designer/src/Designer.tsx",
                        lineNumber: 49,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        className: "flex-1 overflow-auto relative pt-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$designer$2f$src$2f$Canvas$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Canvas"], {
                            registry: registry,
                            viewport: viewport
                        }, void 0, false, {
                            fileName: "[project]/packages/designer/src/Designer.tsx",
                            lineNumber: 55,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/packages/designer/src/Designer.tsx",
                        lineNumber: 54,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                        className: "w-[320px] border-l p-3 shrink-0 overflow-auto hidden md:block",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$designer$2f$src$2f$panels$2f$RightPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RightPanel"], {}, void 0, false, {
                            fileName: "[project]/packages/designer/src/Designer.tsx",
                            lineNumber: 60,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/packages/designer/src/Designer.tsx",
                        lineNumber: 59,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/designer/src/Designer.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this),
            showJSON && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                className: "fixed right-0 bottom-0 w-[420px] h-[50vh] bg-white/95 p-3 overflow-auto shadow-xl border",
                children: JSON.stringify(schema, null, 2)
            }, void 0, false, {
                fileName: "[project]/packages/designer/src/Designer.tsx",
                lineNumber: 65,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/packages/designer/src/Designer.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, this);
}
_s(Designer, "kTNgo0muKL1bfMEXN3A8eyOT3Sg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$designer$2f$src$2f$state$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDesignerStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$designer$2f$src$2f$state$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDesignerStore"]
    ];
});
_c = Designer;
var _c;
__turbopack_context__.k.register(_c, "Designer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/renderer/src/core/registry.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ComponentRegistry",
    ()=>ComponentRegistry
]);
class ComponentRegistry {
    map = new Map();
    register(type, render) {
        this.map.set(type, render);
    }
    get(type) {
        return this.map.get(type);
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/renderer/src/registry/shadcn-basic.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createBasicRegistry",
    ()=>createBasicRegistry
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.1_@babel+core@7.28.5_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$renderer$2f$src$2f$core$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/renderer/src/core/registry.ts [app-client] (ecmascript)");
;
;
function TextRender(node, _ctx) {
    const text = node.properties?.text ?? node.attributes?.text ?? "文本组件";
    const className = node.properties?.className ?? node.attributes?.class ?? "";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: className,
        children: text
    }, void 0, false, {
        fileName: "[project]/packages/renderer/src/registry/shadcn-basic.tsx",
        lineNumber: 8,
        columnNumber: 10
    }, this);
}
_c = TextRender;
function InputRender(node, _ctx) {
    const placeholder = node.attributes?.placeholder ?? "请输入";
    const type = node.attributes?.type ?? "text";
    const className = node.properties?.className ?? node.attributes?.class ?? "";
    const icon = node.properties?.style?.icon;
    // 简化：不内置图标组，先渲染纯 input
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        placeholder: placeholder,
        type: type,
        className: className,
        "data-icon": icon ?? undefined
    }, void 0, false, {
        fileName: "[project]/packages/renderer/src/registry/shadcn-basic.tsx",
        lineNumber: 17,
        columnNumber: 10
    }, this);
}
_c1 = InputRender;
function createBasicRegistry() {
    const registry = new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$renderer$2f$src$2f$core$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ComponentRegistry"]();
    registry.register("text", TextRender);
    registry.register("form-text", TextRender);
    registry.register("input", InputRender);
    registry.register("form-input", InputRender);
    return registry;
}
var _c, _c1;
__turbopack_context__.k.register(_c, "TextRender");
__turbopack_context__.k.register(_c1, "InputRender");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/playground/app/designer-demo/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Page
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.1_@babel+core@7.28.5_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$designer$2f$src$2f$Designer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/designer/src/Designer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$renderer$2f$src$2f$registry$2f$shadcn$2d$basic$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/renderer/src/registry/shadcn-basic.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.1_@babel+core@7.28.5_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const registry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$renderer$2f$src$2f$registry$2f$shadcn$2d$basic$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createBasicRegistry"])();
function Page() {
    _s();
    const [schema, setSchema] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        components: [
            {
                id: "text-1",
                type: "text",
                properties: {
                    text: "可编辑文本",
                    className: ""
                }
            }
        ]
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        style: {
            padding: 24,
            height: "calc(100vh - 48px)"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                children: "Designer Demo"
            }, void 0, false, {
                fileName: "[project]/apps/playground/app/designer-demo/page.tsx",
                lineNumber: 12,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-slate-600",
                children: "左侧“物料”可添加组件；点击画布内“选择”按钮后，右侧可编辑属性；用上下箭头重排。"
            }, void 0, false, {
                fileName: "[project]/apps/playground/app/designer-demo/page.tsx",
                lineNumber: 13,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    height: "100%",
                    border: "1px solid #e5e7eb",
                    marginTop: 12
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$designer$2f$src$2f$Designer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Designer"], {
                    value: schema,
                    onChange: setSchema,
                    registry: registry,
                    showJSON: true
                }, void 0, false, {
                    fileName: "[project]/apps/playground/app/designer-demo/page.tsx",
                    lineNumber: 15,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/playground/app/designer-demo/page.tsx",
                lineNumber: 14,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/playground/app/designer-demo/page.tsx",
        lineNumber: 11,
        columnNumber: 5
    }, this);
}
_s(Page, "evS5i6SfapvtRiPqjJSSPzVUrn4=");
_c = Page;
var _c;
__turbopack_context__.k.register(_c, "Page");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_4162eb9d._.js.map