export class Mesh_Converter{
    constructor  (){}

    // Fills the points array from an array of vector3 points
    // 3 vector 3 points = one triangle
    // three floats = one vector 3
    fill_from_array(arr) {
        var x = [];
        var points = [];
        var v3 = [];
    
        // First pass: Split input into groups of three
        arr.forEach((element, index) => {
            v3.push(element);
            if ((index + 1) % 3 === 0) {
                x.push(v3);
                v3 = [];
            }
        });
    
        // Push any remaining elements as a final group
        if (v3.length > 0) {
            x.push(v3);
        }
    
        // Second pass: Group groups of three into triangles
        v3 = [];
        x.forEach((element, index) => {
            v3.push(element);
            if ((index + 1) % 3 === 0) {
                points.push(v3);
                v3 = [];
            }
        });
    
        // Push any remaining triangles
        if (v3.length > 0) {
            points.push(v3);
        }
    
        return points;
    }
}
