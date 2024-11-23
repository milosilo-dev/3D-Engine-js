import { Mesh_Converter } from "./mesh_converter.js";
import { Projection_Tools } from "./projection_tool.js";

export class Mesh
{
    constructor  (height, width, position, rotaition, scale, camera, draw){
        this.name = "";

        this.height = height;
        this.width = width;

        this.points = [];
        this.position = position;
        this.rotaition = rotaition;
        this.scale = scale;

        this.camera = camera;
        this.draw = draw;

        this.projection_tools = new Projection_Tools();
        this.mesh_converter = new Mesh_Converter();
    }

    fill_from_array (arr){
        this.points = this.mesh_converter.fill_from_array(arr);
    }

    async load_from_obj(filename){
        var arr = await this.mesh_converter.load_from_object_file(filename);
        this.points = arr[0];
        this.name = arr[1];
    }

    set_position (p_position){
        this.position = p_position;
    }

    set_rotaition (p_rotaition){
        this.rotaition = p_rotaition;
    }

    set_scale (p_scale){
        this.scale = p_scale;
    }

    project (debug_mode){
        var projected = [];

        var matRotX = this.projection_tools.RotXMatrix(this.rotaition.x);
        var matRotY = this.projection_tools.RotYMatrix(this.rotaition.y);
        var matRotZ = this.projection_tools.RotZMatrix(this.rotaition.z);

        this.points.forEach((element) => {
            // Rotate it
            var rotXYZ = this.projection_tools.RotateMatrix(matRotX, matRotY, matRotZ, element);

            // Move triangle
            var translatedMatrix = this.projection_tools.TranslateMatrix(rotXYZ, this.position);

            // Calculate normal
            var normal = this.projection_tools.CalculateNormal(translatedMatrix);

            // Project triangle
            //if (normal[2] < 0){
            if (normal[0] * (translatedMatrix[1][0] - this.camera.position.x) + 
                normal[1] * (translatedMatrix[1][1] - this.camera.position.y) + 
                normal[2] * (translatedMatrix[1][2] - this.camera.position.z) < 0)
            {
                var light_direction = [0.0, 0.0, -1.0];
                var color = Math.floor(this.projection_tools.CalculateLightDotProduct(light_direction, normal) * 255);

                var projectedMatrix = this.projection_tools.ProjectMatrix(translatedMatrix, this.camera.ProjectionMatrix);

                // Scale mesh to screen
                projectedMatrix = this.projection_tools.ScaleToScreen(projectedMatrix, this.height, this.width);

                projectedMatrix.push([color, color, color]);
                projected.push(projectedMatrix);
            }
        });

        projected = projected.sort((a, b) => {
            let z1 = (a[0][2] + a[1][2] + a[2][2]) / 3.0;
            let z2 = (b[0][2] + b[1][2] + b[2][2]) / 3.0;

            if (z1 > z2)
                return -1;
            else
                return 1;
        });
    
        projected.forEach((element) => {
            this.draw.triangle(element[0][0], element[0][1], element[1][0], element[1][1], element[2][0], element[2][1], "rgb(" + element[3][0].toString() + " " + element[3][1].toString() + " " + element[3][2].toString() + ")", true, 1);
    
            if (debug_mode){
                this.draw.triangle(element[0][0], element[0][1], element[1][0], element[1][1], element[2][0], element[2][1], "red", false, 3);
    
                this.draw.vertex(element[0][0], element[0][1], "red", 5);
                this.draw.vertex(element[1][0], element[1][1], "red", 5);
                this.draw.vertex(element[2][0], element[2][1], "red", 5);
            }
        });
    }
}