
export class Example extends Phaser.Scene{
    welcomeTexts = ["Welcome to game! In this module, we will learn good hygiene practices and how to determine whether or not you are fit to volunteer safely.",
         "Let's start by making sure this volunteer is ready to go!", 
         "It's important to stay home when you are not feeling well. Let's see if the volunteer is fit for the job today!"];
    symptomTexts = {
        "I'm nauseous": "no",
        "I have a cold": "no",
        "I have a fever": "no",
        "I'm great": "yes"
    };
    popUpTexts = [ "aaaa", "bbbb", "cccc", "dddd"
    ];

     constructor ()
    {
        super('Example');
    }

    create ()
    {
        this.bg1 = this.add.image(-5,0, 'bg1').setOrigin(0).setScale(0.70);
        this.guy= this.add.image(-125,-155, 'guy').setOrigin(0).setScale(0.9);
        this.fever= this.add.image(700,50, 'fever').setOrigin(0).setScale(0.9).setVisible(false);
        this.runnyNose= this.add.image(700,50, 'runnyNose').setOrigin(0).setScale(0.9).setVisible(false);
        this.nausea= this.add.image(700,50, 'nausea').setOrigin(0).setScale(0.9).setVisible(false);
        this.xMark = this.add.image(450, 350, 'x').setScale(0.3).setInteractive({ pixelPerfect: true}).setVisible(false);
        this.check = this.add.image(150,350,'check').setScale(0.3).setInteractive().setVisible(false);
    
        this.erinKeys = [this.nausea, this.runnyNose, this.fever, this.guy, this.guy];

        this.instructContainer = this.add.container(this.bg1.width / 13, this.bg1.height /14);
        this.instructRect = this.add.rectangle(0,0, this.bg1.width / 2, this.bg1.height /2, 0xFFFFFF).setOrigin(0).setStrokeStyle(6, 0x000000,1).setInteractive();
        this.instruct = this.add.text(76,100, "In the following game, the volunteer will share different symptoms with you, and you will determine if they should volunteer or stay home.\n\nIf they should stay home, tap the red X, if they can volunteer, tap the green check.", 
            {wordWrap: 
                {width: this.instructRect.width * 0.9}, 
                color: '#000',
                fontSize: '40px',
            }).setOrigin(0);
        this.instructContainer.setSize(this.instructRect.width, this.instructRect.height);
        this.instructContainer.add([this.instructRect, this.instruct]);
        this.instructContainer.setVisible(false);

        this.textbox = this.add.container(-55, -95);
        this.textboxImage = this.add.image(0,0, 'textbox').setOrigin(0).setInteractive();
        this.textboxText = this.add.text(45,45, this.welcomeTexts[0], 
            {wordWrap: 
                {width: this.textboxImage.width * 0.30}, 
                color: '#000'
            }).setOrigin(0);
        
        this.textbox.add(this.textboxImage, this.textboxText);
        this.textbox.setScale(0.40);

        this.i=1; 
        this.textboxImage.on('pointerdown', () => {
            if(this.i > 2){
                this.textboxText.setVisible(false);
                this.textboxImage.setVisible(false);
                this.instructContainer.setVisible(true);
                this.textboxImage.disableInteractive();
                return;
            }
            this.textboxText.setText(this.welcomeTexts[this.i]);
            this.i++;
        });
        this.instructRect.on('pointerdown', () => {
            this.instructContainer.setVisible(false);
            this.textboxText.setText(Object.keys(this.symptomTexts)[this.j]);
            this.textboxText.setVisible(true);
            this.textboxImage.setVisible(true);
            this.guy.setVisible(false);
            this.erinKeys[this.j].setVisible(true);
            this.check.setVisible(true);
            this.xMark.setVisible(true);
            this.instructRect.disableInteractive();
        });
  
        this.j = 0;
        this.popUpContainer = this.add.container(this.bg1.width / 13, this.bg1.height /14);
        this.popUpRect = this.add.rectangle(0,0, this.bg1.width / 2, this.bg1.height /2, 0xFFFFFF).setOrigin(0).setStrokeStyle(6, 0x000000,1).setInteractive();
        this.popUpText = this.add.text(76,100, this.popUpTexts[this.j], 
            {wordWrap: 
                {width: this.popUpRect.width * 0.9}, 
                color: '#000',
                fontSize: '40px',
            }).setOrigin(0);
        this.popUpContainer.setSize(this.popUpRect.width, this.popUpRect.height);
        this.popUpContainer.add([this.popUpRect, this.popUpText]);
        this.popUpContainer.setVisible(false);


        this.check.on('pointerdown', () => {
        if (Object.values(this.symptomTexts)[this.j] == "yes") {
            this.erinKeys[this.j].setVisible(false);
            this.j++;
        if (this.j >= this.erinKeys.length - 1) {
            this.erinKeys[this.j].setVisible(true);
            this.check.disableInteractive();
            this.check.setVisible(false);
            this.xMark.disableInteractive();
            this.xMark.setVisible(false);
            this.textboxText.setText("transition msg");
        } else {
            this.erinKeys[this.j].setVisible(true);
            this.popUpText.setText(this.popUpTexts[this.j]);
            this.textboxText.setText(Object.keys(this.symptomTexts)[this.j]);
        }
    } else {
        this.popUpContainer.setVisible(true);
        this.popUpRect.setInteractive();
    }
});

    this.xMark.on('pointerdown', () => {
    if (Object.values(this.symptomTexts)[this.j] == "no") {
        this.erinKeys[this.j].setVisible(false);
        this.j++;

        if (this.j >= this.erinKeys.length - 1) {
            this.erinKeys[this.j].setVisible(true);
            this.check.disableInteractive();
            this.check.setVisible(false);
            this.xMark.disableInteractive();
            this.xMark.setVisible(false);
            this.textboxText.setText("transition msg");
        } else {
            this.erinKeys[this.j].setVisible(true);
            this.popUpText.setText(this.popUpTexts[this.j]);
            this.textboxText.setText(Object.keys(this.symptomTexts)[this.j]);
        }
    } else {
        this.popUpContainer.setVisible(true);
        this.popUpRect.setInteractive();
    }
});

        this.popUpRect.on('pointerdown', () => {
            this.popUpContainer.setVisible(false);
            this.popUpRect.disableInteractive();
        });

        this.text = this.add.text(320, 128, 'Please set your\nphone to landscape', { font: '48px Courier', fill: '#00ff00', align: 'center' }).setOrigin(0.5);
        this.checkOriention();
        this.scale.on('resize', this.checkOriention, this);    
}

checkOriention ()
{
    if (window.innerHeight > window.innerWidth)
    {
        this.textbox.alpha = 0.2;
        this.text.setVisible(true);
    }
    else
    {
        this.textbox.alpha = 1;
        this.text.setVisible(false);
    }
}

}

