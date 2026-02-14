addLayer("t", {
    name: "tokens", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "T", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
		level: new Decimal(1),
		cooldown: new Decimal(3),
		startcd: new Decimal(3),
		lifetime: new Decimal(6),
		tripletokeneff: new Decimal(0),
		triplexpeff: new Decimal(0),
		accelerationeff: new Decimal(0),
		mysteriouseff: new Decimal(0),
		mysteriouseffmult: new Decimal(0),
		overclockedeff: new Decimal(0),
		xenontype: 0,
		xenonspawn: false,
		xenoncd: new Decimal(0),
		acamt: new Decimal(0),
		accd: new Decimal(0),
		startaccd: new Decimal(4),
		levelstreak: new Decimal(0),
		lstimer: 10,
		hls: new Decimal(0), //Highest Level Streak
		autobuybuyable: true, //should we auto buy buyables
		asyn: false, // something
		xpreq: new Decimal(5),
		ach57: false,
		levelboost: new Decimal(1),
    }},
	color: "#e8d41e",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "XP", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for points currency from bonuses
		return new Decimal(1)
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
	gainPoints() { // POINTS MULTI
		//Point multiplier
        let pointmult = new Decimal(1)
        pointmult = pointmult.times(player.t.levelboost)
        if (getBuyableAmount("t", 11).gte(1)) pointmult = pointmult.times(buyableEffect("t", 11))
		if (hasUpgrade("gt", 13)) pointmult = pointmult.times(2)
		if (getBuyableAmount("gt", 11).gte(1)) pointmult = pointmult.times(buyableEffect("gt", 11))
		if(hasMilestone("d",0))pointmult=pointmult.times(3)
		if(hasMilestone("d",0))pointmult=pointmult.times(player.d.points.plus(1))
		if(hasMilestone("d",3))pointmult=pointmult.times(2)
		if(hasMilestone("d",7))pointmult=pointmult.times(5)
		if(hasMilestone("d",8))pointmult=pointmult.times(10)
		if(getBuyableAmount("b", 13).gte(1)) pointmult = pointmult.times(buyableEffect("b", 13))
        //Effects
        if (player.t.tripletokeneff.gt(0)) pointmult = pointmult.times(3)
        if (player.t.mysteriouseff.gt(0)) pointmult = pointmult.times(player.t.mysteriouseffmult)
		return pointmult
	},
	gainXP() { // XP MULTI
		//XP multiplier
        let xpmult = new Decimal(1)
        if (getBuyableAmount("t", 21).gte(1)) xpmult = xpmult.times(buyableEffect("t", 21))
        if (hasUpgrade("gt", 13)) xpmult = xpmult.times(2)
		if (getBuyableAmount("gt", 12).gte(1)) xpmult = xpmult.times(buyableEffect("gt", 12))
		if(hasMilestone("d",1))xpmult=xpmult.times(player.d.points.plus(1))
		if(hasMilestone("d",7))xpmult=xpmult.times(5)
		if (getBuyableAmount("tm", 11).gte(1)) xpmult = xpmult.times(buyableEffect("tm", 11))
		if(getBuyableAmount("b", 21).gte(1)) xpmult = xpmult.times(buyableEffect("b", 21))
        //Effects
        if (player.t.triplexpeff.gt(0)) xpmult = xpmult.times(3)
		if(hasMilestone("d",4)) xpmult=xpmult.times(2)
        return xpmult
	},
    row: 0, // Row the layer is in on the tree (0 is the first row)
    // hotkeys: [
	// {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    // ],
    bars: {
        levelBar: {
            direction: RIGHT,
    	    width: 400,
    	    height: 50,
    	    progress() { 
				return player.t.points.div(player.t.xpreq) 
			},
			display() { 
				return formatWhole(player.t.points)+" XP / "+format(player.t.xpreq)+" XP [Level "+formatWhole(player.t.level)+"]"
			},
			baseStyle: {"background-color": "#9c0000"},
			fillStyle: {"background-color": "#009c00"},
		},
    },
	buyables: {
		11: {
			title() { return "Pointy Tokens ["+formatWhole(getBuyableAmount(this.layer, this.id))+"]" },
			cost(x) { return new Decimal(5).times(new Decimal(1).plus(x)).times(new Decimal(1.12).pow(x)) },
			display() { return "Cost: "+format(this.cost())+" points\n+100% more points per token collection\nDouble effect every 25 buyable levels\nCurrently: "+format(this.effect())+"x" },
			canAfford() { return player.points.gte(this.cost()) },
			buy() {
				player.points = player.points.sub(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
			effect(x) { return x.plus(1).times(new Decimal(2).pow(x.div(25).floor())) },
			tooltip: "5*(1+x)*(1.12^x)"
		},
		12: {
			title() { return "Speedy Tokens ["+formatWhole(getBuyableAmount(this.layer, this.id))+"/10]" },
			cost(x) { return new Decimal(50).times(new Decimal(1).plus(x)).times(new Decimal(1.5).pow(x)) },
			display() { return "Cost: "+format(this.cost())+" points\n-0.1 seconds of your token cooldown\nCurrently: -"+format(this.effect())+"s" },
			canAfford() { return player.points.gte(this.cost()) },
			buy() {
				player.points = player.points.sub(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
			effect() { return getBuyableAmount(this.layer, this.id).div(10) },
			tooltip: "50*(1+x)*(1.5^x)",
			purchaseLimit: 10,
		},
		13: {
			title() { return "Longer Tokens ["+formatWhole(getBuyableAmount(this.layer, this.id))+"/10]" },
			cost(x) { return new Decimal(100).times(new Decimal(1).plus(x)).times(new Decimal(1.5).pow(x)) },
			display() { return "Cost: "+format(this.cost())+" points\n+1 seconds of your token lifetime\nCurrently: +"+format(this.effect())+"s" },
			canAfford() { return player.points.gte(this.cost()) },
			buy() {
				player.points = player.points.sub(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
			effect() { return getBuyableAmount(this.layer, this.id) },
			tooltip: "100*(1+x)*(1.5^x)",
			purchaseLimit: 10,
		},
		21: {
			title() { return "Proficient Tokens ["+formatWhole(getBuyableAmount(this.layer, this.id))+"]" },
			cost(x) { return new Decimal(100).times(new Decimal(1).plus(x)).times(new Decimal(1.12).pow(x)) },
			display() { return "Cost: "+format(this.cost())+" points\n+100% more xp per token collection\nCurrently: "+format(this.effect())+"x" },
			canAfford() { return player.points.gte(this.cost()) },
			buy() {
				player.points = player.points.sub(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
			effect() { return getBuyableAmount(this.layer, this.id).plus(1) },
			tooltip: "100*(1+x)*(1.12^x)"
		},
		22: {
			title() { return "Automated Tokens ["+formatWhole(getBuyableAmount(this.layer, this.id))+"/3]" },
			cost(x) { return new Decimal(100).times(new Decimal(10).pow(x)) },
			display() { return "Cost: "+format(this.cost())+" points\n+1 auto-collect amount\nCurrently: +"+format(this.effect()) },
			canAfford() { return player.points.gte(this.cost()) },
			buy() {
				player.points = player.points.sub(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
			effect(x) { return x },
			tooltip: "100*(10^x)",
			purchaseLimit: 3,
		},
		23: {
			title() { return "Auto-Speedy Tokens ["+formatWhole(getBuyableAmount(this.layer, this.id))+"/3]" },
			cost(x) { return new Decimal(1000).times(new Decimal(10).pow(x)) },
			display() { return "Cost: "+format(this.cost())+" points\n-1s auto-collect time\nCurrently: -"+format(this.effect())+"s" },
			canAfford() { return player.points.gte(this.cost()) },
			buy() {
				player.points = player.points.sub(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
			effect(x) { return x },
			tooltip: "1000*(10^x)",
			purchaseLimit: 3,
		},
		31: {
			title() { return "Token Bokens ["+formatWhole(getBuyableAmount(this.layer, this.id))+"]" },
			cost(x) { return new Decimal("1e21").times(new Decimal(1).plus(x)).times(new Decimal(1.12).pow(x)) },
			display() { return "Cost: "+format(this.cost())+" points\n+50%  more bokens\nCurrently: "+format(this.effect())+"x" },
			canAfford() { return player.points.gte(this.cost()) },
			buy() {
				player.points = player.points.sub(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
			effect(x) { return x.div(2).plus(1) },
			tooltip: "1e21*(1+x)*(1.12^x)",
			unlocked() { return hasUpgrade("b",13) }
		},
	},
	calculatethings() {
		//Cooldown.
		let scd = new Decimal(3)
		if(getBuyableAmount("t", 12).gte(1)) scd = scd.sub(buyableEffect("t", 12))
		if(hasUpgrade("gt", 12)) scd = scd.sub(1.5)
		if(player.t.accelerationeff.gt(0)) scd = scd.div(2)
		player.t.startcd = scd
		//Lifetime.
		let life = new Decimal(6)
		if(getBuyableAmount("t", 13).gte(1)) life = life.plus(buyableEffect("t", 13))
		player.t.lifetime = life
		// ACAMT. (Auto Collect Amount)
		let acamt = new Decimal(0)
		if(getBuyableAmount("t", 22).gte(1)) acamt = acamt.plus(buyableEffect("t", 22))
		if(hasUpgrade("tm", 12)) acamt = acamt.plus(2)
		player.t.acamt = acamt
		// STARTACCD. (Start Auto Collect Cool Down)
		let startaccd = new Decimal(4)
		if(getBuyableAmount("t", 23).gte(1)) startaccd = startaccd.sub(buyableEffect("t", 23))
		if(hasUpgrade("tm", 11)) startaccd = startaccd.sub(0.2)
		if(player.t.overclockedeff.gt(0)) startaccd = startaccd.div(2)
		player.t.startaccd = startaccd
		// LEVEL BOOST.
		let lb = player.t.level.root(2)
		if(hasUpgrade("tm", 13)) lb = player.t.level
		player.t.levelboost = lb
	},
	update(diff) {
		//auto-collect
		if(options.autoCollect){
			if(player.t.accd.lte(0)){
				if(player.t.acamt.gte(1)){
					player.t.accd = player.t.startaccd
					//Now collect thee token
					Object.filter = (obj, predicate) => Object.fromEntries(Object.entries(obj).filter(predicate))
					let filtered = Object.filter(particles, ([id, data]) => data.isToken)

					let times = player.t.acamt.min(Object.keys(filtered).length)
					for(let i = 0; i < times; i++){
						collectRandom()
					}
				}
			} else {
				player.t.accd = player.t.accd.sub(diff)
			}
		}
		// Tokens Spawn
		if(player.t.cooldown.lte(0)){
			player.t.cooldown = player.t.startcd
			if(player.tab=="t"){
				tokenSpawn()
			}
		} else {
			player.t.cooldown = player.t.cooldown.sub(diff)
		}
		// effect timers
		if(player.t.tripletokeneff.gt(0)) player.t.tripletokeneff = player.t.tripletokeneff.sub(diff)
		if(player.t.triplexpeff.gt(0)) player.t.triplexpeff = player.t.triplexpeff.sub(diff)
		if(player.t.accelerationeff.gt(0)) player.t.accelerationeff = player.t.accelerationeff.sub(diff)
		if(player.t.mysteriouseff.gt(0)) player.t.mysteriouseff = player.t.mysteriouseff.sub(diff)
		if(player.t.overclockedeff.gt(0)) player.t.overclockedeff = player.t.overclockedeff.sub(diff)
	},
	automate() {
		// check the level
		//xp requirement
		if(player.t.level.gte(1000)){
			player.t.xpreq = new Decimal(125000).times(new Decimal(1.1).pow(player.t.level.sub(999)))
		} else {
			player.t.xpreq = player.t.level.pow(1.7).plus(4)
		}
		if(player.t.points.gte(player.t.xpreq)){
			player.t.points = player.t.points.sub(player.t.xpreq)
			player.t.level = player.t.level.plus(1)
			player.t.levelstreak = player.t.levelstreak.plus(1)
			player.t.lstimer = 1
			//update highest level Streak
			if(player.t.levelstreak.gt(player.t.hls)) player.t.hls = player.t.levelstreak
		}
		// if 1 tick pass and does not level up, we RESET!!
		if(player.t.lstimer>0){
			player.t.lstimer -= 1
		} else {
			player.t.levelstreak = new Decimal(0)
		}
		//Automating buyables
		if (hasMilestone("d",0) && player.t.autobuybuyable) autobuyBuyables("t")
		//we shall filter
		partTokens = Object.filter(particles, thing => thing.isToken == true)
	},
	componentStyles: {
		"buyable"() {return {"height": "100px"}}
	},
    tabFormat: [
        ["bar", "levelBar"],
		["display-text", function() {return "Your level is multiplying points by "+format(player.t.levelboost)+"x"}],
		"blank",
        "main-display",
        "resource-display",
		["display-text", function(){return "A token will spawn in "+format(player.t.cooldown)+" seconds."}],
		["display-text", function(){return "Tokens have a lifetime of "+format(player.t.lifetime)+" seconds"}],
		["display-text", function(){return "Tokens have a starting cooldown of "+format(player.t.startcd)+" seconds"}],
		["display-text", function(){return "Auto-Collecting "+formatWhole(player.t.acamt)+" Tokens every "+format(player.t.startaccd)+" seconds"}],
		"blank",
		"buyables",
		"blank",
		["display-text", function() {return "Effects:"} ],
		["row", [
			["effect", ["resources/tripletokeneff.png", function() {return "x3 Points ["+formatTime(player.t.tripletokeneff)+"]"}, function(){return player.t.tripletokeneff.gt(0) ? "block" : "none"}]],
			["effect", ["resources/triplexpeff.png", function() {return "x3 XP ["+formatTime(player.t.triplexpeff)+"]"}, function(){return player.t.triplexpeff.gt(0) ? "block" : "none"}]],
			["effect", ["resources/accelerationeff.png", function() {return "/2 Token Cooldown ["+formatTime(player.t.accelerationeff)+"]"}, function(){return player.t.accelerationeff.gt(0) ? "block" : "none"}]],
			["effect", ["resources/mysteriouseff.png", function() {return "x"+format(player.t.mysteriouseffmult)+" Points ["+formatTime(player.t.mysteriouseff)+"]"}, function(){return player.t.mysteriouseff.gt(0) ? "block" : "none"}]],
			["effect", ["resources/overclockedeff.png", function() {return "/2 Auto-Collect Time ["+formatTime(player.t.overclockedeff)+"]"}, function(){return player.t.overclockedeff.gt(0) ? "block" : "none"}]],
		]],
    ],
	branches: ["a", "gt"],
    layerShown(){return true}
	// Level Formula: (x^1.7)+4 or 
	// Pointy Tokens Formula: 5*(1+x)*(1.12^x)
	// Speedy Tokens Formula: 50*(1+x)*(1.5^x)
	// Longer Tokens Formula: 100*(1+x)*(1.5^x)
	// Proficient Tokens Formula: 100*(1+x)*(1.12^x)
	// Level Boost Formula: x square root
	// Automated Tokens Formula: 1000*(2^x)
}),
addLayer("a", {
    name: "ability tokens", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "AT", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#036bfc",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "", // Name of prestige currency
    baseResource: "level", // Name of resource prestige is based on
    baseAmount() {return player.t.level}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
	infoboxes: {
		tutorial: {
			title: "Ability Tokens",
			body() { return "<b>Ability Tokens</b> are tokens that have a unique ability attached to them. Right now, you can only have about 1 ability token equipped. You can increase the number of ability tokens equipped later on in the game. Ability tokens will appear alongside your basic tokens, with a 50/50 chance to replace your basic tokens." },
		},
		unlocks: {
			title: "Unlocks",
			body() {
				return `Next Unlock: Level 50 [Unlocks more Ability Tokens]
				`
			}
		}
	},
	upgrades: {
		11: {
			title: "Gravity Token",
			description: "Unlock an ability token that has gravity physics. 3x XP and Points when collected.",
			currencyDisplayName: "points",
			currencyInternalName: "points",
			cost: new Decimal(200),
			cid: 1,
		},
		12: {
			title: "Collector Token",
			description: "Clicks 2 random tokens on your screen. 2x XP and Points when collected (For this token only; Unable to collect Collectors)",
			currencyDisplayName: "points",
			currencyInternalName: "points",
			cost: new Decimal(10000),
			unlocked() {return player.t.level.gte(50)},
			cid: 3,
		},
		13: {
			title: "Xenon Token",
			description: "Spawns a random ability token that you unlocked. 1x XP and Points when collected",
			currencyDisplayName: "points",
			currencyInternalName: "points",
			cost: new Decimal(10000),
			unlocked() {return player.t.level.gte(50)},
			cid: 5,
		},
		21: {
			title: "Durable Token",
			description: "Unlock an ability token that you need to click 5 times to claim. 5x XP and Points when collected.",
			currencyDisplayName: "points",
			currencyInternalName: "points",
			cost: new Decimal(200),
			cid: 2,
		},
		22: {
			title: "Speedy Token",
			description: "Gives the [Acceleration] effect when collected. 2x XP and Points when collected.",
			currencyDisplayName: "points",
			currencyInternalName: "points",
			cost: new Decimal(10000),
			unlocked() {return player.t.level.gte(50)},
			tooltip: "[Acceleration]: /2 token cooldown for 1 seconds",
			cid: 4,
		},
		23: {
			title: "Mysterious Token",
			description: "Gives the [Mysterious] effect when collected. 2x XP and Points when collected.",
			currencyDisplayName: "points",
			currencyInternalName: "points",
			cost: new Decimal(10000),
			unlocked() {return player.t.level.gte(50)},
			tooltip: "[Mysterious]: x(1-3) points for (1-5) seconds",
			cid: 6,
		},
		14: {
			title: "Bomb Token",
			description: "Splits into two inactive bomb tokens. 2x XP and Points when collected.",
			currencyDisplayName: "points",
			currencyInternalName: "points",
			cost: new Decimal("1e9"),
			unlocked() {return player.t.level.gte(500)},
			cid: 7,
		},
		24: {
			title: "Robot Token",
			description: "Gives the [Overclocked] effect when collected. 2x XP and Points when collected.",
			currencyDisplayName: "points",
			currencyInternalName: "points",
			cost: new Decimal("1e9"),
			unlocked() {return player.t.level.gte(500)},
			tooltip: "[Overclocked]: /2 auto-collect time for 3 seconds",
			cid: 8,
		},
	},
	grid: { // Ruh Roh time for Ability Token Equipping.
		rows() {
			return 1
		}, // If these are dynamic make sure to have a max value as well!
		cols() {
			let x = 1
			if(hasUpgrade("gt", 13)) x += 1
			return x
		},
		maxRows: 2,
		maxCols: 2,
		getStartData(id) { // 0 = None | 1 = Gravity | 2 = Durable | 3 = Collector | 4 = Speedy
			return 0
		},
		getUnlocked(id) { // Default
			return true
		},
		getCanClick(data, id) {
			return true
		},
		getDisplay(data, id) {
			return tokenId(data)
		},
		getStyle(data,id) {
			switch(data){
				case 0:
					return {"background-color": "#808080"}
					break
				case 1:
					return {"background-color": "#34b7eb"}
					break
				case 2:
					return {"background-color": "#3d3d3d"}
					break
				case 3:
					return {"background-color": "#03fcb1"}
					break
				case 4:
					return {"background-color": "#ff3344"}
					break
				case 5:
					return {"background-color": "#2bff2f"}
					break
				case 6:
					return {"background-color": "#ff38e8"}
					break
				case 7:
					return {"background-color": "#660004"}
					break
				case 8:
					return {"background-color": "#C9C9C9"}
					break
				default:
					return {"background-color": "#ffffff"}
			}
		},
		onClick(data, id) { 
			if(data >= 8){
				player.a.grid[id] = 0
			} else {
				let gravity = hasUpgrade("a", 11)
				let durable = hasUpgrade("a", 21)
				let collector = hasUpgrade("a", 12)
				let speedy = hasUpgrade("a", 22)
				let xenon = hasUpgrade("a", 13)
				let mysterious = hasUpgrade("a", 23)
				let bomb = hasUpgrade("a", 14)
				let robot = hasUpgrade("a", 24)
				for (at in player.a.grid) {
					let x = player.a.grid[at]
					if(x==1) gravity = false
					if(x==2) durable = false
					if(x==3) collector = false
					if(x==4) speedy = false
					if(x==5) xenon = false
					if(x==6) mysterious = false
					if(x==7) bomb = false
					if(x==8) robot = false
				}
				player.a.grid[id]++
				if(player.a.grid[id]==1 && !gravity) player.a.grid[id]++
				if(player.a.grid[id]==2 && !durable) player.a.grid[id]++
				if(player.a.grid[id]==3 && !collector) player.a.grid[id]++
				if(player.a.grid[id]==4 && !speedy) player.a.grid[id]++
				if(player.a.grid[id]==5 && !xenon) player.a.grid[id]++
				if(player.a.grid[id]==6 && !mysterious) player.a.grid[id]++
				if(player.a.grid[id]==7 && !bomb) player.a.grid[id]++
				if(player.a.grid[id]==8 && !robot) player.a.grid[id] = 0
			}
		},
	},
	automate() {
		if(player.t.level.gte(10)){
			player.a.unlocked = true
		} else {
			if(player.d.points.gte(3)){
				player.a.unlocked = true
			} else {
				player.a.unlocked = false
			}
		}
	},
	tabFormat: [
		"resource-display",
		["infobox", "tutorial"],
		["infobox", "unlocks"],
		"upgrades",
		["display-text", function() {return "Ability Tokens Equipped:"}],
		"grid"
	],
	branches: ["gt"],
    layerShown(){return true}
	// NOTE: Clicking on an grid equip should switch, eg. click turns into gravity, again turns to durable, back to gravity.
}),
//ROW 2
addLayer("gt", {
    name: "golden tokens", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "GT", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#ff8c00",
    requires: new Decimal(1000), // Can be a function that takes requirement increases into account
    resource: "golden tokens", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
		if(hasMilestone("d",0)) mult=mult.times(2)
		if(hasMilestone("d",5)) mult=mult.times(2)
		if(hasMilestone("d",6)) mult=mult.times(player.d.points.sub(6).div(10).plus(1).max(1))
		if(hasMilestone("d",7)) mult=mult.times(5)
		if(getBuyableAmount("b", 22).gte(1)) mult = mult.times(buyableEffect("b", 22))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
	upgrades: {
		11: {
			title: "Shining Brightly",
			description: "Unlocks a special token that has a chance to replace any token and gives you random effects when you collect it.",
			cost: new Decimal(1),
			tooltip: "Triple points for 15 seconds, or triple XP for 15 seconds [1/10 for golden]"
		},
		12: {
			title: "Token Mint",
			description: "Token cooldown is decreased by 1.5 seconds.",
			cost: new Decimal(1),
		},
		13: {
			title: "Golden Abilities",
			description: "+1 Ability Token Equip, 2x XP, 2x Points",
			cost: new Decimal(5),
		},
	},
	buyables: {
		11: {
			title() { return "Gilded Points ["+formatWhole(getBuyableAmount(this.layer, this.id))+"/"+this.purchaseLimit()+"]" },
			cost(x) { return new Decimal(10).times(new Decimal(1).plus(new Decimal(0.2).times(x))).times(new Decimal(1.12).pow(x)).floor() },
			display() { return "Cost: "+format(this.cost())+" golden tokens\n+50% more points per token collection\nCurrently: "+format(this.effect())+"x" },
			canAfford() { return player.gt.points.gte(this.cost()) },
			buy() {
				player.gt.points = player.gt.points.sub(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
			effect(x) { return x.div(2).plus(1) },
			tooltip: "10*(1+0.2x)*(1.12^x)",
			purchaseLimit(){
				if(hasUpgrade("tm", 14)) return 500
				return 50
			},
		},
		12: {
			title() { return "Gilded XP ["+formatWhole(getBuyableAmount(this.layer, this.id))+"/"+this.purchaseLimit()+"]" },
			cost(x) { return new Decimal(15).times(new Decimal(1).plus(new Decimal(0.2).times(x))).times(new Decimal(1.12).pow(x)).floor() },
			display() { return "Cost: "+format(this.cost())+" golden tokens\n+50% more XP per token collection\nCurrently: "+format(this.effect())+"x" },
			canAfford() { return player.gt.points.gte(this.cost()) },
			buy() {
				player.gt.points = player.gt.points.sub(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
			effect(x) { return x.div(2).plus(1) },
			tooltip: "15*(1+0.2x)*(1.12^x)",
			purchaseLimit(){
				if(hasUpgrade("tm", 14)) return 500
				return 50
			},
		},
		13: {
			title() { return "Gilded Bokens ["+formatWhole(getBuyableAmount(this.layer, this.id))+"]" },
			cost(x) { return new Decimal("1e14").times(new Decimal(1).plus(new Decimal(0.2).times(x))).times(new Decimal(1.12).pow(x)).floor() },
			display() { return "Cost: "+format(this.cost())+" golden tokens\n+50% more bokens\nCurrently: "+format(this.effect())+"x" },
			canAfford() { return player.gt.points.gte(this.cost()) },
			buy() {
				player.gt.points = player.gt.points.sub(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
			effect(x) { return x.div(2).plus(1) },
			tooltip: "1e14*(1+0.2x)*(1.12^x)",
			unlocked() {return hasUpgrade("b",13)},
		},
	},
	componentStyles: {
		"buyable"() {return {"height": "100px"}}
	},
	branches: ["d","tm","b"],
    layerShown(){return true}
})
