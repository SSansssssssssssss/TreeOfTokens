let modInfo = {
	name: "Tree of Tokens",
	author: "treeenjoyer",
	pointsName: "points",
	modFiles: ["layers.js", "tree.js", "ach.js"],

	discordName: "EXC Discord",
	discordLink: "https://discord.gg/9ZjwG5PGTU",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "1.0",
	name: "tONEken",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v1.0 [tONEken]</h3><br>
		- Added Token Layer<br>
		[Level, XP, Points, Pointy Tokens, Speedy Tokens, Longer Tokens, Proficient Tokens, Cooldown, Lifetime, Tokens] <br>
		- Added Ability Token Layer<br>
		[Gravity Token, Durable Token, Collector Token, Speedy Token, Xenon Token, Mysterious Token]<br>
		- Added Golden Token Layer<br>
		[Shining Brightly, Token Mint, Golden Abilities]<br>
		- Added Achievements Layer<br>
		[18 achievements added]`

let winText = `GG You beat Tree of Tokens. It's the endgame for now and there might be more content soon but check out my other trees..`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return false
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	"Click on the tokens to earn points!",
	"Endgame: 30 Golden Tokens"
]

// Determines when the game "ends"
function isEndgame() {
	return player.gt.points.gte(30)
}



// Less important things beyond this point!

// Style for the background, can be a function
function backgroundStyle() {
	return "background: linear-gradient(var(--tint), var(--tint)), url(resources/bgtile.png)"
}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}