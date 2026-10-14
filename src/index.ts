import { init as finit, exit as fexit, registerChatSurfaceProcessor } from './modules/handler';
import { init as vinit, exit as vexit } from './modules/command';
import { init as uinit, exit as uexit } from './modules/ui';
import { init as einit, exit as eexit } from './modules/exports';
import { init as cinit, exit as cexit } from './modules/code-editor';

interface PluginInfo {
    id: string;
    name: string;
    description: string;
}

interface Plugin {
    init: () => Promise<void>;
    exit: () => Promise<void>;
    info: PluginInfo;
}

export async function init() {
    await finit();
    await vinit();
    await uinit();
    await einit();
    await cinit();
    console.log('ST-Prompt-Template initialized');
}

export async function exit() {
    await fexit();
    await vexit();
    await uexit();
    await eexit();
    await cexit();
    console.log('ST-Prompt-Template exited');
}

export const info: PluginInfo = {
    id: 'ST-Prompt-Template',
    name: 'Prompt Template',
    description: '',
};

const plugin: Plugin = {
    init,
    exit,
    info,
};

export default plugin;

let initialization: Promise<void> | null = null;

function initOnce(): Promise<void> {
    initialization ??= init();
    return initialization;
}

/**
 * TauriTavern ChatSurface manifest hook (`hooks.chatSurface`).
 * TauriTavern only calls it with Chat DOM virtualization enabled, before the first chat projection.
 * Upstream SillyTavern ignores the hook and keeps the static DOM renderer.
 */
export async function registerChatSurface() {
    await initOnce();
    registerChatSurfaceProcessor();
}

// jQuery
$(async () => {
    await initOnce();
});
