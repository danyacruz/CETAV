
var timeText = document.getElementById("timeText");
var totalTime = document.getElementById("totalText");


function player(){
	var audio = new Audio();
	var audioFolder = "audio/";
	var audioExt = ".m4a";
	var audiosIndex = 1;
	var onPlay = false;
	var seeking = false;
	var playingtrack;
	var playerBox = document.getElementById("playerBox");
	var audios = {
	    "track1":["I'm alive", "I'm alive", "  / 3:27"],
		"track2":["Burning on my soul", "Burning on my soul", "  / 3:42"],
		"track3":["Even unto death", "Even unto death", "  / 4:38"]
	};

	for(var track in audios){

		var volume = document.getElementById("volume");
		var seekSong = document.getElementById("seekSong");
		var button = document.createElement("button");
		var boxText = document.createElement("div");
		/*var backward = document.getElementById("backward");*/
		/*var forward = document.getElementById("forward");*/


		button.className = "playbutton";
		boxText.className = "trackname";

		boxText.innerHTML = audiosIndex + ". " + audios[track][0] + audios[track][2];
		button.id = audios[track][1];

		button.addEventListener("click", switchSong);
		/*backward.addEventListener("click", preview);*/
		/*forward.addEventListener("click", next);*/


		boxText.appendChild(button);
		playerBox.appendChild(boxText);
		
		audiosIndex++;
	}

    // eventos
	/*audio.addEventListener("ended",function(){
	    document.getElementById("playingtrack").style.background = "url(images/play.png)";
	});*/



	volume.addEventListener("mousemove", setvolume);

	seekSong.addEventListener("mousedown", function(e){ 
		seeking = true; 
		seek(e); 
	});

	audio.addEventListener("timeupdate", function(){ 
		timer(); 
	});

	// funciones
	/*function backward(){
		audio.next()
	}*/


	function timer(){
		var last = audio.currentTime;
		var min = Math.floor(audio.currentTime / 60);
	    var sec = Math.floor(audio.currentTime - min * 60);
	    var lastMin = Math.floor(audio.duration / 60);
	    var lastSec = Math.floor(audio.duration - lastMin * 60);

		timeText.innerHTML = min+ ":" +sec;
	    totalTime.innerHTML = lastMin+ ":" +lastSec;
	}

	function next(){
		if(playingtrack){
			    onPlay = true;
				document.getElementById("playingtrack");
	            audio.next();
			}
	}


	function setvolume(){
	    audio.volume = volume.value/100;
    }

    function seek(event){
	    if(seeking){
		    seekSong.value = event.clientX - seekSong.offsetLeft;
	        seekTo = audio.duration * (seekSong.value / 100);
	        audio.currentTime = seekTo;
	    }
    }

	function switchSong(e){
		if(onPlay){
		    if(playingtrack != e.target.id){
			    onPlay = true;
				document.getElementById("playingtrack").style.background = "url(images/play.png)";
			    e.target.style.background = "url(images/play.png)";
	            audio.play();
			} else {
			    audio.pause();
			    onPlay = false;
				e.target.style.background = "url(images/pause.png)";
			}
		} else {
			onPlay = true;
			e.target.style.background = "url(images/play.png)";
			if(playingtrack != e.target.id){
				audio.src = audioFolder + e.target.id + audioExt;
			}
	        audio.play();
		}
		playingtrack = e.target.id;
	}
}

window.addEventListener("load", player);