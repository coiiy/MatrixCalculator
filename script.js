function showAnswer() {
  var soundEffect = document.getElementById("sound-effect");
  soundEffect.play();
  soundEffect.currentTime = 0;

}
function solveSystem() {
    const matrixInput = document.getElementById('matrix').value.trim();
  
    const matrix = parseMatrix(matrixInput);
  
    if (!isValidMatrix(matrix)) {
      document.getElementById('result').innerText = 'Invalid input. Please enter a valid matrix.';
      return;
    }
  
    const variableNames = ['x', 'y', 'z']; // Update with the variable names you prefer
  
    const solution = gaussianElimination(matrix);
  
    if (solution === null) {
      document.getElementById('result').innerText = 'The system is either inconsistent or has infinitely many solutions.';
    } else {
      let result = 'Solution:\n';
      for (let i = 0; i < solution.length; i++) {
        result += variableNames[i] + ' = ' + solution[i].toFixed(2) + '\n';
      }
      document.getElementById('result').innerText = result;
    }
    showAnswer();
  }
  
  
  
  function findInverse() {
    const matrixInput = document.getElementById('matrix').value.trim();
  
    const matrix = parseMatrix(matrixInput);
  
    if (!isValidMatrix(matrix) || !isSquareMatrix(matrix)) {
      document.getElementById('result').innerText = 'Invalid input. Please enter a valid square matrix.';
      return;
    }
  
    const inverse = invertMatrix(matrix);
  
    if (inverse === null) {
      document.getElementById('result').innerText = 'The matrix is not invertible.';
    } else {
      document.getElementById('result').innerText = 'Inverse Matrix:\n' + formatMatrix(inverse);
    }
    showAnswer();
  }
  
  
  function parseMatrix(input) {
    const rows = input.split('\n');
    const matrix = [];
  
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i].split(/\s+/).map(parseFloat);
      matrix.push(row);
    }
  
    return matrix;
  }
  
  function isValidMatrix(matrix) {
    if (matrix.length === 0) {
      return false;
    }
  
    const numColumns = matrix[0].length;
  
    for (let i = 1; i < matrix.length; i++) {
      if (matrix[i].length !== numColumns) {
        return false;
      }
    }
  
    return true;
  }
  
  function isSquareMatrix(matrix) {
    return matrix.length > 0 && matrix.length === matrix[0].length;
  }
  
  function gaussianElimination(matrix) {
    const n = matrix.length;
  
    for (let i = 0; i < n; i++) {
      // Find the row with the largest pivot value
      let maxRow = i;
  
      for (let j = i + 1; j < n; j++) {
        if (Math.abs(matrix[j][i]) > Math.abs(matrix[maxRow][i])) {
          maxRow = j;
        }
      }
  
      // Check if the matrix is singular
      if (matrix[maxRow][i] === 0) {
        return null;
      }
  
      // Swap rows
      [matrix[i], matrix[maxRow]] = [matrix[maxRow], matrix[i]];
  
      const pivot = matrix[i][i];
  
      for (let j = i; j < n + 1; j++) {
        matrix[i][j] /= pivot;
      }
  
      for (let j = 0; j < n; j++) {
        if (j !== i) {
          const factor = matrix[j][i];
  
          for (let k = i; k < n + 1; k++) {
            matrix[j][k] -= factor * matrix[i][k];
          }
        }
      }
    }
  
    const solution = [];
  
    for (let i = 0; i < n; i++) {
      solution.push(matrix[i][n]);
    }
  
    return solution;
  }
  
  function invertMatrix(matrix) {
    const n = matrix.length;
    const identityMatrix = generateIdentityMatrix(n);
  
    // Augment the matrix with the identity matrix
    for (let i = 0; i < n; i++) {
      matrix[i] = matrix[i].concat(identityMatrix[i]);
    }
  
    // Perform Gaussian elimination
    for (let i = 0; i < n; i++) {
      // Find the row with the largest pivot value
      let maxRow = i;
  
      for (let j = i + 1; j < n; j++) {
        if (Math.abs(matrix[j][i]) > Math.abs(matrix[maxRow][i])) {
          maxRow = j;
        }
      }
  
      // Check if the matrix is not invertible
      if (matrix[maxRow][i] === 0) {
        return null;
      }
  
      // Swap rows
      [matrix[i], matrix[maxRow]] = [matrix[maxRow], matrix[i]];
  
      const pivot = matrix[i][i];
  
      // Divide the current row by the pivot value to make the pivot element 1
      for (let j = i; j < 2 * n; j++) {
        matrix[i][j] /= pivot;
      }
  
      // Elimination
      for (let j = 0; j < n; j++) {
        if (j !== i) {
          const factor = matrix[j][i];
  
          for (let k = i; k < 2 * n; k++) {
            matrix[j][k] -= factor * matrix[i][k];
          }
        }
      }
    }
  
    // Extract the inverse matrix from the augmented matrix
    const inverse = [];
  
    for (let i = 0; i < n; i++) {
      inverse.push(matrix[i].slice(n));
    }
  
    return inverse;
  }
  
  function generateIdentityMatrix(size) {
    const identity = [];
  
    for (let i = 0; i < size; i++) {
      const row = [];
  
      for (let j = 0; j < size; j++) {
        row.push(i === j ? 1 : 0);
      }
  
      identity.push(row);
    }
  
    return identity;
  }
  
  function formatVector(vector) {
    return vector.map(value => value.toFixed(2)).join('\n');
  }
  
  function formatMatrix(matrix) {
    return matrix.map(row => row.map(value => value.toFixed(2)).join('\t')).join('\n');
  }
  