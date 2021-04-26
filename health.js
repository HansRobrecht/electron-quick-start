var healthpoints = 3;


var rect1 = {x: 5, y: 5, width: 37, height: 50}
var rect2 = {x: 20, y: 10, width: 8, height: 5}

if (rect1.x < rect2.x + rect2.width &&
   rect1.x + rect1.width > rect2.x &&
   rect1.y < rect2.y + rect2.height &&
   rect1.y + rect1.height > rect2.y) {
    // collision detected!
    healthpoints - 1;
}


if (healthpoints = 0){
    var x = document.getElementById("deathScreen");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

<div id="deathScreen">
You died.

<button onclick="respawnFunction()">Respawn</button>
</div>


// filling in the values =>
// if (5 < 30 &&
//     55 > 20 &&
//     5 < 20 &&
//     55 > 10) {
//     // collision detected!
//     healthpoints - 1;
// }

