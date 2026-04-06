import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

import gsap from 'gsap';

import AnimationTracker from './utils/AnimationTracker';
import Time from './utils/Time';
import Viewport from './utils/Viewport';
import World from './world';
import Mathematics from './mathematics/index.js';

export default class Application {
    static getInstance(_options) {
        if (!Application.instance)
            new Application(_options)

        return Application.instance;
    }

    constructor() {
        Application.instance = this;
    }

    async createMathsPage(_options) {
        this.$canvas = _options.$canvas;

        this.scene = new THREE.Scene();

        this.time = new Time();
        this.viewport = new Viewport(this.$canvas)

        // this.scene.add(new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial()))

        this.setRenderer();
        this.setPerspectiveCamera();
        // this.setOrbitControls();

        this.setMathematicsPage();

        this.setTick();
        this.setResize();
    }

    async HomeSetup(_options) {
        this.homeSetUp = true;
        this.$canvas = _options.$canvas;
        this.animationState = false;
        this.animationSetup = false;

        this.scene = new THREE.Scene();

        this.time = new Time();
        this.viewport = new Viewport(this.$canvas);

        this.setRenderer();
        this.setCamera();

        this.setWorld();

        this.animationTrack = AnimationTracker.getInstance()

        this.setTick();
        this.setResize();

        this.time.events.on('tick', () => console.log('tick'))
    }

    setRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.$canvas,
            alpha: true,
            powerPreference: 'high-performance',
        })

        this.renderer.setClearColor(0x000000, 0);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(2);
    }

    setOrbitControls() {
        const controls = new OrbitControls(this.camera, this.$canvas)
        controls.enableRotate = true
        controls.enableZoom = false
        controls.minPolarAngle = Math.PI * 5 / 11
        controls.maxPolarAngle = Math.PI * 6 / 11
        controls.minAzimuthAngle = -Math.PI * 1 / 11
        controls.maxAzimuthAngle = Math.PI * 1 / 11
        controls.enablePan = false
        controls.enableDamping = true
    }

    setMathematicsPage() {
        this.mathematicsComponent = new Mathematics();
    }

    setCamera() {
        const aspect = this.viewport.ratio;
        this.frustumSize = 6;

        this.camera = new THREE.OrthographicCamera(
            (-this.frustumSize * aspect) / 2,
            (this.frustumSize * aspect) / 2,
            this.frustumSize / 2,
            -this.frustumSize / 2,
            0.1, 100
        );

        this.camera.position.set(0, 0, 10);
        this.camera.lookAt(0, 0, 0);

        this.viewport.events.on('resize', () => {
            const aspect = this.viewport.ratio;

            this.camera.left = (-this.frustumSize * aspect) / 2;
            this.camera.right = (this.frustumSize * aspect) / 2;
            this.camera.top = this.frustumSize / 2;
            this.camera.bottom = -this.frustumSize / 2;

            this.camera.updateProjectionMatrix();
        })
    }

    setPerspectiveCamera() {
        this.camera = new THREE.PerspectiveCamera(40, this.viewport.width / this.viewport.height, 1, 100);
        this.camera.position.set(0, 0, 15);
        this.scene.add(this.camera);

        this.viewport.events.on('resize', () => {
            this.camera.aspect = this.viewport.width / this.viewport.height;
            this.camera.updateProjectionMatrix();
        })
    }

    setTick() {
        this.time.events.on('tick', () => {
            this.renderer.render(this.scene, this.camera);

            // console.log(this.camera.position.x.toFixed(2), this.camera.position.y.toFixed(2), this.camera.position.z.toFixed(2))

            if (this.animationSetup && this.homeSetUp) {
                this.heroTimeline.progress(this.animationTrack.animationEvents['HEROIN'])
                this.rotateTimeline.progress(this.animationTrack.animationEvents['JOURNEYIN'])
                this.aboutTimeline.progress(this.animationTrack.animationEvents['ABOUTIN'])
            }
        })
    }

    setResize() {
        this.viewport.events.on('resize', () => {
            this.renderer.setSize(this.viewport.width, this.viewport.height);
        })
    }

    setWorld() {
        this.world = new World();

        this.scene.add(this.world.scene)
    }

    setAnimation(_state) {
        this.animationState = _state;

        if (this.animationState) {
            const introTimeline = gsap.timeline();

            introTimeline.to(this.world.meshCol.position, {
                y: -0.5,
                duration: 1,
            })

            // introTimeline.to(
            //     this.world.wireframeMesh.children.map(child => child.material),
            //     {
            //         opacity: 1,
            //         duration: 1,
            //         ease: "power2.out"
            //     },
            //     "<"
            // )

            introTimeline.to(this.world.meshCol.rotation, {
                z: Math.PI / 4,
                duration: 1,
                ease: 'power2.inOut'
            }, "<")

            this.cameraTarget = new THREE.Vector3(0, 0, 0);

            this.heroTimeline = gsap.timeline()
                .to(this.world.meshCol.position, { y: 0, duration: 0.2 },)
                .to(this.world.meshCol.rotation, { z: 0, duration: 0.2 }, "<")
            this.heroTimeline.pause()

            this.rotateTimeline = gsap.timeline()
                .to(this.world.wireframeMesh.children.map(child => child.material), { opacity: 0, duration: 0.01, ease: 'power2.in' })
                .to({}, { duration: 0.5 - 0.01 })
                .to(this.world.mesh.material, { opacity: 1, duration: 0.3 })
                // .to(this.world.meshCol.rotation, { x: -Math.PI / 2, duration: 0.3 }, "<")
                .to(this.world.mesh.position, { y: 0, duration: 0.3, ease: 'power2.out' }, "<")
                // .to(this.world.meshCol.position, { x: this.camera.left / 2, duration: 0.2})
                .to({}, { duration: 0.2 })
            this.rotateTimeline.pause()

            this.aboutTimeline = gsap.timeline()
                .to(this.world.meshCol.position, { y: 1.2, duration: 1 })
                .to(this.world.meshCol.rotation, { x: Math.PI / 3, y: Math.PI / 5, z: Math.PI / 3.5, duration: 1, ease: 'power2.inOut' }, "<")
            this.aboutTimeline.pause()

            this.animationSetup = true;
        }
    }

    destructor() {
        // this.time.events.off('tick')
        // this.renderer.dispose();
    }
}
