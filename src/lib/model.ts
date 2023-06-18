import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Scene } from 'three';

export function loadGLTFModel(
  scene: Scene,
  glbPath: string,
  options: { receiveShadow?: boolean; castShadow?: boolean } = {
    receiveShadow: true,
    castShadow: true
  }
): Promise<THREE.Object3D> {
  const { receiveShadow, castShadow } = options;
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();

    loader.load(
      glbPath,
      gltf => {
        const obj = gltf.scene;
        obj.name = 'dog';
        obj.position.y = 0;
        obj.position.x = 0;
        obj.receiveShadow = receiveShadow ?? false;
        obj.castShadow = castShadow ?? false;

        scene.add(obj);

        obj.traverse(function (child) {
          if ((child as THREE.Mesh).isMesh)  {
            child.castShadow = castShadow || false;
            child.receiveShadow = receiveShadow || false;
          }
        });
        resolve(obj);
      },
      undefined,
      function (error) {
        reject(error);
      }
    );
  });
}
