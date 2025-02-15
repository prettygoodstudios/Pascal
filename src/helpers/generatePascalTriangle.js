
/**
 * 
 * @param {number} n 
 * @returns {number[][]}
 */
export function generatePascalTriangle(n) {
    if(n == 1){
        return [1];
    }

    const topRow = generatePascalTriangle(n-1);
    const newRow = [1];

    for(let i = 0; i < topRow.length-1; i++){
        newRow.push(topRow[i]+topRow[i+1]);
    }
    
    newRow.push(1);
    return newRow;
}
