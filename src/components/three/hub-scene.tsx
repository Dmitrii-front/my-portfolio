import { RoundedBox } from "@react-three/drei/core/RoundedBox";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import type { Group } from "three";
import { sceneDpr } from "@/lib/scene-quality";
import {
	HubClock,
	SceneLifecycle,
	useScenePointer,
	useRendererGuard,
} from "./scene-runtime";
import type { SceneProps } from "./scene-types";

type Module = {
	id: string;
	x: number;
	y: number;
	width: number;
	height: number;
};
function Modules({ host, quality, active, expanded, onReady }: SceneProps) {
	const [modules, setModules] = useState<Module[]>([]);
	const group = useRef<Group>(null);
	const pointer = useScenePointer(host, quality === "high");
	useEffect(() => {
		const measure = () => {
			const stage = host.getBoundingClientRect();
			setModules(
				Array.from(host.querySelectorAll<HTMLButtonElement>(".hub-node")).map(
					(button) => {
						// offset geometry excludes the approved DOM hover/expanded transforms.
						return {
							id:
								button.className
									.split(" ")
									.find((name) => name !== "hub-node")
									?.replace("hub-", "") ?? "",
							x: button.offsetLeft + button.offsetWidth / 2 - stage.width / 2,
							y: stage.height / 2 - button.offsetTop - button.offsetHeight / 2,
							width: button.offsetWidth,
							height: button.offsetHeight,
						};
					},
				),
			);
		};
		measure();
		const observer = new ResizeObserver(measure);
		observer.observe(host);
		return () => observer.disconnect();
	}, [host]);
	useFrame(({ clock }) => {
		if (!group.current) return;
		const time = clock.elapsedTime;
		group.current.children.forEach((child, index) => {
			if (!modules[index]) return;
			child.position.y =
				modules[index].y +
				(expanded && modules[index].id !== "products" ? 10 : 0) +
				Math.sin(time * 0.55 + index) * 0.8;
			child.position.z = Math.sin(time * 0.55 + index) * 1.2;
			child.rotation.x = 0.22 + pointer.current.y * 0.035;
			child.rotation.y =
				-0.18 + Math.sin(time * 0.3 + index) * 0.012 + pointer.current.x * 0.04;
		});
	});
	return (
		<group ref={group}>
			{modules.map((module) => {
				const lit = active === module.id || module.id === "products";
				return (
					<group
						key={module.id}
						position={[
							module.x,
							module.y + (expanded && module.id !== "products" ? 10 : 0),
							0,
						]}
					>
						<RoundedBox
							args={[module.width, module.height, 16]}
							radius={6}
							smoothness={3}
						>
							<meshStandardMaterial
								color={lit ? "#343040" : "#23232d"}
								metalness={0.35}
								roughness={0.36}
							/>
						</RoundedBox>
						<RoundedBox
							position={[0, 0, 0.8]}
							args={[module.width - 1.8, module.height - 1.8, 15]}
							radius={6}
							smoothness={3}
						>
							<meshStandardMaterial
								color={lit ? "#29252f" : "#202127"}
								emissive={module.id === "ai" ? "#416ba5" : "#8462cc"}
								emissiveIntensity={lit ? 0.055 : 0.018}
								metalness={0.2}
								roughness={0.48}
							/>
						</RoundedBox>
					</group>
				);
			})}
			{modules.length > 0 && <SceneLifecycle onReady={onReady} />}
		</group>
	);
}

export default function HubScene(props: SceneProps) {
	const guard = useRendererGuard(props.onFailure);
	return (
		<Canvas
			onCreated={guard}
			style={{ pointerEvents: "none" }}
			orthographic
			camera={{ position: [0, 0, 500], zoom: 1, near: 0.1, far: 1000 }}
			frameloop="demand"
			dpr={[1, sceneDpr(props.quality)]}
			gl={{
				alpha: true,
				antialias: props.quality === "high",
				powerPreference: "low-power",
			}}
			fallback={null}
		>
			<ambientLight intensity={0.9} />
			<directionalLight
				position={[-100, 200, 180]}
				intensity={3}
				color="#bec4e0"
			/>
			<directionalLight
				position={[180, -80, 120]}
				intensity={1.4}
				color="#8774c2"
			/>
			<Modules {...props} />
			<HubClock
				visible={props.visible}
				standard={props.quality === "standard"}
			/>
		</Canvas>
	);
}
