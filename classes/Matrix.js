function Matrix(row, col)
{
    var self = this;

    //контейнер матрицы
    this.container = $('#matrix');
    //строки
    this.row = row;
    //столбцы
    this.col = col;
    //html матрицы
    this.matrixHtml = '';

    //стили для контейнера
    this.container.css({
        'width' : this.col * 20,
        'height' : this.row * 20
    });

    //создание матрицы
    this.create = function()
    {
        for (var i = 0; i < self.row; i++) {
            for (var b = 0; b < self.col; b++) {
                self.matrixHtml += '<div id="'+i+'-'+b+'"></div>';
            }
        }

        self.container.append(self.matrixHtml);
    }
}