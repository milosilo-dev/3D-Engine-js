import { Mesh_Converter } from "./mesh_converter.js";
import { Projection_Tools } from "./projection_tool.js";

export class Mesh
{
    constructor  (height, width, position, rotaition, scale, camera){
        this.height = height;
        this.width = width;

        this.points = [];
        this.position = position;
        this.rotaition = rotaition;
        this.scale = scale;

        this.camera = camera;

        this.projection_tools = new Projection_Tools();
        this.mesh_converter = new Mesh_Converter();
    }

    fill_from_array (arr){
        this.points = this.mesh_converter.fill_from_array(arr);
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

    project (){
        var projected = [];

        var matRotX = this.projection_tools.RotXMatrix(this.rotaition[0]);
        var matRotY = this.projection_tools.RotYMatrix(this.rotaition[1]);
        var matRotZ = this.projection_tools.RotZMatrix(this.rotaition[2]);

        this.points.forEach((element) => {
            // Rotate it
            var rotXYZ = this.projection_tools.RotateMatrix(matRotX, matRotY, matRotZ, element);

            // Move triangle
            var translatedMatrix = this.projection_tools.TranslateMatrix(rotXYZ, this.position);

            // Calculate normal
            var normal = this.projection_tools.CalculateNormal(translatedMatrix);

            // Project triangle
            //if (normal[2] < 0){
            if (normal[0] * (translatedMatrix[1][0] - this.camera.position[0]) + 
                normal[1] * (translatedMatrix[1][1] - this.camera.position[1]) +
                normal[2] * (translatedMatrix[1][2] - this.camera.position[2]) < 0)
            {
                var projectedMatrix = this.projection_tools.ProjectMatrix(translatedMatrix, this.camera.ProjectionMatrix)

                // Scale mesh to screen
                projectedMatrix = this.projection_tools.ScaleToScreen(projectedMatrix, this.height, this.width);

                projected.push(projectedMatrix);
            }
        });
        return projected;
    }
}