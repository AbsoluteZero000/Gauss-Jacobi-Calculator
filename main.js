let matrix;
let solution;
let errort=0.001;
let counter=0;
let row_sum ;
let max_in_row ;
let co_ef_swapper;
let sol_swapper;
let counter2=0;



function printmatrix(){
console.log(matrix);
console.log(solution);
}



function printOnPage(text){
  let elm = document.getElementById( 'answer' ),
  div = document.createElement( 'div' );
  div.textContent = text ;
  elm.appendChild( div );
}


function arrangerows()
{
    for (let j = 0; j < matrix.length; j++) {
        for (let i = 0; i < matrix.length; i++) {
            if (matrix[i][i] < matrix[j][i]) {
                //Swap co-efficient row by pointers
                co_ef_swapper = matrix[i];
                matrix[i] = matrix[j];
                matrix[j] = co_ef_swapper;

                sol_swapper = solution[i]; //Swap solution by values
                solution[i] = solution[j];
                solution[j] = sol_swapper;
            }
        }

    }

}


function calculate(){
  

  document.getElementById("answer").innerHTML = "";
    //////////////////////////////////////input and converting into a 2d array/////////////////////////////////////////////////
  matrix=document.getElementById("Mat").value;
  solution=document.getElementById("Sol").value;
  errort=document.getElementById("Error").value;
  solution=solution.split("\n");
  matrix=matrix.split("\n");
  for (let i=0;i<matrix.length;i++){
  matrix[i]=matrix[i].split(" ");}
 
//////////////////////////////////////check for errors////////////////////////////////////////////////////////////////////////




for (let i=0;i<matrix.length;i++){
if (matrix.length != matrix[i].length )
{ alert("Please enter a valid matrix");
  return null;
}
if (matrix.length!=solution.length){
  alert("please enter a valid solution ");
  return null;
}
if (isNaN(solution[i])){
  alert ("please enter a valid solution");
  return null;
}
for (let j=0;j<matrix.length;j++){
  if (isNaN(matrix[i][j])){
    alert ("please enter a valid matrix");
    return null;
  }

}
}


/////////////////////////////////////conversion from string to number/////////////////////////////////////////////////////// 
for (let i=0;i<matrix.length;i++){
  for(let j=0;j<matrix.length;j++){
 matrix[i][j]=Number(matrix[i][j]);}


}

for (let i=0;i<matrix.length;i++){
  solution[i]=Number(solution[i]);

}
//Matrix validity check
for(let i = 0; i < matrix.length; i++)
{
    row_sum = 0;
    max_in_row = matrix[i][0];

    for(let j = 0; j < matrix.length; j++)
    {
        row_sum = row_sum + matrix[i][j];

        if(matrix[i][j] > max_in_row)
        {
            max_in_row = matrix[i][j];
        }
    }

    if((row_sum - max_in_row) > max_in_row )
            {
                alert ("This system doesn't follow the jaccobi rule.");
                return null;
            }
}



arrangerows();

console.log("This is the rearranged matrix");
printmatrix();

let v = new Array(matrix.length);
let temp = new Array(matrix.length);

for (let i = 0; i < matrix.length; i++) {

    v[i] = 0;
    temp[i] = 0;
}

console.log ("This is the pre calculated temp ");
console.log (temp);
console.log (v);

    // iteration loop
    for (let k = 0; k < 1000000 ; k ++ )
    {
        // rows access
        for (let i = 0; i < matrix.length ; i++)
        {
            

            // column index access
            for (let j =0 ; j < matrix.length ; j ++)
            {
                // every individual term
                temp[i] = temp[i] - (matrix[i][j]/matrix[i][i]) * v[j];         

            }
            // solution term divided by coff
            temp[i]= temp[i]+(solution[i]/ matrix [i][i]);      

            // to remove zero term in first iteration only
            if (i == 0 && k == 0)
            {temp[i] = temp[i] + ( v[i]/matrix[i][i]);}
           

        }
        counter2 = 0;
        for(let i=0 ; i < matrix.length ; i++ )
        {
          if (temp[i]-v[i] <= errort )               
          {
              counter2 ++ ;
              
          }
        }

        if (counter2 == matrix.length)
        {
            break ;
        }

        for (let i = 0 ;  i < matrix.length ; i++ )
       {
            v[i] = temp[i] ;
       }
    }


console.log ("This is the final answer");  
console.log (temp);


document.getElementById("credit").style.display = "none";
let decimal=0;
while (errort<1){
decimal++;
errort*=10;

}



for (let i=0;i<matrix.length;i++){
printOnPage("X"+(i+1)+" = "+temp[i].toFixed(decimal)); 
  }

errort=0.001;

for (let i=0;i<matrix.length;i++){
temp[i]=0;}

}





function Clear(){


    document.getElementById("Mat").value=null;
    document.getElementById("Sol").value=null;
    document.getElementById("Error").value=null;
    document.getElementById("answer").innerHTML = "";
    document.getElementById("credit").style.display = "block";
}