import { MultiplyMatrixVector } from "./matmul.js";

export class Projection_Tools{
    constructor(){};

    RotXMatrix (angle){
        return [[1, 0, 0, 0],
        [0, Math.cos(angle), Math.sin(angle), 0],
        [0, -Math.sin(angle), Math.cos(angle), 0],
        [0, 0, 0, 1]];
    }

    RotYMatrix (angle){
        return [[Math.cos(angle), 0, Math.sin(angle), 0],
        [0, 1, 0, 0],
        [-Math.sin(angle), 0, Math.cos(angle), 0],
        [0, 0, 0, 1]]
    }

    RotZMatrix (angle){
        return [[Math.cos(angle), Math.sin(angle), 0, 0],
        [-Math.sin(angle), Math.cos(angle), 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]];
    }

    RotateMatrix(matRotX, matRotY, matRotZ, Matrix){
        let rotZ = [[], [], []];
        rotZ[0] = MultiplyMatrixVector(Matrix[0], matRotZ);
        rotZ[1] = MultiplyMatrixVector(Matrix[1], matRotZ);
        rotZ[2] = MultiplyMatrixVector(Matrix[2], matRotZ);

        let rotXZ = [[], [], []];
        rotXZ[0] = MultiplyMatrixVector(rotZ[0], matRotX);
        rotXZ[1] = MultiplyMatrixVector(rotZ[1], matRotX);
        rotXZ[2] = MultiplyMatrixVector(rotZ[2], matRotX);

        let rotXYZ = [[], [], []];
        rotXYZ[0] = MultiplyMatrixVector(rotXZ[0], matRotY);
        rotXYZ[1] = MultiplyMatrixVector(rotXZ[1], matRotY);
        rotXYZ[2] = MultiplyMatrixVector(rotXZ[2], matRotY);

        return rotXYZ;
    }

    TranslateMatrix(Matrix, transform){
        let tempTri = [[...Matrix[0]], [...Matrix[1]], [...Matrix[2]]];

        tempTri[0][0] += transform[0];
        tempTri[1][0] += transform[0];
        tempTri[2][0] += transform[0];

        tempTri[0][1] += transform[1];
        tempTri[1][1] += transform[1];
        tempTri[2][1] += transform[1];

        tempTri[0][2] += transform[2];
        tempTri[1][2] += transform[2];
        tempTri[2][2] += transform[2];

        return tempTri;
    }

    ProjectMatrix(Matrix, projection_matrix){
        var triProjected = [];

        triProjected[0] = MultiplyMatrixVector(Matrix[0], projection_matrix);
        triProjected[1] = MultiplyMatrixVector(Matrix[1], projection_matrix);
        triProjected[2] = MultiplyMatrixVector(Matrix[2], projection_matrix);

        return triProjected;
    }

    ScaleToScreen(Matrix, HEIGHT, WIDTH){
        Matrix[0][0] += 1; Matrix[0][1] += 1;
        Matrix[1][0] += 1; Matrix[1][1] += 1;
        Matrix[2][0] += 1; Matrix[2][1] += 1;

        Matrix[0][0] *= 0.5 * WIDTH; Matrix[0][1] *= 0.5 * HEIGHT;
        Matrix[1][0] *= 0.5 * WIDTH; Matrix[1][1] *= 0.5 * HEIGHT;
        Matrix[2][0] *= 0.5 * WIDTH; Matrix[2][1] *= 0.5 * HEIGHT;

        return Matrix;
    }

    CalculateNormal(Matrix){
        var normal = [];
        var line1 = [];
        var line2 = [];

        line1[0] = Matrix[1][0] - Matrix[0][0];
        line1[1] = Matrix[1][1] - Matrix[0][1];
        line1[2] = Matrix[1][2] - Matrix[0][2];

        line2[0] = Matrix[2][0] - Matrix[0][0];
        line2[1] = Matrix[2][1] - Matrix[0][1];
        line2[2] = Matrix[2][2] - Matrix[0][2];

        normal[0] = line1[1] * line2[2] - line1[2] * line2[1];
        normal[1] = line1[2] * line2[0] - line1[0] * line2[2];
        normal[2] = line1[0] * line2[1] - line1[1] * line2[0];

        var l = Math.sqrt(normal[0] * normal[0] + normal[1] * normal[1] + normal[2] * normal[2]);
        normal[0] /= l;
        normal[1] /= l;
        normal[2] /= l;

        return normal;
    }
}