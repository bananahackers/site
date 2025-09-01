---
title: Change or remove apps from the homescreen carousel
parent: Customisation
last_modified_date: 2025-06-01
---
# Change or remove apps from the homescreen carousel
{:.no_toc}

*Originally written by Tania \<tangela-rocks (at) protonmail.com> in October 2020.*
{:.fs-3}

{% include figure_with_caption.html src="/assets/images/homescreen-carousel-hero.png" caption="Example of the stock quick launcher, or homescreen carousel" %}
{:.mx-0-auto.float-lg-right.ml-lg-5.my-lg-2}

KaiOS may display five apps on the left of the homescreen, which change based on device models or the regional availability of these apps. To access these apps, you can press D-Pad Left when you're on the homescreen, then use D-Pad Up/Down to switch between apps and press <kbd>OK</kbd> to launch the highlighted app.

You can change their order, replace or remove any of them by modifying the set in `launcher.gaiamobile.org`.

*Before you start, make sure you have a KaiOS 2.5 device with debugging mode activated, and a computer with Android Debug Bridge (ADB) ready. This guide assumes you are comfortable sideloading apps using ADB and WebIDE.*

*On Windows, we recommend using [7-Zip](https://7-zip.org) to avoid app packaging errors.*

If your device doesn't have Busybox, [download OmniBB from the BananaHackers Store](https://store.bananahackers.net#omnibb) and use ADB and WebIDE to sideload the app onto your phone. Once OmniBB opens, press <kbd>OK</kbd> on your phone to temporarily load Busybox onto the system, and wait until the app displays the "Busybox loaded" alert.

1. [Download Wallace Toolbox from the BananaHackers Store](https://store.bananahackers.net/#wallacetoolbox) and install the app with ADB and WebIDE. Once the app opens, press 1 to grant yourself temporary root access to the ADB shell.

   You should see the alert "Rooted ADB access until reboot".

2. Connect your phone to a computer with ADB installed and start the ADB server, if you haven't already done so:

```console
$ adb devices
* daemon not running; starting now at tcp:5037
* daemon started successfully
List of devices attached
1a2b3c4d        device
```

{:style="counter-reset:none" start="3"}
3. Get the launcher app from `/system` and the list of installed apps from `/userdata` to use as reference:

```console
adb pull /system/b2g/webapps/launcher.gaiamobile.org
adb pull /data/local/webapps/webapps.json
```

ADB will save the pulled files into the folder where you execute the command from.

{:style="counter-reset:none" start="4"}
4. Open the `webapps.json` file you've just pulled and find the JSON entry of the five apps you're going to put in the homescreen carousel. Note down the `manifestURL` of those apps.

   You can also find a list of `manifestURL` for some example apps [below](#reference-manifest-urls-of-preinstalled-apps). For example, if your device is on KaiOS 2.5, and you want to have Messages, E-Mail, WhatsApp, Calendar and Clock in the carousel, their `manifestURL` are:

| Display name | manifestURL |
|:-------------|-------------|
| Messages | app://sms.gaiamobile.org/manifest.webapp |
| E-Mail | app://email.gaiamobile.org/manifest.webapp |
| WhatsApp | https://api.kaiostech.com/apps/manifest/ahLsl7Qj6mqlNCaEdKXv |
| Calendar | app://calendar.gaiamobile.org/manifest.webapp |
| Clock | app://clock.gaiamobile.org/manifest.webapp |

{:style="counter-reset:none" start="5"}
5. Open the `launcher.gaiamobile.org` application folder you've pulled and extract the `application.zip`. Find and open the `app.bundle.js` located under the `dist` sub-folder of the extracted folder.

Now, here's the tricky part. With each KaiOS version, the code for

## Reference manifest URLs of preinstalled apps

Excluding preinstalled OriginData games and device/regional-specific apps, e.g. from Jio. Blank table cell means the app is not available for that KaiOS version.

| Display name | manifestURL (KaiOS 2.5) | manifest_url (KaiOS 3) |
|:-------------|-------------------------|------------------------|
| Call Log | app://communications.gaiamobile.org/manifest.webapp | http://communications.localhost/manifest.webmanifest |
| Contacts | app://contact.gaiamobile.org/manifest.webapp | http://contact.localhost/manifest.webmanifest |
| Messages | app://sms.gaiamobile.org/manifest.webapp | http://sms.localhost/manifest.webmanifest |
| E-Mail | app://email.gaiamobile.org/manifest.webapp | http://email.localhost/manifest.webmanifest |
| Calendar | app://calendar.gaiamobile.org/manifest.webapp | http://calendar.localhost/manifest.webmanifest |
| Clock | app://clock.gaiamobile.org/manifest.webapp | http://clock.localhost/manifest.webmanifest |
| Browser | app://search.gaiamobile.org/manifest.webapp | |
| Music | app://music.gaiamobile.org/manifest.webapp | http://music.localhost/manifest.webmanifest |
| Video | app://video.gaiamobile.org/manifest.webapp | http://video.localhost/manifest.webmanifest |
| Settings | app://settings.gaiamobile.org/manifest.webapp | http://settings.localhost/manifest.webmanifest |
| Camera | app://camera.gaiamobile.org/manifest.webapp | http://camera.localhost/manifest.webmanifest |
| Gallery | app://gallery.gaiamobile.org/manifest.webapp | http://gallery.localhost/manifest.webmanifest |
| FM Radio | app://fm.gaiamobile.org/manifest.webapp | |
| Recorder | app://soundrecorder.gaiamobile.org/manifest.webapp | http://soundrecorder.localhost/manifest.webmanifest |
| Calculator | app://calculator.gaiamobile.org/manifest.webapp | http://calculator.localhost/manifest.webmanifest |
| Unit Converter | app://unitconverter.gaiamobile.org/manifest.webapp | |
| File Manager | app://filemanager.gaiamobile.org/manifest.webapp | http://filemanager.localhost/manifest.webmanifest |
| Note | app://notes.gaiamobile.org/manifest.webapp | http://notes.localhost/manifest.webmanifest |
| SIM Toolkit | app://stk.gaiamobile.org/manifest.webapp | http://stk.localhost/manifest.webmanifest |
| Download | app://download.gaiamobile.org/manifest.webapp | http://download.localhost/manifest.webmanifest |
| Snake | app://snake.gaiamobile.org/manifest.webapp | http://snake.localhost/manifest.webmanifest |
| WhatsApp | https://api.kaiostech.com/apps/manifest/ahLsl7Qj6mqlNCaEdKXv | |
| Facebook | https://api.kaiostech.com/apps/manifest/oRD8oeYmeYg4fLIwkQPH | |
| Google Maps | https://www.google.com/maps/preview/pwa/kaios/manifest.webapp | Cached: http://cached.localhost/maps/manifest.webmanifest<br/><nobr>update_url: https://www.google.com/maps/preview/pwa/kaios/manifest.webapp</nobr> |
| Google Search | https://api.kaiostech.com/apps/manifest/RUP-Kznhau9Id7UGc9ck | Cached: http://googlesearch.localhost/manifest.webmanifest<br/><nobr>update_url: https://api.kaiostech.com/apps/manifest/RUP-Kznhau9Id7UGc9ck</nobr> |
| Assistant | https://api.kaiostech.com/apps/manifest/OSlAbgrhLArfT7grf4_N | |
| YouTube | https://api.kaiostech.com/apps/manifest/6x6P4Ap7oCIzOW10hBpm | Cached: http://youtube.localhost/manifest.webmanifest<br/><nobr>update_url: https://api.kaiostech.com/apps/manifest/6x6P4Ap7oCIzOW10hBpm</nobr> |
| KaiOS News | https://api.kaiostech.com/apps/manifest/TNQNy0nvZdt-jLvokjYJ | Cached: http://kaios-news.localhost/manifest.webmanifest<br/><nobr>update_url: https://api.kaiostech.com/apps/manifest/TNQNy0nvZdt-jLvokjYJ</nobr> |
| KaiOS Pay | https://api.kaiostech.com/apps/manifest/UgW01f5JflryQMM4H7SF | Cached: http://kaios-pay.localhost/manifest.webmanifest<br/><nobr>update_url: https://api.kaiostech.com/apps/manifest/UgW01f5JflryQMM4H7SF</nobr> |
| KaiStore<br>(KaiOS Plus) | https://api.kaiostech.com/apps/manifest/daR-aFQOTlGk8DJePIQA | Cached: http://kaios-store.localhost/manifest.webmanifest<br/><nobr>update_url: https://api.kaiostech.com/apps/manifest/daR-aFQOTlGk8DJePIQA</nobr> |
| KaiWeather | https://api.kaiostech.com/apps/manifest/hY_EHJAESdznRYwwfqsL | Cached: http://kaios-weather.localhost/manifest.webmanifest<br/><nobr>update_url: https://api.kaiostech.com/apps/manifest/hY_EHJAESdznRYwwfqsL</nobr> |
| QR Reader | https://api.kaiostech.com/apps/manifest/mwkpcuFJhk_Eeema8-fu | |
| To-Do | https://api.kaiostech.com/apps/manifest/kvtKx4hVe-wM9jPIn39P | Cached: http://kaios-todo.localhost/manifest.webmanifest<br/><nobr>update_url: https://api.kaiostech.com/apps/manifest/kvtKx4hVe-wM9jPIn39P</nobr> |
| antitheft | app://antitheft.gaiamobile.org/manifest.webapp | http://antitheft.localhost/manifest.webmanifest |
| bluetooth | app://bluetooth.gaiamobile.org/manifest.webapp | http://bluetooth.localhost/manifest.webmanifest |
| callscreen | app://callscreen.gaiamobile.org/manifest.webapp | http://callscreen.localhost/manifest.webmanifest |
| customization | app://customization.gaiamobile.org/manifest.webapp | http://customization.localhost/manifest.webmanifest |
| default_theme | app://default_theme.gaiamobile.org/manifest.webapp | |
| <nobr>emergency-call</nobr> | app://emergency-call.gaiamobile.org/manifest.webapp | http://emergency-call.localhost/manifest.webmanifest |
| engmode | app://engmode.gaiamobile.org/manifest.webapp | |
| fota | app://fota.gaiamobile.org/manifest.webapp | http://fota.localhost/manifest.webmanifest |
| ftu | app://ftu.gaiamobile.org/manifest.webapp | http://ftu.localhost/manifest.webmanifest |
| keyboard | app://keyboard.gaiamobile.org/manifest.webapp | http://keyboard.localhost/manifest.webmanifest |
| launcher | app://launcher.gaiamobile.org/manifest.webapp | http://launcher.localhost/manifest.webmanifest |
| loginpages | app://loginpages.gaiamobile.org/manifest.webapp | http://loginpages.localhost/manifest.webmanifest |
| logmanager | app://logmanager.gaiamobile.org/manifest.webapp | |
| mmitest | app://mmitest.gaiamobile.org/manifest.webapp | http://mmitest.localhost/manifest.webmanifest |
| network-alerts | app://network-alerts.gaiamobile.org/manifest.webapp | http://network-alerts.localhost/manifest.webmanifest |
| ringtones | app://ringtones.gaiamobile.org/manifest.webapp | http://ringtones.localhost/manifest.webmanifest |
| shared | | http://shared.localhost/manifest.webmanifest |
| <nobr>snake-premium</nobr> | app://snake-premium.gaiamobile.org/manifest.webapp | |
| system | app://system.gaiamobile.org/manifest.webapp | http://system.localhost/manifest.webmanifest |
| wallpaper | app://wallpaper.gaiamobile.org/manifest.webapp | http://wallpaper.localhost/manifest.webmanifest |
| wappush | app://wappush.gaiamobile.org/manifest.webapp | http://wappush.localhost/manifest.webmanifest |
| <nobr>Wallace Toolbox</nobr> | app://wallace-toolbox.bananahackers.net/manifest.webapp | |
| CrossTweak | app://crosstweak.bananahackers.net/manifest.webapp |  |
| OrigAMI | app://origami.bananahackers.net/manifest.webapp | |
| Store client | app://multi.store.bananahackers.net/manifest.webapp | |
| AppBuster | app://buster.luxferre.top/manifest.webapp | |

Data from KaiOS 2.5 pulled from the Nokia 6300 4G, KaiOS 2.5.4, build no. 20.00.17.01.
{:.text-small}

Data from KaiOS 3 pulled from the Nokia 2760 Flip 4G, KaiOS 3.0, build no. 00.2150.11.00.
{:.text-small}
