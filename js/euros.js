addLayer("e", {
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},
    color: "#3bd9a1",
    resource: "euros",
	symbol: "E",
    row: 3,
    baseResource: "points",
    baseAmount() { return player.points },
    requires: new Decimal(10),
    type: "custom",
    exponent: 0.5,
    gainMult() {
        return new Decimal(1)
    },
    gainExp() {
        return new Decimal(1)
    },
	getResetGain() {
		return new Decimal(10)
	},
	getNextAt(canMax=false) {
		return new Decimal(1300)
	},
	canReset() {return player.t.level.gte(1300)},
	prestigeButtonText() {
		return "Reset for <b>+10</b> euros"
	},
    layerShown() { return hasAchievement("ach",36) },
	tabFormat: [
		"main-display",
		"prestige-button",
		["display-text", "Base euro gain is always 10! (EUROS UNFINISHED)"],
	],
})