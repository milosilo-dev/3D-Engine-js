# 3D-Engine-JS

**A CPU based softwere rasteriser built in javascript and is completly client side.** It uses the HTML5 xcanvas for displaying graphics in the custom draw.js package that i built ofr the project. It is desiged to be expedable, with empty classes like `camera.js` wich are desiged to be built ontop of later on when the engie becomes more complex.

You can test the current vertion of this project [here.](https://milosilo-dev.github.io/3D-Engine-js/)

## Loading OBJ Modles

If you want to load obj modles from blender (I assume other programs are similar but i only have experience with blender) you will need to triangulae the mesh when you export it. I do hope to change this later on too improve the experience of importing modles. make sure to not export the model with any other data as it will be ignored and just slow down the file loading prosses.

To use it you will need to host the file on a webserver and chnage the main.js to load the modle from the web address, i have not tested modles on a diffrent domain to were the project is hosted and so i am not sure if that will work but you can give it a try.

in the meshes directory you will find some example modles that i made and you are welcome to use (they are very bad).

## Fetures:

* Works 🎉️
* Debug lines 👀️
* Simple 😄
* FPS Counter 🚀️
* OBJ Loading💡
