// Enable "Enter" key for the input field
document.getElementById("torqueInput").addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    calculateInterpolation();
  }
});

function calculateInterpolation() {
  // Check the current date
  const currentDate = new Date();
  const cutoffDate = new Date('2025-05-02');

  // Check if the current date is beyond the cutoff date
  if (currentDate > cutoffDate) {
    document.getElementById("result").innerText = 'Interpolated value (in PSI):';
    document.getElementById("roundedResult").innerText = 'Rounded Off Interpolated value (in PSI):';
    document.getElementById("error").innerText = 'Error: Data entry not allowed after 05 May 2025';
    document.getElementById("torqueValue").innerText = 'Torque value (in Nm): ';
    return;
  }

  // Given data points
  const dataPoints = [
    { x: 4400, y: 20 },
    { x: 4790, y: 21.6 },
    { x: 5180, y: 23.2 },
    { x: 5570, y: 24.8 },
    { x: 5960, y: 26.4 },
    { x: 6350, y: 28.0 },
    { x: 6740, y: 29.6 },
    { x: 7130, y: 31.2 },
    { x: 7520, y: 32.8 },
    { x: 7910, y: 34.4 },
    { x: 8300, y: 36.0 },
    { x: 8690, y: 37.6 },
    { x: 9080, y: 39.2 },
    { x: 9470, y: 40.8 },
    { x: 9860, y: 42.4 },
    { x: 10250, y: 44.0 },
    { x: 10640, y: 45.6 },
    { x: 11030, y: 47.2 },
    { x: 11420, y: 48.8 },
    { x: 11810, y: 50.4 },
    { x: 12200, y: 52.0 },
    { x: 12590, y: 53.9 },
    { x: 12980, y: 55.8 },
    { x: 13370, y: 57.7 },
    { x: 13760, y: 59.6 },
    { x: 14150, y: 61.5 },
    { x: 14540, y: 63.4 },
    { x: 14930, y: 65.3 },
    { x: 15320, y: 67.2 },
    { x: 15710, y: 69.1 },
    { x: 16100, y: 71.0 },
    { x: 16490, y: 72.9 },
    { x: 16880, y: 74.8 },
    { x: 17270, y: 76.7 },
    { x: 17660, y: 78.6 },
    { x: 18050, y: 80.5 },
    { x: 18440, y: 82.4 },
    { x: 18830, y: 84.3 },
    { x: 19220, y: 86.2 },
    { x: 19610, y: 88.1 },
    { x: 20000, y: 90.0 }
  ];

  // Get user input (Z)
  const inputZ = parseFloat(document.getElementById("torqueInput").value);

  // Multiply the input value (Z) with 1.3558179483 to get X
  const inputX = inputZ * 1.3558179483;

  // Display Torque value (in Nm)
  document.getElementById("torqueValue").innerText = `Torque value (in Nm): ${inputX}`;

  // Check if the input is within the range
  if (inputX < dataPoints[0].x || inputX > dataPoints[dataPoints.length - 1].x) {
    document.getElementById("result").innerText = 'Interpolated value (in PSI):';
    document.getElementById("roundedResult").innerText = 'Rounded Off Interpolated value (in PSI):';
    document.getElementById("error").innerText = 'Error: Torque value out of range';
    return;
  }

  // Find the two closest data points
  let lowerPoint, upperPoint;
  for (let i = 0; i < dataPoints.length - 1; i++) {
    if (inputX >= dataPoints[i].x && inputX <= dataPoints[i + 1].x) {
      lowerPoint = dataPoints[i];
      upperPoint = dataPoints[i + 1];
      break;
    }
  }

  // Perform linear interpolation and round off to 2 decimal places
  const interpolatedY = interpolate(inputX, lowerPoint.x, lowerPoint.y, upperPoint.x, upperPoint.y);
  const roundedInterpolatedY = roundToTwoDecimalPlaces(interpolatedY);

  // Display the results and clear error message
  document.getElementById("result").innerText = `Interpolated value (in PSI): ${interpolatedY}`;
  document.getElementById("roundedResult").innerText = `Rounded Off Interpolated value (in PSI): ${roundedInterpolatedY}`;
  document.getElementById("error").innerText = '';
}

function interpolate(x, x0, y0, x1, y1) {
  return y0 + (x - x0) * (y1 - y0) / (x1 - x0);
}

function roundToTwoDecimalPlaces(value) {
  return Math.round(value * 100) / 100;
}
