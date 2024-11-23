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

    // Fills the points array from an .obj file
    async load_from_object_file(filename){
        let text = await fetch(filename);
        text = await text.text();

        var verts = [];
        var points = [];
        var name = "";
        var lines = text.split("\n");

        lines.forEach((element) => {
            var modifier = "";
            var sections = element.split(" ");

            modifier = sections[0];
            delete sections[0];

            switch (modifier){
                case("v"):
                    if (sections.length == 4){
                        verts.push([parseFloat(sections[1]), parseFloat(sections[2]), parseFloat(sections[3])]);
                    }
                    break;
                case("f"):
                    if (sections.length == 4){
                        points.push([verts[parseInt(sections[1]) - 1], 
                                    verts[parseInt(sections[2]) - 1], 
                                    verts[parseInt(sections[3]) - 1]])
                    }
                    break;
                case("o"):
                    if (sections.length == 2){
                        name = sections[0];
                    }
                    break;
            }
        })

        return [points, name];
    }
}
