export type SceneQuality = "high" | "standard" | "fallback";
export type CapabilitySignals = {
	webgl: boolean;
	reducedMotion: boolean;
	saveData: boolean;
	cores?: number;
	memory?: number;
	finePointer: boolean;
	width: number;
};
export function sceneQuality(signals: CapabilitySignals): SceneQuality {
	if (
		!signals.webgl ||
		signals.reducedMotion ||
		signals.saveData ||
		(signals.cores !== undefined && signals.cores <= 2) ||
		(signals.memory !== undefined && signals.memory <= 2)
	)
		return "fallback";
	return signals.finePointer &&
		signals.width >= 1200 &&
		(signals.cores ?? 0) >= 8
		? "high"
		: "standard";
}
export const sceneDpr = (quality: SceneQuality) =>
	quality === "high" ? 1.5 : 1;

let webglAvailable: boolean | undefined;
export function browserSceneQuality(): SceneQuality {
	const hints = navigator as Navigator & {
		deviceMemory?: number;
		connection?: { saveData?: boolean };
	};
	const signals: CapabilitySignals = {
		webgl: true,
		reducedMotion: matchMedia("(prefers-reduced-motion: reduce)").matches,
		saveData: hints.connection?.saveData ?? false,
		cores: navigator.hardwareConcurrency || undefined,
		memory: hints.deviceMemory,
		finePointer: matchMedia("(hover: hover) and (pointer: fine)").matches,
		width: window.innerWidth,
	};
	// Do not allocate even a probe context when a cheap signal already constrains the visit.
	if (sceneQuality(signals) === "fallback") return "fallback";
	if (webglAvailable === undefined) {
		try {
			const context = document.createElement("canvas").getContext("webgl2");
			webglAvailable = Boolean(context);
			context?.getExtension("WEBGL_lose_context")?.loseContext();
		} catch {
			webglAvailable = false;
		}
	}
	return sceneQuality({ ...signals, webgl: webglAvailable });
}
