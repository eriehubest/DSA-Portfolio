import * as THREE from 'three';

import particlesVertexShader from './shaders/vertex.glsl';
import particlesFragmentShader from './shaders/fragment.glsl';

import Application from "../Application";

const assetUrl = (path) =>
    `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

export default class Mathematics {
    constructor() {
        this.appInstance = Application.getInstance();
        this.viewport = this.appInstance.viewport;

        this.init();
    }

    async init() {
        await this.setDisplacement();

        this.textureloader = new THREE.TextureLoader();

        this.particlesGeometry = new THREE.PlaneGeometry(10, 10, 128, 128);
        this.basicWhiteMaterial = new THREE.MeshBasicMaterial({ color: 'white' })

        const intensitysArray = new Float32Array(this.particlesGeometry.attributes.position.count)
        const anglesArray = new Float32Array(this.particlesGeometry.attributes.position.count)

        for (let i = 0; i < this.particlesGeometry.attributes.position.count; i++) {
            intensitysArray[i] = Math.random()
            anglesArray[i] = Math.random() * Math.PI * 2
        }

        this.particlesGeometry.setAttribute('aIntensity', new THREE.BufferAttribute(intensitysArray, 1))
        this.particlesGeometry.setAttribute('aAngle', new THREE.BufferAttribute(anglesArray, 1))

        this.particlesMaterial = new THREE.ShaderMaterial({
            vertexShader: particlesVertexShader,
            fragmentShader: particlesFragmentShader,
            uniforms: {
                uResolution: new THREE.Uniform(
                    new THREE.Vector2(this.viewport.width * 2, this.viewport.height * 2),
                ),
                uPictureTexture: new THREE.Uniform(this.textureloader.load(assetUrl('images/picture-1.png'))),
                uDisplacementTexture: new THREE.Uniform(this.displacement.texture),
            }
        })

        this.particles = new THREE.Points(this.particlesGeometry, this.particlesMaterial);
        this.appInstance.scene.add(this.particles)

        this.particlesTargetRotation = new THREE.Vector2(0, 0);
    }

    async setDisplacement() {
        function loadImage(src) {
            return new Promise((resolve, reject) => {
                const img = new Image();

                img.onload = () => resolve(img);
                img.onerror = reject;

                img.src = src;
            });
        }

        this.displacement = {};
        this.displacement.canvas = document.createElement('canvas');
        this.displacement.canvas.width = 128;
        this.displacement.canvas.height = 128;

        this.displacement.context = this.displacement.canvas.getContext('2d');
        this.displacement.context.fillRect(0, 0, this.displacement.canvas.width, this.displacement.canvas.height);

        this.displacement.glowImage = await loadImage(assetUrl('images/glow.png'))

        this.displacement.interactPlane = new THREE.Mesh(
            new THREE.PlaneGeometry(10, 10),
            new THREE.MeshBasicMaterial({ color: 'red' })
        )
        this.displacement.interactPlane.visible = false;
        this.appInstance.scene.add(this.displacement.interactPlane);

        this.displacement.raycaster = new THREE.Raycaster();

        this.displacement.screenCursor = new THREE.Vector2(9999, 9999);
        this.displacement.canvasCursor = new THREE.Vector2(9999, 9999);

        addEventListener('pointermove', (event) => {
            this.displacement.screenCursor.x = (event.clientX / this.viewport.width) * 2 - 1;
            this.displacement.screenCursor.y = -(event.clientY / this.viewport.height) * 2 + 1;
        })

        this.displacement.texture = new THREE.CanvasTexture(this.displacement.canvas);

        this.setDisplacementInteraction();
    }

    setDisplacementInteraction() {
        this.appInstance.time.events.on('tick', () => {
            this.displacement.raycaster.setFromCamera(this.displacement.screenCursor, this.appInstance.camera);
            const interactions = this.displacement.raycaster.intersectObject(this.displacement.interactPlane);

            if (interactions.length) {
                const uv = interactions[0].uv;

                this.displacement.canvasCursor.x = uv.x * this.displacement.canvas.width;
                this.displacement.canvasCursor.y = uv.y * this.displacement.canvas.height;

                const glowSize = this.displacement.canvas.width * 0.10;

                this.displacement.context.globalCompositeOperation = 'lighten';
                this.displacement.context.globalAlpha = 1
                this.displacement.context.drawImage(
                    this.displacement.glowImage,
                    this.displacement.canvasCursor.x - glowSize * 0.5,
                    this.displacement.canvas.height - this.displacement.canvasCursor.y - glowSize * 0.5,
                    glowSize,
                    glowSize
                )

                // Rotation

                this.particlesTargetRotation.y = - (((this.displacement.canvasCursor.x / this.displacement.canvas.width) - 0.5) * Math.PI / 9);
                this.particlesTargetRotation.x = (((this.displacement.canvasCursor.y / this.displacement.canvas.height) - 0.5) * Math.PI / 9);
            } else {
                this.particlesTargetRotation.y = 0;
                this.particlesTargetRotation.x = 0;
            }

            this.displacement.context.globalCompositeOperation = 'source-over'
            this.displacement.context.globalAlpha = 0.02
            this.displacement.context.fillRect(0, 0, this.displacement.canvas.width, this.displacement.canvas.height)

            this.displacement.texture.needsUpdate = true

            if (this.particles.rotation.y !== this.particlesTargetRotation.y) {
                this.particles.rotation.y += (this.particlesTargetRotation.y - this.particles.rotation.y) * 0.05;
            }

            if (this.particles.rotation.x !== this.particlesTargetRotation.x) {
                this.particles.rotation.x += (this.particlesTargetRotation.x - this.particles.rotation.x) * 0.05;
            }
        })
    }
}
