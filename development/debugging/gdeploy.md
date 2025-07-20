---
title: "CLI programs: gdeploy and make-kaios-install"
parent: Debugging on actual devices
---
# CLI programs: `gdeploy` and `make-kaios-install`
{:.no_toc}

## gdeploy

`gdeploy` is a small cross-platform command-line utility developed by Luxferre as an alternative to the graphical WebIDE, and can even be used as NodeJS module/library. According to Luxferre, 'it uses the same `firefox-client` backend but has much simpler architecture for application management'.

{:.note}
> KaiOS 1.0 and KaiOS 2.5 only. For debug-enabled KaiOS 3 devices, please refer to the instructions for using KaiOS’s `appscmd` CLI tool in [appscmd] or on [the official Developer Portal].
> 
> Before proceeding, ensure [your phone is debug-enabled] or that you’ve taken steps to enable debugging.
> 
> Much of this guide involves interacting with your operating system's terminal. If you're not comfortable using a command-line interface, and you're not in a situation where using `gdeploy` is necessary, we generally advise following [ADB and WebIDE] to install third-party apps instead.

### What we need
- a KaiOS 1.0 or KaiOS 2.5 device;
- a host operating system with Git, Node.js and ADB in its package manager;
- a USB cable capable of transferring data;
- an Internet connection for both your phone and computer (to access the Developer menu and to download tools);

## make-kaios-install

[appscmd]: {% link development/debugging/appscmd.md %}
[the official Developer Portal]: https://developer.kaiostech.com/docs/sfp-3.0/getting-started/env-setup/os-env-setup
[your phone is debug-enabled]: {% link devices.md %}
[ADB and WebIDE]: {% link development/debugging/webide.md %}