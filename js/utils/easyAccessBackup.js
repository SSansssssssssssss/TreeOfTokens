function hasUpgrade(layer, id) {
	return ((player[layer].upgrades.includes(toNumber(id)) || player[layer].upgrades.includes(id.toString())) && !tmp[layer].deactivated)
}

function hasMilestone(layer, id) {
	return ((player[layer].milestones.includes(toNumber(id)) || player[layer].milestones.includes(id.toString())) && !tmp[layer].deactivated)
}

function hasAchievement(layer, id) {
	return ((player[layer].achievements.includes(toNumber(id)) || player[layer].achievements.includes(id.toString())) && !tmp[layer].deactivated)
}

function hasChallenge(layer, id) {
	return ((player[layer].challenges[id]) && !tmp[layer].deactivated)
}

function maxedChallenge(layer, id) {
	return ((player[layer].challenges[id] >= tmp[layer].challenges[id].completionLimit) && !tmp[layer].deactivated)
}

function challengeCompletions(layer, id) {
	return (player[layer].challenges[id])
}

function canEnterChallenge(layer, id){
	return tmp[layer].challenges[id].canEnter ?? true
}

function canExitChallenge(layer, id){
	return tmp[layer].challenges[id].canExit ?? true
}

function getBuyableAmount(layer, id) {
	return (player[layer].buyables[id])
}

function setBuyableAmount(layer, id, amt) {
	player[layer].buyables[id] = amt
}

function addBuyables(layer, id, amt) {
	player[layer].buyables[id] = player[layer].buyables[id].add(amt)
}

function getClickableState(layer, id) {
	return (player[layer].clickables[id])
}

function setClickableState(layer, id, state) {
	player[layer].clickables[id] = state
}

function getGridData(layer, id) {
	return (player[layer].grid[id])
}

function setGridData(layer, id, data) {
	player[layer].grid[id] = data
}

function upgradeEffect(layer, id) {
	return (tmp[layer].upgrades[id].effect)
}

function challengeEffect(layer, id) {
	return (tmp[layer].challenges[id].rewardEffect)
}

function buyableEffect(layer, id) {
	return (tmp[layer].buyables[id].effect)
}

function clickableEffect(layer, id) {
	return (tmp[layer].clickables[id].effect)
}

function achievementEffect(layer, id) {
	return (tmp[layer].achievements[id].effect)
}

function gridEffect(layer, id) {
	return (gridRun(layer, 'getEffect', player[layer].grid[id], id))
}
//Auto buy buyables
function autobuyBuyables(layer){
	if (!tmp[layer].buyables) return
	for (id in tmp[layer].buyables)
		if (isPlainObject(tmp[layer].buyables[id]) && (layers[layer].buyables[id].canAfford === undefined || layers[layer].buyables[id].canAfford() === true))
			buyBuyable(layer, id) 
}

//Filter but for objects
Object.filter = (obj, predicate) => 
    Object.keys(obj)
          .filter( key => predicate(obj[key]) )
          .reduce( (res, key) => (res[key] = obj[key], res), {} );

//Function to get name by id
function tokenId(id) {
	if(id==0)return "None"
	if(id==1)return "Gravity"
	if(id==2)return "Durable"
	if(id==3)return "Collector"
	if(id==4)return "Speedy"
	if(id==5)return "Xenon"
	if(id==6)return "Mysterious"
	if(id==7)return "Bomb"
	if(id==8)return "Robot"
}
//Spawn a token
function tokenSpawn(type) {
    //get ability Tokens
    let abtokensequip = []
    for (at in player.a.grid) {
        if (player.a.grid[at] != 0) {
            abtokensequip.push(tokenId(player.a.grid[at]))
        }
    }
    // basic or ability token
    if (Math.round(Math.random()) == 0 && abtokensequip.length >= 1) {
        tokentype = abtokensequip[Math.floor(Math.random() * abtokensequip.length)]
    } else {
        tokentype = "Basic"
    }
    // golden token
    if (Math.floor(Math.random() * 10) + 1 == 10 && hasUpgrade("gt", 11)) {
        //if(true) {
        tokentype = "Golden"
    }
	//type param
	if(type){
		if(typeof type === "number"){
			tokentype = tokenId(type)
		} else {
			tokentype = type
		}
	}
    let token = {
		isToken: true,
        thing: tokentype,
        image: "resources/" + tokentype + ".png",
        time: player.t.lifetime,
        fadeOutTime: 1,
        layer: "t",
        width: 50,
		height(){
			if (tokentype == "Bomb") {
				return 65
			} else {
				return 50
			}
		},
        gravity: 0,
        cgravity: 0,
        rotation() {
            if (tokentype == "Mysterious") {
                return 15
            } else {
                return 0
            }
        },
        hp() {
            if (tokentype == "Durable") {
                return 5
            } else {
                return 1
            }
        }, //custom
        update() {
            //shake
            if (particles[this.id].thing == "Speedy") {
                particles[this.id].xVel = (Math.random() - 0.5) * 5
                particles[this.id].yVel = (Math.random() - 0.5) * 5
            }
            //less choppy Gravity
            if (particles[this.id].thing == "Gravity") {
                particles[this.id].cgravity += 0.2
                particles[this.id].y += particles[this.id].cgravity
            }
            //out of bounds = DIE [For gravity only]
            if (particles[this.id].thing == "Gravity") {
                if (particles[this.id].y > tmp.other.screenHeight) Vue.delete(particles, this.id)
            }
        },
        onClick() {
            let parti = particles[this.id]
            let id = this.id

            function real() {
                let pointmult = tmp.t.gainPoints
				let xpmult = tmp.t.gainXP
                //Ability Token mults
                if (parti.thing != "Basic" && parti.thing != "Golden") {
                    pointmult = pointmult.times(tokenMult(parti.thing))
                    xpmult = xpmult.times(tokenMult(parti.thing))
                }
                //add
                player.points = player.points.plus(pointmult)
                player.t.points = player.t.points.plus(xpmult)
                //Token Effect Applier
                if (parti.thing == "Golden") {
                    if (Math.round(Math.random()) == 0) {
                        player.t.tripletokeneff = new Decimal(15)
                    } else {
                        player.t.triplexpeff = new Decimal(15)
                    }
                }
                if (parti.thing == "Speedy") player.t.accelerationeff = new Decimal(1)
				if (parti.thing == "Robot") player.t.overclockedeff = new Decimal(2)
                if (parti.thing == "Mysterious") {
                    player.t.mysteriouseff = new Decimal(format(Math.random() * 4)).plus(1)
                    player.t.mysteriouseffmult = new Decimal(format(Math.random() * 2)).plus(1)
                }
                //Xenon Token Spawn
                if (parti.thing == "Xenon") {
                    //get unlocked abtokens
                    let xenonunlock = []
                    player.a.upgrades.forEach(function(item, index) {
                        xenonunlock.push(tmp.a.upgrades[item].cid)
                    })
                    //now we get a random one and spawn that
                    player.t.xenontype = xenonunlock[Math.floor(Math.random() * xenonunlock.length)]
                    tokenSpawn(player.t.xenontype)
                }
                //Collector Token collect
                if (parti.thing == "Collector") {
                    let times = Math.min(2, Object.keys(particles).length - 1)
                    //WAIT, are there only Collectors on the field?
                    let x = false
                    for (p in particles) {
                        if (particles[p].thing != "Collector") x = true
                    }
                    if (!x) times = 0
                    for (let i = 0; i < times; i++) {
                        //select random token then click it manually
                        let randomProperty = function(obj) {
                            let keys = Object.keys(obj)
                            return obj[keys[keys.length * Math.random() << 0]]
                        }
                        let selected = randomProperty(particles)
                        //explosion effect
                        if (id != selected.id && selected.thing != "Collector") {
                            let explode = {
								isToken: false,
                                image: "resources/genericParticle.png",
                                time: 1,
                                fadeOutTime: 1,
                                speed: 0,
                                offset: 0,
                                width: 10,
                                height: 10,
                                x: selected.x,
                                y: selected.y,
                                update() {
                                    particles[this.id].width += 20
                                    particles[this.id].height += 20
                                }
                            }
                            makeParticles(explode, 1)
                            run(selected.onClick, selected)
                        } else {
                            i--
                            continue
                        }
                    }
                }
            }
            // custom hp
            if (particles[this.id].hp >= 2) {
                particles[this.id].hp--
                particles[this.id].width -= 2
                particles[this.id].height -= 2
            } else {
                real()
                player.ach.points = player.ach.points.plus(1)
                Vue.delete(particles, this.id)
            }
        },
    }
    makeShinies(token)
}
//Get base mult of tokens by name
function tokenMult(name) {
	if(name=="Xenon") return 1
	if(name=="Gravity"||name=="Collector"||name=="Speedy"||name=="Mysterious"||name=="Bomb"||name=="Robot") return 2
	if(name=="Durable") return 5
}
//Collect a random token on the field
function collectRandom(){
	let randomKey = function (obj){
		let keys = Object.keys(obj)
		return keys[Math.floor(Math.random() * keys.length)]
	}
	let tokenchosen = randomKey(particles)
	run(particles[tokenchosen].onClick, particles[tokenchosen])
}