import type { SceneQuality } from "@/lib/scene-quality";
import type { ShowcaseDevice } from "@/lib/home-content";
export type SceneProps = {
	host: HTMLElement;
	quality: Exclude<SceneQuality, "fallback">;
	visible: boolean;
	onReady: () => void;
	onFailure: () => void;
	active?: string | null;
	expanded?: boolean;
	screen?: { base: string; aspect: number };
	device?: ShowcaseDevice | null;
};
