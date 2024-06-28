// thing-editor auto generated file.
import type Container from 'thing-editor/src/engine/lib/assets/src/basic/container.c';
import type MovieClip from 'thing-editor/src/engine/lib/assets/src/basic/movie-clip.c';
import type ParticleShort from 'thing-editor/src/engine/lib/assets/src/custom/particle-short.c';
import type Resizer from 'thing-editor/src/engine/lib/assets/src/extended/resizer.c';
export default class TLib {
	static loadPrefab(prefabName: 'fader/default'):Container;
	static loadPrefab(prefabName: 'final-fader'):MovieClip;
	static loadPrefab(prefabName: 'particle-green'):ParticleShort;
	static loadPrefab(prefabName: 'ui/sure-question'):Resizer;
	static loadPrefab(prefabName: string): Container;
	static loadPrefab(prefabName: string): Container {
		return prefabName as any;
	}
}
