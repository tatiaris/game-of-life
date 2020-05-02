var cols, rows;
var scl = 30;
var grid = [];
var gridCopy = grid;
var start;

function setup() {
  start = false;
  grid = []
  var cnv = createCanvas(innerWidth/2, innerHeight/2);
  cnv.parent('sketch-holder');
  cols = innerWidth/scl;
  rows = innerHeight/scl;
  createGrid();
  frameRate(5)
}
function draw() {
  // createCanvas(innerWidth, innerHeight);
  background(0);
  drawGrid();
  if(start) update();
  drawLabel();
}
function update(){
  gridCopy = grid;
  for (var i = 1; i < cols - 1; i ++){
    for (var j = 1; j < rows - 1; j ++){
      grid[i][j].neighbours = 0;
      for (var k = -1; k < 2; k++){
        for (var l = -1; l < 2; l++){
          if (!(k==0 && l==0)){
            if (gridCopy[i + k][j + l].alive){
              grid[i][j].neighbours++;
            }
          }
        }
      }
    }
  }
  for (var i = 1; i < cols - 1; i ++){
    for (var j = 1; j < rows - 1; j ++){
      if (grid[i][j].neighbours < 2 || grid[i][j].neighbours > 3)
        grid[i][j].alive = false;
      else if (grid[i][j].neighbours == 3){
        grid[i][j].alive = true;
      }
    }
  }
}
function keyPressed(){
  if(keyCode == 32){
    start = !start;
  }
  if(keyCode == 39){
    update();
  }
  if(keyCode == 82){
    setup()
  }
}
function createGrid(){
  for (var i = 0; i < cols; i++){
    grid[i] = [];
    for (var j = 0; j < rows; j++){
      grid[i][j] = {
        col: i,
        row: j,
        neighbours: 0,
        alive: false
      }
    }
  }
}
function drawGrid() {
  fill(0);
  stroke(255);
  for (var i = 0; i < cols; i++){
    for (var j = 0; j < rows; j++){
      if(grid[i][j].alive)
        fill(255);
      rect(i*scl, j*scl, scl, scl);
      fill(0);
    }
  }
}

function mousePressed() {
  for (var i = 1; i < cols - 1; i ++){
    for (var j = 1; j < rows - 1; j ++){
      if (collidePointRect(mouseX, mouseY, i*scl, j*scl, scl, scl)){
        grid[i][j].alive = !grid[i][j].alive;
      }
    }
  }
}
function collidePointRect(pointX, pointY, x, y, xW, yW) {
  if (pointX >= x &&         // right of the left edge AND
      pointX <= x + xW &&    // left of the right edge AND
      pointY >= y &&         // below the top AND
      pointY <= y + yW) {    // above the bottom
          return true;
  }
  return false;
}
function drawLabel(){
  fill(255);
  rect(0, 0, width, scl);
  textSize(20);
  stroke(0);
  fill(0);
  text("Hit 'space' to start/stop the Game of Life!", 5, scl - 5);
}
