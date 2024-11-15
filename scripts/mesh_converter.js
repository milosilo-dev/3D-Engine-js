export class Mesh_Converter{
    constructor  (){}

    // Fills the points array from an array of vector3 points
    // 3 vector 3 points = one triangle
    // three floats = one vector 3
    fill_from_array (arr){
        var x = [];
        var points = [];

        var index = 0;
        var v3 = [];
        arr.forEach((element) => {
            if (index % 3 == 0 && index != 0){
                x.push(v3);
                v3 = [];
            }

            v3.push(element);
            index++;
        });

        var index = 0;
        var v3 = [];
        x.forEach((element) => {
            if (index % 3 == 0 && index != 0){
                points.push(v3);
                v3 = [];
            }

            v3.push(element);
            index++;
        });

        return points;
    }
}
