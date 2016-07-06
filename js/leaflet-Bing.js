!function t(e,n,i){function o(a,s){if(!n[a]){if(!e[a]){var u="function"==typeof require&&require;if(!s&&u)return u(a,!0);if(r)return r(a,!0);var l=new Error("Cannot find module '"+a+"'");throw l.code="MODULE_NOT_FOUND",l}var c=n[a]={exports:{}};e[a][0].call(c.exports,function(t){var n=e[a][1][t];return o(n?n:t)},c,c.exports,t,e,n,i)}return n[a].exports}for(var r="function"==typeof require&&require,a=0;a<i.length;a++)o(i[a]);return o}({1:[function(t,e,n){(function(n){function i(t,e,n){for(var i="",o=n;o>0;o--){var r=0,a=1<<o-1;0!==(t&a)&&r++,0!==(e&a)&&(r+=2),i+=r.toString()}return i}function o(t){var e=t.split(",");return[e[1],e[0],e[3],e[2]]}var r="undefined"!=typeof window?window.L:"undefined"!=typeof n?n.L:null,a=t("fetch-jsonp"),s=t("bbox-intersect"),u=["Aerial","AerialWithLabels","Road"];r.TileLayer.Bing=r.TileLayer.extend({options:{bingMapsKey:null,imagerySet:"Aerial",culture:"en-US",minZoom:1},statics:{METADATA_URL:"https://dev.virtualearth.net/REST/v1/Imagery/Metadata/{imagerySet}?key={bingMapsKey}&include=ImageryProviders&uriScheme=https",POINT_METADATA_URL:"https://dev.virtualearth.net/REST/v1/Imagery/Metadata/{imagerySet}/{lat},{lng}?zl={z}&key={bingMapsKey}&uriScheme=https"},initialize:function(t){if("string"==typeof t&&(t={bingMapsKey:t}),t&&t.BingMapsKey&&(t.bingMapsKey=t.BingMapsKey,console.warn("use options.bingMapsKey instead of options.BingMapsKey")),!t||!t.bingMapsKey)throw new Error("Must supply options.BingMapsKey");if(t=r.setOptions(this,t),u.indexOf(t.imagerySet)<0)throw new Error("'"+t.imagerySet+"' is an invalid imagerySet, see https://github.com/gmaclennan/leaflet-bing-layer#parameters");t.minZoom=Math.max(1,t.minZoom);var e=r.Util.template(r.TileLayer.Bing.METADATA_URL,{bingMapsKey:this.options.bingMapsKey,imagerySet:this.options.imagerySet});this._imageryProviders=[],this._attributions=[],this._fetch=a(e,{jsonpCallback:"jsonp"}).then(function(t){return t.json()}).then(this._metaDataOnLoad.bind(this))["catch"](console.error.bind(console)),r.Browser.android||this.on("tileunload",this._onTileRemove)},createTile:function(t,e){var n=document.createElement("img");return r.DomEvent.on(n,"load",r.bind(this._tileOnLoad,this,e,n)),r.DomEvent.on(n,"error",r.bind(this._tileOnError,this,e,n)),this.options.crossOrigin&&(n.crossOrigin=""),n.alt="",this._url?n.src=this.getTileUrl(t):this._fetch.then(function(){n.src=this.getTileUrl(t)}.bind(this))["catch"](function(t){console.error(t),e(t)}),n},getTileUrl:function(t){var e=i(t.x,t.y,t.z);return r.Util.template(this._url,{quadkey:e,subdomain:this._getSubdomain(t),culture:this.options.culture})},onAdd:function(t){t.on("moveend",this._updateAttribution,this),r.TileLayer.prototype.onAdd.call(this,t),this._attributions.forEach(function(e){t.attributionControl.addAttribution(e)})},onRemove:function(t){t.off("moveend",this._updateAttribution,this),this._attributions.forEach(function(e){t.attributionControl.removeAttribution(e)}),r.TileLayer.prototype.onRemove.call(this,t)},getMetaData:function(t,e){if(!(this._map||t&&e))return Promise.reject(new Error("If layer is not attached to map, you must provide LatLng and zoom"));t=t||this._map.getCenter(),e=e||this._map.getZoom();var n=r.Util.template(r.TileLayer.Bing.POINT_METADATA_URL,{bingMapsKey:this.options.bingMapsKey,imagerySet:this.options.imagerySet,z:e,lat:t.lat,lng:t.lng});return a(n,{jsonpCallback:"jsonp"}).then(function(t){return t.json()})["catch"](console.error.bind(console))},_metaDataOnLoad:function(t){if(200!==t.statusCode)throw new Error("Bing Imagery Metadata error: \n"+JSON.stringify(t,null,"  "));var e=t.resourceSets[0].resources[0];return this._url=e.imageUrl,this._imageryProviders=e.imageryProviders,this.options.subdomains=e.imageUrlSubdomains,this._updateAttribution(),Promise.resolve()},_updateAttribution:function(){var t=this._map;if(t&&t.attributionControl){var e=t.getZoom(),n=o(t.getBounds().toBBoxString());this._fetch.then(function(){var i=this._getAttributions(n,e),o=this._attributions;i.forEach(function(e){o.indexOf(e)>-1||t.attributionControl.addAttribution(e)}),o.filter(function(e){i.indexOf(e)>-1||t.attributionControl.removeAttribution(e)}),this._attributions=i}.bind(this))}},_getAttributions:function(t,e){return this._imageryProviders.reduce(function(n,i){for(var o=0;o<i.coverageAreas.length;o++)if(s(t,i.coverageAreas[o].bbox)&&e>=i.coverageAreas[o].zoomMin&&e<=i.coverageAreas[o].zoomMax)return n.push(i.attribution),n;return n},[])}}),r.tileLayer.bing=function(t){return new r.TileLayer.Bing(t)},e.exports=r.TileLayer.Bing}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"bbox-intersect":2,"fetch-jsonp":3}],2:[function(t,e,n){e.exports=function(t,e){return!(t[0]>e[2]||t[2]<e[0]||t[3]<e[1]||t[1]>e[3])}},{}],3:[function(t,e,n){!function(t,i){if("function"==typeof define&&define.amd)define(["exports","module"],i);else if("undefined"!=typeof n&&"undefined"!=typeof e)i(n,e);else{var o={exports:{}};i(o.exports,o),t.fetchJsonp=o.exports}}(this,function(t,e){"use strict";function n(){return"jsonp_"+Date.now()+"_"+Math.ceil(1e5*Math.random())}function i(t){try{delete window[t]}catch(e){window[t]=void 0}}function o(t){var e=document.getElementById(t);document.getElementsByTagName("head")[0].removeChild(e)}var r={timeout:5e3,jsonpCallback:"callback",jsonpCallbackFunction:null},a=function(t){var e=void 0===arguments[1]?{}:arguments[1],a=null!=e.timeout?e.timeout:r.timeout,s=null!=e.jsonpCallback?e.jsonpCallback:r.jsonpCallback,u=void 0;return new Promise(function(r,l){var c=e.jsonpCallbackFunction||n();window[c]=function(t){r({ok:!0,json:function(){return Promise.resolve(t)}}),u&&clearTimeout(u),o(s+"_"+c),i(c)},t+=-1===t.indexOf("?")?"?":"&";var d=document.createElement("script");d.setAttribute("src",t+s+"="+c),d.id=s+"_"+c,document.getElementsByTagName("head")[0].appendChild(d),u=setTimeout(function(){l(new Error("JSONP request to "+t+" timed out")),i(c),o(s+"_"+c)},a)})};e.exports=a})},{}]},{},[1]);