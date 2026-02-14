addLayer("d", {
    name: "dollars", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "D", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#33b841",
    requires: new Decimal(350), // Can be a function that takes requirement increases into account
    resource: "dollars", // Name of prestige currency
    baseResource: "level", // Name of resource prestige is based on
    baseAmount() {return player.t.level}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1.1, // Prestige currency exponent
	base: 1.1,
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
	canBuyMax(){return false},
	roundUpCost: true,
	branches: ["e"],
	milestones: {
		0: {
			requirementDescription: "1 Dollar",
			effectDescription(){return `
				- Token buyables are now automated [Can be toggled]<br>
				- Gain 2x more golden tokens<br>
				- Gain 3x more points<br>
				- +100% more points per dollar that you have currently<br>
				Currently: `+format(player.d.points.plus(1))+`x
			`},
			toggles: [["t", "autobuybuyable"]],
			done() { return player.d.points.gte(1) }
		},
		1: {
			requirementDescription: "2 Dollars",
			effectDescription(){return `
				- +100% more XP per dollar that you have currently<br>
				Currently: `+format(player.d.points.plus(1))+`x
			`},
			done() { return player.d.points.gte(2) }
		},
		2: {
			requirementDescription: "3 Dollars",
			effectDescription(){return `
				- Unlock 2 new ability tokens unlocked at level 500<br>
				- Having more than 3 dollars unlocks ability tokens
			`},
			done() { return player.d.points.gte(3) }
		},
		3: {
			requirementDescription: "4 Dollars",
			effectDescription(){return `
				- x2 Points
			`},
			done() { return player.d.points.gte(4) }
		},
		4: {
			requirementDescription: "5 Dollars",
			effectDescription(){return `
				- x2 XP
			`},
			done() { return player.d.points.gte(5) }
		},
		5: {
			requirementDescription: "6 Dollars",
			effectDescription(){return `
				- x2 Golden Tokens
			`},
			done() { return player.d.points.gte(6) }
		},
		6: {
			requirementDescription: "7 Dollars",
			effectDescription(){return `
				- +10% more golden tokens per dollar starting from 7<br>
				Currently: `+format(player.d.points.sub(6).div(10).plus(1).max(1))+`x
			`},
			done() { return player.d.points.gte(7) }
		},
		7: {
			requirementDescription: "10 Dollars",
			effectDescription(){return `
				- x5 Points, XP, Golden Tokens<br>
				- Whenever the game chooses to spawn Ability Tokens, all of the ability tokens equipped will be spawned<br>
				- Unlock Token Mastery
			`},
			done() { return player.d.points.gte(10) }
		},
		8: {
			requirementDescription: "11 Dollars",
			effectDescription(){return `
				- Unlock Bokens<br>
				- x10 Points
			`},
			done() { return player.d.points.gte(11) }
		},
	},
    layerShown(){return hasAchievement("ach", 43)}
}),
	//Token Mastery
addLayer("tm", {
    name: "token mastery", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "TM", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		unlocked2: false,
		points: new Decimal(0),
		gravityprog: new Decimal(0),
		gravityreq: new Decimal(250),
		gravitytier: new Decimal(0),
		durableprog: new Decimal(0),
		durablereq: new Decimal(250),
		durabletier: new Decimal(0),
		collectorprog: new Decimal(0),
		collectorreq: new Decimal(250),
		collectortier: new Decimal(0),
		speedyprog: new Decimal(0),
		speedyreq: new Decimal(250),
		speedytier: new Decimal(0),
		xenonprog: new Decimal(0),
		xenonreq: new Decimal(250),
		xenontier: new Decimal(0),
		mysteriousprog: new Decimal(0),
		mysteriousreq: new Decimal(250),
		mysterioustier: new Decimal(0),
		bombprog: new Decimal(0),
		bombreq: new Decimal(250),
		bombtier: new Decimal(0),
		robotprog: new Decimal(0),
		robotreq: new Decimal(250),
		robottier: new Decimal(0),
		totalpoints: new Decimal(0),
		
    }},
    color: "#f54242",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "mastery points", // Name of prestige currency
    baseResource: "tokens collected", // Name of resource prestige is based on
    baseAmount() {return player.ach.points}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
	infoboxes: {
		tutorial: {
			title: "Token Mastery",
			body() { return `<h3>Token Mastery:</h3> Collecting ability tokens now give you <h3>Mastery Progress</h3> for that specific 
			ability token. Collecting enough mastery progress for that token can increase their <h3>Mastery Tier</h3>, giving
			a boost to their abilities each new tier. However, you cannot collect mastery progress from manually spawned
			tokens, like a token spawned from Xenon or Bomb. Each new mastery tier gives you <h3>Mastery Points</h3>, which
			can be used for powerful upgrades and buyables.` 
			},
		},
	},
	bars: {
        gravityBar: {
            direction: RIGHT,
    	    width: 700,
    	    height: 50,
    	    progress() { return player.tm.gravityprog.div(player.tm.gravityreq) },
			display() { return "Gravity Token "+format(player.tm.gravityprog)+" MP / "+format(player.tm.gravityreq)+" MP [Mastery Tier "+formatWhole(player.tm.gravitytier)+"]"},
			baseStyle: {"background-color": "#9c0000"},
			fillStyle: {"background-color": "#0084FF"},
		},
		durableBar: {
            direction: RIGHT,
    	    width: 700,
    	    height: 50,
    	    progress() { return player.tm.durableprog.div(player.tm.durablereq) },
			display() { return "Durable Token "+format(player.tm.durableprog)+" MP / "+format(player.tm.durablereq)+" MP [Mastery Tier "+formatWhole(player.tm.durabletier)+"]"},
			baseStyle: {"background-color": "#9c0000"},
			fillStyle: {"background-color": "#383838"},
		},
		collectorBar: {
            direction: RIGHT,
    	    width: 700,
    	    height: 50,
    	    progress() { return player.tm.collectorprog.div(player.tm.collectorreq) },
			display() { return "Collector Token "+format(player.tm.collectorprog)+" MP / "+format(player.tm.collectorreq)+" MP [Mastery Tier "+formatWhole(player.tm.collectortier)+"]"},
			baseStyle: {"background-color": "#9c0000"},
			fillStyle: {"background-color": "#007F5F"},
		},
		speedyBar: {
            direction: RIGHT,
    	    width: 700,
    	    height: 50,
    	    progress() { return player.tm.speedyprog.div(player.tm.speedyreq) },
			display() { return "Speedy Token "+format(player.tm.speedyprog)+" MP / "+format(player.tm.speedyreq)+" MP [Mastery Tier "+formatWhole(player.tm.speedytier)+"]"},
			baseStyle: {"background-color": "#9c0000"},
			fillStyle: {"background-color": "#FF0C00"},
		},
		xenonBar: {
            direction: RIGHT,
    	    width: 700,
    	    height: 50,
    	    progress() { return player.tm.xenonprog.div(player.tm.xenonreq) },
			display() { return "Xenon Token "+format(player.tm.xenonprog)+" MP / "+format(player.tm.xenonreq)+" MP [Mastery Tier "+formatWhole(player.tm.xenontier)+"]"},
			baseStyle: {"background-color": "#9c0000"},
			fillStyle: {"background-color": "#57B706"},
		},
		mysteriousBar: {
            direction: RIGHT,
    	    width: 700,
    	    height: 50,
    	    progress() { return player.tm.mysteriousprog.div(player.tm.mysteriousreq) },
			display() { return "Mysterious Token "+format(player.tm.mysteriousprog)+" MP / "+format(player.tm.mysteriousreq)+" MP [Mastery Tier "+formatWhole(player.tm.mysterioustier)+"]"},
			baseStyle: {"background-color": "#9c0000"},
			fillStyle: {"background-color": "#FF00E2"},
		},
		bombBar: {
            direction: RIGHT,
    	    width: 700,
    	    height: 50,
    	    progress() { return player.tm.bombprog.div(player.tm.bombreq) },
			display() { return "Bomb Token "+format(player.tm.bombprog)+" MP / "+format(player.tm.bombreq)+" MP [Mastery Tier "+formatWhole(player.tm.bombtier)+"]"},
			baseStyle: {"background-color": "#9c0000"},
			fillStyle: {"background-color": "#660004"},
		},
		robotBar: {
            direction: RIGHT,
    	    width: 700,
    	    height: 50,
    	    progress() { return player.tm.robotprog.div(player.tm.robotreq) },
			display() { return "Robot Token "+format(player.tm.robotprog)+" MP / "+format(player.tm.robotreq)+" MP [Mastery Tier "+formatWhole(player.tm.robottier)+"]"},
			baseStyle: {"background-color": "#9c0000"},
			fillStyle: {"background-color": "#646464"},
		},
    },
	achievements: {
		11: {
			name: "Gravity MT1",
			tooltip: "5x XP & Points",
			done() {return player.tm.gravitytier.gte(1)}
		},
		12: {
			name: "Gravity MT2",
			tooltip: "10x XP & Points",
			done() {return player.tm.gravitytier.gte(2)}
		},
		21: {
			name: "Durable MT1",
			tooltip: "4 Clicks = 10x XP & Points",
			done() {return player.tm.durabletier.gte(1)}
		},
		22: {
			name: "Durable MT2",
			tooltip: "3 Clicks = 20x XP & Points",
			done() {return player.tm.durabletier.gte(2)}
		},
		31: {
			name: "Collector MT1",
			tooltip: "Collects 3 tokens",
			done() {return player.tm.collectortier.gte(1)}
		},
		32: {
			name: "Collector MT2",
			tooltip: "Collects 4 tokens",
			done() {return player.tm.collectortier.gte(2)}
		},
		41: {
			name: "Speedy MT1",
			tooltip: "[Acceleration] lasts for 2 seconds",
			done() {return player.tm.speedytier.gte(1)}
		},
		42: {
			name: "Speedy MT2",
			tooltip: "[Acceleration] lasts for 3 seconds",
			done() {return player.tm.speedytier.gte(2)}
		},
		51: {
			name: "Xenon MT1",
			tooltip: "3x XP & Points",
			done() {return player.tm.xenontier.gte(1)}
		},
		52: {
			name: "Xenon MT2",
			tooltip: "6x XP & Points",
			done() {return player.tm.xenontier.gte(2)}
		},
		61: {
			name: "Mysterious MT1",
			tooltip: "[Mysterious] effects are 2x buffed",
			done() {return player.tm.mysterioustier.gte(1)}
		},
		62: {
			name: "Mysterious MT2",
			tooltip: "[Mysterious] effects are 4x buffed",
			done() {return player.tm.mysterioustier.gte(2)}
		},
		71: {
			name: "Bomb MT1",
			tooltip: "Splits into four",
			done() {return player.tm.bombtier.gte(1)}
		},
		72: {
			name: "Bomb MT2",
			tooltip: "Splits into six",
			done() {return player.tm.bombtier.gte(2)}
		},
		81: {
			name: "Robot MT1",
			tooltip: "[Overclocked] lasts for 4 seconds",
			done() {return player.tm.robottier.gte(1)}
		},
		82: {
			name: "Robot MT2",
			tooltip: "[Overclocked] lasts for 5 seconds",
			done() {return player.tm.robottier.gte(2)}
		},
	},
	upgrades: {
		11: {
			title: "Hard Worker",
			description: "-0.2 seconds auto-collect time",
			cost: new Decimal(1)
		},
		12: {
			title: "Big Scoop",
			description: "+2 auto-collect amount",
			cost: new Decimal(1)
		},
		13: {
			title: "Ascended",
			description: "Level boost formula is significantly better",
			cost: new Decimal(4)
		},
		14: {
			title: "Gilded Golden Buyables",
			description: "Increase limit of golden buyables",
			cost: new Decimal(4)
		},
	},
	buyables: {
		11: {
			title () {return "Mastered XP ["+formatWhole(getBuyableAmount(this.layer, this.id))+"/"+this.purchaseLimit+"]"},
			cost(x) { return new Decimal(1) },
			display() { return "Cost: "+format(this.cost())+" mastery points\nx3 more XP compounding\nCurrently: "+format(this.effect())+"x" },
			canAfford() { return player[this.layer].points.gte(this.cost()) },
			buy() {
				player[this.layer].points = player[this.layer].points.sub(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
			effect(x) { return new Decimal(3).pow(x) },
			tooltip: "Effect 3^x",
			purchaseLimit: 7,
		},
	},
	componentStyles: {
		"buyable"() {return {"height": "100px"}}
	},
	tabFormat: {
		"Mastery": {
			content: [
				["infobox", "tutorial"],
				"main-display",
				"resource-display",
				["display-text", function(){return "You have a total of "+format(player.tm.totalpoints)+" mastery points."}],
				["bar", "gravityBar"],
				["bar", "durableBar"],
				["bar", "collectorBar"],
				["bar", "speedyBar"],
				["bar", "xenonBar"],
				["bar", "mysteriousBar"],
				["bar", "bombBar"],
				["bar", "robotBar"],
			]
		},
		"Upgrades": {
			content: [
				"main-display",
				"resource-display",
				["display-text", function(){return "You have a total of "+format(player.tm.totalpoints)+" mastery points."}],
				"upgrades",
				"buyables"
			]
		},
		"Tier Rewards": {
			content: [
				"main-display",
				"resource-display",
				["display-text", function(){return "You have a total of "+format(player.tm.totalpoints)+" mastery points."}],
				"achievements"
			]
		},
	},
	automate() {
		// check for unlocks
		if(player.d.points.gte(10)) player.tm.unlocked2 = true
		// requirements
		player.tm.gravityreq = new Decimal(250).times(new Decimal(3).pow(player.tm.gravitytier))
		player.tm.durablereq = new Decimal(250).times(new Decimal(3).pow(player.tm.durabletier))
		player.tm.collectorreq = new Decimal(250).times(new Decimal(3).pow(player.tm.collectortier))
		player.tm.speedyreq = new Decimal(250).times(new Decimal(3).pow(player.tm.speedytier))
		player.tm.xenonreq = new Decimal(250).times(new Decimal(3).pow(player.tm.xenontier))
		player.tm.mysteriousreq = new Decimal(250).times(new Decimal(3).pow(player.tm.mysterioustier))
		player.tm.bombreq = new Decimal(250).times(new Decimal(3).pow(player.tm.bombtier))
		player.tm.robotreq = new Decimal(250).times(new Decimal(3).pow(player.tm.robottier))
		// checking
		if(player.tm.gravityprog.gte(player.tm.gravityreq)){
			player.tm.gravityprog = player.tm.gravityprog.sub(player.tm.gravityreq)
			player.tm.gravitytier = player.tm.gravitytier.plus(1)
			player.tm.points = player.tm.points.plus(1)
			player.tm.totalpoints = player.tm.totalpoints.plus(1)
		}
		if(player.tm.durableprog.gte(player.tm.durablereq)){
			player.tm.durableprog = player.tm.durableprog.sub(player.tm.durablereq)
			player.tm.durabletier = player.tm.durabletier.plus(1)
			player.tm.points = player.tm.points.plus(1)
			player.tm.totalpoints = player.tm.totalpoints.plus(1)
		}
		if(player.tm.collectorprog.gte(player.tm.collectorreq)){
			player.tm.collectorprog = player.tm.collectorprog.sub(player.tm.collectorreq)
			player.tm.collectortier = player.tm.collectortier.plus(1)
			player.tm.points = player.tm.points.plus(1)
			player.tm.totalpoints = player.tm.totalpoints.plus(1)
		}
		if(player.tm.speedyprog.gte(player.tm.speedyreq)){
			player.tm.speedyprog = player.tm.speedyprog.sub(player.tm.speedyreq)
			player.tm.speedytier = player.tm.speedytier.plus(1)
			player.tm.points = player.tm.points.plus(1)
			player.tm.totalpoints = player.tm.totalpoints.plus(1)
		}
		if(player.tm.xenonprog.gte(player.tm.xenonreq)){
			player.tm.xenonprog = player.tm.xenonprog.sub(player.tm.xenonreq)
			player.tm.xenontier = player.tm.xenontier.plus(1)
			player.tm.points = player.tm.points.plus(1)
			player.tm.totalpoints = player.tm.totalpoints.plus(1)
		}
		if(player.tm.mysteriousprog.gte(player.tm.mysteriousreq)){
			player.tm.mysteriousprog = player.tm.mysteriousprog.sub(player.tm.mysteriousreq)
			player.tm.mysterioustier = player.tm.mysterioustier.plus(1)
			player.tm.points = player.tm.points.plus(1)
			player.tm.totalpoints = player.tm.totalpoints.plus(1)
		}
		if(player.tm.bombprog.gte(player.tm.bombreq)){
			player.tm.bombprog = player.tm.bombprog.sub(player.tm.bombreq)
			player.tm.bombtier = player.tm.bombtier.plus(1)
			player.tm.points = player.tm.points.plus(1)
			player.tm.totalpoints = player.tm.totalpoints.plus(1)
		}
		if(player.tm.robotprog.gte(player.tm.robotreq)){
			player.tm.robotprog = player.tm.robotprog.sub(player.tm.robotreq)
			player.tm.robottier = player.tm.robottier.plus(1)
			player.tm.points = player.tm.points.plus(1)
			player.tm.totalpoints = player.tm.totalpoints.plus(1)
		}
	},
    layerShown(){return player.tm.unlocked2}
})