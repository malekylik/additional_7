module.exports = function solveSudoku(matrix) {

  return solveSudoku1(matrix);

 
}


function solveSudoku1(matrix) {
  // your solution


 
  const length = matrix.length;

  function createField(matrix){
    let field = [];

    for(let i = 0; i < length; i++){
      field.push([]);
      for(let k = 0; k < length; k++){
        field[i].push([]);
        field[i][k].push([]);
      for(let j = 0; j < 9; j++){
        if(matrix[i][k]) field[i][k][j] = false;
        else field[i][k][j] = true;
      }
    }
    }

    return field;
  }

  function lastHero(matrix,field){

    for(let i = 0; i < length; i++){
      for(let j = 0; j < length; j++){
        if(matrix[i][j]){
          let value = matrix[i][j];
          for(let k = i; k < length; k++){
            field[k][j][value - 1] = false;
          }
          for(let k = j; k < length; k++){
            field[i][k][value - 1]  = false;
          }
          for(let k = i; k >= 0; k--){
            field[k][j][value - 1] = false;
          }

          for(let k = j; k >= 0; k--){
            field[i][k][value - 1]  = false;
          }


        }
      }
    }
  }
  var debug;



  function insertAnswerValue(matrix,field){
    debug = [];
    for(let i = 0; i < length; i++){
      for(let j = 0; j < length; j++){
        if(!matrix[i][j]){
          let countOfOptions = 0;
          let value = 0;
          for(let k = 0; k < 9; k++){
            if(field[i][j][k]){
              countOfOptions++;
              value = k + 1;
              // console.dir("k : " + k);
              // console.dir("value : " +value);
            }
          }
          // console.dir(value);
          if(countOfOptions == 1){

            if(value === 0){ 
              return;
              console.dir("!countOfOptions : " +countOfOptions);
              console.dir("!value : " +value);
            }
            matrix[i][j] = value;
            
            field[i][j][value - 1] = false;
            debug.push({
              x:i,
              y:j
            });
          }
        }
      }
    }
    // console.dir("!length : " + debug.length);
    
  }

  function checkForEnd(field){
    let count = 0;
    for(let i = 0; i < length; i++){
      for(let j = 0; j < length; j++){
        for(let k = 0; k < 9; k++){
          if(field[i][j][k]){
            count++;
          }
        }
      }
    }
    return !!count;
  }

  function checkSquare(matrix,field){

    for(let cof = 0; cof < 9; cof++){
      let presentValue = [];
      for(let i = Math.floor(cof / 3) * 3; i < (Math.floor(cof / 3) + 1) * 3; i++){
        for(let j = (cof % 3 * 3) ; j < 3 * (cof % 3 + 1); j++){
          if(matrix[i][j]){
            presentValue.push(matrix[i][j]);
          }
        }      
      }

      for(let i = Math.floor(cof / 3) * 3; i < (Math.floor(cof / 3) + 1) * 3;i++){
        for(let j = (cof % 3 * 3) ; j < 3 * (cof % 3 + 1); j++){
          for(let k = 0; k < presentValue.length; k++){
            field[i][j][presentValue[k] - 1] = false;
          }
        }      
      }
    }



  }

  function hiddenCouples(field){

    let hiddenRows = [];

    for(let i = 0; i < length; i++){
      hiddenRows.push([]);
      for(let j = 0; j < length; j++){
        hiddenRows[i][j] = 0;
      }
    }

      for(let i = 0; i < length; i++){
        for(let j = 0; j < length; j++){
          for(let k = 0; k < length; k++){
            if(field[i][j][k]){
              hiddenRows[i][k]++;            
            }
          }
        }
    }

    for(i = 0;i < hiddenRows.length; i++){
      for(let k = 0; k < length; k++){
        if(hiddenRows[i][k] === 1){
          for(let j = 0; j < length; j++){
            if(field[i][j][k] === true){
              for(let h = 0; h < length; h++){
                if(h !== k){
                  field[i][j][h] = false;
                }
              }
            }
          }
        }
      }
    }

    let hiddenColumns = [];

    for(let i = 0; i < length; i++){
      hiddenColumns.push([]);
      for(let j = 0; j < length; j++){
        hiddenColumns[i][j] = 0;
      }
    }

    for(let i = 0; i < length; i++){
      for(let j = 0; j < length; j++){
        for(let k = 0; k < length; k++){
          if(field[j][i][k]){
            hiddenColumns[i][k]++;            
          }
        }
      }
  }

  for(i = 0;i < hiddenColumns.length; i++){
    for(let k = 0; k < length; k++){
      if(hiddenColumns[i][k] === 1){
        for(let j = 0; j < length; j++){
          if(field[j][i][k] === true){
            for(let h = 0; h < length; h++){
              if(h !== k){
                field[j][i][h] = false;
              }
            }
          }
        }
      }
    }
  }

  let square = [];

  for(let i = 0; i < length; i++){
    square.push([]);
    for(let j = 0; j < length; j++){
      square[i][j] = 0;
    }
  }

  for(let cof = 0; cof < 9; cof++){
    for(let i = Math.floor(cof / 3) * 3; i < (Math.floor(cof / 3) + 1) * 3; i++){
      for(let j = (cof % 3 * 3) ; j < 3 * (cof % 3 + 1); j++){
        for(let k = 0; k < length; k++){
          if(field[i][j][k]){
            // console.dir("i " + i + " j " + j);
            square[cof][k]++;            
          }
        }
      }      
    }
  }

  for(let cof = 0; cof < 9; cof++){
    for(let k = 0; k < length; k++){
      if(square[cof][k] === 1){


        for(let i = Math.floor(cof / 3) * 3; i < (Math.floor(cof / 3) + 1) * 3; i++){
          for(let j = (cof % 3 * 3) ; j < 3 * (cof % 3 + 1); j++){
              if(field[i][j][k]){
                for(let h = 0; h < length; h++){
                  if(h !== k){
                    field[i][j][h] = false;
                  }
                }
            }
          }      
        }

      }
    }
  }
  }


  let field = createField(matrix);

  do{
    lastHero(matrix,field);
    checkSquare(matrix,field);
    hiddenCouples(field);
    insertAnswerValue(matrix,field);
  }while(checkForEnd(field) && !!debug.length);

  
  return matrix;


}