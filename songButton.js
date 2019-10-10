function ButtonPlay(){
	var au = document.getElementById("mp3player");
	au.src = this.getAttribute("mp3filename"); // File Name
	au.volume = .5;
	au.play();
}
function ButtonDel(){
	location.href = "/songDelete?no=" + this.getAttribute("mp3no"); // Song Index
}
window.addEventListener("load", function(){
	document.getElementsByName("btnPlay").forEach(item =>item.addEventListener("click",ButtonPlay));
	document.getElementsByName("btnDel").forEach(item =>item.addEventListener("click",ButtonDel));
});