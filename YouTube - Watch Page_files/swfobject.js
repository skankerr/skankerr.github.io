var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

// replacement for http://youtube.com/swfobject.js in 2007
// for more info on swfobject.js and SWFObject class, see
// https://blog.deconcept.com/swfobject/
class _SWFObject {
  constructor(playerUri, id, width, height, version, bgColor) {
    const m = playerUri.match(/video_id=([-_0-9a-zA-Z]+)/);
    const video_id = m && m[1];
    console.log('SWFObject: playerUri=%s -> video_id=%s', playerUri, video_id);
    this.videoId = video_id;
    this.moviePlayerId = id;
    this.width = width;
    this.height = height;
    this.bgColor = bgColor || '#eee';
  }
  addParam(p, v) {
    // we may want to handle this to support other variants
  }
  addVariable(name, value) {
    console.debug('SWFObject addVariable %s = %s', name, value);
    if (name == 'video_id') {
      this.videoId = value;
    }
  }
  write(containerId) {
    // containerId is "playerDiv"
    const el = document.getElementById(containerId);
    if (!el) {
      console.log('element #%s does not exist', containerId);
      return;
    }
    // set up fake Flash-based player elements to be picked up by
    // video-embed-rewriter.js
    const player = document.createElement('div');
    player.id = this.moviePlayerId; //'watch-player'; // should use this.moviePlayerId?
    player.className = 'flash-player';
    player.style.width = this.width + 'px';
    player.style.height = this.height + 'px';
    player.style.position = 'relative';
    player.style.backgroundColor = this.bgColor;

    const embed = document.createElement('embed');
    // video-embed-rewriter.js extracts video-ID from flashvar attribute
    // with regexp, which includes "&" before "video_id". It cares nothing
    // else.
    if (this.videoId) {
      embed.setAttribute('flashvars', `&video_id=${this.videoId}`);
    }
    player.appendChild(embed);

    for (let e = el.firstChild; e; e = el.firstChild)
      el.removeChild(e);
    el.appendChild(player);
  }
}
// make SWFObject available in global namespace
var SWFObject = _SWFObject;
// old name
var FlashObject = _SWFObject;
// stub
function getQueryParamValue(name) {
  return '';
}


}
/*
     FILE ARCHIVED ON 23:13:55 Mar 19, 2007 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 08:59:35 Dec 17, 2024.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.497
  exclusion.robots: 0.018
  exclusion.robots.policy: 0.008
  esindex: 0.01
  cdx.remote: 7.728
  LoadShardBlock: 68.824 (3)
  PetaboxLoader3.datanode: 2525.929 (4)
  load_resource: 2529.687
  PetaboxLoader3.resolve: 58.597
*/