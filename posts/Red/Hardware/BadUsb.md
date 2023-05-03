
First buy a cheap badusb on amazon : https://www.amazon.com/HiLetgo-Microcontroller-ATMEGA32U4-Development-Keyboard/dp/B07W5K9YHP

> refer to the example

- Install Arduino IDE
- Ensure to install plugin : Keyboard.h from arduino
- init keyboard class and set the layout
- set your payload
- select the right port and board (leonardo)
- compile 
- upload

example.cpp
```cpp

#include <KeyboardLayout.h>
#include <Keyboard.h>
#include <Keyboard_fr_FR.h>

void setup()
{
  Keyboard.begin(KeyboardLayout_fr_FR);

  delay(1000);
  Keyboard.println("echo 'YOU HAVE BEEN PWNED !!'");


}

void loop() {}

```

### Alternative / Other ressources:
- https://d4n5h.github.io/Duckuino/


