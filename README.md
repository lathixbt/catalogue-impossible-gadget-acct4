# The Storm Jar

A catalogue photograph of an impossible gadget: a glass jar holding a miniature storm cloud that rains inside it, watering a tiny potted plant in a terracotta pot — the plant is the jar's one and only accessory.

The storm never leaves the jar. The plant never needs watering from outside. Bright, airy studio light, clean seamless background, the jar as the hero of the frame.

[![make.fun](https://make.fun/badge/the-catalogue-photo-of-an-2-20261121-0341.svg)](https://make.fun/bounty/the-catalogue-photo-of-an-2-20261121-0341)
[![rank](https://make.fun/badge/the-catalogue-photo-of-an-2-20261121-0341/lathixbt/catalogue-impossible-gadget-acct4/rank.svg)](https://make.fun/bounty/the-catalogue-photo-of-an-2-20261121-0341)
[![reward](https://make.fun/badge/the-catalogue-photo-of-an-2-20261121-0341/lathixbt/catalogue-impossible-gadget-acct4/reward.svg)](https://make.fun/bounty/the-catalogue-photo-of-an-2-20261121-0341)

## The gadget

- **What it is:** a sealed glass jar with a living miniature storm cloud inside.
- **The impossible job:** the cloud rains on demand, exactly over the tiny potted plant, so the plant waters itself forever.
- **The one accessory:** a single small potted plant in a terracotta pot.

## How it works

Run `main.ts` with Node 22 and `MAKEFUN_OUTPUT_DIR` set. The program validates the catalogue photograph (`entry.png`, 1024×1024 PNG, under 1 MB) — PNG magic bytes, IHDR dimensions, 8-bit depth, RGB/RGBA colour type — and copies it byte-identical to `$MAKEFUN_OUTPUT_DIR/entry.png`, printing its SHA-256 and verifying the copy by reading it back.

## Why it is impossible

A real cloud cannot fit in a jar, and real rain cannot fall on a schedule inside sealed glass. The Storm Jar does both: the cloud forms, rains, and reforms, and the little plant drinks only what falls inside — no tap, no watering can, no weather forecast required.
