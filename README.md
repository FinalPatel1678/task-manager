# taskManager

> Version: 2.0.0

## Install

This project uses VS Code devcontainers to ensure the development environment is always consistent.  
You'll need to ensure you have Docker available on your machine before working with taskManager.

1. Clone the [repo]() with `git clone `
2. Open the workspace in VS Code
3. You should be propmpted to re-open the workspace in Docker. If not, ensure you have the [dev containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension installed.
4. If this is your first time running the project, wait for the container to initialise. Subsequent loads will be faster.
5. Once the environment has started, install with `yarn`

You're now ready to develop taskManager.

## Common Commands

The most common commands are made available in the top level [package.json](./package.json)

| Command             | Action                                  |
| ------------------- | --------------------------------------- |
| `yarn frontend:start` | Starts the taskManager front-end locally |
