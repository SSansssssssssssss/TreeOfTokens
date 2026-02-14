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
		41: {
			name: "market crash",
			tooltip: "have 100 golden tokens (unlocks golden token buyables)",
			done() {return player.gt.points.gte(100)},
			image: "resources/ach19.png",
			style: {"border-color": "red"},
		},
		42: {
			name: "WOOOOOOOO-",
			tooltip: "level up 2 times in a row",
			done() {return player.t.levelstreak.gte(2)},
			image: "resources/ach20.png",
		},
		43: {
			name: "M100",
			tooltip: "have 100,000,000 (100M) points (unlocks new layer)",
			done() {return player.points.gte("1e8")},
			image: "resources/ach21.png",
			style: {"border-color": "red"},
		},
		44: {
			name: "skilled enough",
			tooltip: "reset for a dollar",
			done() {return player.d.points.gte(1)},
			image: "resources/ach22.png",
		},
		45: {
			name: "you broke it",
			tooltip: "collect 10,000 tokens",
			done() {return player.ach.points.gte(10000)},
			image: "resources/ach23.png",
		},
		46: {
			name: "zero to hero",
			tooltip: "level up 10 times in a row",
			done() {return player.t.levelstreak.gte(10)},
			image: "resources/ach24.png",
		},
		51: {
			name: "into a brick wall",
			tooltip: "get to level 1000",
			done() {return player.t.level.gte(1000)},
			image: "resources/ach25.png",
		},
		52: {
			name: "e=mc raised to 100",
			tooltip: "level up 100 times in a row",
			done() {return player.t.levelstreak.gte(100)},
			image: "resources/ach26.png",
		},
		53: {
			name: "cold, hard cash",
			tooltip: "have 10 dollars",
			done() {return player.d.points.gte(10)},
			image: "resources/ach27.png",
		},
		54: {
			name: "one giant leap",
			tooltip: "level up 1,000 times in a row",
			done() {return player.t.levelstreak.gte(100)},
			image: "resources/ach28.png",
		},
		55: {
			name: "king token",
			tooltip: "master a token once",
			done() {return player.tm.totalpoints.gte(1)},
			image: "resources/ach29.png",
		},
		56: {
			name: "have mercy",
			tooltip: "master durable token once",
			done() {return player.tm.durabletier.gte(1)},
			image: "resources/ach30.png",
		},
		61: {
			name: "butterfly effect",
			tooltip: "have a collector token collect an active bomb token",
			done() {return player.t.ach57},
			image: "resources/ach31.png",
		},
		62: {
			name: "you're a token",
			tooltip: "have a total of 16 mastery points (unlocks TM buyables)",
			done() {return player.tm.totalpoints.gte(16)},
			image: "resources/ach32.png",
			style: {"border-color": "red"},
		},
		63: {
			name: "the clock strikes 11",
			tooltip: "have 11 dollars",
			done() {return player.d.points.gte(11)},
			image: "resources/ach33.png",
		},
		64: {
			name: "mass protest",
			tooltip: "collect 50,000 tokens",
			done() {return player.ach.points.gte(50000)},
			image: "resources/ach34.png",
		},
		65: {
			name: "bc donalds",
			tooltip: "have 1e10 bokens",
			done() {return player.b.points.gte("1e10")},
			image: "resources/ach35.png",
		},
		66: {
			name: "level the 13th",
			tooltip: "get to level 1300 (unlocks euros)",
			done() {return player.t.level.gte(1300)},
			image: "resources/ach36.png",
			style: {"border-color": "red"},
		},
	},
    row: "side", // Row the layer is in on the tree (0 is the first row)
	tabFormat: [
		"main-display",
		["display-text", "Red bordered achievements unlock something permanently!"],
		"achievements"
	],
    layerShown(){return true}
}),
addLayer("stat", {
    name: "statistics", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "ST", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    }},
	tooltip: "Statistics",
    color: "#8a8a8a",
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
	infoboxes: {
		t: {
			title: "Statistics",
			body() { let x = `
				<h3 style='color: #e8d41e'>Token Layer</h3><br>
				Point Mult: `+format(tmp.t.gainPoints)+`x<br>
				<span style='color: #03b1fc'>XP</span> Mult: `+format(tmp.t.gainXP)+`x<br>
				Token Cooldown: `+format(player.t.startcd)+`s<br>
				Token Lifetime: `+format(player.t.lifetime)+`s<br>
				Auto-Collect: `+formatWhole(player.t.acamt)+`/`+format(player.t.startaccd)+`s<br>
				Highest Level Streak: `+formatWhole(player.t.hls)+` levels at once<br>
				`
				if(player.gt.unlocked){x=x+`<br>
				<h3 style='color: #ff8c00'>Golden Token Layer</h3><br>
				Golden Token Mult: `+format(tmp.gt.gainMult)+`x<br>
				`}
				if(player.tm.unlocked2){x=x+`<br>
				<h3 style='color: #f54242'>Token Mastery Layer</h3><br>
				Mastery XP Mult: `+format(tmp.tm.gainMult)+`x<br>
				Total Mastery Points: `+format(player.tm.totalpoints)+`<br>
				`}
				if(player.b.unlocked2){x=x+`<br>
				<h3 style='color: #FFFFFF'>Boken Layer</h3><br>
				Boken Mult: `+format(tmp.b.gainMult)+`x<br>
				Boken Gain: `+format(tmp.b.gainFinal)+`/s<br>
				Bar Decay: `+format(player.b.decayspeed.times(100))+`%/s<br>
				Bar Decay Division: /`+format(tmp.b.decayDiv)+`<br>
				`}
				return x
			},
		},
	},
    row: "side", // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true}
})