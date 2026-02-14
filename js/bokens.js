addLayer("b", {
    name: "bokens", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "B", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
		bokendecay: new Decimal(0),
		unlocked2: false,
		decayspeed: new Decimal(0.1),
    }},
    color: "#FFFFFF",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "bokens", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
		if(getBuyableAmount("b",11).gte(1))mult=mult.times(buyableEffect("b",11))
		if(getBuyableAmount("b",23).gte(1))mult=mult.times(buyableEffect("b",23))
		if(hasUpgrade("b",11))mult=mult.times(5)
		if(hasUpgrade("b",12))mult=mult.times(5)
		if(getBuyableAmount("t",31).gte(1))mult=mult.times(buyableEffect("t",31))
		if(getBuyableAmount("gt",13).gte(1))mult=mult.times(buyableEffect("gt",13))
		if(hasUpgrade("b",14))mult=mult.times(10)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
	gainFinal() { // Calculate final boken gain
		return tmp.b.gainMult.times(player.b.bokendecay)
	},
	decayDiv() { // Calculate division of decay speed
		div = new Decimal(1)
		if(getBuyableAmount("b",12).gte(1))div=div.plus(buyableEffect("b",12))
		player.b.decayspeed = new Decimal(0.1).div(div)
		return div
	},
    row: 2, // Row the layer is in on the tree (0 is the first row)
	infoboxes: {
		tutorial: {
			title: "Bokens",
			body() { return `<h3>Bokens:</h3> Nice, you unlocked Bokens! The mechanics are simple, you gain Bokens passively, but you see, there is a bar. That bar slowly goes down and influences your Boken gain. To reset that bar, you need click a button. Good luck!` 
			},
		},
	},
	clickables: {
		11: {
			title() {return "Reset Bar"},
			display() {return "Reset the bar back to full!"},
			onClick() {
				player.b.bokendecay = new Decimal(1)
			},
			canClick: true,
		},
	},
	bars: {
		decay: {
			direction: UP,
			width: 50,
			height: 250,
			progress() { return player.b.bokendecay },
			fillStyle: {"background-color": "#ffffff"},
			borderStyle: {"border-color": "#ffffff"},
		},
	},
	buyables: {
		11: {
			title () {return "More Bokens ["+formatWhole(getBuyableAmount(this.layer, this.id))+"]"},
			cost(x) { return new Decimal(1).times(new Decimal(1).plus(x)).times(new Decimal(1.12).pow(x)) },
			display() { return "Cost: "+format(this.cost())+" bokens\n+50% more bokens each level\nDouble effect every 25 buyable levels\nCurrently: "+format(this.effect())+"x" },
			canAfford() { return player[this.layer].points.gte(this.cost()) },
			buy() {
				player[this.layer].points = player[this.layer].points.sub(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
			effect(x) { return new Decimal(1).plus(x.div(2)).times(new Decimal(2).pow(x.div(25).floor())) },
			tooltip: "1*(1+x)*(1.12^x)",
		},
		12: {
			title () {return "Less Decay ["+formatWhole(getBuyableAmount(this.layer, this.id))+"/15]"},
			cost(x) { return new Decimal(5).times(new Decimal(1).plus(x)).times(new Decimal(1.4).pow(x)) },
			display() { return "Cost: "+format(this.cost())+" bokens\n+/0.2 decay speed\nCurrently: /"+format(this.effect()) },
			canAfford() { return player[this.layer].points.gte(this.cost()) },
			buy() {
				player[this.layer].points = player[this.layer].points.sub(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
			effect(x) { return new Decimal(0).plus(x.div(5)) },
			tooltip: "5*(1+x)*(1.4^x)",
			purchaseLimit: 15,
		},
		13: {
			title () {return "Boints ["+formatWhole(getBuyableAmount(this.layer, this.id))+"]"},
			cost(x) { return new Decimal(1).times(new Decimal(1).plus(x)).times(new Decimal(1.12).pow(x)) },
			display() { return "Cost: "+format(this.cost())+" bokens\n+50% more points each level\nDouble effect every 25 buyable levels\nCurrently: "+format(this.effect())+"x" },
			canAfford() { return player[this.layer].points.gte(this.cost()) },
			buy() {
				player[this.layer].points = player[this.layer].points.sub(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
			effect(x) { return new Decimal(1).plus(x.div(2)).times(new Decimal(2).pow(x.div(25).floor())) },
			tooltip: "1*(1+x)*(1.12^x)",
		},
		21: {
			title () {return "BXP ["+formatWhole(getBuyableAmount(this.layer, this.id))+"]"},
			cost(x) { return new Decimal(1).times(new Decimal(1).plus(x)).times(new Decimal(1.12).pow(x)) },
			display() { return "Cost: "+format(this.cost())+" bokens\n+50% more XP each level\nDouble effect every 25 buyable levels\nCurrently: "+format(this.effect())+"x" },
			canAfford() { return player[this.layer].points.gte(this.cost()) },
			buy() {
				player[this.layer].points = player[this.layer].points.sub(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
			effect(x) { return new Decimal(1).plus(x.div(2)).times(new Decimal(2).pow(x.div(25).floor())) },
			tooltip: "1*(1+x)*(1.12^x)",
		},
		22: {
			title () {return "Bolden Tokens ["+formatWhole(getBuyableAmount(this.layer, this.id))+"]"},
			cost(x) { return new Decimal(1).times(new Decimal(1).plus(x)).times(new Decimal(1.12).pow(x)) },
			display() { return "Cost: "+format(this.cost())+" bokens\n+50% more golden tokens each level\nDouble effect every 25 buyable levels\nCurrently: "+format(this.effect())+"x" },
			canAfford() { return player[this.layer].points.gte(this.cost()) },
			buy() {
				player[this.layer].points = player[this.layer].points.sub(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
			effect(x) { return new Decimal(1).plus(x.div(2)).times(new Decimal(2).pow(x.div(25).floor())) },
			tooltip: "1*(1+x)*(1.12^x)",
		},
		23: {
			title () {return "More More Bokens ["+formatWhole(getBuyableAmount(this.layer, this.id))+"]"},
			cost(x) { return new Decimal(100).times(new Decimal(1).plus(x)).times(new Decimal(1.14).pow(x)) },
			display() { return "Cost: "+format(this.cost())+" bokens\n+100% more bokens each level\nCurrently: "+format(this.effect())+"x" },
			canAfford() { return player[this.layer].points.gte(this.cost()) },
			buy() {
				player[this.layer].points = player[this.layer].points.sub(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
			effect(x) { return new Decimal(1).plus(x) },
			tooltip: "100*(1+x)*(1.14^x)",
		},
	},
	upgrades: {
		11: {
			title: "Good Bokens",
			description: "x5 Bokens",
			cost: new Decimal(50000),
		},
		12: {
			title: "Great Bokens",
			description: "x5 Bokens",
			cost: new Decimal("1e6"),
		},
		13: {
			title: "BBuyables",
			description: "Unlock new buyables in Token and Golden Token layer",
			cost: new Decimal("6e7"),
		},
		14: {
			title: "Greater Bokens",
			description: "x10 Bokens",
			cost: new Decimal("5e10"),
		},
	},
	update(diff) {
		//check if bokens unlocked
		if(player.d.points.gte(11)) player.b.unlocked2 = true
		//boken decay
		if(player.b.bokendecay.gt(0)) player.b.bokendecay = player.b.bokendecay.sub(player.b.decayspeed*diff)
		player.b.bokendecay = player.b.bokendecay.max(0)
		//boken gain
		if(tmp.b.layerShown){
			player.b.points = player.b.points.plus(tmp.b.gainFinal.times(diff))
		}	
	},
	tabFormat: [
		"main-display",
		["display-text", function() {return "Your boken bar is decaying "+format(player.b.decayspeed.times(100))+"%/s"}],
		["display-text", function() {return "You have a base boken gain of "+format(tmp.b.gainMult)+"/s"}],
		["display-text", function() {return "You are making "+format(tmp.b.gainFinal)+" bokens/s"}],
		["infobox", "tutorial"],
		["row",[
			["bar", "decay"],
			["column",[
				"clickables",
				"blank",
				"buyables"
			]],
		]],
		"blank",
		"upgrades"
	],
	componentStyles: {
		"buyable"() {return {"height": "100px"}}
	},
    layerShown(){return player.b.unlocked2}
})