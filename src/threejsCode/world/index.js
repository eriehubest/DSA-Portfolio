import Application from "../Application";

import * as THREE from 'three';

const assetUrl = (path) =>
    `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

export default class World {
    constructor() {
        this.app = Application.getInstance();

        this.scene = new THREE.Object3D();

        this.setObjects();
        this.setLighting();
    }

    setObjects() {
        const geo = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1)
        const mat = new THREE.MeshStandardMaterial({
            wireframe: true,
            color: 0x000000,
            opacity: 0,
            transparent: true,
            depthWrite: false
        })

        this.wireframeMesh1 = new THREE.Mesh(geo, mat)
        this.wireframeMesh2 = new THREE.Mesh(geo, mat)
        this.wireframeMesh3 = new THREE.Mesh(geo, mat)
        this.wireframeMesh4 = new THREE.Mesh(geo, mat)

        // centers spaced by 1 so cubes touch (since size is 1)
        this.wireframeMesh1.position.set(0.5, 0.5, 0)
        this.wireframeMesh2.position.set(-0.5, 0.5, 0)
        this.wireframeMesh3.position.set(-0.5, -0.5, 0)
        this.wireframeMesh4.position.set(0.5, -0.5, 0)

        this.wireframeMesh = new THREE.Object3D()
        this.wireframeMesh.add(
            this.wireframeMesh1,
            this.wireframeMesh2,
            this.wireframeMesh3,
            this.wireframeMesh4
        )

        const textureLoader = new THREE.TextureLoader();

        function createStandardMaterial(options = {}) {
            return new THREE.MeshStandardMaterial({
                color: 0xffffff,
                ...options
            });
        }

        const pngTexture = textureLoader.load(assetUrl("images/eric2.png"));
        const raymondTexture = textureLoader.load(assetUrl("images/Raymond.png"));
        pngTexture.colorSpace = THREE.SRGBColorSpace;
        raymondTexture.colorSpace = THREE.SRGBColorSpace;

        const pngMaterials = Array.from({ length: 6 }, (_, index) => {
            if (index === 3) {
                return createStandardMaterial({ map: pngTexture, opacity: 0, transparent: true });
            }
            return createStandardMaterial({ map: pngTexture, opacity: 0, transparent: true, wireframe: false, color: 0xffffff });
        });

        this.mesh = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), pngMaterials)
        this.mesh.position.set(0, 3, 0)
        this.meshCol = new THREE.Group();
        this.meshCol.add(this.wireframeMesh, this.mesh)
        this.meshCol.position.set(0, 0.8, 0)

        this.scene.add(this.meshCol)
    }

    setLighting() {
        this.ambientLight = new THREE.AmbientLight(0xffffff, 1)
        const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
        directionalLight.position.set(0, 10, 10);

        this.scene.add(this.ambientLight, directionalLight);
    }
}
