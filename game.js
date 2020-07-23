let player = {};
let items = [];
let baddies = [];
let goodies = [];
let goldItems = [];
let teleports = [];
let score = 0;
let timeRemaining = 45;
let interval = setInterval(decreaseTimer, 1000);

function create(game) {
	player = {
		x : Math.floor(Math.random() * 24),
		y : Math.floor(Math.random() * 24)
	};
	game.setDot(player.x, player.y, Color.Black);
}

function update(game) {
	// Only generate an item 5% of the time
	if (Math.random() < 0.05) {
		item = {
			x : Math.floor(Math.random() * 24),
			y : Math.floor(Math.random() * 24)
		};
		if (item.x !== player.x || item.y !== player.y) {
			items.push(item);
		}
	}

	if (Math.random() < 0.05) {
		baddie = {
			x : Math.floor(Math.random() * 24),
			y : Math.floor(Math.random() * 24)
		};
		if (baddie.x !== player.x || baddie.y !== player.y) {
			baddies.push(baddie);
		}
	}

	if (Math.random() < 0.05) {
		goodie = {
			x : Math.floor(Math.random() * 24),
			y : Math.floor(Math.random() * 24)
		};
		if (goodie.x !== player.x || goodie.y !== player.y) {
			goodies.push(goodie);
		}
	}

	if (Math.random() < 0.01) {
		goldItem = {
			x : Math.floor(Math.random() * 24),
			y : Math.floor(Math.random() * 24)
		};
		if (goldItem.x !== player.x || goldItem.y !== player.y) {
			goldItems.push(goldItem);
		}
	}

	if (Math.random() < 0.02) {
		teleport = {
			x : Math.floor(Math.random() * 24),
			y : Math.floor(Math.random() * 24)
		};
		if (teleport.x !== player.x || teleport.y !== player.y) {
			teleports.push(teleport);
		}
	}

	// creates items on screen
	for (item of items) {
		game.setDot(item.x, item.y, Color.Green);
	}

	for (goldItem of goldItems) {
		game.setDot(goldItem.x, goldItem.y, Color.Yellow);
	}

	for (baddie of baddies) {
		game.setDot(baddie.x, baddie.y, Color.Red);
	}

	for (goodie of goodies) {
		game.setDot(goodie.x, goodie.y, Color.Blue);
	}

	for (teleport of teleports) {
		game.setDot(teleport.x, teleport.y, Color.Violet);
	}

	// updating player location
	game.setDot(player.x, player.y, Color.Black);

	// collecting the item
	for (let i = 0; i < items.length; i++) {
		const item = items[i];
		if (item.x == player.x && item.y == player.y) {
			score++;
			items.splice(i, 1);
			break;
		}
	}

	// collecting the baddie
	for (let i = 0; i < baddies.length; i++) {
		const baddie = baddies[i];
		if (baddie.x == player.x && baddie.y == player.y) {
			timeRemaining--;
			baddies.splice(i, 1);
			break;
		}
	}

	// collecting the goodie
	for (let i = 0; i < goodies.length; i++) {
		const goodie = goodies[i];
		if (goodie.x == player.x && goodie.y == player.y) {
			timeRemaining++;
			goodies.splice(i, 1);
			break;
		}
	}

	// collecting the goldItem
	for (let i = 0; i < goldItems.length; i++) {
		const goldItem = goldItems[i];
		if (goldItem.x == player.x && goldItem.y == player.y) {
			score += 5;
			goldItems.splice(i, 1);
			break;
		}
	}

	// collecting the teleport
	for (let i = 0; i < teleports.length; i++) {
		const teleport = teleports[i];
		if (teleport.x == player.x && teleport.y == player.y) {
			player = {
				x : Math.floor(Math.random() * 24),
				y : Math.floor(Math.random() * 24)
			};
			game.setDot(player.x, player.y, Color.Black);
			teleports.splice(i, 1);
			break;
		}
	}

	game.setText(`Time left: ${timeRemaining}s. Score: ${score}`);

	if (timeRemaining <= 0) {
		let hScore = localStorage.getItem('highScore');
		if (score > hScore) {
			game.setText(`Game over! New hign score!! Final score: ${score}`);
			localStorage.setItem('highScore', score);
		} else {
			game.setText(`Game over! Final score: ${score}. High score: ${hScore}`);
		}

		game.end();
	}
}

function decreaseTimer() {
	timeRemaining--;
	if (timeRemaining == 0) {
		clearInterval(interval);
	}
}

function onKeyPress(direction) {
	if (direction == Direction.Up && player.y > 0) {
		player.y--;
	}
	if (direction == Direction.Down && player.y < 23) {
		player.y++;
	}
	if (direction == Direction.Left && player.x > 0) {
		player.x--;
	}
	if (direction == Direction.Right && player.x < 23) {
		player.x++;
	}
}

let config = {
	create     : create,
	update     : update,
	onKeyPress : onKeyPress
};

let game = new Game(config);
game.run();
