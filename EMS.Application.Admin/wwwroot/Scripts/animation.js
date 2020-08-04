
"use strict";
/*-------------------------------------------
	Dynamically load plugin scripts
---------------------------------------------*/
//
// Dynamically load Fullcalendar Plugin Script
// homepage: http://arshaw.com/fullcalendar
// require moment.js
//

/*-------------------------------------------
	Main scripts used by theme
---------------------------------------------*/
//
//  Function maked all .box selector is draggable, to disable for concrete element add class .no-drop
//
function WinMove(){
	$( "div.box").not('.no-drop')
		.draggable({
			revert: true,
			zIndex: 2000,
			cursor: "crosshair",
			handle: '.box-name',
			opacity: 0.8
		})
		.droppable({
			tolerance: 'pointer',
			drop: function( event, ui ) {
				var draggable = ui.draggable;
				var droppable = $(this);
				var dragPos = draggable.position();
				var dropPos = droppable.position();
				draggable.swap(droppable);
				setTimeout(function() {
					var dropmap = droppable.find('[id^=map-]');
					var dragmap = draggable.find('[id^=map-]');
					if (dragmap.length > 0 || dropmap.length > 0){
						dragmap.resize();
						dropmap.resize();
					}
					else {
						draggable.resize();
						droppable.resize();
					}
				}, 50);
				setTimeout(function() {
					draggable.find('[id^=map-]').resize();
					droppable.find('[id^=map-]').resize();
				}, 250);
			}
		});
}
//
// Swap 2 elements on page. Used by WinMove function
//
jQuery.fn.swap = function(b){
	b = jQuery(b)[0];
	var a = this[0];
	var t = a.parentNode.insertBefore(document.createTextNode(''), a);
	b.parentNode.insertBefore(a, b);
	t.parentNode.insertBefore(b, t);
	t.parentNode.removeChild(t);
	return this;
};
//
//  Screensaver function
//  used on locked screen, and write content to element with id - canvas
//

//
function SetMinBlockHeight(elem){
	elem.css('min-height', window.innerHeight - 49)
}
//
//  Helper for correct size of Messages page
//
function MessagesMenuWidth(){
	var W = window.innerWidth;
	var W_menu = $('#sidebar-left').outerWidth();
	var w_messages = (W-W_menu)*16.666666666666664/100;
	$('#messages-menu').width(w_messages);
}
//
// Function for change panels of Dashboard
//
function DashboardTabChecker(){
	$('#content').on('click', 'a.tab-link', function(e){
		e.preventDefault();
		$('div#dashboard_tabs').find('div[id^=dashboard]').each(function(){
			$(this).css('visibility', 'hidden').css('position', 'absolute');
		});
		var attr = $(this).attr('id');
		$('#'+'dashboard-'+attr).css('visibility', 'visible').css('position', 'relative');
		$(this).closest('.nav').find('li').removeClass('active');
		$(this).closest('li').addClass('active');
	});
}

//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//
//      MAIN DOCUMENT READY SCRIPT OF DEVOOPS THEME
//
//      In this script main logic of theme
//
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
$(document).ready(function () {
	$('.show-sidebar').on('click', function (e) {
		e.preventDefault();
		$('div#main').toggleClass('sidebar-show');
		setTimeout(MessagesMenuWidth, 250);
	});
	//var ajax_url = location.hash.replace(/^#/, '');
	//if (ajax_url.length < 1) {
	//	ajax_url = 'ajax/dashboard.html';
	//}
	//LoadAjaxContent(ajax_url);
	$('.main-menu').on('click', 'a', function (e) {
		var parents = $(this).parents('li');
		var li = $(this).closest('li.dropdown');
		var another_items = $('.main-menu li').not(parents);
		another_items.find('a').removeClass('active');
		another_items.find('a').removeClass('active-parent');
		
		if ($(this).hasClass('dropdown-toggle') || $(this).closest('li').find('ul').length == 0) {
		    $(this).addClass('active-parent');
		   
		    var anglei = $(this).find('i[rel="angle"]');
		    if (anglei.hasClass('fa-angle-right'))
		    { anglei.removeClass('fa-angle-right').addClass('fa-angle-down'); }
		    else {
		        anglei.removeClass('fa-angle-down').addClass('fa-angle-right');
		    }
		    
			var current = $(this).next();
			if (current.is(':visible')) {
				li.find("ul.dropdown-menu").slideUp('fast');
				li.find("ul.dropdown-menu a").removeClass('active')
			}
			else {
				another_items.find("ul.dropdown-menu").slideUp('fast');
				current.slideDown('fast');
			}
		}
		else {
			if (li.find('a.dropdown-toggle').hasClass('active-parent')) {
				var pre = $(this).closest('ul.dropdown-menu');
				pre.find("li.dropdown").not($(this).closest('li')).find('ul.dropdown-menu').slideUp('fast');
			}

			var anglei = $(this).find('i[rel="angle"]');
			anglei.removeClass('fa-angle-down').addClass('fa-angle-right');
		}
		if ($(this).hasClass('active') == false) {
			$(this).parents("ul.dropdown-menu").find('a').removeClass('active');
			$(this).addClass('active')
		}
		if ($(this).hasClass('ajax-link')) {
			//e.preventDefault();
			if ($(this).hasClass('add-full')) {
				$('#content').addClass('full-content');
			}
			else {
				$('#content').removeClass('full-content');
			}
			var url = $(this).attr('href');
			//window.location.hash = url;
		    //LoadAjaxContent(url);
			//var overlay = jQuery('<div id="overlay"></div>');
			//overlay.appendTo(document.body);
			//$('#loader').show();
			//$.get(url, function (data) {
			//    $('#containerRight').empty().stop().html(data);
			//    $('#loader').hide();
			//});
			//$('#loader').hide();
		}
		//if ($(this).attr('href') == '#') {
		//	e.preventDefault();
		//}
	});
	var height = window.innerHeight - 49;
	$('#main').css('min-height', height)
		.on('click', '.expand-link', function (e) {
			var body = $('body');
			e.preventDefault();
			var box = $(this).closest('div.box');
			var button = $(this).find('i');
			button.toggleClass('fa-expand').toggleClass('fa-compress');
			box.toggleClass('expanded');
			body.toggleClass('body-expanded');
			var timeout = 0;
			if (body.hasClass('body-expanded')) {
				timeout = 100;
			}
			setTimeout(function () {
				box.toggleClass('expanded-padding');
			}, timeout);
			setTimeout(function () {
				box.resize();
				box.find('[id^=map-]').resize();
			}, timeout + 50);
		})
		.on('click', '.collapse-link', function (e) {
			e.preventDefault();
			var box = $(this).closest('div.box');
			var button = $(this).find('i');
			var content = box.find('div.box-content');
			content.slideToggle('fast');
			button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
			setTimeout(function () {
				box.resize();
				box.find('[id^=map-]').resize();
			}, 50);
		})
		.on('click', '.close-link', function (e) {
			e.preventDefault();
			var content = $(this).closest('div.box');
			content.remove();
		});
	$('#locked-screen').on('click', function (e) {
		e.preventDefault();
		$('body').addClass('body-screensaver');
		$('#screensaver').addClass("show");
		ScreenSaver();
	});
	$('body').on('click', 'a.close-link', function(e){
		e.preventDefault();
		CloseModalBox();
	});
	$('#top-panel').on('click','a', function(e){
		if ($(this).hasClass('ajax-link')) {
			//e.preventDefault();
			if ($(this).hasClass('add-full')) {
				$('#content').addClass('full-content');
			}
			else {
				$('#content').removeClass('full-content');
			}
			//var url = $(this).attr('href');
			//window.location.hash = url;
			//LoadAjaxContent(url);
		}
	});
	$('#search').on('keydown', function(e){});
	$('#screen_unlock').on('mouseover', function(){});
});


function DisableBackButtonAllBrowsers() {
    window.history.forward();
    window.history.forward(-1);
};

function CancelFullScreen(el) {
    var requestMethod = el.cancelFullScreen || el.webkitCancelFullScreen || el.mozCancelFullScreen || el.exitFullscreen;
    if (requestMethod) {
        requestMethod.call(el);
    } else if (typeof window.ActiveXObject !== "undefined") {
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }
}

function RequestFullScreen(el){
    var requestMethod = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;
    if (requestMethod) {
        requestMethod.call(el);
    } else if (typeof window.ActiveXObject !== "undefined") {
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }
    return false
}

function ToggleFull() {
    var elem = document.body;
    var isInFullScreen = (document.fullScreenElement && document.fullScreenElement !== null) || (document.mozFullScreen || document.webkitIsFullScreen);    
    if (isInFullScreen) {
        CancelFullScreen(document);
    } else {
        RequestFullScreen(elem);
    }
    return false;
}

$(function () {
    DisableBackButtonAllBrowsers();
    window.onload = DisableBackButtonAllBrowsers;
    window.onpageshow = function (evts) {
        if (evts.persisted) DisableBackButtonAllBrowsers();
    };
    window.onunload = function () { void (0) };

    //$(document).bind('contextmenu', function (e) {
    //    e.preventDefault();
    //    alert('Right Click is not allowed');
    //});

    //toggleFull();
});

