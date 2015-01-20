/*jslint nomen: true, vars: true */
/*global define, brackets, $*/

define(function (require, exports, module) {

	'use strict';

	// Brackets modules
	var AppInit			= brackets.getModule('utils/AppInit'),
		EditorManager	= brackets.getModule('editor/EditorManager'),
		KeyEvent		= brackets.getModule('utils/KeyEvent');

	function _indent(editor, event) {
		var document = editor.document,
			cursorPos = editor.getCursorPos(),
			lineContent = document.getLine(cursorPos.line),
			matches = lineContent.match(/^[ \t]*/);

		document.replaceRange('\n' + matches[0], cursorPos, cursorPos);
		event.preventDefault();
	}

	function _keyEventHandler($event, editor, event) {
		if (event.keyCode === KeyEvent.DOM_VK_RETURN)
			_indent(editor, event);
	}

	function _activeEditorChangeHandler($event, focusedEditor, lostEditor) {
		if (lostEditor)
			$(lostEditor).off('keydown', _keyEventHandler);
		if (focusedEditor)
			$(focusedEditor).on('keydown', _keyEventHandler);
	}

	AppInit.appReady(function () {
		var currentEditor = EditorManager.getActiveEditor();
		$(currentEditor).on('keydown', _keyEventHandler);
		$(EditorManager).on('activeEditorChange', _activeEditorChangeHandler);
	});
});