# pixel-killer

```
 ______   __     __  __     ______     __
/\  == \ /\ \   /\_\_\_\   /\  ___\   /\ \
\ \  _-/ \ \ \  \/_/\_\/_  \ \  __\   \ \ \____
 \ \_\    \ \_\   /\_\/\_\  \ \_____\  \ \_____\
  \/_/     \/_/   \/_/\/_/   \/_____/   \/_____/

 __  __     __     __         __         ______     ______
/\ \/ /    /\ \   /\ \       /\ \       /\  ___\   /\  == \
\ \  _"-.  \ \ \  \ \ \____  \ \ \____  \ \  __\   \ \  __<
 \ \_\ \_\  \ \_\  \ \_____\  \ \_____\  \ \_____\  \ \_\ \_\
  \/_/\/_/   \/_/   \/_____/   \/_____/   \/_____/   \/_/ /_/

```

Have you ever wanted to simulate dead pixels on a web page? I can't imagine why.

Here, [have a demo and kill some
pixels](https://searls.github.io/pixel-killer/).

## Install

```
$ npm i -S pixel-killer
```

Then `const pixelKiller = require('pixel-killer')` or `import * as pixelKiller
from 'pixel-killer'`.

## Usage

### killPixelAtWindowPosition(x, y)

This function will kill a pixel currently at the given **window coordinates**
and will update as the window is scrolled, moved, and resized:

```js
pixelKiller.killPixelAtWindowPosition(100, 100)
```

### killPixelAtScreenPosition(x, y)

This function will kill a pixel currently at the given **screen coordinates**
(even if that pixel is outside the current window; if the window is moved over
that screen position, the dead pixel will be rendered). It will also update as
the window is scrolled, moved, and resized:

```js
pixelKiller.killPixelAtScreenPosition(100, 100)
```

### killRandomPixelOnWindow()

Invokes `killPixelAtWindowPosition` at a random location on the window.

### killRandomPixelOnScreen()

Invokes `killPixelAtScreenPosition` at a random location on the screen.

### reset()

Remove your dead pixels. In order to track the pixels' location relative to
window resize and movement, this will also remove event listeners and polling
intervals.

```js
pixelKiller.reset()
```

