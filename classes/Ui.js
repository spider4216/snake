function Ui(game)
{
    var self = this;

    this.game = game;

    this.trackBarElement = $('.track-bar');
    this.lvl1 = $('#level1');
    this.lvl2 = $('#level2');
    this.lvl3 = $('#level3');
    this.lvlStatus = $('.lvl-status span');
    this.modalScoreContainer = $('#new-score-modal');

    this.trackBar = function()
    {
        self.trackBarElement.slider({
            max: 2,
            change: self.toSlide
        });
    };

    this.toSlide = function()
    {
        switch (self.trackBarElement.slider('value')) {
            case 0:
               self.lvl1.prop('checked', true);
                self.lvlStatus.text('Легкий');
                break;
            case 1:
                self.lvl2.prop('checked', true);
                self.lvlStatus.text('Средний');
                break;
            case 2:
                self.lvl3.prop('checked', true);
                self.lvlStatus.text('Сложный');
                break;
        }
    };

    this.modalScore = function()
    {
        self.modalScoreContainer.dialog({
            title: 'Рейтинг',
            buttons: [
                {
                    text: "Сохранить",
                    click: self.game.ajaxSave,
                    class: 'save-btn'
                },

                {
                    text: "Закрыть",
                    click: self.game.restart,
                    class: 'cancel-btn'
                }
            ],
            close: self.game.restart,
            resizable: false,
            modal: true,
            autoOpen: false,
            show: {
                effect: "fade",
                duration: 500
            }
        });
    }
}