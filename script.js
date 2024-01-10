// Enable "Enter" key for the input field
document.getElementById("torqueInput").addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    calculateInterpolation();
  }
});

function calculateInterpolation() {
  // Check the current date
  const currentDate = new Date();
  const cutoffDate = new Date('2024-04-19');

  // Check if the current date is beyond the cutoff date
  if (currentDate > cutoffDate) {
    document.getElementById("result").innerText = 'Interpolated value (in PSI):';
    document.getElementById("roundedResult").innerText = 'Rounded Off Interpolated value (in PSI):';
    document.getElementById("error").innerText = 'Error: Data entry not allowed after 19 April 2024';
    document.getElementById("torqueValue").innerText = 'Torque value (in Nm): ';
    return;
  }

  // Given data points
  const dataPoints = [
    { x: 4031.8, y: 16 },
    { x: 8040.0, y: 32 },
    { x: 11978.4, y: 49 },
    { x: 16024.6, y: 69 },
    { x: 20187.4, y: 85 }
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
