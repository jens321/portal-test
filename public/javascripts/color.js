$('#color-board').on('click', '.cell', function (event) {
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
