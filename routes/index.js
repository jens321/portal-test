let express = require('express');
var router = express.Router();
let Board = require('../models/board'); 
let socketio = require('../socketio'); 

/* GET home page. */
router.get('/r/:key', function(req, res, next) {

  Board.findOne({ "key": req.params.key }, function(err, board) {
    if (err) throw err;
    if (!board) {

      // make a matrix that represents the colors of every position
      let colorMatrix = []
      for (var i = 0; i < 5; ++i) {
        colorMatrix.push([])
        for (var j = 0; j < 5; ++j) {
          colorMatrix[i].push("#ffffff");
        }
      }

      // create the board, rows and columns were hardcoded to 5
      let board = new Board({
        key: req.params.key,
        colors: colorMatrix,
        col: 5,
        row: 5
      }); 
    
      // save the the board information to the database 
      board.save(function(err, newBoard) {
        if (err) throw err;  
        res.render('index', { title: 'Color Picker', board: newBoard });
      });

    } else {
      res.render('index', { title: 'Color Picker', board: board });
    }
  }); 
});

router.patch('/colors', function(req, res, next) {
  // find the board, then update the colorMatrix
  Board.findOne({ "key": req.body.boardKey }, function(err, currentBoard) {
    let colorMatrix = currentBoard.colors;
    colorMatrix[req.body.row][req.body.col] = req.body.color; 
    
    // find the board by id and update the colorMatrix
    Board.findByIdAndUpdate({ _id: currentBoard._id }, { colors: colorMatrix }, { new: true }, function(err, newBoard) {
      socketio.instance().sockets.in(req.body.boardKey).emit('color_change', [req.body.row, req.body.col, req.body.color]);  
      res.end(); 
    }); 
  });
});

// get the current colorMatrix for the board 
router.get('/colors/reset/:key', function(req, res, next) {
  Board.findOne({ "key": req.params.key }, function(err, board) {
    res.json(board.colors);  
  });
}); 

module.exports = router;
