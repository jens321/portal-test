let colorBoard = $('#color-board');
let animateButton = $('#animate-button'); 

// change color of cell when board is clicked
colorBoard.on('click', '.cell', function (event) {
    $(this).css('background-color', currentColor);
    let row = $(this).parent().attr('data-row');
    let col = $(this).attr('data-col'); 
    $.ajax({
        url: '/colors',
        type: 'patch',
        data: {
            row: row,
            col: col,
            boardKey: boardKey,
            color: currentColor
        }
    });
});

// animate colors when "Go" is clicked
animateButton.on('click', function(event) {
    let cell = $('.cell'); 
    cell.each(function (index, element) {
        $(element).css('background-color', '#ffffff');   
    }); 

    $.ajax({
        url: `/colors/reset/${boardKey}`,
        type: 'get',
        success: function(data) {
            var colors = [];
            for (var i = 0; i < data.length; ++i) {
                for (var j = 0; j < data[i].length; ++j) {
                    colors.push(data[i][j])
                } 
            }  
            var k = 0; 
            let time = 500; 
            cell.each(function (index, element) {
                setTimeout(function() {
                    $(element).css('background-color', colors[k]);   
                    k++; 
                }, time);
                time += 500;     
            }); 
        }
    });

});
