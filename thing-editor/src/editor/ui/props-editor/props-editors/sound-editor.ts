import type { ComponentChild } from 'preact';
import fs, { AssetType } from 'thing-editor/src/editor/fs';
import R from 'thing-editor/src/editor/preact-fabrics';
import type { EditablePropertyDesc } from 'thing-editor/src/editor/props-editor/editable';
import type { ContextMenuItem } from 'thing-editor/src/editor/ui/context-menu';
import showContextMenu from 'thing-editor/src/editor/ui/context-menu';
import type { EditablePropertyEditorProps } from 'thing-editor/src/editor/ui/props-editor/props-field-wrapper';
import copyTextByClick from 'thing-editor/src/editor/utils/copy-text-by-click';
import game from 'thing-editor/src/engine/game';

const soundEditorProps = { className: 'asset-editor' };

let assetNameProps = {
	className: 'selectable-text',
	title: 'Ctrl+click to copy sound`s name',
	onMouseDown: copyTextByClick
};

const SoundEditor = (props: EditablePropertyEditorProps): ComponentChild => {
	const file = props.value && fs.getFileByAssetName(props.value, AssetType.SOUND);
	return R.div(soundEditorProps,
		R.btn(props.value ? R.span(assetNameProps, props.value) : '. . .', () => {
			game.editor.chooseSound('Select "' + props.field.name + '" sound', props.value).then((selectedSound) => {
				if (selectedSound) {
					props.onChange(selectedSound);
					game.editor.history.scheduleHistorySave();
				}
			});
		}, props.value, (!props.value || file) ? 'choose-asset-button' : 'choose-asset-button danger'),
		props.value ? R.btn(R.icon('asset-sound'), () => {
			game.editor.previewSound(props.value);
		}, 'Play', 'tool-button') : undefined,
		props.value ? R.btn(R.icon('reject'), (ev: PointerEvent) => {
			showContextMenu([
				{
					name: R.fragment(R.icon('reject'), 'Clear \'' + props.field.name + '\''),
					onClick: () => {
						props.onChange(null);
					}
				},
				{
					name: 'Cancel',
					onClick: () => { } // eslint-disable-line @typescript-eslint/no-empty-function
				}
			], ev);
		}, 'Clear', 'tool-button') : undefined
	);
};

SoundEditor.parser = (val: string) => {
	return val || null;
};

SoundEditor.contextMenuInjection = (contextMenu: ContextMenuItem[], _field:EditablePropertyDesc, _clickedValue:any, _value:any) => {
	if (_clickedValue) {
		contextMenu.splice(contextMenu.indexOf(null) + 1, 0, {
			name: 'Reveal In Explorer',
			onClick: () => {
				const file = fs.getFileByAssetName(_clickedValue, AssetType.SOUND);
				if (file) {
					fs.showFile(file.fileName);
				}
			}
		});
	}
};

export default SoundEditor;
