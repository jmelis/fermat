/*
  Arduino Board manager for Fermat's Room project
 */

//On/Off engine pin
const int enginePin = 13;
//Clockwise/Anticlockwise enine pin
const int directionPin = 12;
char userInput;

void setup() {
  //pins definitions
  pinMode(enginePin, OUTPUT);
  pinMode(directionPin, OUTPUT);
 // opens serial port, sets data rate to 9600 bps
  Serial.begin(9600);
}

void loop() {
  // send data only when you receive data:
  if (Serial.available() > 0) {
    //get user input value
    userInput = Serial.read();
    // 1 - turns engine on
    // 0 - turns enfine off
    // C - puts engine in clockwise mode
    // A - puts engine in anticlockwise mode
    switch(userInput){
      case '1': 
          digitalWrite(enginePin, HIGH);
          break;
      case '0':
          digitalWrite(enginePin, LOW);
          break;
      case 'C': 
          digitalWrite(directionPin, HIGH);
          break;
      case 'A':
          digitalWrite(directionPin, LOW);
          break;
    }
  }
}
