---
title: ADB and WebIDE
parent: Debugging on actual devices
last_modified_date: 2025-06-25
---
# ADB and WebIDE
{:.no_toc}

KaiOS 2.5
{:.label.m-0}

Now, let's learn how to install and debug third-party applications on your KaiOS device using ADB and WebIDE. This lets us install apps which might not be available from KaiStore, or ones that you are developing.

Android Debug Bridge, or ADB, is a powerful program bundled within Android SDK Platform Tools and Android Studio that app developers, power users and enthusiasts use to communicate and debug Android-based devices. It unlocks access to functions beyond what the normal user interface provides, such as monitoring system logs, controlling their phones through shell access, installing APKs, tweaking the system by setting device properties.

Although KaiOS and Firefox OS are not directly based on Android and you cannot install APKs on them, the Gonk hardware interaction layer [makes significant use of Android's well-established hardware compatibility], including the `adbd` daemon and the ability to use ADB on a host computer to interact with the phone over USB or TCP. This is for the sake of deploying the OS onto different hardware, without increasing the cost for research and development.

Meanwhile, WebIDE, short for Web Integrated Development Environment, enables you to create, edit, run and debug web applications on Firefox OS (and later KaiOS) devices and simulators. [Built on the former Firefox OS App Manager], it features a code editor, boilerplate code templates, manifest validation, and Firefox debugging tools. Additionally, it allows you to connect your browser to one or multiple "runtimes" for managing app installation.

We'll refer to this guide as the officially supported method of installing third-party apps onto KaiOS 2.5 devices, for the sake of simplicity. Other methods, such as using Luxferre's `gdeploy`, are also available.

{:.warning}
> This guide only applies to debug-enabled KaiOS 2.5 devices. For debug-enabled KaiOS 3 devices, refer to the instructions for using KaiOS’s `appscmd` CLI tool in [appscmd] or on [the official Developer Portal].
>
> Because all browsers below are only compiled for x86_64 architecture, Apple Silicon Macs (since macOS 28) and armhf/aarch64 Linux users will need to use `gdeploy` or [build one of the browsers below from source]. Windows on ARM users may continue to follow the guide and use the browsers below with the Prism translation layer.
> {:.text-red-300}
>
> Before proceeding, ensure [your phone is debug-enabled] or that you’ve taken steps to enable debugging.
>
> **Be cautious when installing apps from unknown sources!** It’s always a good idea to proofread an app’s source code. Even with security measures like prohibiting apps with the `engmode-extension` permission, KaiOS is still [prone to][1] [malicious code][2] which can result in performance degradation, data loss or worse.

## What we need

- a KaiOS 1.0 or KaiOS 2.5 device;
- an x86_64 computer running Windows, macOS or Linux;
- a USB cable capable of transferring data;
- an Internet connection for both your phone and computer (to access the Developer menu and to download tools);
- an archiver: built-in file manager on macOS/Linux, [7-Zip] or WinRAR on Windows;
- latest version of Android Debug Bridge (ADB): [Windows], [macOS], [Linux]
    - you can also install from your operating system's package manager:
    - Windows:
        - [Chocolatey][choco]: `choco install adb`
        - Scoop: `scoop install main/adb`
        - `winget` [prohibits installing executables with symlinks]
    - [macOS (Homebrew)][brew]: `brew install android-platform-tools`
    - Debian/Ubuntu: `sudo apt-get install android-sdk-platform-tools-common`
    - [Fedora][dnf]: `sudo dnf install android-tools`
    - [Arch Linux]/Manjaro: `sudo pacman -S android-tools`
    - Termux (terminal emulator on Android): `pkg install android-tools`
    - *tip: If you download the SDK from Android Developers' website, [include the extracted ADB folder in PATH for quick access]. This will be handled for you if you've installed ADB via package manager.*
- Mozilla got rid of the old WebIDE since Firefox 59, so we'll have to install an older version of Firefox:
    - [Waterfox Classic][waterfox]: the most recently maintained browser which still has old WebIDE
    - [Pale Moon 28.6.1](https://archive.palemoon.org/palemoon/28.x/28.6.1/) (Windows/Linux): a popular fork of Firefox with older user interface, legacy Firefox add-on support and always runs in single-process mode.
    - Firefox 59 (ESR 52.9): the last official Firefox version to be bundled with working WebIDE and other tools for development on Firefox OS devices, before Mozilla decided to kill the project in 2016. Archives of all Firefox releases can be found [on archive.mozilla.org](https://archive.mozilla.org).
    - [KaiOS RunTime] (Ubuntu): official development environment for KaiOS 2.5 made by KaiOS. It's also possible to get KaiOSRT to work on Windows 10 and later using Windows Subsystem for Linux (WSLg), [see this YouTube video].

*Need a video tutorial? If you’re on Linux, KaiOS Technologies officially made one for their own WebIDE client KaiOSRT which can be found [on their channel]. Alternatively, there’s also [one on BananaHackers’ YouTube channel].*

---

Begin by turning on debugging mode on your phone and connecting it to the computer with the USB cable. Each device has different guides to turn on debugging mode; if you're unsure, it's best to look up your phone on the [Devices page].

On your computer, install ADB from the package manager, or download the SDK Platform Tools from Android Developers' website, which should contain the latest version of ADB. Extract the downloaded archive to a folder, then navigate to the `platform-tools` folder using Command Prompt or Terminal.

![A webpage from Android Developers titled "SDK Platform Tools release notes". It explains the content of the toolset, along with what adb, fastboot and systrace do. Below is a "Downloads" section which provides download links for Windows, Mac, and Linux respectively.](/assets/images/webide/sdk-download.png)

Start the ADB daemon by typing `adb devices`. ADB will automatically detect your phone in debugging mode. Proceed when you see a `device`, otherwise:

- if the operating system states that `adb` is not a valid command, check if you're in the right folder and/or if `platform-tools` was properly added in PATH. You may need to specify `./adb.exe devices` to tell the OS where to look for `adb.exe`, or make `adb` an executable: `chmod +x adb`.
- if ADB executes but nothing appears under "List of devices attached" (as shown below), check if your phone is properly connected to the computer. On Windows, you may need to open Driver Manager (<kbd>Win</kbd> + <kbd>R</kbd>, `devmgmt.msc`) and look for any USB peripherals with missing drivers, install accordingly if not.
- if you’re connecting to a Linux-based computer, you may need to go to Settings, Storage and turn on USB Storage on the phone for `udev` to properly register your phone as a USB peripheral with external storage. An icon in the status bar will indicate USB storage access. (if you don't like the behaviour, see [Setting up USB access on Linux](#setting-up-usb-access-on-linux) below.)
- on macOS and Linux, `udev` and `lsusb` are your friends to troubleshoot any USB connection issues here
- if a device appears as `unauthorized`, it means that you need to approve the ADB connection to your phone with a pop-up on your phone's screen. Except... KaiOS does not have such thing! You're pretty much stuck here until someone figures out how to get your phone accessible by ADB.

```console
$ adb devices
* daemon not running; starting now at tcp:5037
* daemon started successfully
List of devices attached
1a2b3c4d        device
```

<details markdown="block"><summary>Connect to ADB over Wi-Fi</summary>

---

If you are in a rush and wish to connect to your phone wirelessly, turn on Wi-Fi on your phone, set the TCP/IP socket on the phone to 5555:

```console
$ adb tcpip 5555
restarting in TCP mode port: 5555
```

Disconnect the USB cable, wait a moment, then run:

```console
$ adb connect 192.168.1.14:5555
connected to 192.168.1.14:5555

$ adb devices
List of devices attached
192.168.1.14:5555       device

$ adb forward tcp:6000 localfilesystem:/data/local/debugger-socket
6000
```

Replace `192.168.1.14` with your phone's IP address assigned by local network—the same network your computer is on.

You can find your phone's local IP (192.168.1.x) by opening Settings, Network & Connectivity, Wi-Fi, Available networks, click on the connected Wi-Fi network and look under IP address; or download N4NO’s [My IP Address] from KaiStore.

It's also possible to connect to your phone entirely without an USB cable, though the connection will be less reliable. See [Connect to ADB wirelessly] for more details.

---

</details>

Download and install either the latest version of Waterfox Classic, Firefox 59/ESR 52.9 or Pale Moon 28.6.1 corresponding to your operating system. We'll use Waterfox Classic for WebIDE here, as this is the most recently maintained browser to-date, but setting up WebIDE on other browsers should not be different.

![A webpage for Waterfox Classic, a legacy web browser. The page headline reads "Waterfox Classic", with a description stating it’s meant for older systems and supports XPCOM and XUL extensions. A yellow warning icon is followed by bold text: "Waterfox Classic has many unpatched security advisories. Use at your own discretion." Below are blue buttons to download for Mac, Linux, and Windows. The version listed is 2022.11-classic, released on 2022-11-23. Below that, a partial mock browser window displays a "New Tab" open with the Waterfox logo in the address bar.](/assets/images/webide/waterfox-download.png)

Open the browser and press <kbd>Alt</kbd> to show the menu bar, then select Tools, Web Developer, WebIDE (or press <kbd>Shift</kbd> + <kbd>F8</kbd>).

*Tip: Execute this command to open WebIDE without having to start Waterfox Classic beforehand:*
```console
waterfox.exe -chrome chrome://webide/content/webide.xul
```

![Waterfox Classic browser with the ‘Tools’ menu open. The cursor navigates through ‘Web Developer’ to highlight the ‘WebIDE’ option, along with its shortcut](/assets/images/webide/waterfox-menu.png)
{:.text-center}

Your phone’s name should appear in the right pane as an option under USB Devices. Click it to connect.

If you don't see any devices, either because you're setting up WebIDE for the first time, or your browser doesn't have a working `adbd` daemon, forward ADB access to TCP socket 6000:

```console
adb forward tcp:6000 localfilesystem:/data/local/debugger-socket
```

Then, click Remote Runtime in the right pane, leave it as default at `localhost:6000` and press OK. If you still see a yellow banner stating "Operation failed: Connecting to Remote Runtime", either you set the incorrect socket or your phone rejected DevTools access.

![Firefox WebIDE interface showing a 'Remote Runtime' popup, containing a text field pre-filled with 'localhost:6000' and two buttons OK and Cancel. On the left of main UI are project options (New App, Open Packaged App, Open Hosted App), and on the right is a list of connected USB devices and options, including Remote Runtime.](/assets/images/webide/webide-remote.png)
{:.text-center}

*If you’re using older browsers to access WebIDE such as Firefox v59 or Pale Moon <28.6.1, at this point you may see a warning header about mismatched build date. You can safely ignore it as WebIDE was mainly designed to support Firefox OS device builds released alongside that Firefox/Pale Moon versions.*

To sideload an application, download a packaged file (you can find great apps on [BananaHackers Store] and GitHub!) and extract it into a dedicated folder. Make sure that there's a `manifest.webapp` at the root of the extracted folder. If you see an `application.zip` (which indicates the app was packaged for OmniSD), unzip it.

![File explorer view of a web app project folder. It contains subfolders css, img, js, and rsrc, along with files: .gitignore, build.sh, index.html, LICENSE, manifest.webapp, and README.md](/assets/images/webide/explorer-manifest.png)
{:.text-center}

In WebIDE, select Open Packaged App in its left sidebar and navigate to the root of the app folder you just extracted (again, make sure that there's a `manifest.webapp` at its root!)

<div class="text-center">
  {% include figure_with_caption.html src="/assets/images/webide/webide-loadapp.png" alt="Firefox WebIDE showing the loaded 'Wallace Toolbox' KaiOS app project. The project panel displays the app’s name, description, local file path, and app ID. A warning notes that Marketplace submission requires a 128px icon and that 'certified' apps are not fully supported. On the top, the first button 'Install and Run' is lit up" caption="Notice there are three buttons in the top pane: a play button for Install and Run, a round arrow for Reload, and a wrench button for Debug App, which opens the Firefox Developer Tools." %}
</div>

Once you get the app loaded with no errors, press the triangle Install and Run in the top bar to sideload.

*Feel free to ignore this warning: "app submission to the Marketplace requires a [size in px] icon". if you were to upload your apps to the Firefox Marketplace, a 128px icon is required to display your app in the splash screen. While KaiStore also requires app icons to be in certain sizes, a 128px icon is no longer necessary, [only 56px and 112px]. You can get rid of this error by including a 128px icon in the app's manifest.*

### Setting up USB access on Linux

Dedicated to those adrenaline-fueled who want to complicate their lives.

For security reasons, if you want to plug in your phone for debugging only and without USB Storage on, which would grant your computer access to the phone's internal storage, you will need to set `udev` rules to grant `plugdev` read-write access to the socket on your phone.

Initialise `udev` rules by installing `android-sdk-platform-tools-common` on Debian and Ubuntu, or `android-tools` (`android-tools-git` on AUR) on Arch-based distros. Otherwise, you can also install `wget` and `coreutils` if they're not already installed, then manually download and install `51-android.rules` by typing:

```console
$ wget -S -O - https://raw.githubusercontent.com/cm-b2g/B2G/1230463/tools/51-android.rules | sudo tee >/dev/null /etc/udev/rules.d/51-android.rules; sudo udevadm control --reload-rules
```

`wget` will fetch a list of `udev` rules from cm-b2g/B2G, then pass the result to `tee` which will write the content onto `/etc/udev/rules.d/51-android.rules` without displaying any output in Terminal, and `udevadm` will then reload the rules from configured locations.

Plug your phone to the computer using an USB cable and obtain the Vendor ID of the phone:

```console
$ lsusb
Bus 001 Device 007: ID 05c6:f003 Qualcomm, Inc. Nokia 8110 4G
                       ^^^^
```

In our case, the Qualcomm-based Nokia 8110 4G has the Vendor ID of `05c6`.

Open `/etc/udev/rules.d/51-android.rules` in your preferred text editor with root privileges. Append this line, replace `05c6` with the Vendor ID you got above:

```
SUBSYSTEM=="usb", ATTR{idVendor}=="05c6", MODE="0664", GROUP="plugdev"
```

This will allow read-write access to the USB device with vendor ID `05c6` for the system and users in the `plugdev` group, and read-only access for others (`rw-rw-r--`). Add yourself in the `plugdev` group:

```console
# usermod -aG plugdev $LOGNAME
```

Execute this command as root to make `51-android.rules` read-only for all users on the system:

```
# chmod a+r /etc/udev/rules.d/51-android.rules
```

Now, create `~/.android/adb_usb.ini` in your HOME directory. Open it using your preferred text editor and put the obtained Vendor ID value in HEX: `0xABCD`, whereas `ABCD` is Vendor ID.

```console
$ echo "0x05c6" > ~/.android/adb_usb.ini
```

Finally, re-run `adb devices`.

## See also

- [ADB & Fastboot](https://ivan-hc.github.io/bananahackers/adb.html) and [WebIDE and other Development tools](https://ivan-hc.github.io/bananahackers/webide.html) on BananaHackers website
- Martin Kaptein's [Side-loading and deploying custom apps to KaiOS](https://mk24.me/blog/sideloading-and-deploying-apps-to-kai-os/) blog post
- [Android Debug Bridge](https://wiki.archlinux.org/title/Android_Debug_Bridge) on Arch Linux Wiki, distributed under GNU Free Documentation License 1.3
- [Run apps on a hardware device](https://developer.android.com/studio/run/device) on Android Developers' website, distributed under Apache 2.0 License

[the hidden Developer menu]: https://w2d.bananahackers.net
[makes significant use of Android's well-established hardware compatibility]: https://kaios.dev/2024/03/kaios-system-properties/
[Built on the former Firefox OS App Manager]: https://www.infoq.com/news/2014/06/webide/
[appscmd]: {% link development/debugging-on-actual-devices/appscmd.md %}
[the official Developer Portal]: https://developer.kaiostech.com/docs/sfp-3.0/getting-started/env-setup/os-env-setup
[your phone is debug-enabled]: {% link devices.md %}
[1]: https://www.reddit.com/r/KaiOS/comments/1d0iur3/security_analysis_of_the_kaios_feature_phone/ "Note: Fabrice Desré, former Chief Architect of KaiOS Technologies, confirmed that there are factual errors in the report i.e. apps are handled in their own processes rather than in the same runtime, and that the research team never contacted KaiOS."
[2]: https://research.nccgroup.com/2020/08/24/whitepaper-exploring-the-security-of-kaios-mobile-applications/
[build one of the browsers below from source]: https://new.reddit.com/r/KaiOS/comments/rawwhz/webide_capable_program_linux_arm/
[7-Zip]: https://www.7-zip.org/download.html
[Windows]: https://dl.google.com/android/repository/platform-tools-latest-windows.zip
[macOS]: https://dl.google.com/android/repository/platform-tools-latest-darwin.zip
[Linux]: https://dl.google.com/android/repository/platform-tools-latest-linux.zip
[choco]: https://community.chocolatey.org/packages/adb
[prohibits installing executables with symlinks]: https://github.com/microsoft/winget-pkgs/issues/4082
[brew]: https://formulae.brew.sh/cask/android-platform-tools
[dnf]: https://packages.fedoraproject.org/pkgs/android-tools/android-tools
[Arch Linux]: https://archlinux.org/packages/extra/x86_64/android-tools
[include the extracted ADB folder in PATH for quick access]: https://gist.github.com/nex3/c395b2f8fd4b02068be37c961301caa7
[waterfox]: https://classic.waterfox.net
[Pale Moon 28.6.1]: https://archive.palemoon.org/palemoon/28.x/28.6.1/
[KaiOS RunTime]: https://s3.amazonaws.com/kaicloudsimulatordl/developer-portal/simulator/Kaiosrt_ubuntu.tar.bz2
[see this YouTube video]: https://youtu.be/eg2SOCTMxYU
[on their channel]: https://www.youtube.com/watch?v=wI-HW2cLrew
[one on BananaHackers’ YouTube channel]: https://www.youtube.com/watch?v=SoKD7IBTvM4
[Devices page]: {% link devices.md %}
[My IP Address]: https://www.kaiostech.com/store/apps/?bundle_id=com.n4no.myipaddress
[Connect to ADB wirelessly]: https://w2d.js.org/#connect-to-adb-wirelessly-experimental
[BananaHackers Store]: https://store.bananahackers.net
[only 56px and 112px]: https://developer.kaiostech.com/docs/distribution/submission-guideline/
[Make KaiOS Install]: https://github.com/jkelol111/make-kaios-install
