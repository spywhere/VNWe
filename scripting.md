## VNWe Script Format

### Text Format
- `\n` = New line
- `~clr~` = Clear screen
- `~c#<Color>~` = Text color
- `~s<Size>~` = Text size
- `~i~` = Italic text
- `~b~` = Bold text
- `~u~` = Underline text
- `~[~` = Japan's [
- `~]~` = Japan's ]
- `~~` = `~` (tilde) character

### Layer Coding
- `<Image URL>` = Set image
- `wait:<Time>` = Wait for specified ms
- `hide:<Time>` = Hide the image for specified ms

Example: `abc.jpg|wait:8000|def.jpg|hide:500`

### VN Settings

**Note!** Commands must be used on `VNWeScript` instance object.

Each command use as a method with JavaScript object as a parameter.

Example:

```json
// ...
var myscript = new VNWeScript();

myscript.game({
	width: 800,
	height: 600,
	sfx: false,
	bgm: false,
	voice: false
});
// ...
```

- `game` Game
  - `width: 800` [integer] Game width
  - `height: 600` [integer ] Game height
  - `sfx: true` [boolean] Use the sound effects
  - `bgm: true` [boolean] Use the background music
  - `voice: true` [boolean] Use the voices
- `textbox` Text Box
  - `left: 50` [integer 0..100] Percentage offset from the left to right
  - `top: 50` [integer 0..100] Percentage offset from the top to bottom
  - `offset` [object]
     - `x: -275` [integer] Offset relative to left property
     - `y: -75` [integer] Offset relative to top property
  - `width: 550` [integer] Box width
  - `height: 150` [integer] Box height
  - `radius: 15` [integer] Box border radius
  - `opacity: 1` [float 0..1] Box opacity
  - `background: "#000000"` [string] Background color
  - `text: "#ffffff"` [string] Text color
  - `border: "1px solid #ffffff"` [string] Border settings (same as css style)
- `images` Images
  - `left: 0` [integer 0..100] Percentage offset from the left to right
  - `top: 0` [integer 0..100] Percentage offset from the top to bottom
  - `offset` [object]
     - `x: 0` [integer] Offset relative to left property
     - `y: 0` [integer] Offset relative to top property
- `prompter` Prompter (aka ender)
  - `fixed: false` [boolean] Show the prompter at the lower right corner instead of after the text
  - `url: "prompter.gif"` [string] Prompter image
  - `offset: 10` [integer] If fixed, offset from the lower right corner, otherwise, spacing after the text
- `sound` Sound and Music
  - `sfx: 1` [float 0..1] Sound effect volume
  - `bgm: 1` [float 0..1] Background music volume
  - `voice: 1` [float 0..1] Voice volume
  - `minimum: 10` [integer 0..100] Minimum buffering percentage
- `path` Asset Paths (must always include `/` at the end)
  - `images: "assets/images/"` [string] Images
  - `bgm: "assets/bgm/"` [string] Background music
  - `sfx: "assets/sfx/"` [string] Sound effects
  - `voices: "assets/voices/"` [string] Voices
- `notebox` Note Text Box
  - `left: 50` [integer 0..100] Percentage offset from the left to right
  - `top: 100` [integer 0..100] Percentage offset from the top to bottom
  - `offset` [object]
     - `x: -275` [integer] Offset relative to left property
     - `y: -55` [integer] Offset relative to top property
  - `width: 550` [integer] Box width
  - `height: 50` [integer] Box height
  - `opacity: 0.5` [float 0..1] Box opacity
  - `color: "#ffffff"` [string] Note text color
- `debug` Debug Mode
  - `enable: false` [boolean] Enable debug mode
  - `border: "1px solid #777777"` [string] Debug mode border
- `callback` Event Callbacks
  - `start: null` [object]
     - `game: null` [function] Callback to called when game starts
     - `text: null` [function] Callback to called before showing the current script line
  - `loading` [object]
     - `images: null` [function] Callback to called while loading images
     - `bgm: null` [function] Callback to called while loading background music
  - `finish` [object]
     - `game: null` [function] Callback to called after game ended
     - `images: null` [function] Callback to called after loading images
     - `bgm: null` [function] Callback to called after loading background music
     - `text: null` [function] Callback to called after finish the current script line
- `custom(<code>)` [string] Custom code to add to the game

### Scripting


### Debug Mode
Debug mode will allows you see all bounding box of each elements

```
//Script
addParticle(LEFT,TOP,WIDTH,HEIGHT,IMAGE URL,X SPEED,Y SPEED,RANDOM X,RANDOM Y,PARTICLE AMOUNT,ANIMATION SPEED);
addAlign(ALIGNMENT);
addText(TEXT,SPEED);
addNote(TEXT);
addImage(IMAGE URL,SPEED);
addLayer(LEFT,TOP,CODE,LOOP);
addSFX(NAME,SOUND URL,LOOP);
addBGM(SOUND URL);
addShake(X OFFSET,Y OFFSET,LOOP,NORMALIZE,SPEED);
addPanning(START LEFT,START TOP,END LEFT,END TOP,SPEED,INSTANT PAN);
addAnchor(NAME);
addDecision(NOR STYLE,HOV STYLE,BUTTON,BUTTON,BUTTON,...)
newButtonStyle(BG COLOR,BG IMAGE,BORDER SIZE,BORDER COLOR,BORDER RADIUS)
newButton(LEFT,TOP,WIDTH,HEIGHT,LABEL,ANCHOR NAME,NOR STYLE,HOV STYLE)
newStoryBoxStyle(LEFT,TOP,WIDTH,HEIGHT,BORDER RADIUS,OPACITY,BG,TEXT);
newNoteBoxStyle(LEFT,TOP,WIDTH,HEIGHT,OPACITY,TEXT);
gotoAnchor(NAME);

addLayer(left,top,"abc.jpg|wait:8000|def.jpg|hide:500|show",loop); //Multi Layer [Change <img to <div]

//Ender
auto(); auto(DELAY);
wait();
waitNone();

//Operation
saveGame(NAME);
loadGame(NAME);
checkSave(NAME,TRUE ANCHOR,FALSE ANCHOR);
clearSave(NAME);
hideStoryBox();
showStoryBox();

//Stop
addParticle("stop");
addShake("stop");
addPanning("stop");
addSFX("stop",NAME);
addBGM("stop");
addBGM("fade");

//Game variable and dynamic gaming
addCond(VAR NAME,TRUE ANCHOR,FALSE ANCHOR); //If VAR NAME not null will go to TRUE otherwise FALSE
setVar(NAME,ANY VALUE); //Set immediately
addVar(NAME,ANY VALUE); //Set when game run through
useVar(NAME);
getCenterX();
getCenterY();
```