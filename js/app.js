document.addEventListener('DOMContentLoaded', function(){
   console.log('Hello World!');

   //creating object Game of Life
    var GameOfLife = function(boardWidth, boardHeight){
        this.width = boardWidth;
        this.height = boardHeight;

        this.board = document.querySelector('#board');

        this.cells = [];

        var playBtn = document.querySelector('#play');
        var pauseBtn = document.querySelector('#pause');

        this.startGame = function (){
          newGame.createBoard();
          newGame.firstGlider();
        };

        this.createBoard = function (){
            this.board.style.width = this.width * 10 + "px";
            this.board.style.height = this.height *10 + "px";
            var newBoard = this.width * this.height;

            for (i=0; i<newBoard; i++){
                var newDivs = document.createElement('div');
                board.appendChild(newDivs);
            }
            this.cells = document.querySelectorAll('#board div');
            //console.log(this.cell);

            this.cells.forEach(function(element){
                element.addEventListener('click', function (event) {
                    //console.log('hi');
                    element.classList.toggle('live');
                });
            });

        this.getCell = function(x, y){
            var index = x + y * this.width;

            return this.cells[index];

         };

        this.getCellState = function(x, y){
            if(typeof this.getCell(x, y) === "undefined"){
                return null;
            }
            if(this.getCell(x, y).classList.contains("live")) {
                return "live";
            } else {
                return "dead";
            }
        };

        //code to add/remove class of the cells
        this.setCellState = function(x, y, state){
            if (state === "live"){
                this.getCell(x, y).classList.add("live");
            } else if (state === "dead") {
                this.getCell(x, y).classList.remove("live");
            }
        };

        //set the initial position of the glider in the top left corner of the board
        this.firstGlider = function(){
            this.setCellState(0, 0, "live");
            this.setCellState(0, 2, "live");
            this.setCellState(1, 1, "live");
            this.setCellState(1, 2, "live");
            this.setCellState(2, 1, "live");

        };

        //setting future state of the cell
        this.computeCellNextState = function(x, y) {
            var cellSiblings = 0;

            if (this.getCellState(x-1, y-1) === "live"){
             cellSiblings++;
            }
            if (this.getCellState(x, y-1) === "live"){
             cellSiblings++;
            }
            if (this.getCellState(x+1, y-1)=== "live"){
                cellSiblings++;
            }
            if (this.getCellState(x-1, y) === "live"){
                cellSiblings++;
            }
            if (this.getCellState(x+1, y) === "live"){
                cellSiblings++;
            }
            if (this.getCellState(x-1, y+1) === "live"){
                cellSiblings++;
            }
            if (this.getCellState(x, y+1)=== "live"){
                cellSiblings++;
            }
            if (this.getCellState(x+1, y+1) === "live") {
                cellSiblings++;
            }

        //console.log(cellSiblings);

            var cellsState = this.getCellState(x,y);
            // console.log(cellState);
            if(cellsState === "live" && cellSiblings < 2)
                return 0;
            else if ((cellsState === "live" && cellSiblings === 2) || (cellsState === "live" && cellSiblings === 3))
                return 1;
            else if (cellsState === "live" && cellSiblings > 3)
                return 0;
            else if (cellsState === "dead" && cellSiblings === 3)
                return 1;
            else if (cellsState === "dead")
                return 0;

        };

        //setting future state of the board
        this.computeNextGeneration = function() {
            this.nextGenerationArr = [];
            for (j = 0; j < this.cells.length; j++){
                var x = j % boardWidth;
                var y = Math.floor(j / boardHeight);

                this.nextGenerationArr.push(this.computeCellNextState(x, y));
            }
            return this.nextGenerationArr;
        };

        this.printNextGeneration = function() {
            var nextCells = this.cells;
            for(var i = 0; i < this.cells.length; i++){
                if(this.nextGenerationArr[i] === 1 && nextCells[i].getAttribute("class") !== "live"){
                    nextCells[i].classList.add("live");
                } else if(this.nextGenerationArr[i] === 0 && nextCells[i].getAttribute("class") === "live"){
                    nextCells[i].classList.remove("live");
                }
            }
        }

    };

        //setting interval and adding event listeners to the button play and button pause
        var self = this;
        var interval;
          playBtn.addEventListener('click', function (event) {
            interval = setInterval(function () {
            self.computeCellNextState();
            self.computeNextGeneration();
            self.printNextGeneration();
          }, 100);
        });

        pauseBtn.addEventListener('click', function (event) {
          clearInterval(interval);
        })

    };
    //variables to store the width and height of the border indicated by the user

    var width = prompt("Please indicate the width of the board:");
    var height = prompt("Please indicate the height of the border:");
    var newGame = new GameOfLife(height, width);
    // console.log(newGame);
    newGame.startGame();

});
