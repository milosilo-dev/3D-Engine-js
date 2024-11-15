export class Camera{
    constructor(position, near, far, fov, aspect){
        this.position = position;
        this.near = near;
        this.far = far;
        this.fov = fov;
        this.aspectRatio = aspect;

        this.fovRad = 1 / Math.tan(fov * 0.5 / 180 * Math.PI);
        this.ProjectionMatrix = [[aspect * this.fovRad, 0, 0, 0],
                                [0, this.fovRad, 0, 0],
                                [0, 0, far / (far - near), 1],
                                [0, 0, (-far * near) / (far - near), 0]];
    }
}