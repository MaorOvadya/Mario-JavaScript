function isTouching(a, b) {
	const aRect = a.getBoundingClientRect();
	const bRect = b.getBoundingClientRect();

	return !(
		aRect.top + aRect.height < bRect.top ||
		aRect.top > bRect.top + bRect.height ||
		aRect.left + aRect.width < bRect.left ||
		aRect.left > bRect.left + bRect.width
	);
}

const init = () => {
    //get the avatar
    const avatar = document.querySelector("#avatar")
    //get the coin
    const coin = document.querySelector("#coin")
    //score board
    const h1 = document.createElement('h1')
    let count = 0;
    h1.innerHTML = `Score: ${count}`
    h1.style.color = 'red'
    document.body.appendChild(h1);
    //audio
    const walkingAudio = new Audio('/audio/smw_footstep.wav')
    const coinAudio = new Audio('/audio/smw_coin.wav')

    moveCoin();
    window.addEventListener('keyup', function(e) {

        const avatarBounding = avatar.getBoundingClientRect()
        const coinaBounding = coin.getBoundingClientRect()
        const height = window.innerHeight - 50;
        const width = window.innerWidth - 50;

        if(e.key === 'ArrowDown' || e.key === 'Down'){
            walkingAudio.play()
            if (height > avatarBounding.bottom){
                 moveVertical(avatar, 50); 
            } 
        }
        else if(e.key === 'ArrowUp' || e.key === 'Up'){
            walkingAudio.play()
            if (50 < avatarBounding.top) {
                moveVertical(avatar, -50);
            } 
        }
        else if(e.key === 'ArrowLeft' || e.key === 'Left'){
            walkingAudio.play()
            avatar.style.transform = 'scale(-1,1)';
            if (50 < avatarBounding.left) {
                moveHorizontal(avatar, -50);  
            }
        }
        else if(e.key === 'ArrowRight' || e.key === 'Right'){
            walkingAudio.play()
            avatar.style.transform = 'scale(1,1)';
            if (width > avatarBounding.right) {
                moveHorizontal(avatar, 50);
            }
        }

        if(isTouching(avatar,coin)) {
            coinAudio.play()
            count ++;
            h1.innerText = `Score: ${count}`;
            h1.style.color = 'green';
            moveCoin(); 
        }
    });
}

const moveVertical = (element, amount) => {
    const currTop = extractPos(element.style.top);
    element.style.top = `${currTop + amount}px`;
}
const moveHorizontal = (element, amount) => {
    const currLeft = extractPos(element.style.left);
    element.style.left = `${currLeft + amount}px`;

}

const extractPos = (position) => {
    if(!position) return 100;
    return parseInt(position.slice(0, -2))
}
const moveCoin = () => {
    const x = Math.floor(Math.random() * window.innerWidth - 50)
    const y = Math.floor(Math.random() * window.innerHeight - 50)

    coin.style.top = `${x}px`;
    coin.style.left = `${y}px`;

}

init();
