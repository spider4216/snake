function Animation(game)
{
    var self = this;

    this.game = game;
    this.modal = $('.score-records-modal');
    this.layout = $('.layout');

    this.end = function()
    {
        self.game.matrix.container.addClass('frame-end');
    };

    this.modalHide = function()
    {
        self.modal.fadeOut(300, function() {
            self.layout.fadeOut(300);
        });
    };

    this.modalShow = function()
    {
        self.layout.fadeIn(300, function() {
            self.modal.fadeIn(300);
        });
    }
}