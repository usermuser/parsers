var sociomantic=sociomantic||{enable:function(){sociomantic.sonar.enable()}};sociomantic.sonar=sociomantic.sonar||{enable_callbacks:[],request:{pool:{},add:function(url,load,callback){var sr=sociomantic.sonar.request;var request=sr.item;var random_num=Math.random()+'';var request_id='r'+random_num.replace('.','');url+='&rid='+request_id;sr.pool[request_id]=new request(url,load,callback);return sr.pool[request_id]},item:function(url,load,callback){var self=this;this.url=url;this.load_method=load;this.callback=callback;this.doc=document;this.https=true;this.instance=false;this.response=false;this.status=0;this.timeout=false;this.fallback=false;this.setTimeout=function(length,count){self.timeout={count:count,length:length,object:false}};this.load=function(){if(typeof self.load_method==='function'){self.load_method(self.url,self.doc,self.https);self.status=self.status<1?1:self.status}if(self.timeout){self.timeout.object=setTimeout(function(){if(!self.response){if(self.timeout.count>0){self.timeout.count--;self.status=2;self.load()}else if(self.fallback&&typeof self.fallback==='function'){self.response=true;self.status=4;self.fallback()}}},self.timeout.length)}}}},enable:function(){var so=sociomantic.sonar;for(var i=0;i<so.enable_callbacks.length;i++){if(so.enable_callbacks.hasOwnProperty(i)){var enable_callback=so.enable_callbacks[i];if(typeof enable_callback==='function'){enable_callback();so.enable_callbacks.splice(i,1);i--}}}},response:function(param,response_id){var request_pool=sociomantic.sonar.request.pool;for(var id in request_pool){if(request_pool.hasOwnProperty(id)&&id===response_id){var request=request_pool[id];var callback=request.callback;var instance=request.instance;if(!request.response){if(typeof callback==='function'){request.response=true;request.status=3;if(typeof instance==='string'){callback(param,instance)}else{callback(param)}}}else{}}}}};sociomantic.sonar.adv=sociomantic.sonar.adv||{};sociomantic.sonar.adv['stoloto-ru']=sociomantic.sonar.adv['stoloto-ru']||{version:'adv2.07.1',adpanType:'adv',adpan_id:'stoloto-ru',adpan_hash:'4665790341480565643',shouldSendOAN:false,category_separator:false,got_confirmed:false,got_nonconfirmed:false,support_confirmed_in_iframe:false,request_objects:{'co':false,'po':false,'to':false,'dob':false,'fo':false},tracking_objects:{},tracking_objects_names:{'product':'product','basket':'basket','sale':'sale','lead':'lead','customer':'customer'},action:{type:false,basket:false,lead:false,sale:false,view:true},extConfig:{},enable:function(){var adv=sociomantic.sonar.adv['stoloto-ru'];var core=adv.core;var cookie=core.getCookie();adv.getTrackingObjects();adv.getCategory();adv.getProduct();adv.getBasket();adv.getTransaction();adv.getCustomer();adv.getOptOut();adv.getAction();core.validateTrackingObjects();core.getHooks('enable');if(!adv.getConfirmed()){adv.got_nonconfirmed=true;adv.buildActionUrl(adv.action.type,cookie)}},getTrackingObjects:function(){var adv=sociomantic.sonar.adv['stoloto-ru'];var core=adv.core;core.getHooks('getTrackingObjects');var tn=adv.tracking_objects_names;var tr=adv.tracking_objects;var copy=false;var name;var windowObject;for(var prop in tn){if(core.hasProperty(tn,prop)){name=tn[prop];windowObject=window[name];if(typeof windowObject===core.f){copy=core.deepCopy(windowObject(),prop)}else if(core.isObject(windowObject)){copy=core.deepCopy(windowObject,prop)}if(copy){tr[prop]=copy;copy=false}}}},getCategory:function(){var adv=sociomantic.sonar.adv['stoloto-ru'];var core=adv.core;core.getHooks('getCategory');var tr=adv.tracking_objects;var product=core.isObject(tr.product)?tr.product:false;var basket=core.isObject(tr.basket)&&!core.isEmpty(tr.basket)?tr.basket:false;var lead=core.isObject(tr.lead)&&!core.isEmpty(tr.lead)?tr.lead:false;if(product&&typeof product.category!==core.u&&typeof product.identifier===core.u&&!basket&&!lead){adv.cleanProduct();if(core.isArray(product.category)){adv.request_objects.co=product}}},getProduct:function(){var adv=sociomantic.sonar.adv['stoloto-ru'];var core=adv.core;core.getHooks('getProduct');var tr=adv.tracking_objects;var product=core.isObject(tr.product)?tr.product:false;var basket=core.isObject(tr.basket)&&!core.isEmpty(tr.basket)?tr.basket:false;var ro=adv.request_objects;if(product&&typeof product.identifier!==core.u&&!basket){if(typeof product.price!==core.u){if(product.price!==''){product.price=parseFloat(product.price)}else{delete product.price}}if(typeof product.amount!==core.u){if(product.amount!==''){product.amount=parseFloat(product.amount)}else{delete product.amount}}adv.cleanProduct();ro.po={products:[product]}}},cleanProduct:function(){var adv=sociomantic.sonar.adv['stoloto-ru'];var core=adv.core;var tr=adv.tracking_objects;var product=typeof tr.product===core.o?tr.product:false;var cleanProductCategory=function(){if(core.isArray(product.category)){for(var i=0;i<product.category.length;i++){if(core.hasProperty(product.category,i)){var cat=product.category[i];if(cat===''||(typeof cat!==core.s&&typeof cat!==core.n)){product.category.splice(i,1);i-=1}else{product.category[i]=adv.cleanString(cat)}}}if(product.category.length<1){delete product.category}}else if(typeof product.category===core.s){product.category=adv.cleanString(product.category);if(product.category===''){delete product.category}else{product.category=[product.category]}}};var clean=function(product,property,optionalFn){if(typeof product[property]===core.s){var cleaned=adv.cleanString(product[property]);if(optionalFn){cleaned=optionalFn(cleaned)}product[property]=cleaned}};if(product){try{clean(product,'brand');cleanProductCategory();clean(product,'currency',function(str){return str.toUpperCase()});clean(product,'url',function(str){core.arrayEach(['utm_source','utm_medium','utm_term','utm_content','utm_campaign'],function(utm){var regex=new RegExp('(?:\\?|&)'+utm+'=.*?(?=&|$)','g');str=str.replace(regex,'')});return str});clean(product,'description');clean(product,'fn')}catch(e){core.reportError(e,'__cleanProduct_error__')}}},cleanString:(function(){var handleQuotes=function(_,group,singleQuote){return singleQuote!==undefined?'\'':(group+'\\"')};return function(str){var core=sociomantic.sonar.adv['stoloto-ru'].core;if(typeof str===core.n){return str+''}if(typeof str===core.s){return str.replace(/(^|[^\\])"|(\\')/g,handleQuotes).replace(/(<[^>]+)>/ig,'').replace(/(\r\n|\n|\r)/gm,' ')}else{core.reportError('','cleanString_non_string_value_found');return''}}}()),getBasket:function(){var adv=sociomantic.sonar.adv['stoloto-ru'];var core=adv.core;core.getHooks('getProduct');var tr=adv.tracking_objects;var basket=core.isObject(tr.basket)&&!core.isEmpty(tr.basket)?tr.basket:false;var hasProducts=basket&&core.isArray(basket.products);var hasDate=basket&&typeof basket.date!==core.u;var ro=adv.request_objects;var po={};if(basket&&(hasDate||hasProducts)){adv.action.basket=true;if(hasProducts){for(var i in basket.products){if(core.hasProperty(basket.products,i)){var p=basket.products[i];if(core.isEmpty(p)){delete basket.products[i]}else{if(typeof p.amount!==core.u){p.amount=parseFloat(p.amount)}if(typeof p.quantity!==core.u){p.quantity=parseInt(p.quantity,10)}}}}po.products=basket.products}if(hasDate){po.date=basket.date}ro.po=po}},getTransaction:function(){var adv=sociomantic.sonar.adv['stoloto-ru'];var core=adv.core;core.getHooks('getTransaction');var tr=adv.tracking_objects;var basket=typeof tr.basket===core.o?tr.basket:false;var lead=typeof tr.lead===core.o?tr.lead:false;var ro=adv.request_objects;if(basket&&typeof basket.transaction!==core.u){var basketCopy={};for(var prop in basket){if(core.hasProperty(basket,prop)&&prop!=='products'&&prop!=='date'){basketCopy[prop]=basket[prop]}}if(!core.isEmpty(basketCopy)){adv.action.sale=true;ro.to={transaction:basketCopy}}}if(lead&&(typeof lead.transaction!==core.u||typeof lead.identifier!==core.u)){if(typeof lead.identifier!==core.u){lead.transaction=lead.identifier;delete lead.identifier;core.reportError('','lead.identifier_found')}adv.action.lead=true;ro.to={transaction:lead}}},getConfirmed:function(){var adv=sociomantic.sonar.adv['stoloto-ru'];var core=adv.core;var tr=adv.tracking_objects;var tn=adv.tracking_objects_names;var action;var cookie;var to;if(!adv.got_confirmed){cookie=core.getCookie();to=adv.request_objects.to;if(typeof to!==core.o){to={}}if(typeof to.transaction!==core.o){to.transaction={}}if(typeof tr.sale!==core.o&&typeof window[tn.sale]===core.o){tr.sale=window[tn.sale]}if(typeof tr.sale===core.o&&typeof tr.sale.confirmed!==core.u&&typeof to.transaction.confirmed===core.u){if(!adv.support_confirmed_in_iframe&&!adv.got_nonconfirmed){adv.got_nonconfirmed=true;adv.getAction();adv.buildActionUrl(adv.action.type,cookie)}adv.got_confirmed=true;to.transaction.confirmed=tr.sale.confirmed;adv.request_objects.to=to;action='sale';if(adv.action.lead){action='lead'}adv.buildActionUrl(action,cookie);return true}}return false},getCustomer:function(){var adv=sociomantic.sonar.adv['stoloto-ru'];var core=adv.core;adv.core.getHooks('getCustomer');var tr=adv.tracking_objects;var dob=typeof tr.customer===core.o?tr.customer:false;if(dob){var isEmptyStr=function(property){return typeof property!==core.u&&property===''};if(isEmptyStr(dob.segment)){delete dob.segment}if(isEmptyStr(dob.identifier)){delete dob.identifier}if(isEmptyStr(dob.mhash)){delete dob.mhash}if(!adv.core.isEmpty(dob)&&(typeof dob.agegroup!==core.u||typeof dob.education!==core.u||typeof dob.gender!==core.u||typeof dob.targeting!==core.u||typeof dob.mhash!==core.u||typeof dob.segment!==core.u||(typeof dob.identifier!==core.u&&dob.identifier!==''&&dob.identifier!=='0'&&dob.identifier!==0))){adv.request_objects.dob=dob}}},getOptOut:function(){var adv=sociomantic.sonar.adv['stoloto-ru'];adv.core.getHooks('getOptOut')},getAction:function(){var adv=sociomantic.sonar.adv['stoloto-ru'];adv.getActionView();adv.getActionBasket();adv.getActionSale();adv.getActionLead();return adv.action.type},getActionView:function(){var adv=sociomantic.sonar.adv['stoloto-ru'];adv.core.getHooks('getActionView');if(adv.action.view){adv.action.type='view'}},getActionBasket:function(){var adv=sociomantic.sonar.adv['stoloto-ru'];adv.core.getHooks('getActionBasket');if(adv.action.basket){adv.action.type='basket'}},getActionSale:function(){var adv=sociomantic.sonar.adv['stoloto-ru'];adv.core.getHooks('getActionSale');if(adv.action.sale){adv.action.type='sale'}},getActionLead:function(){var adv=sociomantic.sonar.adv['stoloto-ru'];adv.core.getHooks('getActionLead');if(adv.action.lead){adv.action.type='lead'}},buildUrl:function(host,action,aid){var adv=sociomantic.sonar.adv['stoloto-ru'];var core=adv.core;core.getHooks('buildUrl');var esc=core.stringifyAndEncode;var cookie=core.getCookie();var ro=adv.request_objects;var co=ro.co;var po=ro.po;var to=ro.to;var dob=ro.dob;var fo=ro.fo;var version=adv.version;var oan=adv.shouldSendOAN;var url=host+'action/'+action+'?aid='+(aid?aid:'')+(cookie?'&fpc='+cookie:'')+(co?'&co='+esc(co):'')+(po?'&po='+esc(po):'')+(to?'&to='+esc(to):'')+(dob?'&do='+esc(dob):'')+(fo?'&fo='+esc(fo):'')+(version?'&v='+version:'')+(oan?'&oan=stoloto-ru':'');return url},buildActionUrl:function(action,cookie){var adv=sociomantic.sonar.adv['stoloto-ru'];var core=adv.core;core.getHooks('buildActionUrl',{action:action,cookie:cookie});var aid=adv.adpan_id;var host=adv.core.location.sonar;if(action){adv.trackingRequest(host,action,aid)}},trackingRequest:function(host,action,aid){var sonar=sociomantic.sonar;var adv=sonar.adv['stoloto-ru'];var core=adv.core;var url=adv.buildUrl(host,action,aid);var load=core.load;var callback=adv.trackingResponse;var request=sonar.request.add(url,load,callback);request.load()},trackingResponse:function(value){var adv=sociomantic.sonar.adv['stoloto-ru'];var core=adv.core;core.getHooks('trackingResponse',value);if(typeof value===core.s&&value!==''){core.setCookie(value);core.setUserMatchUrl(value)}},replaceUndefinedWithNull:function(value){return value===undefined?null:value},getData:function(){try{var adv=sociomantic.sonar.adv['stoloto-ru'];var tr=adv.tracking_objects;var tn=adv.tracking_objects_names;var core=adv.core;var data={};for(var name in tn){if(core.hasProperty(tn,name)){data[name]=core.deepCopy(tr[name],name,adv.replaceUndefinedWithNull)}}return core.stringify(data)}catch(e){return'error_getting_tracking_data'}return'no_tracking_data'},clear:function(){var adv=sociomantic.sonar.adv['stoloto-ru'];adv.core.getHooks('clear');adv.clearTrackingObjects();adv.request_objects={'co':false,'po':false,'to':false,'dob':false,'fo':false};adv.got_confirmed=false;adv.got_nonconfirmed=false;adv.core.validationErrors={};adv.resetAction()},clearTrackingObjects:function(){var adv=sociomantic.sonar.adv['stoloto-ru'];var core=adv.core;var tn=adv.tracking_objects_names;var tr=adv.tracking_objects;var w=window;if(typeof w[tn.product]!==core.u){tr.product={};w[tn.product]={}}if(typeof w[tn.basket]!==core.u){tr.basket={};w[tn.basket]={}}if(typeof w[tn.sale]!==core.u){tr.sale={};w[tn.sale]={}}if(typeof w[tn.lead]!==core.u){tr.lead={};w[tn.lead]={}}if(typeof w[tn.customer]!==core.u){tr.customer={};w[tn.customer]={}}},resetAction:function(){var adv=sociomantic.sonar.adv['stoloto-ru'];var action=adv.action;for(var i in action){if(adv.core.hasProperty(action,i)&&i!=='view'){action[i]=false}}action.view=true},track:function(){sociomantic.sonar.adv['stoloto-ru'].enable()},hasPrice:function(){var adv=sociomantic.sonar.adv['stoloto-ru'];var core=adv.core;var tr=adv.tracking_objects;var product=typeof tr.product===core.o?tr.product:false;var validPrice=false;if(product){if((typeof product.price===core.n||typeof product.price===core.s)&&product.price>0){validPrice=product.price}else if((typeof product.amount===core.n||typeof product.amount===core.s)&&product.amount>0){validPrice=product.amount}}return validPrice}};sociomantic.sonar.enable_callbacks.push(sociomantic.sonar.adv['stoloto-ru'].enable);sociomantic.sonar.adv['stoloto-ru'].core=sociomantic.sonar.adv['stoloto-ru'].core||{cookie:{lifetime:((3600*24000)*365),optoutLifetime:((3600*24000)*365),optoutRegex:'(^|;) ?sonar_optout=([^;]*)(;|$)',regex:'(^|;) ?__sonar=([^;]*)(;|$)'},htmlTypes:['iframe','img','script'],u:'undefined',s:'string',n:'number',b:'boolean',f:'function',o:'object',location:{sonar:'',debug:'',trace:'',usrm:''},hooks:{},getCookie:function(){var core=sociomantic.sonar.adv['stoloto-ru'].core;var cookieDoc=document.cookie;if(typeof cookieDoc===core.s){var cookie=cookieDoc.match(core.cookie.regex);if(cookie){return cookie[2]}}return false},setCookie:function(value,name){var core=sociomantic.sonar.adv['stoloto-ru'].core;var domain='';var futdate=new Date();var expdate=futdate.getTime()+core.cookie.lifetime;var host;name=name||'__sonar';futdate.setTime(expdate);try{if(parseInt(value,10)>0){host=window.location.hostname.split('.').reverse();if(host.length>2&&host[1].length<=3&&host[0].length<=2){domain='.'+host[2]+'.'+host[1]+'.'+host[0]}else{domain='.'+host[1]+'.'+host[0]}document.cookie=name+'='+value+'; domain='+domain+'; expires='+futdate.toUTCString()+'; path=/'}}catch(e){core.reportError(e,'setCookie')}},setUserMatchUrl:function(uid,datacenter,aid){var adv=sociomantic.sonar.adv['stoloto-ru'];var core=adv.core;core.getHooks('setUserMatchUrl');datacenter=datacenter||core.location.usrm;aid=aid||adv.adpan_hash;var protocol=core.getUrlProtocol();var hs=(/^https:\/\//i).test(protocol)?'true':'false';var url=protocol+datacenter+'aid='+aid+'&fpc='+uid+'&hs='+hs;core.createHtmlElement(url,'iframe','__usrm')},createHtmlElement:function(src,type,_class){var core=sociomantic.sonar.adv['stoloto-ru'].core;var el=document.createElement(core.getValidType(type));el.src=src;el.width=0;el.height=0;el.style.cssText='display:none !important;width:0 !important;height:0 !important;';if(typeof _class===core.s){el.className=_class}core.appendElement(el)},getValidType:function(type){var core=sociomantic.sonar.adv['stoloto-ru'].core;if(typeof type===core.s&&core.indexOfArray(core.htmlTypes,type)>-1){return type}return'img'},appendElement:function(element){var core=sociomantic.sonar.adv['stoloto-ru'].core;var scripts=document.getElementsByTagName('script');if(scripts.length>0){var last=scripts[scripts.length-1];last.parentNode.insertBefore(element,last.nextSibling)}else if(document.body!==null&&typeof document.body!==core.u){document.body.appendChild(element)}},getHooks:function(hookGroup,param){var core=sociomantic.sonar.adv['stoloto-ru'].core;var allHooks=core.hooks;if(typeof allHooks[hookGroup]===core.o){var hooks=allHooks[hookGroup];for(var i in hooks){if(core.hasProperty(hooks,i)){var hook=hooks[i];if(typeof hook===core.f){if(typeof param!==core.u){hook(param)}else{hook()}}}}}},setHooks:function(hookGroup,newHook,hookId){var core=sociomantic.sonar.adv['stoloto-ru'].core;var allHooks=core.hooks;hookId=hookId||Math.random()+'';allHooks[hookGroup]=allHooks[hookGroup]||{};if(typeof newHook===core.f&&typeof allHooks[hookGroup][hookId]!==core.f){allHooks[hookGroup][hookId]=newHook}},stringify:function(obj){var core=sociomantic.sonar.adv['stoloto-ru'].core;var t=typeof obj;if(t!==core.o||obj===null){if(t===core.s){obj='"'+obj+'"'}return String(obj)}else{var n;var v;var json=[];var arr=core.isArray(obj);for(n in obj){if(core.hasProperty(obj,n)){v=obj[n];t=typeof v;if(t===core.s){v='"'+v+'"'}else if(t===core.o&&v!==null){v=core.stringify(v)}if(t!==core.u){json.push((arr?'':'"'+n+'":')+String(v))}}}return(arr?'[':'{')+core.join(json)+(arr?']':'}')}},fixedEncodeURIComponent:function(str){var encodedStr=encodeURIComponent(str);var safeEscape=function(v){return escape(v)};encodedStr=encodedStr.replace(/[!'()]/g,safeEscape);encodedStr=encodedStr.replace(/\*/g,'%2A');return encodedStr},stringifyAndEncode:function(obj){var core=sociomantic.sonar.adv['stoloto-ru'].core;return core.fixedEncodeURIComponent(core.stringify(obj))},reportError:function(e,method,location){var adv=sociomantic.sonar.adv['stoloto-ru'];var core=adv.core;var esc=core.fixedEncodeURIComponent;if(typeof e===core.s){e={name:e,message:core.u,stack:core.u}}else if(typeof e!==core.o){e={name:core.u,message:core.u,stack:core.u}}var errorParamsArray=['e='+esc(e.name),'a='+adv.adpan_id,'v='+adv.version,'f='+esc(method||'unknown_method'),'c='+core.getCookie(),'d='+esc(adv.getData()),'m='+esc(e.message),'h='+esc(window.location.href),'r='+esc(document.referrer),'s='+esc(e.stack)];if(adv.shouldSendOAN){errorParamsArray.push('oan=stoloto-ru')}var separator='&';var errorParams=core.join(errorParamsArray,separator);core.reportMsg(errorParams,location)},reportTrace:function(e,method){var core=sociomantic.sonar.adv['stoloto-ru'].core;core.reportError(e,method,core.location.trace)},reportMsg:function(msg,location){var core=sociomantic.sonar.adv['stoloto-ru'].core;location=location||core.location.debug;var errorString=core.getUrlProtocol()+location+msg+'&cachebuster='+core.buildCacheBuster();core.createHtmlElement(errorString)},load:function(url,doc,https){var core=sociomantic.sonar.adv['stoloto-ru'].core;var s=doc.createElement('script');s.type='text/javascript';s.async=true;s.src=(https?core.getUrlProtocol():'http://')+url;core.appendElement(s)},hasProperty:function(obj,property){return Object.prototype.hasOwnProperty.call(obj,property)},getUrlProtocol:function(altDoc){var core=sociomantic.sonar.adv['stoloto-ru'].core;var doc=typeof altDoc!==core.u?altDoc:document;return'https:'===doc.location.protocol?'https://':'http://'},addUrlProtocol:function(url,altDoc){var core=sociomantic.sonar.adv['stoloto-ru'].core;var newProtocol=core.getUrlProtocol(altDoc);if(typeof url===core.s){var i=url.indexOf('\/\/');if((i>=0)&&(i<9)){url=url.replace(/^.*?\/\//,newProtocol)}else{url=newProtocol+url}}return url},buildCacheBuster:function(type){var cb;switch(type){case'timestamp':cb=Math.round(new Date().getTime()/1000)+'';break;default:cb=Math.random()+''}return cb.replace('.','')},isEmpty:function(obj){for(var prop in obj){if(obj.hasOwnProperty(prop)){return false}}return true},isArray:function(obj){if(!Array.isArray){return Object.prototype.toString.call(obj)==='[object Array]'}return Array.isArray(obj)},indexOfArray:function(arr,item){for(var i=0,length=arr.length;i<length;i++){if(arr[i]===item){return i}}return-1},join:function(params,separator){var result='';separator=separator||',';for(var i=0,length=params.length;i<length;i++){result+=params[i];if(i!==length-1){result+=separator}}return result},getLanguage:function(){var core=sociomantic.sonar.adv['stoloto-ru'].core;var browserLang=false;try{browserLang=navigator.userLanguage||navigator.language||'';browserLang=browserLang.toLowerCase()}catch(e){core.reportError(e,'.getLanguage')}return browserLang!==''?browserLang:false},arrayEach:function(array,callback){for(var index=0,length=array.length;index<length;index++){if(callback(array[index],index,array)===false){break}}return array},objectEach:function(object,callback){var core=sociomantic.sonar.adv['stoloto-ru'].core;for(var prop in object){if(core.hasProperty(object,prop)){if(callback(object[prop],prop,object)===false){break}}}return object},each:function(list,callback){var core=sociomantic.sonar.adv['stoloto-ru'].core;if(typeof list===core.o&&list!==null){if(core.isArray(list)){return core.arrayEach(list,callback)}return core.objectEach(list,callback)}return list},deepCopy:function(thing,name,modifier,limit){var core=sociomantic.sonar.adv['stoloto-ru'].core;var isObject=core.isObject(thing);var result;var config;limit=typeof limit==='number'?limit-1:3;if(!isObject){if(typeof modifier===core.f){result=modifier(thing)}else{result=thing}}else if(limit>0){if(core.isArray(thing)){result=new Array(thing.length)}else{result={}}if((thing+'').match(/html|element|node/ig)||thing.nodeName||thing.nodeType){result=null}else{core.each(thing,function(item,index){result[index]=core.deepCopy(item,name,modifier,limit)})}}else{if(core.hasProperty(core.validationConfig,name)){config=core.validationConfig[name]}core.addValidationError('deep-copy',[name],config);result=null}return result},isObject:function(variable){return typeof variable==='object'&&variable!==null},addExtensionVersion:function(extensionId,extensionVersion){var adv=sociomantic.sonar.adv['stoloto-ru'];var core=adv.core;var formattedVersion='-'+extensionId+':'+extensionVersion;if(typeof extensionId===core.s&&typeof extensionVersion===core.s&&adv.version.indexOf(formattedVersion)===-1){adv.version+=formattedVersion}},isPageType:function(pagetype){var adv=sociomantic.sonar.adv['stoloto-ru'];var core=adv.core;var tr=adv.tracking_objects;var product=core.isObject(tr.product)&&!core.isEmpty(tr.product)?tr.product:false;var basket=core.isObject(tr.basket)&&!core.isEmpty(tr.basket)?tr.basket:false;var lead=core.isObject(tr.lead)&&!core.isEmpty(tr.lead)?tr.lead:false;var sale=core.isObject(tr.sale)&&!core.isEmpty(tr.sale)?tr.sale:false;var match=false;switch(pagetype){case'homepage':if(!lead&&!basket&&!product){match=true}break;case'category':if(!lead&&!basket&&product&&!product.identifier&&typeof product.category!==core.u){match=true}break;case'product':if(!lead&&!basket&&product&&product.identifier){match=true}break;case'basket':if(!lead&&basket&&!basket.transaction){match=true}break;case'sale':if(!lead&&basket&&basket.transaction){match=true}break;case'confirmedSale':if(!lead&&basket&&basket.transaction&&sale&&sale.confirmed){match=true}break;case'lead':if(lead){match=true}break;default:adv.core.reportError('','incorrect_pagetype_'+pagetype.toUpperCase()+'_used_in_isPageType')}return match},validators:{'equals-unn':function(value){var adv=sociomantic.sonar.adv['stoloto-ru'];var core=adv.core;var result=typeof value===core.u||value===null||(typeof value===core.n&&isNaN(value));return result},'contains-unn':function(value){var adv=sociomantic.sonar.adv['stoloto-ru'];var core=adv.core;var result=false;if(core.isArray(value)){core.arrayEach(value,function(arrayElement){if(core.validators['equals-unn'](arrayElement)){result=true;return false}})}else if(typeof value===core.s){result=(/undefined|nan|null/i).test(value.toLowerCase())}return result},'contains-comma':function(value){var adv=sociomantic.sonar.adv['stoloto-ru'];var core=adv.core;if(typeof value===core.s){return(/,/i).test(value)}else{return false}},'not-string':function(value){var adv=sociomantic.sonar.adv['stoloto-ru'];var core=adv.core;return typeof value!==core.s},'not-number':function(value){var adv=sociomantic.sonar.adv['stoloto-ru'];var core=adv.core;var result=typeof value!==core.n||value===Infinity||value===-Infinity||isNaN(value);return result},'not-string-number':function(value){var adv=sociomantic.sonar.adv['stoloto-ru'];var core=adv.core;return core.validators['not-string'](value)&&core.validators['not-number'](value)},'not-array':function(value){var adv=sociomantic.sonar.adv['stoloto-ru'];var core=adv.core;return!core.isArray(value)},'not-url':function(value){var adv=sociomantic.sonar.adv['stoloto-ru'];var core=adv.core;if(typeof value===core.s){return!(/^https?\:\/\//i).test(value)}else{return false}},'not-timestamp':function(value){var date=new Date(value*1000);return date.getTime()/1000!==parseInt(value,10)},'empty':function(value){var adv=sociomantic.sonar.adv['stoloto-ru'];var core=adv.core;if(core.isArray(value)||typeof value===core.s){return value.length===0}else{return false}}},validateTrackingObjects:function(){var adv=sociomantic.sonar.adv['stoloto-ru'];var core=adv.core;var trConfig;core.getHooks('validateTrackingObjects');core.objectEach(adv.tracking_objects,function(tr,trName){trConfig=core.validationConfig[trName];core.validateTrackingObject(tr,[trName],trConfig)});core.reportValidationError()},validateTrackingObject:function(object,path,config){var adv=sociomantic.sonar.adv['stoloto-ru'];var core=adv.core;var propertyConfig;var propertyPath;if(core.hasProperty(config,'value')){core.arrayEach(config.value,function(cbName){if(core.hasProperty(core.validators,cbName)){if(core.validators[cbName](object)){core.addValidationError(cbName,path,config)}}else{core.reportError('validator-undefined',cbName)}})}if(core.hasProperty(config,'each')&&core.isArray(object)){core.arrayEach(object,function(child){core.validateTrackingObject(child,path,config.each)})}if(core.hasProperty(config,'properties')){core.objectEach(object,function(value,property){propertyPath=path.concat(property);if(core.hasProperty(config.properties,property)){propertyConfig=config.properties[property];core.validateTrackingObject(value,propertyPath,propertyConfig)}else{core.addValidationError('wrong-property-name',propertyPath,config)}})}},addValidationError:function(error,path,config){var adv=sociomantic.sonar.adv['stoloto-ru'];var core=adv.core;var currentPath=core.validationErrors;var pathElement;if(typeof config===core.o&&core.hasProperty(config,'ignore')&&core.indexOfArray(config.ignore,error)!==-1){return}for(var i=0,l=path.length;i<l;i++){pathElement=path[i];if(!core.hasProperty(currentPath,pathElement)){currentPath[pathElement]={}}currentPath=currentPath[pathElement];if(error==='wrong-property-name'&&core.hasProperty(currentPath,'errors')&&core.indexOfArray(currentPath.errors,'deep-copy')!==-1){return}}if(!core.hasProperty(currentPath,'errors')){currentPath.errors=[]}if(core.indexOfArray(currentPath.errors,error)===-1){currentPath.errors.push(error)}},reportValidationError:function(){var adv=sociomantic.sonar.adv['stoloto-ru'];var core=adv.core;var esc=core.fixedEncodeURIComponent;if(core.isEmpty(core.validationErrors)){return}var invalidTrs=core.stringify(core.validationErrors);var errorParamsArray=['e='+esc(invalidTrs),'a='+adv.adpan_id,'v='+adv.version,'c='+core.getCookie(),'h='+esc(window.location.href),'r='+esc(document.referrer)];if(adv.shouldSendOAN){errorParamsArray.push('oan=stoloto-ru')}var separator='&';var errorParams=core.join(errorParamsArray,separator);var location=core.location.debugtam;core.reportMsg(errorParams,location)},validationErrors:{},validationConfig:{product:{properties:{identifier:{value:['equals-unn','empty','contains-unn','not-string-number']},category:{value:['not-array','empty','contains-unn']},fn:{value:['equals-unn','not-string','contains-unn']},brand:{value:['equals-unn','not-string','contains-unn']},description:{value:['equals-unn','not-string','contains-unn']},amount:{value:['equals-unn','empty','contains-comma']},price:{value:['equals-unn','contains-comma']},url:{value:['equals-unn','not-string','empty','not-url']},photo:{value:['equals-unn','not-string','empty','not-url']},score:{value:['equals-unn','not-number']},quantity:{value:['equals-unn','not-number']},valid:{value:['equals-unn','not-timestamp']},date:{value:['equals-unn','not-timestamp']},currency:{value:['equals-unn']}}},basket:{properties:{products:{value:['not-array','empty','contains-unn'],each:{properties:{identifier:{value:['equals-unn','empty','contains-unn','not-string-number']},amount:{value:['equals-unn','contains-comma']},quantity:{value:['equals-unn','not-number']},currency:{value:['equals-unn']}}}},transaction:{value:['equals-unn','not-string','empty','contains-unn']},amount:{value:['equals-unn','empty','contains-comma']},currency:{value:['equals-unn']}}},customer:{properties:{identifier:{value:['equals-unn','empty','not-string-number']},segment:{value:['contains-comma','equals-unn']},mhash:{value:['not-string']},gender:{value:[]},agegroup:{value:[]},education:{value:[]}}},lead:{properties:{transaction:{value:['equals-unn','not-string','empty','contains-unn']},confirmed:{value:['not-string']}}},sale:{properties:{confirmed:{value:[]}}}}};sociomantic.sonar.adv['stoloto-ru'].core.location={sonar:'eu-sonar.sociomantic.com/js/2010-07-01/',debug:'eu-dbug.sociomantic.com/adv/debug.gif?',trace:'eu-dbug.sociomantic.com/adv/trace.gif?',debugtam:'eu-dbug-tam.sociomantic.com/adv/debug.gif?',usrm:'eu-sonar.sociomantic.com/html/2010-07-01/usrm?'};try{sociomantic.enable()}catch(e){sociomantic.sonar.adv['stoloto-ru'].core.reportError(e,'initial_sociomantic_enable')}