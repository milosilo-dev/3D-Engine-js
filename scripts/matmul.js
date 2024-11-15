export function MultiplyMatrixVector(input, matrix)
{
    var out = [];

    out[0] = input[0] * matrix[0][0] + input[1] * matrix[1][0] + input[2] * matrix[2][0] + matrix[3][0];
    out[1] = input[0] * matrix[0][1] + input[1] * matrix[1][1] + input[2] * matrix[2][1] + matrix[3][1];
    out[2] = input[0] * matrix[0][2] + input[1] * matrix[1][2] + input[2] * matrix[2][2] + matrix[3][2];
    var w = input[0] * matrix[0][3] + input[1] * matrix[1][3] + input[2] * matrix[2][3] + matrix[3][3];

    if (w != 0){
        out[0] /= w;
        out[1] /= w;
        out[2] /= w;
    }

    return out;
}