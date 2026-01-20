import {App, PluginSettingTab, Setting} from "obsidian";
import MyPlugin from "./main";

export type TickerSpeed = "fast" | "slow" | "medium";

export interface MyPluginSettings {
	mySetting: string;
	tickerSpeed: TickerSpeed;
	stockChangeColor: string;
	stockPriceColor: string;
}

export const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: 'default',
	tickerSpeed: "slow",
	stockChangeColor: "",
	stockPriceColor: ""
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
			.setDesc('Choose how fast the ticker scrolls. The speed depends on the element width, the longer the width, the longer it takes to scroll across.')
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
			.setName('Stock change color')
			.setDesc('Use any hex color. Leave blank to use the theme default.')
			.addText(text => text
				.setPlaceholder('e.g. #22c55e')
				.setValue(this.plugin.settings.stockChangeColor)
				.onChange(async (value) => {
					this.plugin.settings.stockChangeColor = value.trim();
					await this.plugin.saveSettings();
					this.plugin.updateTickerColors();
				}));

		new Setting(containerEl)
			.setName('Stock price color')
			.setDesc('Use any hex color. Leave blank to use the theme default.')
			.addText(text => text
				.setPlaceholder('e.g. #94a3b8')
				.setValue(this.plugin.settings.stockPriceColor)
				.onChange(async (value) => {
					this.plugin.settings.stockPriceColor = value.trim();
					await this.plugin.saveSettings();
					this.plugin.updateTickerColors();
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
