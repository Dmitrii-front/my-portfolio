import { useFrame, useThree, type RootState } from "@react-three/fiber";
import { useEffect, useRef, useCallback } from "react";
import type { SceneProps } from "./scene-types";

// Install before the first draw, not in a child effect after Canvas has begun rendering.
export function useRendererGuard(onFailure: () => void) {
	const cleanup = useRef<(() => void) | undefined>(undefined);
	useEffect(() => () => cleanup.current?.(), []);
	return useCallback(
		({ gl }: RootState) => {
			const render = gl.render;
			gl.render = (...args) => {
				try {
					render.apply(gl, args);
				} catch {
					onFailure();
				}
			};
			const lost = (event: Event) => {
				event.preventDefault();
				onFailure();
			};
			gl.domElement.addEventListener("webglcontextlost", lost);
			cleanup.current = () => {
				gl.render = render;
				gl.domElement.removeEventListener("webglcontextlost", lost);
			};
		},
		[onFailure],
	);
}

export function SceneLifecycle({ onReady }: Pick<SceneProps, "onReady">) {
	const { gl, invalidate } = useThree();
	const first = useRef(true);
	const readyFrame = useRef(0);
	useEffect(() => {
		invalidate();
		return () => cancelAnimationFrame(readyFrame.current);
	}, [invalidate]);
	useFrame(() => {
		if (first.current) {
			first.current = false;
			readyFrame.current = requestAnimationFrame(() => {
				gl.domElement.dataset.triangles = String(gl.info.render.triangles);
				gl.domElement.dataset.drawCalls = String(gl.info.render.calls);
				onReady();
			});
		}
	});
	return null;
}

// The renderer itself is demand-driven. Only the visible Hub requests a 30Hz idle.
export function HubClock({
	visible,
	standard,
}: {
	visible: boolean;
	standard: boolean;
}) {
	const invalidate = useThree((state) => state.invalidate);
	useEffect(() => {
		let timer: ReturnType<typeof setInterval> | undefined;
		const update = () => {
			clearInterval(timer);
			if (visible && !document.hidden)
				timer = setInterval(invalidate, 1000 / (standard ? 15 : 30));
		};
		update();
		document.addEventListener("visibilitychange", update);
		return () => {
			clearInterval(timer);
			document.removeEventListener("visibilitychange", update);
		};
	}, [visible, standard, invalidate]);
	return null;
}

export function useScenePointer(host: HTMLElement, enabled: boolean) {
	const pointer = useRef({ x: 0, y: 0 });
	const invalidate = useThree((state) => state.invalidate);
	useEffect(() => {
		if (!enabled) return;
		const move = (event: PointerEvent) => {
			if (event.pointerType !== "mouse") return;
			const rect = host.getBoundingClientRect();
			pointer.current = {
				x: (event.clientX - rect.left) / rect.width - 0.5,
				y: (event.clientY - rect.top) / rect.height - 0.5,
			};
			invalidate();
		};
		const leave = () => {
			pointer.current = { x: 0, y: 0 };
			invalidate();
		};
		host.addEventListener("pointermove", move);
		host.addEventListener("pointerleave", leave);
		return () => {
			host.removeEventListener("pointermove", move);
			host.removeEventListener("pointerleave", leave);
		};
	}, [host, enabled, invalidate]);
	return pointer;
}
