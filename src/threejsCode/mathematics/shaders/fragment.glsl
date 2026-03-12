varying vec3 vColor;

void main()
{
    vec2 uv = gl_PointCoord;

    float distanceToCenter = length(uv - vec2(0.5));
    float particleOpacity = 1.0;
    if ( vColor.r < 0.1 ) particleOpacity = 0.0;

    if (distanceToCenter > 0.5) discard;

    gl_FragColor = vec4(vColor, particleOpacity);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}