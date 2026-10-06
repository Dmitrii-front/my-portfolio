import { RoundedBox } from "@react-three/drei/core/RoundedBox";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import {
	SRGBColorSpace,
	TextureLoader,
	type Texture,
	type Group,
	type MeshBasicMaterial,
	type InstancedMesh,
	Object3D,
} from "three";
import { sceneDpr } from "@/lib/scene-quality";
import {
	SceneLifecycle,
	useScenePointer,
	useRendererGuard,
} from "./scene-runtime";
import type { SceneProps } from "./scene-types";

function Keyboard() {
	const mesh = useRef<InstancedMesh>(null);
	useEffect(() => {
		if (!mesh.current) return;
		const key = new Object3D();
		for (let row = 0; row < 5; row++)
			for (let column = 0; column < 14; column++) {
				key.position.set((column - 6.5) * 0.385, 0.071, -0.91 + row * 0.22);
				key.updateMatrix();
				mesh.current.setMatrixAt(row * 14 + column, key.matrix);
			}
		mesh.current.instanceMatrix.needsUpdate = true;
	}, []);
	return (
		<instancedMesh ref={mesh} args={[undefined, undefined, 70]}>
			<boxGeometry args={[0.33, 0.018, 0.17]} />
			<meshStandardMaterial color="#111217" roughness={0.55} />
		</instancedMesh>
	);
}

function ScreenTexture({
	texture,
	aspect,
	visible,
}: {
	texture: Texture;
	aspect: number;
	visible: boolean;
}) {
	const previous = useRef(texture);
	const material = useRef<MeshBasicMaterial>(null);
	const start = useRef(0);
	const { invalidate } = useThree();
	const screenWidth = Math.min(6.12, 3.54 * aspect);
	useEffect(() => {
		if (material.current) material.current.map = texture;
		start.current = performance.now();
		invalidate();
	}, [texture, invalidate]);
	useFrame(() => {
		if (!material.current) return;
		const opacity = Math.min(1, (performance.now() - start.current) / 180);
		material.current.opacity = opacity;
		if (opacity < 1 && visible) invalidate();
		else previous.current = texture;
	});
	return (
		<group position={[0, 0.005, 0.056]}>
			<mesh>
				<planeGeometry args={[screenWidth, screenWidth / aspect]} />
				<meshBasicMaterial map={previous.current} toneMapped={false} />
			</mesh>
			<mesh position={[0, 0, 0.001]}>
				<planeGeometry args={[screenWidth, screenWidth / aspect]} />
				<meshBasicMaterial
					ref={material}
					map={texture}
					transparent
					toneMapped={false}
				/>
			</mesh>
		</group>
	);
}

function Laptop({ texture, ...props }: SceneProps & { texture: Texture }) {
	const group = useRef<Group>(null);
	const pointer = useScenePointer(props.host, props.quality === "high");
	const { invalidate, viewport } = useThree();
	useFrame(() => {
		if (!group.current || !props.visible) return;
		const targetX = -0.035 + pointer.current.y * 0.025;
		const targetY = -0.075 + pointer.current.x * 0.04;
		group.current.rotation.x += (targetX - group.current.rotation.x) * 0.14;
		group.current.rotation.y += (targetY - group.current.rotation.y) * 0.14;
		if (
			Math.abs(targetX - group.current.rotation.x) +
				Math.abs(targetY - group.current.rotation.y) >
			0.0003
		)
			invalidate();
	});
	const scale = Math.min(viewport.width / 7.35, viewport.height / 5.25);
	return (
		<group
			ref={group}
			scale={scale}
			position={[0, -0.25, 0]}
			rotation={[-0.09, -0.1, 0]}
		>
			{/* One project-owned laptop. 16:9-ish verified UI is contained, never stretched. */}
			<group position={[0, 0.65, -0.28]} rotation={[-0.1, 0, 0]}>
				<RoundedBox args={[6.42, 3.78, 0.075]} radius={0.035} smoothness={4}>
					<meshStandardMaterial
						color="#575963"
						metalness={0.8}
						roughness={0.3}
					/>
				</RoundedBox>
				<RoundedBox
					position={[0, 0, 0.036]}
					args={[6.31, 3.67, 0.025]}
					radius={0.012}
					smoothness={3}
				>
					<meshStandardMaterial color="#08090c" roughness={0.48} />
				</RoundedBox>
				<ScreenTexture
					texture={texture}
					aspect={props.screen?.aspect ?? 3454 / 1990}
					visible={props.visible}
				/>
				<mesh position={[0, 1.84, 0.055]}>
					<circleGeometry args={[0.018, 12]} />
					<meshBasicMaterial color="#2b303a" />
				</mesh>
			</group>
			<group position={[0, -1.36, 0.64]}>
				<RoundedBox args={[6.64, 0.12, 2.55]} radius={0.05} smoothness={4}>
					<meshStandardMaterial
						color="#575a64"
						metalness={0.78}
						roughness={0.3}
					/>
				</RoundedBox>
				{/* Keyboard deck is lightweight rows of keys, no external geometry/textures. */}
				<Keyboard />
				<RoundedBox
					position={[0, 0.072, 0.22]}
					args={[2.52, 0.012, 0.77]}
					radius={0.005}
					smoothness={2}
				>
					<meshStandardMaterial
						color="#4a4d57"
						metalness={0.7}
						roughness={0.4}
					/>
				</RoundedBox>
				<RoundedBox
					position={[0, 0.02, 1.277]}
					args={[0.95, 0.05, 0.009]}
					radius={0.004}
					smoothness={2}
				>
					<meshStandardMaterial
						color="#33353e"
						metalness={0.5}
						roughness={0.4}
					/>
				</RoundedBox>
			</group>
			<mesh position={[0, -1.26, -0.45]} rotation={[0, 0, Math.PI / 2]}>
				<cylinderGeometry args={[0.075, 0.075, 5.9, 12]} />
				<meshStandardMaterial
					color="#252730"
					metalness={0.65}
					roughness={0.32}
				/>
			</mesh>
		</group>
	);
}

function DeviceContents(props: SceneProps) {
	const [texture, setTexture] = useState<Texture>();
	const cache = useRef(new Map<string, Texture>());
	const alive = useRef(true);
	const { invalidate, gl } = useThree();
	const base = props.screen?.base;
	const width = props.host.clientWidth < 500 ? 640 : 1280;
	useEffect(() => {
		if (!base) return;
		let cancelled = false;
		const url = `${base}-${width}.webp`;
		const cached = cache.current.get(url);
		if (cached) {
			setTexture(cached);
			gl.domElement.dataset.texture = url;
			invalidate();
			return;
		}
		new TextureLoader().load(
			url,
			(next) => {
				if (!alive.current) {
					next.dispose();
					return;
				}
				next.colorSpace = SRGBColorSpace;
				next.anisotropy = Math.min(4, gl.capabilities.getMaxAnisotropy());
				cache.current.set(url, next);
				if (!cancelled) {
					setTexture(next);
					gl.domElement.dataset.texture = url;
					invalidate();
				}
			},
			undefined,
			() => {
				if (!cancelled) props.onFailure();
			},
		);
		return () => {
			cancelled = true;
		};
	}, [base, width, invalidate, gl, props.onFailure]);
	useEffect(() => {
		const textures = cache.current;
		alive.current = true;
		return () => {
			alive.current = false;
			for (const item of textures.values()) item.dispose();
			textures.clear();
		};
	}, []);
	return (
		<>
			<ambientLight intensity={0.8} />
			<directionalLight position={[-4, 5, 6]} intensity={3.2} color="#d3d9ef" />
			<directionalLight position={[5, 1, -2]} intensity={1.8} color="#a18aca" />
			<directionalLight
				position={[-4, -1, 3]}
				intensity={0.7}
				color="#7aa7ff"
			/>
			{texture && (
				<>
					<Laptop {...props} texture={texture} />
					<SceneLifecycle onReady={props.onReady} />
				</>
			)}
		</>
	);
}

export default function DeviceScene(props: SceneProps) {
	const guard = useRendererGuard(props.onFailure);
	return (
		<Canvas
			onCreated={guard}
			style={{ pointerEvents: "none" }}
			camera={{ position: [0, 1.7, 10.8], fov: 30, near: 0.1, far: 40 }}
			frameloop="demand"
			dpr={[1, sceneDpr(props.quality)]}
			gl={{
				alpha: true,
				antialias: props.quality === "high",
				powerPreference: "low-power",
			}}
			fallback={null}
		>
			<DeviceContents {...props} />
		</Canvas>
	);
}
