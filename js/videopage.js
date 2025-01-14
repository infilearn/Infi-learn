var mainFunction = 
{
	elements: {
		container 			: ".container",
		containerInner		: ".container-inner",
		videoPlayerContainer: ".video-player-container",
		videoContainer 		: ".video-container",
		playerContainer		: ".player-container",
		mediaVideo 			: "#media-video",
		playControl 		: ".play-control",
		playButton 			: ".play-button",
		pauseButton 		: ".pause-button",
		volumeControl 		: ".volume-control",
		volumeButton 		: ".volume-button",
		volumeButtonMute 	: ".volume-button-mute",
		progress 			: ".progress",
		progressOver 		: ".progress-over",
		progressHidden 		: ".progress-hidden",
		progressBackground 	: ".progress-background",
		indicator 			: ".indicator",
		fullScreenButton	: ".fullscreen-button"
	},

	isPlay 		: true,
	isVolume 	: true,
	isEnd		: false,
	progressBarHeight : 100,

	init: function(){
		mainFunction.defaultSettings();
		mainFunction.clickSettings();
		mainFunction.playControlVideo();
		mainFunction.volumeControlVideo();
		mainFunction.progressControlVideo();
		mainFunction.mouseHideControl();
	},

	defaultSettings: function(){

		$(mainFunction.elements.mediaVideo)[0].controls = false;

		$(window).on("resize", onResize);

		function onResize(){
			$(mainFunction.elements.progress).width( $(mainFunction.elements.playerContainer).width() - 223 );
			$(mainFunction.elements.progressBackground).width( $(mainFunction.elements.playerContainer).width() - 223 - 40 );		
			$(mainFunction.elements.progressHidden).width( $(mainFunction.elements.playerContainer).width() - 223 - 40 );		
			mainFunction.progressBarHeight = $(mainFunction.elements.playerContainer).width() - 223 - 40;
			$(mainFunction.elements.progressOver).css("width", String( (mainFunction.progressBarHeight / $(mainFunction.elements.mediaVideo)[0].duration) * $(mainFunction.elements.mediaVideo)[0].currentTime ));
		}

		onResize();

	},

	clickSettings: function(){
		$(mainFunction.elements.playControl).on("click", mainFunction.playControlVideo);
		$(mainFunction.elements.volumeControl).on("click", mainFunction.volumeControlVideo);
		$(mainFunction.elements.mediaVideo).on("click", mainFunction.playControlVideo);
		$(mainFunction.elements.fullScreenButton).on("click", mainFunction.fullScreenControl);
		$(".container").on("keyup", function(e){ if(e.which == 27) { mainFunction.exitFullScreen(); } });
	},

	fullScreenControl:function(){
		
		if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement)
		{
			if (document.documentElement.requestFullscreen)
			{
				document.documentElement.requestFullscreen();
				mainFunction.onFullScreen();
			}
			else if (document.documentElement.msRequestFullscreen)
			{
				document.documentElement.msRequestFullscreen();
				mainFunction.onFullScreen();
			}
			else if (document.documentElement.mozRequestFullScreen)
			{
				document.documentElement.mozRequestFullScreen();
				mainFunction.onFullScreen();
			}
			else if (document.documentElement.webkitRequestFullscreen)
			{
				document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
				mainFunction.onFullScreen();
			}
		}
		else
		{
			if (document.exitFullscreen)
			{
				document.exitFullscreen();
				mainFunction.exitFullScreen();
			}
			else if(document.msExitFullscreen)
			{
				document.msExitFullscreen();
				mainFunction.exitFullScreen();
			}
			else if (document.mozCancelFullScreen)
			{
				document.mozCancelFullScreen();
				mainFunction.exitFullScreen();
			}
			else if (document.webkitExitFullscreen)
			{
				document.webkitExitFullscreen();
				mainFunction.exitFullScreen();
			}
		}
	},

	onFullScreen: function(){

		$(mainFunction.elements.progressOver).css("width", String( (mainFunction.progressBarHeight / $(mainFunction.elements.mediaVideo)[0].duration) * $(mainFunction.elements.mediaVideo)[0].currentTime ));
		$(mainFunction.elements.container).css("display", "block");
		$(mainFunction.elements.videoPlayerContainer).width("100%");
		$(mainFunction.elements.videoPlayerContainer).height("100%");
		$(mainFunction.elements.videoContainer).height("calc(100% - 40px)");
		$(mainFunction.elements.progress).width( $(mainFunction.elements.playerContainer).width() - 223 );
		$(mainFunction.elements.progressBackground).width( $(mainFunction.elements.playerContainer).width() - 223 - 40 );		
		$(mainFunction.elements.progressHidden).width( $(mainFunction.elements.playerContainer).width() - 223 - 40 );		
		mainFunction.progressBarHeight = $(mainFunction.elements.playerContainer).width() - 223 - 40;
		$(".container-inner").css("display", "none");
		$("header").css("display", "none");
		$(".container").css("position", "absolute");
		$(".container").css("height", "100%");
		$(".container").css("top", "0px");
		$(".container").css("left", "0px");
		$('html, body').css({
			overflow: 'hidden',
			height: '100%'
		});
		// .section-video-player-video-title-and-details

	},

	exitFullScreen: function(){
		
		$(mainFunction.elements.container).css("display", "-webkit-box");
		$(mainFunction.elements.container).css("display", "-moz-box");
		$(mainFunction.elements.container).css("display", "-ms-flexbox");
		$(mainFunction.elements.container).css("display", "-webkit-flex");
		$(mainFunction.elements.container).css("display", "flex");
		$(mainFunction.elements.videoPlayerContainer).width("100%");
		$(mainFunction.elements.videoPlayerContainer).height("450");
		$(mainFunction.elements.videoContainer).height("410");
		$(mainFunction.elements.progress).width( $(mainFunction.elements.playerContainer).width() - 223 );
		$(mainFunction.elements.progressBackground).width( $(mainFunction.elements.playerContainer).width() - 223 - 40 );		
		$(mainFunction.elements.progressHidden).width( $(mainFunction.elements.playerContainer).width() - 223 - 40 );		
		mainFunction.progressBarHeight = $(mainFunction.elements.playerContainer).width() - 223 - 40;
		$(mainFunction.elements.progressOver).css("width", String( (mainFunction.progressBarHeight / $(mainFunction.elements.mediaVideo)[0].duration) * $(mainFunction.elements.mediaVideo)[0].currentTime ));
		$(".container-inner").css("display", "inherit");
		$("header").css("display", "inherit");
		$(".container").css("position", "relative");
		$(".container").css("height", "");
		$(".container").css("top", "");
		$(".container").css("left", "");
		
		$('html, body').css({
			overflow: 'auto',
			height: 'auto'
		});
	},

	mouseHideControl: function(){

		var mouseHide = setTimeout(onMouseHide, 3000);

		$(mainFunction.elements.containerInner).on("mousemove", function(){

			clearTimeout( mouseHide );

			onMouseShow();

		});

		$(mainFunction.elements.containerInner).on("mousemoveend", function(){

			clearTimeout( mouseHide );

			mouseHide = setTimeout(onMouseHide, 3000);

		});

		// function onMouseHide(){ $("body").css("cursor", "none"); }

		// function onMouseShow(){ $("body").css("cursor", "inherit"); }

	},

	playControlVideo: function(){
		if(mainFunction.isPlay) { $(mainFunction.elements.mediaVideo)[0].play(); } else { $(mainFunction.elements.mediaVideo)[0].pause(); }
		$(mainFunction.elements.playButton).css("display", ( (mainFunction.isPlay) ? "none" : "table-cell" ) );
		$(mainFunction.elements.pauseButton).css("display", ( (!mainFunction.isPlay) ? "none" : "table-cell" ) );
		mainFunction.isPlay = !mainFunction.isPlay;
		mainFunction.isEnd = false;
	},

	volumeControlVideo: function(){
		$(mainFunction.elements.mediaVideo)[0].muted = !mainFunction.isVolume;
		$(mainFunction.elements.volumeButtonMute).css("display", ( (mainFunction.isVolume) ? "none" : "table-cell" ) );
		$(mainFunction.elements.volumeButton).css("display", ( (!mainFunction.isVolume) ? "none" : "table-cell" ) );
		mainFunction.isVolume = !mainFunction.isVolume;
	},

	progressControlVideo: function(){

		var mouseX 			= 0;
		var isDown 			= false;
		var currentMinute 	= 0;
		var currentSecond 	= 0;
		var mediaPlayer 	= $(mainFunction.elements.mediaVideo)[0];

		mediaPlayer.addEventListener("timeupdate", onProgressVideo, false);

		function onProgressVideo(){
			$(mainFunction.elements.progressOver).css("width", String( (mainFunction.progressBarHeight / mediaPlayer.duration) * mediaPlayer.currentTime ));
			videoEndControl();
			setIndicator(mediaPlayer.currentTime, mediaPlayer.duration);
		}

		function videoEndControl(){
			if(mediaPlayer.currentTime >= mediaPlayer.duration)
			{
				mainFunction.isPlay = false;
				mainFunction.playControlVideo();
				mainFunction.isEnd = true;
			}
		}

		function setIndicator(current, duration){
			var durationMinute 		= Math.floor(duration / 60);
			var durationSecond 		= Math.floor(duration - durationMinute * 60);
			var durationLabel 		= durationMinute + ":" + durationSecond;
			currentSecond 			= Math.floor(current);
			currentMinute 			= Math.floor(currentSecond / 60);
			currentSecond 			= currentSecond - ( currentMinute * 60 );
			currentSecond 			= ( String(currentSecond).length > 1 ) ? currentSecond : ( String("0") + currentSecond );
			var currentLabel 		= currentMinute + ":" + currentSecond;
			var indicatorLabel 		= currentLabel + " / " + durationLabel;
			$(mainFunction.elements.indicator).text( indicatorLabel );
		}

		$(mainFunction.elements.progressHidden).on("mousemove", onProgressHiddenMouseMove);

		function onProgressHiddenMouseMove(e){
			var parentOffset 	= $(this).parent().offset(); 
			mouseX 				= Math.floor( e.pageX - parentOffset.left - 20 );
			if(isDown) { mediaPlayer.currentTime = (mediaPlayer.duration / mainFunction.progressBarHeight) * mouseX; }
		}

		$(mainFunction.elements.progressHidden).on("click", function(){ if(!isDown) { mediaPlayer.currentTime = (mediaPlayer.duration / mainFunction.progressBarHeight) * mouseX; } });

		$(mainFunction.elements.progressHidden).on("mousedown", onProgressHiddenMouseDown);

		function onProgressHiddenMouseDown(){

			isDown = true;

			mediaPlayer.currentTime = (mediaPlayer.duration / mainFunction.progressBarHeight) * mouseX;

			$(mainFunction.elements.mediaVideo)[0].pause();
		}

		$(mainFunction.elements.progressHidden).on("mouseup", function(){ isDown = false; if(!mainFunction.isEnd) {  mainFunction.isPlay = false; mainFunction.playControlVideo(); } });

		$(mainFunction.elements.progressHidden).on("mouseout", function(){ isDown = false; if(!mainFunction.isEnd) {  mainFunction.isPlay = false; mainFunction.playControlVideo(); } });

	}
};
document.addEventListener('contextmenu', event => event.preventDefault());
$(document).on("ready", mainFunction.init);

(function ($) {
    var timeout;
    $(document).on('mousemove', function (event) {
        if (timeout !== undefined) {
            window.clearTimeout(timeout);
        }
        timeout = window.setTimeout(function () {
            $(event.target).trigger('mousemoveend');
        }, 100);
    });
}(jQuery));


// Video Desc

var activeLink = document.querySelector('.section-video-player-video-tab-pane li.active');
var underline = document.querySelector('.active_underline');

setActiveUnderline(activeLink, underline);

var menu_link = document.querySelector('.section-video-player-video-tab-pane ul');
var menu_linkList = document.querySelectorAll('.section-video-player-video-tab-pane ul li');

menu_link.addEventListener("mouseover", function( event ) {
  var selectedWidth = event.target.offsetWidth;
  var newleftpos = event.target.offsetLeft;
  underline.style.left = newleftpos+'px';
  underline.style.width = selectedWidth+'px';
});

menu_link.addEventListener("mouseout", function( event ) {   
  underline.style.left = activeLink.offsetLeft+'px';
});

var menu_link_anchor = document.querySelectorAll('.section-video-player-video-tab-pane a');


Array.from(menu_link_anchor).forEach(link => {
    link.addEventListener("click", function(event){
      event.preventDefault();
      
      Array.from(menu_linkList).forEach(linkList => {
        linkList.classList.remove('active');
      });
      
      event.target.parentNode.classList.add('active');
      
      activeLink = document.querySelector('.section-video-player-video-tab-pane li.active');
      underline = document.querySelector('.active_underline');

      setActiveUnderline(activeLink, underline);
    });
});

function setActiveUnderline(activeLink, underline){
  underline.style.left = activeLink.offsetLeft+'px';
  underline.style.width = activeLink.offsetWidth+'px';
};

// Video Data
window.onload=VideoDataShow();

function VideoDataShow(){
	var desc = document.getElementById('video-description');
	var qna = document.getElementById('video-Qna');
	var files = document.getElementById('video-files');
	desc.style.display = "block";
	qna.style.display = "none";
	files.style.display = "none";
}
function showDesc(){
	var desc = document.getElementById('video-description');
	var qna = document.getElementById('video-Qna');
	var files = document.getElementById('video-files');
	desc.style.display = "block";
	qna.style.display = "none";
	files.style.display = "none";
}
function showqna(){
	var desc = document.getElementById('video-description');
	var qna = document.getElementById('video-Qna');
	var files = document.getElementById('video-files');
	desc.style.display = "none";
	qna.style.display = "block";
	files.style.display = "none";
}
function showFiles(){
	var desc = document.getElementById('video-description');
	var qna = document.getElementById('video-Qna');
	var files = document.getElementById('video-files');
	desc.style.display = "none";
	qna.style.display = "none";
	files.style.display = "block";
}
