// Arduino's PINs
#define STATUS_PIN      13 // Turns the motor on or off
#define DIRECTION_PIN   12 // Controls the motor's direction of rotation
#define PULSE_PIN       11 // A pulse in this pin turns the motor one step

#define BUF_SIZE        20      // strings buffer size
#define DELAY_MIN       300     // minimum allowed delay
#define TIME_FACTOR     50000   // all the loops take the same. See bottom.
#define STOP_DELAY      200     // if motor is turned off, introduce this delay

int delayStep   = 1000; // Delay between steps. The smaller the faster.
int running     = 0;
char command[BUF_SIZE];
char delay_str[BUF_SIZE];

char c;
int i;
long int stepCounter;
int newDelay;

void setup()
{
    pinMode(STATUS_PIN, OUTPUT);
    pinMode(DIRECTION_PIN, OUTPUT);
    pinMode(PULSE_PIN, OUTPUT); // Default:

    digitalWrite(STATUS_PIN, HIGH);     // Default: motor turned off
    digitalWrite(DIRECTION_PIN, HIGH);  // Default: motor turns forward

    Serial.begin(9600);
    Serial.println("INIT");
}

void loop()
{
    // Read the serial input to the command string
    i = 0;
    while (Serial.available())
    {
        c = Serial.read();
        if (i<BUF_SIZE-2)
          command[i++] = c;
    }
    command[i] = '\0';

    if (command[0] != '\0') // We have received a command
    {
        if (strcmp(command,"START") == 0)
        {
            running = 1;
            stepCounter = 0;
            digitalWrite(STATUS_PIN, LOW);
        }
        else if (strcmp(command,"STOP") == 0)
        {
            digitalWrite(STATUS_PIN, HIGH);
            Serial.println(stepCounter);
            running = 0;
        }
        else if (strcmp(command,"FORWARD") == 0)
        {
            digitalWrite(DIRECTION_PIN, HIGH);
        }
        else if (strcmp(command,"BACKWARD") == 0)
        {
            digitalWrite(DIRECTION_PIN, LOW);
        }
        else // Read the new delay (we expect a number).
        {
            newDelay = atoi(command);
            if (newDelay >= DELAY_MIN)
            {
              delayStep = newDelay;
            }
        }
    }

    if (running == 1) {
        // This is a bit of a dirty hack. Normally we don't have time to read
        // the complete string from the serial port before restarting the loop.
        // We introduced a short delay to make sure that the complete command
        // has been read before restarting the main loop.
        for (i=0; i< (TIME_FACTOR/delayStep) ; i++) // Ensure that the running
        {                                           // time of the for loop
                                                    // stays roughly the same
            stepCounter++;
            digitalWrite(PULSE_PIN,HIGH);
            delayMicroseconds(delayStep);
            digitalWrite(PULSE_PIN,LOW);
            delayMicroseconds(delayStep);
        }
    }
    else
    {
        delay(STOP_DELAY);
    }
}

