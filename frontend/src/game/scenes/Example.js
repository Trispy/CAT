
export class Example extends Phaser.Scene{
    text;
    textbox;
    textboxText;
    textboxImage;
    texts = ["1", "2", "3"];

     constructor ()
    {
        super('Example');
    }

    create ()
    {
        this.bg1 = this.add.image(-5,0, 'bg1').setOrigin(0).setScale(0.70);
        this.guy= this.add.image(-125,-155, 'guy').setOrigin(0).setScale(0.9);

        this.textbox = this.add.container(-55, -95);
        this.textboxImage = this.add.image(0,0, 'textbox').setOrigin(0).setInteractive();
        this.textboxText = this.add.text(45,45, 'Lorem ipsum (/ˌlɔː.rəm ˈɪp.səm/ LOR-əm IP-səm) is a dumajfbsjfnsijfwb flahja gljbaflhbafjhbahbaljhbflajfhajlhbljfbaljb', 
            {wordWrap: 
                {width: this.textboxImage.width * 0.35}, 
                color: '#000'
            }).setOrigin(0);


        this.i=0; 
        this.textboxImage.on('pointerdown', () => {
            if(this.i > 2){
                return;
            }
            this.textboxText.setText(this.texts[this.i]);
            this.i++;
        });

        this.textbox.add(this.textboxImage, this.textboxText);
        this.textbox.setScale(0.40);

        this.text = this.add.text(320, 128, 'Please set your\nphone to landscape', { font: '48px Courier', fill: '#00ff00', align: 'center' }).setOrigin(0.5);
        this.checkOriention();
        this.scale.on('resize', this.checkOriention, this);    
}

checkOriention ()
{
    if (window.innerHeight > window.innerWidth)
    {
        console.log('portrait');
        this.textbox.alpha = 0.2;
        this.text.setVisible(true);
    }
    else
    {
        console.log('landscape');
        this.textbox.alpha = 1;
        this.text.setVisible(false);
    }
}

}

