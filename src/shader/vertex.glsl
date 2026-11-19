#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;

varying vec2 vUv;

void main() {
        vUv = uv;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
