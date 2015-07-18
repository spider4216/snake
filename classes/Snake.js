function Snake(game, row, col)
{
    var self = this;

    //Направление змейки
    this.direction = 'right';
    //id головы по умолчанию
    this.head = row + '-' + col;
    //id тела по умолчанию
    this.body = [(row + '-' + (col-1)), (row + '-' + (col-2))];
    this.newBody = row + '-' + col;
    var KEY_LEFT = 37;
    var KEY_RIGHT = 39;
    var KEY_UP = 38;
    var KEY_DOWN = 40;

    this.create = function()
    {
        $('#' + self.body[0]).addClass('body-snake');
        $('#' + self.body[1]).addClass('body-snake');
        $('#' + self.head).addClass('head-snake');
    };

    //Алгоритм движения позаимствован у Алексея Алехина. Показался очень гениальным
    this.move = function(e)
    {
        self.newBody = $('#' + self.head);

        //self.changeDirection(e);

        switch (self.direction) {
            case 'left':
                self.head = self._numToId(self._idToNum(self.head, 'row'), self._idToNum(self.head, 'col') - 1);
                break;
            case 'right':
                self.head = self._numToId(self._idToNum(self.head, 'row'), self._idToNum(self.head, 'col') + 1);
                break;
            case 'up':
                self.head = self._numToId(self._idToNum(self.head, 'row') - 1, self._idToNum(self.head, 'col'));
                break;
            case 'down':
                self.head = self._numToId(self._idToNum(self.head, 'row') + 1, self._idToNum(self.head, 'col'));
                break;
        }

        //Проверка, не столкнулись ли с границей
        if (true === self.checkBumping()) {
            game.end();
            self.stop();
            return false;
        }

        if (true == self.checkBumpingMySelf()) {
            game.end();
            self.stop();
            return false;
        }

        var newHead = $('#' + self.head);
        if (newHead.hasClass(game.fruit.currentClass)) {
            self.eatFruit();
        }

        //отладочная информация
        var log = {
            old: this.newBody,
            news: self.head
        };

        console.log(log);

        //Убираю старую голову и ставою вместо нее тело
        self.newBody.removeClass('head-snake').addClass('body-snake');
        //добавляю новую голову
        newHead.addClass('head-snake');

        //кдаляю хвост
        var bodyHide = $('#' + self.body.pop());
        bodyHide.removeClass('body-snake');
        //расширяю массив тела
        self.body.unshift(self.newBody.attr('id'));

    };

    this.changeDirection = function(e)
    {
        //Здесь блокирую обратный путь
        if ((e.keyCode == KEY_RIGHT && self.direction == 'left') ||
            (e.keyCode == KEY_LEFT && self.direction == 'right') ||
            (e.keyCode == KEY_UP && self.direction == 'down') ||
            (e.keyCode == KEY_DOWN && self.direction == 'up')) {
            return false;
        }

        switch (e.keyCode) {
            case KEY_LEFT:
                self.direction = 'left';
                break;
            case KEY_RIGHT:
                self.direction = 'right';
                break;
            case KEY_UP:
                self.direction = 'up';
                break;
            case KEY_DOWN:
                self.direction = 'down';
                break;
        }
    };

    //Проверка на столкновение с границей матрицы
    this.checkBumping = function()
    {
        console.log(self._idToNum(self.head, 'row'), game.matrix.row);
        if ((self._idToNum(self.head, 'row') >= game.matrix.row) ||
            (isNaN(self._idToNum(self.head, 'row'))) ||
            (self._idToNum(self.head, 'col') >= game.matrix.col) ||
            (isNaN(self._idToNum(self.head, 'col')))) {
            return true
        }

        return false;
    };

    //Проверка стлокновения с самим собой
    this.checkBumpingMySelf = function()
    {
        var newHead = $('#' + self.head);
        //console.log(newHead.attr('class'));
        if (newHead.hasClass('body-snake')) {
            return true;
        }

        return false;
    };

    this.eatFruit = function()
    {
        game.scoreCount = parseInt(game.score.text()) + 1;
        game.score.text(game.scoreCount);


        $('div').removeClass(game.fruit.currentClass);
        self.body.unshift(self.newBody.attr('id'));
        game.fruit.create();
    };

    //возвращает номер указанного поля из id
    this._idToNum = function(id, fieldName)
    {
        var arr = id.split('-');

        if ('row' == fieldName) {
            return parseInt(arr[0]);
        } else if('col' == fieldName) {
            return parseInt(arr[1]);
        }

        return false;
    };

    //возвращает id
    this._numToId = function (row, col) {
        return row + '-' + col;
    };

    this.stop = function()
    {
        clearInterval(game.timerId);
    }
}