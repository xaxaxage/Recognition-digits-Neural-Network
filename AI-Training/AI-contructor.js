class NeuralNetwork {
  constructor(inputNodes, hiddenNodes, outputNodes) {
    this.inputNodes = inputNodes;
    this.hiddenNodes = hiddenNodes;
    this.outputNodes = outputNodes;
    this.weightsIH = this.randomizeWeights(inputNodes, hiddenNodes);
    this.weightsHO = this.randomizeWeights(hiddenNodes, outputNodes);
    this.biasH = this.randomizeBias(hiddenNodes);
    this.biasO = this.randomizeBias(outputNodes);
  }

  // Activation function
  sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
  }

  // Randomize weights between -1 and 1
  randomizeWeights(rows, cols) {
    const weights = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        row.push(Math.random() * 2 - 1);
      }
      weights.push(row);
    }
    return weights;
  }

  // Randomize bias between -1 and 1
  randomizeBias(nodes) {
    const bias = [];
    for (let i = 0; i < nodes; i++) {
      bias.push(Math.random() * 2 - 1);
    }
    return bias;
  }

  // Feedforward function
  feedforward(input) {
    const hidden = [];
    for (let i = 0; i < this.hiddenNodes; i++) {
      let sum = 0;
      for (let j = 0; j < this.inputNodes; j++) {
        sum += input[j] * this.weightsIH[j][i];
      }
      sum += this.biasH[i];
      hidden.push(this.sigmoid(sum));
    }

    const output = [];
    for (let i = 0; i < this.outputNodes; i++) {
      let sum = 0;
      for (let j = 0; j < this.hiddenNodes; j++) {
        sum += hidden[j] * this.weightsHO[j][i];
      }
      sum += this.biasO[i];
      output.push(this.sigmoid(sum));
    }

    return [output.indexOf(Math.max(...output)), output]
  }

  // Training function using backpropagation
  train(input, target, learningRate) {
    // Feedforward
    const hidden = [];
    for (let i = 0; i < this.hiddenNodes; i++) {
      let sum = 0;
      for (let j = 0; j < this.inputNodes; j++) {
        sum += input[j] * this.weightsIH[j][i];
      }
      sum += this.biasH[i];
      hidden.push(this.sigmoid(sum));
    }

    const output = [];
    for (let i = 0; i < this.outputNodes; i++) {
      let sum = 0;
      for (let j = 0; j < this.hiddenNodes; j++) {
        sum += hidden[j] * this.weightsHO[j][i];
      }
      sum += this.biasO[i];
      output.push(this.sigmoid(sum));
    }

    
    // Backpropagation
    const outputErrors = [];
    for (let i = 0; i < this.outputNodes; i++) {
      outputErrors.push(target[i] - output[i]);
    }
    
    // console.log(target)
    const hiddenErrors = [];
    for (let i = 0; i < this.hiddenNodes; i++) {
      let sum = 0;
      for (let j = 0; j < this.outputNodes; j++) {
        sum += outputErrors[j] * this.weightsHO[i][j];
      }
      hiddenErrors.push(sum);
    }
    
    for (let i = 0; i < this.outputNodes; i++) {
      for (let j = 0; j < this.hiddenNodes; j++) {
        const gradient = output[i] * (1 - output[i]) * outputErrors[i] * hidden[j];
        this.weightsHO[j][i] += learningRate * gradient;
      }
      const gradient = output[i] * (1 - output[i]) * outputErrors[i];
      this.biasO[i] += learningRate * gradient;
    }
    
    // Update hidden layer weights and bias
    for (let i = 0; i < this.hiddenNodes; i++) {
      for (let j = 0; j < this.inputNodes; j++) {
        const gradient = hidden[i] * (1 - hidden[i]) * hiddenErrors[i] * input[j];
        this.weightsIH[j][i] += learningRate * gradient;
      }
      const gradient = hidden[i] * (1 - hidden[i]) * hiddenErrors[i];
      this.biasH[i] += learningRate * gradient;
    }
  }
}

module.exports = NeuralNetwork