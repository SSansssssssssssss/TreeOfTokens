addLayer("ach", {
    name: "Achievements", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "ACH", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#dbd21d",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "tokens collected", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
	achievements: {
		11: {
			name: "first of first",
			tooltip: "collect 1 token",
			done() {return player.ach.points.gte(1)},
			image: "resources/ach1.png",
		},
		12: {
			name: "10 times",
			tooltip: "collect 10 tokens",
			done() {return player.ach.points.gte(10)},
			image: "resources/ach2.png",
		},
		13: {
			name: "the big 50",
			tooltip: "collect 50 tokens",
			done() {return player.ach.points.gte(50)},
			image: "resources/ach3.png",
		},
		14: {
			name: "100...th",
			tooltip: "collect 100 tokens",
			done() {return player.ach.points.gte(100)},
			image: "resources/ach4.png",
		},
		15: {
			name: "useless",
			tooltip: "collect 200 tokens",
			done() {return player.ach.points.gte(200)},
			image: "resources/ach5.png",
		},
		16: {
			name: "500 cents",
			tooltip: "collect 500 tokens",
			done() {return player.ach.points.gte(500)},
			image: "resources/ach6.png",
		},
		21: {
			name: "wow!",
			tooltip: "get to level 5",
			done() {return player.t.level.gte(5)},
			image: "resources/ach7.png",
		},
		22: {
			name: "overflow",
			tooltip: "get to level 25",
			done() {return player.t.level.gte(25)},
			image: "resources/ach8.png",
		},
		23: {
			name: "albert tokstein",
			tooltip: "get to level 100",
			done() {return player.t.level.gte(105)},
			image: "resources/ach9.png",
		},
		24: {
			name: "use.",
			tooltip: "have 1 golden token",
			done() {return player.gt.points.gte(1)},
			image: "resources/ach10.png",
		},
		25: {
			name: "geometry dash",
			tooltip: "get your first ability token",
			done() {return hasUpgrade("a", 11) || hasUpgrade("a", 21)},
			image: "resources/ach11.png",
		},
		26: {
			name: "infinity 2tones",
			tooltip: "have 2 ability token slots",
			done() {return hasUpgrade("gt", 13)},
			image: "resources/ach12.png",
		},
		31: {
			name: "speed of eye",
			tooltip: "token cooldown less than or equal to 300 milliseconds",
			done() {return player.t.startcd.lte(0.3)},
			image: "resources/ach13.png",
		},
		32: {
			name: "nauseous",
			tooltip: "have 4 or more effects at once",
			done() {
				let effects = 0
				if(player.t.tripletokeneff.gt(0)) effects += 1
				if(player.t.triplexpeff.gt(0)) effects += 1
				if(player.t.accelerationeff.gt(0)) effects += 1
				if(player.t.mysteriouseff.gt(0)) effects += 1
				if(effects >= 4){
					return true
				} else {
					return false
				}
			},
			image: "resources/ach14.png",
		},
		33: {
			name: "aliens approve",
			tooltip: "get to level 200",
			done() {return player.t.level.gte(200)},
			image: "resources/ach15.png",
		},
		34: {
			name: "1Kby1K",
			tooltip: "collect 1000 tokens",
			done() {return player.ach.points.gte(1000)},
			image: "resources/ach16.png",
		},
		35: {
			name: "you should stop",
			tooltip: "collect 2500 tokens",
			done() {return player.ach.points.gte(2500)},
			image: "resources/ach17.png",
		},
		36: {
			name: "shiny yellow things",
			tooltip: "have 30 golden tokens",
			done() {return player.gt.points.gte(30)},
			image: "resources/ach18.png",
		},
	},
    row: "side", // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true}
})