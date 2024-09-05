// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import path from "node:path";
import * as vscode from "vscode";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "react-native-web-platform-extension-headsup" is now active!'
  );

  vscode.window.onDidChangeActiveTextEditor((editor) => {
    if (editor && editor.document) {
      const document = editor.document;
      const fileName = path.basename(document.fileName);
      const baseName = fileName.replace(/\.[^.]+$/, ""); // Remove extension
      const dirName = path.dirname(document.fileName);

      const platformExtensions = [
        "web.tsx",
        "ios.tsx",
        "android.tsx",
        "native.tsx",
        "web.ts",
        "ios.ts",
        "android.ts",
      ];

      platformExtensions.forEach((extension) => {
        const platformSpecificFile = path.join(
          dirName,
          `${baseName}.${extension}`
        );

        vscode.workspace.fs.stat(vscode.Uri.file(platformSpecificFile)).then(
          () => {
            vscode.window.showWarningMessage(
              `Platform-specific file detected: ${baseName}.${extension}`
            );
          },
          () => {
            // File doesn't exist, no action required
          }
        );
      });
    }
  });
}

// This method is called when your extension is deactivated
export function deactivate() {}
