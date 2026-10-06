"use client";
import {
	Component,
	lazy,
	Suspense,
	useEffect,
	useState,
	useCallback,
	type ReactNode,
	type RefObject,
} from "react";
import { browserSceneQuality, type SceneQuality } from "@/lib/scene-quality";
import type { SceneProps } from "./scene-types";

// These imports are never requested by SSR, unsupported visitors or until near the scene.
const HubScene = lazy(() => import("./hub-scene"));
const DeviceScene = lazy(() => import("./device-scene"));

class SceneErrorBoundary extends Component<
	{ children: ReactNode; onFailure: () => void },
	{ failed: boolean }
> {
	state = { failed: false };
	static getDerivedStateFromError() {
		return { failed: true };
	}
	componentDidCatch() {
		this.props.onFailure();
	}
	render() {
		return this.state.failed ? null : this.props.children;
	}
}

export function Enhancement({
	hostRef,
	scene,
	...sceneProps
}: {
	hostRef: RefObject<HTMLElement | null>;
	scene: "hub" | "device";
} & Pick<SceneProps, "active" | "expanded" | "screen" | "device">) {
	const [quality, setQuality] = useState<SceneQuality>("fallback");
	const [loaded, setLoaded] = useState(false);
	const [visible, setVisible] = useState(false);
	const [ready, setReady] = useState(false);
	const [failed, setFailed] = useState(false);
	const onFailure = useCallback(() => {
		setFailed(true);
		setReady(false);
	}, []);
	const onReady = useCallback(() => {
		setReady(true);
		performance.mark(`${scene}-3d-ready`);
	}, [scene]);
	useEffect(() => {
		const host = hostRef.current;
		if (!host) return;
		const update = () => {
			const next = browserSceneQuality();
			if (next === "fallback") setReady(false);
			setQuality(next);
		};
		update();
		const media = matchMedia("(prefers-reduced-motion: reduce)");
		media.addEventListener("change", update);
		window.addEventListener("resize", update);
		return () => {
			media.removeEventListener("change", update);
			window.removeEventListener("resize", update);
		};
	}, [hostRef]);
	useEffect(() => {
		const host = hostRef.current;
		if (!host || quality === "fallback") return;
		let timer: ReturnType<typeof setTimeout> | undefined;
		const near = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting && !timer && !loaded) {
					// Let the essential route settle; do not prefetch Three from route HTML.
					timer = setTimeout(() => {
						performance.mark(`${scene}-3d-request`);
						setLoaded(true);
					}, 1500);
				} else if (!entry.isIntersecting) {
					clearTimeout(timer);
					timer = undefined;
				}
			},
			{ rootMargin: scene === "device" ? "200px" : "0px" },
		);
		const visibility = new IntersectionObserver(([entry]) =>
			setVisible(entry.isIntersecting),
		);
		near.observe(host);
		visibility.observe(host);
		return () => {
			near.disconnect();
			visibility.disconnect();
			clearTimeout(timer);
		};
	}, [hostRef, quality, scene, loaded]);
	const modelSupported =
		scene === "hub" ||
		sceneProps.device == null ||
		sceneProps.device === "MacBook";
	useEffect(() => {
		if (!modelSupported) setReady(false);
	}, [modelSupported]);
	const enabled =
		quality !== "fallback" &&
		modelSupported &&
		!failed &&
		loaded &&
		hostRef.current;
	const state = failed
		? "failed"
		: quality === "fallback" || !modelSupported
			? "fallback"
			: ready
				? "ready"
				: "pending";
	const Scene = scene === "hub" ? HubScene : DeviceScene;
	return (
		<div
			className="scene-enhancement"
			data-scene={scene}
			data-quality={quality}
			data-state={state}
			aria-hidden="true"
		>
			{enabled && (
				<SceneErrorBoundary onFailure={onFailure}>
					<Suspense fallback={null}>
						<Scene
							{...sceneProps}
							host={enabled}
							quality={quality as Exclude<SceneQuality, "fallback">}
							visible={
								visible && (scene !== "device" || Boolean(sceneProps.screen))
							}
							onFailure={onFailure}
							onReady={onReady}
						/>
					</Suspense>
				</SceneErrorBoundary>
			)}
		</div>
	);
}
