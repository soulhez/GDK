/**
 * Created by will.jiang on 14-10-21.
 * 事件管理
 * require /library/howler.js
 */


this.GDK = this.GDK || {};

(function () {
    var Audio = function() {

    };

    var am = Audio.prototype;
    am.howl = {};
    am.soundMap = {};

    //配置声音
    /*
    * @author animal
    * 日期 2014 11 05 上午9:21
    * 功能描述
    * @param {string} 不带后缀的声音精灵文件名
    * @param {object} 声音配置
    * @return none
    * */
    am._addSounds = function (spriteFile, spriteSetup,basePath) {
        am.spriteFile = spriteFile;
        am.spriteSetup = spriteSetup;
        am.bathPath = basePath;
        for (var i in spriteSetup) {
            var sound = {};
            sound.state = "end";
            sound.soundInstance = null;
            sound.soundName = i;
            sound.requestResume = spriteSetup[3];
            am.soundMap[i] = sound;
        }
    };
    //加载声音
    /*
    *
    * */

     am._loadSounds = function(onload,onloaderror) {

         console.log(am.bathPath);
         console.log((am.bathPath?(am.bathPath+"/"):"/")+am.spriteFile + '.mp3');
        am.howl = new Howl({
            urls: [(am.bathPath?(am.bathPath+"/"):"/")+am.spriteFile + '.mp3', (am.bathPath?(am.bathPath+"/"):"/")+am.spriteFile + '.ogg'],
            sprite: am.spriteSetup,
            onload: function () {
                if(typeof onload =="function"){
                    onload();
                }
            },
            onloaderror: function () {
                if(typeof onloaderror =="function"){
                    onloaderror();
                }
            },
            onend: function (soundInstance) {
                for (var i in am.soundMap) {
                    if (am.soundMap[i].soundInstance = soundInstance) {
                        am.soundMap[i].state = "end";
                    }
                }
            }
        })
    };

    am.play = function (key) {
        am.howl.stop(key);
        am.soundMap[key].soundInstance = am.howl.play(key);
        am.soundMap[key].state = "playing";
    };

    am.pause = function (key) {
        am.howl.pause(key);
        am.soundMap[key].state = "suspend";
    };

    am.stop = function (key) {
        am.howl.stop(key);
        am.soundMap[key].state = "end";
    };

    //根据定制状态和要求恢复应该恢复的声音
    am.resumeAudio = function () {
        for (var i in am.soundMap) {
            if (this.soundMap[i].state == "suspend" && this.soundMap[i].requestResume) {
                this.soundMap[i].soundInstance = am.play(this.audioMap[i].soundName);
            }
        }
    };

    //停止所有声音的播放
    am.stopAllSound = function () {
        for (var i in am.soundMap) {
            if (am.soundMap[i].soundInstance) {
                am.stop(i);
            }
        }
    };

    GDK.Audio = Audio;
}());