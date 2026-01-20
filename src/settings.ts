import {App, PluginSettingTab, Setting} from "obsidian";
import MyPlugin from "./main";

export type TickerSpeed = "fast" | "slow" | "medium";

export interface MyPluginSettings {
	mySetting: string;
	tickerSpeed: TickerSpeed;
}

export const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: 'default',
	tickerSpeed: "slow"
}

export class SampleSettingTab extends PluginSettingTab {
	plugin: MyPlugin;

	constructor(app: App, plugin: MyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Ticker speed')
			.setDesc('Choose how fast the ticker scrolls.')
			.addDropdown(dropdown => dropdown
				.addOption("slow", "Slow")
				.addOption("medium", "Medium")
				.addOption("fast", "Fast")
				.setValue(this.plugin.settings.tickerSpeed)
				.onChange(async (value) => {
					if (value !== "slow" && value !== "fast" && value !== "medium") {
						return;
					}
					this.plugin.settings.tickerSpeed = value;
					await this.plugin.saveSettings();
					this.plugin.updateTickerSpeed();
				}));

		new Setting(containerEl)
			.setName('Settings #1')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue(this.plugin.settings.mySetting)
				.onChange(async (value) => {
					this.plugin.settings.mySetting = value;
					await this.plugin.saveSettings();
				}));
	}
}
