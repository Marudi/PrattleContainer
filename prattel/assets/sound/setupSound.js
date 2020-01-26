var CONTEXT_ROOT = '/' + window.location.pathname.split('/')[1];
(function($, sr) {
var debounce = function(func, threshold, execAsap) {
var timeout;
return function debounced() {
var obj = this, args = arguments;
function delayed() {
if (!execAsap) {
func.apply(obj, args);
}
timeout = null;
}
if (timeout) {
clearTimeout(timeout);
} else if (execAsap) {
func.apply(obj, args);
}
timeout = setTimeout(delayed, threshold || 100);
};
};

 jQuery.fn[sr] = function(fn) {
return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr);
};
})(jQuery, 'smartresize');
function appendToFunction(fn, callback) {
window[fn] = (function(fn){
return function() {
if (typeof fn !== 'undefined') {
fn();
}
callback();
}
}(window[fn]));
}
$(document).ready(function() {
$(document).on('change', '.table-striped tbody tr:nth-child(odd)', function(event){
$('.table-striped tbody tr:nth-child(odd)').addClass('odd');
});
addPopOver();
function mobilecheck() {
var check = false;
(function(a) {
if (/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i
.test(a)
|| /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i
.test(a.substr(0, 4))) {
check = true;
}
})
(navigator.userAgent || navigator.vendor || window.opera);
return check;
}
var clickevent = mobilecheck() ? 'touchstart' : 'click';
var content = $('.content-container');
function open(elements, prefix) {
$(elements).removeClass(prefix + '-close').addClass(prefix + '-open');
}
function close(elements, prefix) {
$(elements).removeClass(prefix + '-open').addClass(prefix + '-close');
}
function createToggle(id, elements, prefix) {
$(id).on(clickevent, function(event) {
event.stopPropagation();
event.preventDefault();
if (content.hasClass(prefix + '-open')) {
close(elements, prefix);
} else {
open(elements, prefix);
}
});
content.click(function() {
if (content.hasClass(prefix + '-open')) {
close(elements, prefix);
}
});
}
var menuItems = $('.slide');
var accountSidebar = $('#user-billing-dropdown, .content-container');
var balanceArrow = $('#balance-link .balance-arrow');
$('#balance-link').on(clickevent, function (e) {
if (!content.hasClass('account-panel-open') && $('.help-link a').sidepanel("isOpen")) {
$('.help-link a').sidepanel("close");
}
if (content.hasClass('account-panel-close')) {
balanceArrow.addClass('rotate-90');
} else {
balanceArrow.removeClass('rotate-90');
}
});
createToggle('#nav-toggle', menuItems, 'nav');
createToggle('#balance-link', accountSidebar, 'account-panel')
$('#title-bar-toggle').click(function(evetn) {
$('.title-bar-actions').toggleClass('collapsed');
return false;
});

 (function pulse() {
$('.begin-dialing').delay(200).fadeTo(750, 0.75)
.fadeTo(750, 1, pulse);
})();
$(window).trigger('resize');
function responsive() {

 var resolution = document.documentElement.clientWidth;

 if (resolution < 980) {
if ($('.select-menu').length === 0) {

 var select = $('<select></select>');

 select.addClass('select-menu input-block-level');

 $('.secondary-nav ul li a')
.each(function() {

 var option = $('<option></option>');

 option.val(this.href);

 option.text($(this).text());
if ($(this).closest('li').hasClass('active')) {
option.attr('selected','selected');
}

 select.append(option);
});

 select.change(function() {
window.location.href = this.value;
});

 $('.secondary-nav ul').before(select).hide();
}
}

 if (resolution > 980) {
$('.select-menu').remove();
$('.secondary-nav ul').show();
}
}

	
 
	

$(document).on('click', '#account-link, #balance-link',
function(event) {
event.preventDefault();
});

	
	
 if ($('.account .dropdown-menu .errortext').length > 0) {
$('#account-link').addClass('haserror');
$('#company').append(
" <i class=\"fa fa-exclamation-circle\"></i>");
}

 $('.dropdown-toggle').dropdown();

 $('.dropform, .dropform input, .dropform .checkcontainer, .dropform span').on("click", function(e) {
e.stopPropagation();
});
$('.configuration-badge').tooltip({
position: {
my: "center bottom+10",
at: "center bottom",
using: function(position) {
$( this ).css(position).wrapInner('<div class="tooltip-inner"></div>');
$( "<div>" )
.addClass( "tooltip-arrow" )
.appendTo( this );
}
}
});
var percentWidth;

 $('body').on('click', '.fa-play', function() {
/* 	soundManager.setup({
    url: 'http://192.168.25.129//assets/sound/',
	preferFlash: false,
	debugMode: true,
	debugFlash: true,
  onready: function() {
    var mySound = soundManager.createSound({
      id: 'aSound',
      url: 'http://192.168.25.129/NativeTalk1.mp3'
    });
    mySound.play();
  },
  ontimeout: function() {
    // Hrmm, SM2 could not start. Missing SWF? Flash blocked? Show an error, etc.?
  }
});*/
cfPlaySound($(this), soundManager.getSoundById($(this).attr('data-sound-id')).position);
return false;
});
$('body').on('click', '.fa-pause', function() {
soundManager.pause($(this).attr('data-sound-id')); 
 $(this).removeClass('fa-pause').addClass('fa-play'); 
 return false;
});
$('body').on('mousemove', '.cf-player-timer', function(e) {
if ($(this).closest('.cf-player').hasClass('playing')) {
percentWidth = playerPosition($(this), e, $(this).outerWidth());
$(this).find('.cf-player-playhead').width(percentWidth+'%');
}
});
$('body').on('mouseleave', '.cf-player-timer', function() {
if ($(this).closest('.cf-player').hasClass('playing')) {
$(this).find('.cf-player-playhead').width(0);
}
});
$('body').on('click', '.cf-player-timer', function(e) {
if ($(this).closest('.cf-player').hasClass('playing')) {
percentWidth = playerPosition($(this), e, $(this).outerWidth());
cfPlaySound($(this).prev('.play-sound'), $(this).prev('.play-sound').attr('data-duration')*(percentWidth/100));
}
});
if($('.slide.new-header').length > 0) {
var helpPanelOffset = $('.slide.new-header').offset().top + $('.slide.new-header').outerHeight();
$('<style>#help-panel { top: '+helpPanelOffset+'px; }</style>').appendTo('head');
}
if($('.focus-header').length > 0) {
var helpPanelOffset = $('.focus-header').offset().top + $('.focus-header').outerHeight();
$('<style>#help-panel { top: '+helpPanelOffset+'px; }</style>').appendTo('head');
}
});
function setFilterClasses() {
if (window.localStorage.isDidFilterOpen === "true") {
$('.cf-filter-section').addClass('open');
$('.cf-action-filter').addClass('filter-close');
}
else {
$('.cf-filter-section').removeClass('open');
$('.cf-action-filter').removeClass('filter-close');
}
}
function initClearFilter(callback) {
setFilterClasses();
$('body').on('click', '.cf-action-filter', function(e) {
if ($('.cf-filter-section').hasClass('open')) {
callback();
}
$('.cf-action-filter').toggleClass('filter-close');
$('.cf-filter-section').toggleClass('open');
window.localStorage.isDidFilterOpen = $('.cf-filter-section').hasClass('open');
return false;
});
}
function closeDropDown(src) {
$(src).closest(".btn-group.open").toggleClass("open");
}
function addPopOver() {
$("a[rel=popover]")
.popover(
{
offset : 10,
trigger : 'manual',
animation : false,
html : true,
template : '<div class="popover" onmouseover="popstay(this)"><div class="arrow"></div><div class="popover-inner"><div class="popover-content"><p></p></div></div></div>'
}).click(function(e) {
e.preventDefault();
$(this).popover('toggle');
}).mouseenter(function(e) {
$(this).popover('show');
}).mouseleave(function() {
var someElement = this;
var timeoutId = setTimeout(function() {
$(someElement).popover('hide');
}, 600);


 $(this).data('timeoutId', timeoutId);
});
}



function popstay(e) {
$(e).mouseover(	function() {
$("a[rel=popover]").each(function() {
if ($(this).attr("data-content").indexOf($(e).contents().find("p").contents() != -1)) {
clearTimeout($(this).data('timeoutId'));
}
});
$(e).popover('show');
});
$(e).mouseleave(function() {
$(e).hide();
});
};
function initCkEditor(id) {
CKEDITOR.replace(id);


 CKEDITOR.config.toolbar = [
{
name : 'basicstyles',
groups : [ 'basicstyles', 'cleanup' ],
items : [ 'Bold', 'Italic', 'Underline', 'RemoveFormat' ]
},
{
name : 'paragraph',
groups : [ 'list', 'indent', 'blocks', 'align', 'bidi' ],
items : [ 'NumberedList', 'BulletedList', '-', 'Outdent',
'Indent' ]
},
{
name : 'clipboard',
groups : [ 'clipboard', 'undo' ],
items : [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord',
'-', 'Undo', 'Redo' ]
}, {
name : 'links',
items : [ 'Link', 'Unlink' ]
} ];

 CKEDITOR.config.toolbarGroups = [ {
name : 'basicstyles',
groups : [ 'basicstyles', 'cleanup' ]
}, {
name : 'paragraph',
groups : [ 'list', 'indent', 'blocks', 'align', 'bidi' ]
}, {
name : 'clipboard',
groups : [ 'clipboard', 'undo' ]
}, {
name : 'links'
} ];
CKEDITOR.config.removePlugins = 'elementspath';
};




window.cursound = null;
function playSound(id) {
if (cursound != null) {
cursound.destruct();
}
if (id != null) {
cursound = soundManager.createSound('sound' + id, CONTEXT_ROOT
+ '/sound?id=' + id);
cursound.play();
}
}
function playTtsSound(text, voice) {
if (cursound != null) {
cursound.destruct();
}
if (text != null && $.trim(text).length > 0) {
cursound = soundManager
.createSound("tts", CONTEXT_ROOT + '/sound?voice=' + voice
+ '&text=' + encodeURIComponent(text));
cursound.play();
}
}
function setupSound() {
var flashUrl = $("#sm2js").attr("src").replace(/soundmanager2.*/, '');
soundManager = new SoundManager();
soundManager.setup({
url: 'http://192.168.25.129//assets/sound/',
preferFlash: false,
debugMode: true,
debugFlash: true,
onready: function() {
soundManager.defaultOptions.volume = 80;
if ($(".play-sound").length > 0) {
$(".play-sound").each(function (index) {
setup360(this);
});
}
}
});
soundManager.beginDelayedInit();
}
function setup360(element) {
var setupButton = $(element);
var setupSoundURL = setupButton.attr('href');
var setupSoundTimer = setupButton.next('.cf-player-timer').find(
'.cf-player-current-time');
var setupSoundDuration = setupButton.attr('data-duration');
var setupSoundId = 'sound-' + Math.round(Math.random() * 1000000000);
setupButton.attr('data-sound-id', setupSoundId);
soundManager.createSound({
id : setupSoundId,
url : setupSoundURL,
onplay : function() {
setupButton.closest('.cf-player').addClass('playing');
if (setupButton.closest('.cf-player').find(
'.cf-player-progress').length == 0) {
setupButton.next('.cf-player-timer').append(
'<span class="cf-player-progress"></span>');
}
setupButton.removeClass('fa-play').addClass('fa-pause');
},
onresume : function() {
setupButton.closest('.cf-player').addClass('playing');
setupButton.removeClass('fa-play').addClass('fa-pause');
},
onfinish : function() {
setupButton.removeClass('fa-pause').addClass('fa-play');
setupSoundTimer.text(formatTime(setupSoundDuration));
setupSoundTimer.siblings('.cf-player-progress').remove();
setupSoundTimer.next('.cf-player-playhead').css('width', 0);
soundManager.setPosition(setupSoundId, 0);
setupButton.closest('.cf-player').removeClass('playing');
soundManager.stopAll();
},
onstop : function() {
setupButton.closest('.cf-player').find('.cf-player-current-time').text(
formatTime(setupButton.attr('data-duration')));
setupButton.closest('.cf-player').find('.cf-player-progress').remove();
setupSoundTimer.next('.cf-player-playhead').css('width', 0);
setupButton.closest('.cf-player').removeClass('playing');
setupButton.removeClass('fa-pause').addClass('fa-play');
},
onpause : function() {
setupButton.removeClass('fa-pause').addClass('fa-play');
},
whileplaying : function() {
setupSoundTimer.text(formatTime(this.position));
$('.cf-player-progress').css('width',
(this.position / this.duration * 100) + '%');
}
});
}
var playerSoundId;
var playerSoundDuration;
var playingSoundDuration;
var playingSoundId;
function cfPlaySound(playButton, startTime) {

playerSoundId = playButton.attr('data-sound-id');
startTime = startTime != null ? startTime : 0;
if ($('.playing').length > 0) {

 playingSoundId = $('.playing .play-sound').attr('data-sound-id');
if (playerSoundId != playingSoundId) {
 
 soundManager.stop(playingSoundId);
} else {
	//alert(startTime);
 soundManager.setPosition(playerSoundId, startTime);
soundManager.resume(playerSoundId);
//return;
}
}
soundManager.setPosition(playerSoundId, startTime);
soundManager.play(playerSoundId);
}
var playerClickOffsetX;
var playerClickWidth;
function playerPosition(element, e, progressBarWidth) {
playerClickOffsetX = element.offset().left;
playerClickWidth = e.clientX - playerClickOffsetX;
return percentWidth = (playerClickWidth / progressBarWidth) * 100;
}
function formatTime(milliseconds) {
var hours = Math.floor(milliseconds / 3600000);
milliseconds = milliseconds % 3600000;
var minutes = Math.floor(milliseconds / 60000);
milliseconds = milliseconds % 60000;
var seconds = Math.floor(milliseconds / 1000);
return (hours > 0 ? hours + ' :' : '') + (minutes < 10 ? '0' : '')
+ minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}



var buttons;
function setActionsEnabled(enabled) {
buttons.find("a").toggle(enabled);
buttons.find("span").toggle(!enabled);
}
function bindActionButtons() {
buttons = $("div.smallbutton, div.tributtonleft, div.tributtonright, div.tributtonmid");

 buttons.each(function() {
var a = $(this).children("a");
$(this).append($("<span/>").text(a.text()));
});

 var checkboxes = $("input[type=checkbox]");
var handler = function() {
if ($(this).is(":checked")) {
setActionsEnabled(true);
} else {
setActionsEnabled(checkboxes.is(":checked"));
}
};
checkboxes.each(function() {
$(this).click(handler);
});
setActionsEnabled(checkboxes.is(":checked"));
}



function checkAll(checkall, className) {
var checked = $(checkall).is(":checked");
var inputs = $("." + className + " input");
inputs.prop("checked", checked);
inputs.trigger("change")
return true;
}
function unCheck(input) {
if (!$(input).is(":checked")) {
$("#checkall").prop("checked", false);
}
}


function initViewHeightTracker(size) {
window.trackerHeight = size;
window.trackerTimeout = null;
var updateSize = function() {
$.ajax({
url : CONTEXT_ROOT + '/height?h=' + $(window).height()
});
};
$(window).smartresize(function() {
if (window.trackerHeight != $(window).height()) {
window.trackerHeight = $(window).height();
clearTimeout(window.trackerTimeout);
window.trackerTimeout = setTimeout(updateSize, 3000);
}
});
if ($(window).height() != size) {
updateSize();
}
}

var clip = null;
function initZeroClip(copyText, buttonId, containerId) {
var clip = new ZeroClipboard.Client();
clip.setText(''); 
 clip.setHandCursor(true);
clip.setCSSEffects(true);
clip.addEventListener('complete', function(client, text) {
$('#' + buttonId).html('<i class="fa fa-check"></i> Copied!');
});
clip.addEventListener('mouseDown', function(client) {
clip.setText(copyText);
});
clip.glue(buttonId, containerId);
}
function initClipboardOpenAgentReg() {

 
 var zclipContainerId = 'zClip' + randomId();
$('.zclip-container').attr('id', zclipContainerId);
var buttonId = 'copyPaste' + randomId();
$('.zclip-copy-button').attr('id', buttonId);
initZeroClip($('.agent-open-link').first().text(), buttonId, zclipContainerId);
}
function randomId() {
return Math.floor(Math.random() * (100000));
}


function fancyboxResizeAll(fullscreen) {
if (fullscreen) {
$.fancybox.fullscreen();
}
else {
$('.fancybox-wrap').height();
$.fancybox.current.autoWidth = true;
$.fancybox.current.autoHeight = true;
$.fancybox._setDimension();
$.fancybox.reposition();
}
var inner = $(".fancybox-inner");
if (inner.find(".copy-button").length > 0) {
initZeroClip($('#login').val(), 'copypasteloginbtn', 'zcliploginbtn');
initZeroClip($('#password').val(), 'copypastepasswordbtn',
'zclippasswordbtn');
}
if (inner.find("#agent-button-container").length > 0) {
initZeroClip($('#agent-registration-modal-link').text(),
'agent-button', 'agent-button-container');
}
if (inner.find('.agent-open-link').length > 0) {
initZeroClip($('.agent-open-link').first().text(), 'copypastebtn',
'zclipbtn')
}
}

function hideAlert() {
if ($('body').hasClass('focus-page')) {
return;
} else if ($('.first-login-modal').length != 0) {
return;
} else {
window.setTimeout(function() {
$(".alert-error, .alert-success").fadeOut(500);
}, 10000);
}
}

function initUploader(buttonId, uploadUrl, initFunction, openWaitModal,
closeWaitModal) {
var button = $("#" + buttonId);
button.fileupload({
url : uploadUrl
});
if (initFunction != null) {
initFunction($("#" + buttonId));
}
button.bind('UploadStarted', function() {
eval(openWaitModal);
});
button.on('fileuploadfinished', function(e, data) {
eval(closeWaitModal);
});
button.on('fileuploadfailed', function(e, data) {
eval(closeWaitModal);
});
}
var isAdvancedUpload = function() {
var div = document.createElement('div');
return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div))
&& 'FormData' in window && 'FileReader' in window;
}();
function initDragNDrop(id, uploadUrl, finishAction, urlDecorator, failureAction, acceptedTypes, errorMessage) {
var $form = $('#' + id);
var $input = $form.find('input[type="file"]'), $label = $form.find('label');
if (isAdvancedUpload) {
$form.addClass('has-advanced-upload');
var droppedFiles = false;
$form.on('drag dragstart dragend dragover dragenter dragleave drop', function(e) {
e.preventDefault();
e.stopPropagation();
}).on('dragover dragenter', function() {
$form.addClass('is-dragover');
}).on('dragleave dragend drop', function() {
$form.removeClass('is-dragover');
}).on('drop', function(e) {
droppedFiles = e.originalEvent.dataTransfer.files;
$form.trigger('submit');
});
$input.on('change', function(e) { 
 droppedFiles = e.target.files;
$form.trigger('submit');
});
} else {
$input.on('change', function(e) { 
 $form.trigger('submit');
});
}
$form.on('submit', function(e) {
if ($form.hasClass('is-uploading'))
return false;
$form.addClass('is-uploading').removeClass('is-error');
if (isAdvancedUpload) {
e.preventDefault();
var ajaxData = new FormData();
if (droppedFiles) {
$.each(droppedFiles, function(i, file) {
var uploadErrors = [];
var acceptFileTypes = new RegExp(acceptedTypes, 'i');
if(!acceptFileTypes.test(file['name'])) {
uploadErrors.push('This file type is not supported. ' + errorMessage);
}
if (uploadErrors.length > 0) {
$('body').append('<div style="z-index:10000;" class="alert alert-error">' +
'<script>hideAlert();</script>' +
'<a class="close" onClick="$(this).parent().fadeOut()"><i class="fa fa-times"></i></a>' +
uploadErrors.join('\n') +
'</div>');
return;
}
ajaxData.append($input.attr('name'), file);
});
}
if (typeof urlDecorator === "function") {
uploadUrl = urlDecorator(uploadUrl);
}
if (droppedFiles.length > 0) {
$.ajax({
url : uploadUrl,
type : 'post',
data : ajaxData,
cache : false,
contentType : false,
processData : false,
complete : function(data) {
$form.removeClass('is-uploading');
},
success : function(data) {
successfulUpload = data.success === true;
$form
.addClass(successfulUpload ? 'is-success'
: 'is-error');
if (!data.success) {
failureAction();
} else {
finishAction(e, data);
}
},
error : function(data) {

 }
});
}
else {
$form.removeClass('is-uploading');
$form.addClass('is-error');
$('body').append('<div style="z-index:10000;" class="alert alert-error">' +
'<script>hideAlert();</script>' +
'<a class="close" onClick="$(this).parent().fadeOut()"><i class="fa fa-times"></i></a>' +
'The file type is not supported.' +
'</div>');
}
} else {
var iframeName = 'uploadiframe' + new Date().getTime();
var $iframe = $('<iframe name="' + iframeName
+ '" style="display: none;"></iframe>');
$('body').append($iframe);
$form.attr('target', iframeName);
$iframe.one('load', function() {
var data = JSON.parse($iframe.contents().find('body').text());
$form.removeClass('is-uploading').addClass(
data.success === true ? 'is-success' : 'is-error')
.removeAttr('target');
if (!data.success) {

 }
$form.removeAttr('target');
$iframe.remove();
});
}
});
}