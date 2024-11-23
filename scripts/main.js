import { Draw } from "./draw.js";
import { Mesh } from "./mesh.js";
import { Camera } from "./camera.js";
import { Vert } from "./vert.js";

const HEIGHT = 600;
const WIDTH = 800;

const near = 0.1;
const far = 1000.0;
const fov = 90.0;
const aspectRatio = HEIGHT / WIDTH;

var draw = new Draw(HEIGHT, WIDTH, "black", start, update);
var camera = new Camera(new Vert(0, 0, 0), near, far, fov, aspectRatio);

var mesh1 = new Mesh(HEIGHT, WIDTH, new Vert(-2, 0, 3), new Vert(0, 0, 0), new Vert(.5, .5, .5), camera, draw);
mesh1.fill_from_array([
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
var mesh2 = new Mesh(HEIGHT, WIDTH, new Vert(3, 0, 4), new Vert(0, 0, 0), new Vert(.5, .5, .5), camera, draw);
await mesh2.load_from_obj("meshes/robot.obj");

var debug_mode = false;
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
    mesh1.rotaition.x += 0.01;
    mesh1.rotaition.y += 0.005;
    mesh1.rotaition.z += 0.03;

    mesh1.project(debug_mode);

    mesh2.rotaition.x += 0.005;
    mesh2.rotaition.y += 0.01;
    mesh2.rotaition.z += 0.02;

    mesh2.project(debug_mode);
}
