# Digital Signage Deployed on Raspberry Pi
![Slugpath1](https://raw.githubusercontent.com/jpableo688/Digital-Signage/master/assets/readme/image1.png)

## Introduction
This local website is used as a digital signage (also could be named as a kiosk display) in which you could display it on a large monitor in a public reception/lobby area. For lightweight purposes and stealth, the signage is run locally on a Raspberry Pi running Raspbian OS. The signage is also loaded in full-screen automatically as the Raspberry Pi boots up. The current files on this repository works best with a 1920x1080p monitor display. 

## Installation
1. Import respository onto Raspberry Pi's desktop directory (or any directory of your choice).
2. Whether you are accessing your Raspberry Pi remotely or locally, you will need to program it to start the webpage on boot. So follow these instructions:
   * Open the Raspberry Pi Command Line Terminal
   * Run the following command
   ```
   nano /home/pi/.config/autostart/kiosk.desktop
   ```
   * Add the following lines then save. This will program the Raspberry Pi to run the following script on startup.
   
   ```
   [Desktop Entry]
   Type=Application
   Name=Kiosk
   Exec=/home/pi/kiosk.sh
   X-GNOME-Autostart-enabled=true
   ```
   
   * Now we are going to create the script. (Credits to Pat on O'Briens Lab)
   ```
   #!/bin/bash
 
   # Run this script in display 0 - the monitor
   export DISPLAY=:0
 
   # Hide the mouse from the display
   unclutter &
 
   # If Chrome crashes (usually due to rebooting), clear the crash flag so we don't have the annoying warning bar
   sed -i 's/"exited_cleanly":false/"exited_cleanly":true/' /home/pi/.config/chromium/Default/Preferences
   sed -i 's/"exit_type":"Crashed"/"exit_type":"Normal"/' /home/pi/.config/chromium/Default/Preferences
 
   # Run Chromium and open tabs
   /usr/bin/chromium-browser --window-size=480,320 --kiosk --window-position=0,0 https://google.com https://bing.com &
 
   # Start the kiosk loop. This keystroke changes the Chromium tab
   # To have just anti-idle, use this line instead:
   # xdotool keydown ctrl; xdotool keyup ctrl;
   # Otherwise, the ctrl+Tab is designed to switch tabs in Chrome
   # #
   while (true)
   do
   xdotool keydown ctrl+Tab; xdotool keyup ctrl+Tab;
   sleep 15
   done
   ```
   



## Links
[Setup a Raspberry Pi Kiosk with Chromium](https://obrienlabs.net/setup-raspberry-pi-kiosk-chromium/)
