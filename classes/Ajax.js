function Ajax()
{
    var self = this;

    this.liveSearchField = $('#search_points');
    this.outputContentContainer = $('.output-content');

    self.searchInit = function()
    {
        self.liveSearchField.on('keyup', self.liveSearch);
    };

    this.liveSearch = function()
    {
        self.outputContentContainer.html('');
        var name = self.liveSearchField.val();

        $.ajax({
            url: '/backend/searchScores.php',
            type: 'post',
            //dataType: 'json,',
            data: {name: name},
            success: function(result) {
                if ('' != result) {
                    var res = JSON.parse(result);

                    for(var i = 0; i < res.length; i++) {
                        self.outputContentContainer.prepend('<div></div>');
                        self.outputContentContainer.find('div').eq(0).append('<span>'+res[i].name+'</span>');
                        self.outputContentContainer.find('div').eq(0).append('<span>'+ new Array(40).join('_') +'</span>');
                        self.outputContentContainer.find('div').eq(0).append('<span>'+res[i].score+'</span>');
                    }
                }
            }
        });
    };
}