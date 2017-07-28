var Finch = Finch || {};
Finch.ga = function(){
  if(window.ga){
    ga.apply(window, arguments);
  }
};
Finch.getQueryParam = function(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};
$(function(){
	if(window.Finch && Finch.AjaxForm)
		Finch.AjaxForm.init();
});
var Social = {
	popup: function(el){
		var w = window.open(el.href, '', 'width=1000,height=650');
	},
	callback: function(service, status){
		var isLoginned = typeof currentUser != "undefined";
		if(status == "success"){
			document.location.href = document.location.href;
			return;
		}
		if(status == "registration"){
			document.location.href="/registration";
			return;
		}
		var error = "social." + status;
		var baseUrl = isLoginned ? "/private/data" : "/login";
		document.location.href = baseUrl + "?e=" + error + "&service=" + service;
	}
};

$(function(){
	$(".social_login a, .social_login_popup a, .social_popup a, .social_login_container a, .social_buttons a:not(.remove-control)").click(function(){
		Social.popup(this);
		return false;
	});
	
	
	function emailValid(email){
    	filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    	if (filter.test(email)){
    		return true;
    	}else{
    		return false;
    	}	
    }
    $('.subscribe_form #email').on("keyup", function(){
    	var email = $('#email').val();
    	if(emailValid(email)){
    		$(".subscribe_submit").removeAttr("disabled", false);
    	}else{
    		$(".subscribe_submit").attr("disabled", "disabled");
    	}
    })
    $(".subscribe_submit").click(function(){
    	var email = $('#email').val();
    	$(".subscribe_span").text(email);
    	$.post("/form/stolotoSubscriber", {email: email, type: "main_footer"}, function(data){
    		Finch.Forms.Subscriber.onResponse(data);
    		$(".subscribe_another .ss").click(function(){
    			$(".subscribe_form").show();
    			$(".subscribe_another").hide();
    			$("#email").val("");
    			$("#email_wrapper .zf-error").hide();
    			$(".subscribe_submit").attr("disabled", "disabled");
    		});
    	});
    })
	
});

$(function(){
	
	$(".video_popup_opener").attr("title","Видеоинструкция");
	$(".news_item .video_popup_opener").removeAttr("title");
	$(".above_play.video_popup_opener").attr("title","Трансляция");

	var container = $(".social_remove");
	if(container.length == 0)
		return;
	var msg = container.data("message");
	$(".remove-control", container).click(function(){
		if(!confirm(msg))
			return false;
		$.post(this.href, {id: $(this).data("account")}, function(){
			document.location.href = document.location.pathname;
		});
		return false;
	});
	
	$(".social_add_container a").click(function(){
		Social.popup(this);
		return false;
	});
});
$(function(){
	$("body").on("change", ".me-email input", function() { 
		var email = $('.watermark_container.me-success input').val();
		$.post("/form/stolotoSubscriber", { email: email, type: "popup" }, function(data){});
	});
});
function AsyncHandler(interval, url, data, successHandler, errorHandler, fatalHandler, httpMethod){
	var that = this;
	this.counter = 0;
	this.successHandler = successHandler;
	this.errorHandler = errorHandler;
	this.fatalHandler = fatalHandler;
	this.intervalHandler = function(){
		if(that.counter > 60){
			clearInterval(that.handler);
			if(that.fatalHandler)
				that.fatalHandler();
			that.counter = 0;
			return;
		}
		that.counter++;
		jQuery.ajax({
			url: url,
			type: httpMethod == 'GET' ? 'GET' : 'POST',
			dataType: 'json',
			data: data,
			cache: false,
			success: function(data){
				if(data.status == "pending")
					return;
				clearInterval(that.handler);
				/*if(data.url){
					document.location.href = data.url;
					return;
				}*/
				if(data.status == "error"){
					if(that.errorHandler)
						that.errorHandler('error');
				}
				else{
					if(that.successHandler)
						that.successHandler(data);
				}
			},
			error: function(){
				clearInterval(that.handler);
				if(that.fatalHandler)
					that.fatalHandler();
			}
		});
		
	};
	
	this.start = function(){
		this.intervalHandler();
		this.handler = setInterval(this.intervalHandler, interval);
	};
}

function getCookie(name) {
	var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : null;
}



$(document).ready(function(){
	if(!window.domainsArray){ 
		return;
	}	
	
	var queryDict = {}
	location.search.substr(1).split("&").forEach(function(item) {queryDict[item.split("=")[0]] = item.split("=")[1]})
	
	if(queryDict.rh == "open"){
		var hndl = setInterval(function() {
			if (typeof RedHelper != "undefined" && RedHelper.started) {
				$(".redhlp_button").click();
				clearInterval(hndl);
			}
			if (count++ > 100){
				clearInterval(hndl);
			}
		}, 300);
	}	
	
	
	
	$("a").each(function(){
		var matches = false;
		if($(this).attr("href")){
			matches = $(this).attr("href").match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
		}
		if(matches){
			var m = matches[0];
			if(matches[0].slice(-1) == "/" || matches[0].slice(-1) == "?"){
				m = matches[0].slice(0,-1);
			}
			if(jQuery.inArray(m, domainsArray) >= 0){
				$(this).attr("onclick","_gaq.push(['_link','"+ $(this).attr("href") +"']); return false;");
			}
		}	
	});

	
	var _gaq = _gaq || [];
    $(".ucaller").click(function(){
    	ga_caller($(this), "uiaction");
    });
    $(".scaller").click(function(){
    	ga_caller($(this), "serviceaction");
    });
    $(".lcaller").click(function(){
    	ga_caller($(this), "linkaction");
    });
    $(".mcaller").click(function(){
    	ga_caller($(this), "maction");
    });
    
     
    function ga_caller(el, category){
    	var user = "empty";
		if( typeof currentUser != 'undefined'){
			user = currentUser.id;
		}	
		if(el.data("namer")){
			var namer = el.data("namer");
		}else{
			var namer = "empty";
		}
		Finch.ga('send', {
            	'hitType': 'event', 
            	'eventCategory': category, 
            	'eventAction': el.data("acter"),
            	'eventLabel': el.data("typer"), 
            	'dimension1': user,
            	'dimension2': namer
     	});
    }

    function checkExitPopupCookie(){
    	if($(".exit_popup_disabled").is(':checked')){
    		setExitPopupCookie();
    	}
    }
    
    function setExitPopupCookie(){
    	var date = new Date( new Date().getTime() + 60*24*60*60*1000 );
    	document.cookie="exit_popup_disabled=true; path=/; expires="+date.toUTCString();
    }
    
    $(".callme").click(function(){
    	$(".callme_popup").show();
    	return false;
    })
    $("#cm-close").click(function(){
    	$(".callme_popup").hide();
    });
    
    
    $('#callme_popup #chatSend').click(function(){
    	var phone = $("#callme_popup #phone").val();
    	var text = $("#callme_popup #text").val();
    	if(!check_callme(phone, text)){
    		return false;
    	}
    	
    	$.post("/callme", { phone: phone,  text: text}, function(data){
    		if(data == true){
    			$("#callme_popup #text").val("");
    			$("#statusError").hide();
    			$("#status").show();
    		}else{
    			$("#status").hide();
    			$("#statusError").show();
    		}
    	});
    })
    
    
    
    
    function check_callme(phone,text){
    	$("#status").hide();
    	var error = false;
    	if(phone.length < 10){
    		$("#callme_popup #phone").css({"border":"2px solid red", "color": "red"});
    		error = true;
    	}else{
    		$("#callme_popup #phone").css({"border":"2px solid #fff", "color": "#000"});
    	}
    	if(text.length == 0){
    		$("#callme_popup #text").css({"border":"2px solid red", "color": "red"});
    		error = true;
    	}else{
    		$("#callme_popup #text").css({"border":"2px solid #fff", "color": "#000"});
    	}
    	if(error == true){
    		return false;
    	}
    	return true;
    }
    
});