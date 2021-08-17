import * as vscode from 'vscode';
import { allow_match_map } from './config';
import { handler } from './handler';

export function activate(context: vscode.ExtensionContext) {
	const removeConsole = vscode.commands.registerCommand('clear.removeConsole', (params) => {
		const isSuccess: boolean = handler(params.fsPath, allow_match_map.get('console'));
        if (isSuccess) {
          vscode.window.showInformationMessage('remove console success!');
        } else {
          vscode.window.showErrorMessage('remove console failed!');
        }
	});
	const removeDebugger = vscode.commands.registerCommand('clear.removeDebugger', (params) => {
		const isSuccess: boolean = handler(params.fsPath, allow_match_map.get('debugger'));
        if (isSuccess) {
          vscode.window.showInformationMessage('remove debugger success!');
        } else {
          vscode.window.showErrorMessage('remove debugger failed!');
        }
	});
	context.subscriptions.push(removeConsole, removeDebugger);
}

export function deactivate() {}
