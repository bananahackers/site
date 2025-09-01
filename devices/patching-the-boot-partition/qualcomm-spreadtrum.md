---
title: Devices with Qualcomm or Spreadtrum chipset
parent: Permanently root a device by patching the boot partition
---
# Devices with Qualcomm or Spreadtrum chipset
{:.no_toc}

Dangerous
{:.label.label-red.m-0}

*(continued from [Permanently root a device by patching the boot partition])*
{:.fs-3}

Before you start, make sure you have [a debug-enabled device] with debugging mode activated, and a computer with <abbr title="Android Debug Bridge">ADB</abbr> ready.

## Get a copy of the stock boot partition

1. Download and install OmniBB and either Wallace Toolbox or ADBroot on your phone, using one of the guides from [Debugging on actual devices]. OmniBB injects the Busybox binary into the system, so that Wallace Toolbox and ADBroot can gain deeper system control and provide elevated ADB shell access.

2. Open OmniBB

## Modifying the boot partition



[Permanently root a device by patching the boot partition]: {% link devices/patching-the-boot-partition.md %}
[a debug-enabled device]: {% link devices.md %}
[Debugging on actual devices]: {% link development/debugging-on-actual-devices.md %}
