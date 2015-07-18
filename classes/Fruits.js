function Fruits(game)
{
    var self = this;

    this.game = game;
    this.position = [];
    this.packFuits = [
        'apple',
        'banana',
        'garnet',
        'mandarin',
        'pine',
        'strawberry'
    ];
    this.currentClass = '';

    //Рекурсивный метод создания фрукта
    this.create = function()
    {
        var row = Math.floor(Math.random() * ((game.matrix.row -1)));
        var col = Math.floor(Math.random() * ((game.matrix.col -1)));

        var indexFruit = Math.floor(Math.random() * ((self.packFuits.length -1)));

        var cell = $('#' + row + '-' + col);

        //Если позиция фрукта совпала со змейкой - пересоздаем
        if (cell.hasClass('body-snake') || cell.hasClass('head-snake')) {
            return self.create();
        }

        self.currentClass = 'fruit-' + self.packFuits[indexFruit];

        cell.addClass(self.currentClass);
    };
}