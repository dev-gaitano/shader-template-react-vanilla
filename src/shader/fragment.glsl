#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

varying vec2 vUv;

void main() {
        vec2 st = gl_FragCoord.xy / u_resolution;

        st = st * 2. - 1.;

        gl_FragColor = vec4(st.x, st.y, 0., 1.);
}
