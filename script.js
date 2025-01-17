//configurer le canvas
//le canvas est une zone de dessin html5 qui permet de dessiner des formes, des images, du texte, etc. en 2d ou 3d

//On sélmectionne l'élément dans le DOM

const canvas = document.querySelector('canvas');

//on définit le contexte '2D' pour le canvas
let ctx = canvas.getContext('2d')

//on définit la largeur et la hauteur du canvas

// en fonction de la largeur et de la hauteur de la fenetre

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

//fonction pour génére un nombre aléatoire entre min et mac

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//fonction qui génére une coleur aléatoire en rgb

function randomColor() {
    return `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`;
}

//on crée une class Ball

class Ball {
    //on va définir un constructeur pour y ajouter des paramètres
    constructor(x, y, velx, vely, color, size) {
        this.x = x; //position x de la ball
        this.y = y; // position y de la ball
        this.velx = velx;
        this.vely = vely;
        this.color = color;
        this.size = size;
    }

    //méthode draw pour dessiner la balle
    draw() {
        //on commence un nouveau chemin
        ctx.beginPath();
        //affilier la couleur à la ball
        ctx.fillStyle = this.color;
        //on dessine un  cercle
        ctx.arc(
            this.x, //position horizontale 
            this.y, // position verticale
            this.size,
            0, //angle de départ
            2 * Math.PI //angle de fin
        );
        //on définit la couleur du remplissage
        ctx.fill();
    }

    //méthode qui permet de mettre à jour la direction de la balle 
    //lorsqu'elle touche un bord du canva
    update() {
        //détecte le bord de l'écran à droite
        if ((this.x + this.size) >= width) {
            this.velx = -(this.velx);
        }
        //détecte le bord de l'écran à gauche
        if ((this.x - this.size) <= 0) {
            this.velx = Math.abs(this.velx);
        }

        //détecte le bord de l'écran à haut
        if ((this.y + this.size) >= height) {
            this.vely = -(this.vely);
        }
        //détecte le bord de l'écran à bas
        if ((this.y - this.size) <= 0) {
            this.vely = Math.abs(this.vely);
        }

        //on ajoute la vitesse à la position

        this.x += this.velx; // this.x = this.x + this.velx
        this.y += this.vely;
    }

    //*méthode qui permet de détecter les collisions entre les balles

    collisionDetection() {
        //on parcours toute les balls du tableau
        for (const ball of balls) {
            //on vérifie que la balle ne rentre pas en collision avec elle-meme
            if (this !== ball) { //si ce n'est pas la même balle
                const dx = this.x - ball.x; //diffèrence de position x
                const dy = this.y - ball.y; //diffèrence de position y
                const distance = Math.sqrt(dx * dx + dy * dy); //ditance entre les deux balles

                if (distance < this.size + ball.size) { //si les balles se touchent
                    //on inverse les vitesses
                    this.velx = -this.velx;
                    this.vely = -this.vely;
                    ball.velx = -ball.velx;
                    ball.vely = -ball.vely;

                    ball.color = this.color = randomColor();//on change la couleur des balles
                }
            }
        }
    }
}

//on crée un tableau vide pour stocker les balles

const balls = [];

//on crée une boucle pour générer un nombre de balles définit

while (balls.length < 20) {
    // on définit deux constantes6986fc7121c446df09457cb2851105da.txt
    const size = random(10, 20);//taille de la balle
    const vitesseX = random(-2, 3); //vitesse de la balle horizontale
    const vitesseY = random(-1, 4); //vitesse de la balle verticale

    //on va instancie une balle et on lui donne ses paramètres

    const ball = new Ball(  // new Class Ball (avec une majuscule qui définitq que c'est une classe)
        //position x de la balle
        random(size, width - size),
        //position y de la ball
        random(size, height - size),
        //vitesse horizontale
        vitesseX === 0 ? 1 : vitesseX, //si vitesse x = 0 alors on lui donne 1 sinon ce sera vitesse x
        //vitesse verticale
        vitesseY === 0 ? 1 : vitesseY,
        //couleur de la balle
        randomColor(),
        size
    );
    //on ajoute la ball au tableau
    balls.push(ball);
}

console.log(balls);

//fonction qui permet de dessiner le canvas
function loop() {
    //on définit la couleur du fond du canvas
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    //on définit (dessine) le cadre du canvas
    ctx.fillRect(0, 0, width, height); //position x,positiony, largeur, hauteur

    //on parcours les balles du tableau

    for (const ball of balls) {
        //on dessine la ballee),
        //position y de la ball
        ball.draw();
        //on met à jour la direction de la balle
        ball.update();
        //on détecte les collisions
        ball.collisionDetection();
    }
    //on appelle la fonction loop à chaque frame
    requestAnimationFrame(loop);
}
loop();