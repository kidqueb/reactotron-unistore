!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t=t||self).reactotronUnistore=e()}(this,function(){const t=["","*",".*","root","root.*"];function e(t=[],e={},o=[]){if(0===t.length)return o;for(let s=0,a=t.length;s<a;s++){const a=t[s],r=n(a,e);r&&o.push({path:a,value:r})}return o}function n(e,n){return function(e){return t.indexOf(e)>-1}(e)?n:function(t,e){if(!e)return t;const n=e.split(".");let o=t;for(let t=0;t<n.length;t++){const e=n[t];if("*"!==e&&(o=o[e]),t<n.length-1&&"object"!=typeof o){o=void 0;break}}return o}(n,e)}return t=>o=>{const s=function(t,o){let s=[];const a=t.action((t,e)=>e);return{"state.keys.request":({payload:e})=>{const s=n(e.path,t.getState());o.stateKeysResponse(e.path,Object.keys(s))},"state.values.request":({payload:e})=>{const s=n(e.path,t.getState());o.stateValuesResponse(e.path,s)},"state.values.subscribe":({payload:n})=>{if(s=n.paths,n.paths){const n=e(s,t.getState());o.stateValuesChange(n)}t.subscribe((t,n)=>{const a=n&&n.name||"Reactotron/DISPATCH",r=e(s,t);(function(t,e){try{return e?Promise.resolve(e()).then(function(e){const n=e?Object.keys(e):[];let o={};for(let e=0;e<n.length;e++){const s=n[e];o[s]=t[s]}return o}):Promise.resolve(!1)}catch(t){return Promise.reject(t)}})(t,n).then(t=>{t?o.stateActionComplete(a,t):o.display({name:"UNISTORE",preview:"store.setState",value:"Warning: The values of the action cannot be determined when store.setState is used to update state within an action. Think about returning an object instead.",important:!0}),o.stateValuesChange(r)})})},"state.action.dispatch":({payload:e})=>{t.setState(e.action)},"state.backup.request":()=>{const e=t.getState();o.stateBackupResponse(e)},"state.restore.request":({payload:t})=>{a(t.state)}}}(t,o);return{onCommand:t=>{const e=s[t.type];e&&e(t)}}}});
//# sourceMappingURL=index.umd.js.map
