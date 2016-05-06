define('./js/lib/audioEffect',function( require, exports, module){
    
    exports = module.exports={
        init:function(audio){//<audio>对象
            this.audio = audio;
            this.source = this.audioContext.createMediaElementSource(this.audio);
        },
        audioContext: (function() {
            var AudioContext = (window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext);

            return new AudioContext();
        })(),
        getContext: function() {
            return this.audioContext;
        },
        getAnalyser:function(){
            this.cancelJob();
            this.analyser = this.audioContext.createAnalyser();
            this.source.connect(this.analyser);
            // 让扬声器的音频通过分析器
            this.analyser.connect(this.audioContext.destination);

            // 设置数据
            this.analyser.fftSize = 512;//频道数量
            this.bufferLength = this.analyser.fftSize;
            this.dataArray = new Float32Array(this.bufferLength);//每个频道的频率
            this.frame = 0;//音频帧数
            return {analyser:this.analyser,bufferLength:this.bufferLength,frame:this.frame};
            //console.log(this.analyser);
        },
        deleteVoice: function(audiobuffer) {
            this.cancelJob();
            var audioContext = this.audioContext,
                source = this.source,
                gain = audioContext.createGain(1),
                gain2 = audioContext.createGain(1),
                gain3 = audioContext.createGain(),
                channelSplitter = audioContext.createChannelSplitter(2),
                channelMerger = audioContext.createChannelMerger(2),
                filterlow = audioContext.createBiquadFilter(),
                filterhigh = audioContext.createBiquadFilter(),
                gain4 = audioContext.createGain(),
                jsNode = audioContext.createScriptProcessor(2048);

            // Note: the Web Audio spec is moving from constants to strings.
            filterlow.type = filterlow.LOWPASS;
            filterlow.frequency.value = 20;
            filterlow.Q.value = 0;
            filterhigh.type = filterhigh.HIGHPASS;
            filterhigh.frequency.value = 20000;
            filterhigh.Q.value = 0;

            // 反相音频组合
            gain.gain.value = -1;
            gain2.gain.value = -1;

            // 方案 a
            if (audiobuffer) {
                source.buffer = audiobuffer;
            } else {

            }

            source.connect(gain3);
            gain3.connect(channelSplitter);

            // 2-1>2
            channelSplitter.connect(gain, 0);
            gain.connect(channelMerger, 0, 1);
            channelSplitter.connect(channelMerger, 1, 1);

            //1-2>1
            channelSplitter.connect(gain2, 1);
            gain2.connect(channelMerger, 0, 0);
            channelSplitter.connect(channelMerger, 0, 0);

            // 高低频补偿合成
            // source.connect(filterhigh);
            // source.connect(filterlow);
            // filterlow.connect(channelMerger);
            // filterhigh.connect(channelMerger);
            // channelMerger.connect(audioContext.destination);
            // 普通合成
            gain4.gain.value = 5;
            channelMerger.connect(gain4);
            gain4.connect(audioContext.destination);
        },
        effect3d:function(){
            this.cancelJob();
            var panner=this.audioContext.createPanner(),
                gain = this.audioContext.createGain();

            //设置声源属性
            panner.setOrientation(0,0,0,0,1,0); //方向朝向收听者
            var a=0,r=8;
            this.effectTimer = setInterval(function(){
              //然声源绕着收听者以8的半径旋转
              panner.setPosition(Math.sin(a/100)*r,0,Math.cos(a/100)*r);
              a++;
            },16);
            //连接：source → panner → destination
            this.source.connect(panner);
            gain.gain.value = 5;
            panner.connect(gain);
            gain.connect(this.audioContext.destination);
        },
        cancelJob:function(){
            this.source.disconnect(0);
            clearInterval(this.effectTimer);
        }
    }
});