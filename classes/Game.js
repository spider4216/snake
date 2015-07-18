function Game(options)
{
    var self = this;

    this.snake = {};
    this.fruit = {};
    this.animation = {};
    this.ui = {};
    this.matrix = options.matrix;
    this.speed = 200;
    this.timerId = '';
    this.scoreCount = 0;

    this.score = $('.score .count');
    this.modal = $('#new-score-modal');
    this.summary = $('.summary');
    this.scoresLink = $('#all-records');
    this.tableRecords = $('.table-records');
    this.tabsContainer = $('#tabs');

    this.startBtn = $('.start');

    this.run = function()
    {
        self.snake = new Snake(self, 3,5);
        self.fruit = new Fruits(self);
        self.animation = new Animation(self);
        self.ui = new Ui(self);

        self.startBtn.on('click', self.prepare);
        self.scoresLink.on('click', self.ajaxGetRecords);

        self.tabsContainer.tabs();
        self.ui.trackBar();
        self.ui.modalScore();
    };

    this.prepare = function()
    {
        var level = $('.lvl:checked').val();

        switch (level) {
            case '1':
                self.speed = 200;
                break;
            case '2':
                self.speed = 100;
                break;
            case '3':
                self.speed = 50;
                break;
        }

        $('.tools input').attr('disabled', 'disabled');
        self.start();
    };

    this.start = function()
    {
        self.snake.create();
        self.fruit.create();

        $(document).on('keydown', self.snake.changeDirection);
        self.autoMove(self.speed);
    };

    this.end = function()
    {
        //alert('Game Over');
        //self.animation.end();
        self.modal.find('.count-ajax').text(self.scoreCount);
        self.modal.dialog('open');
        //self.animation.modalShow();
    };

    this.autoMove = function(speed)
    {
        self.timerId = setInterval(self.snake.move, speed);
    };

    this.restart = function()
    {
        //self.animation.modalHide();
        setTimeout(function() {
            location.reload();
        },300);
    };

    this.ajaxSave = function()
    {
        var name = self.modal.find('#name').val();
        $.ajax({
            url: '/backend/scores.php',
            type: 'post',
            data: {score: self.scoreCount, name: name},
            success: function(result) {
                if ('true' == result) {
                    self.summary.find('p').text('Рекорд успешно сохранен');
                } else {
                    self.summary.find('p').text('Произошла ошибка при сохранении рекорда');
                }
            }
        });

        self.modal.find('#name').attr('disabled', 'disabled');
        $('.save-btn').attr('disabled', true).addClass('ui-state-disabled');
    };

    this.ajaxGetRecords = function()
    {
        $.ajax({
            url: '/backend/getScores.php',
            dataType: 'json',
            type: 'post',
            success: function(result) {
                self.tableRecords.html('');

                var data = JSON.parse(result);

                for (var i = 0; i< data.length; i++) {
                    self.tableRecords.prepend('<div></div>');
                    self.tableRecords.find('div').eq(0).append('<span class="name">'+ data[i].name +'</span>');
                    self.tableRecords.find('div').eq(0).append('<span>'+ new Array(40).join('_') +'</span>');
                    self.tableRecords.find('div').eq(0).append('<span class="score">'+ data[i].score +'</span>');
                }
            }
        });

        return false;
    }
}