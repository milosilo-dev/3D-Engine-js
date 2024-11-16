import { Draw } from "./draw.js";
import { Mesh } from "./mesh.js";
import { Camera } from "./camera.js";


const HEIGHT = 600;
const WIDTH = 800;

const near = 0.1;
const far = 1000.0;
const fov = 90.0;
const aspectRatio = HEIGHT / WIDTH;

var draw = new Draw(HEIGHT, WIDTH, "black", start, update);
var camera = new Camera([0, 0, 0], near, far, fov, aspectRatio);

var mesh = new Mesh(HEIGHT, WIDTH, [0, 0, 3], [0, 0, 0], [1, 1, 1], camera);
mesh.fill_from_array([
    0, 0, 0, 0, 1, 0, 1, 1, 0, 
    0, 0, 0, 1, 1, 0, 1, 0, 0, 
    1, 0, 0, 1, 1, 0, 1, 1, 1, 
    1, 0, 0, 1, 1, 1, 1, 0, 1, 
    1, 0, 1, 1, 1, 1, 0, 1, 1, 
    1, 0, 1, 0, 1, 1, 0, 0, 1, 
    0, 0, 1, 0, 1, 1, 0, 1, 0, 
    0, 0, 1, 0, 1, 0, 0, 0, 0, 
    0, 1, 0, 0, 1, 1, 1, 1, 1, 
    0, 1, 0, 1, 1, 1, 1, 1, 0, 
    1, 0, 1, 0, 0, 1, 0, 0, 0, 
    1, 0, 1, 0, 0, 0, 1, 0, 0
]);

var debug_mode = true;
var debug_compoent = document.getElementById("debug");
var debug_front_component = document.getElementById("debug-front")
debug_compoent.onclick = debug;

draw.init();

function debug(){
    debug_mode = !debug_mode;
    if (debug_mode){
        debug_compoent.style.background = "hsl(115, 100%, 32%)";
        debug_front_component.style.background = "hsl(106, 100%, 47%)";
    }else{
        debug_compoent.style.background = "hsl(340deg 100% 32%)";
        debug_front_component.style.background = "hsl(345deg 100% 47%)";
    }
}

function start(){

}

function update(delta_time){
    mesh.rotaition[0] += 0.01;
    mesh.rotaition[1] += 0.005;
    mesh.rotaition[2] += 0.03;

    mesh.project().forEach((element) => {
        draw.triangle(element[0][0], element[0][1], element[1][0], element[1][1], element[2][0], element[2][1], "white", true, 1);

        if (debug_mode){
            draw.triangle(element[0][0], element[0][1], element[1][0], element[1][1], element[2][0], element[2][1], "red", false, 3);

            draw.vertex(element[0][0], element[0][1], "red", 5);
            draw.vertex(element[1][0], element[1][1], "red", 5);
            draw.vertex(element[2][0], element[2][1], "red", 5);
        }
    });
}
