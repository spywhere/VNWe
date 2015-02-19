## VNWe Script Format

**Note!** Commands must be used on `VNWeScript` instance object.

### Notations and Units

#### Notations
This scripting guide will use following notations through out the guides...

##### Object-Type or Methods with one JavaScript object as its argument
Notation:

- `object/method`
  - `key/argument` A key in object or an argument in method

Example usage:

```javascript
method({
	argument: value
});
```

##### Explicitly Specified Methods
Notation:

- `method(<arg1>, <arg2>, ...)` Description of method that receives a JavaScript object as its parameter
  - `arg1` First argument description
  - `arg2` Second argument description

Example usage:

```javascript
method(arg1, arg2);
```

##### Default Values
Example `width: 400` or `image: <req>`.

 - `<req>` Indicated that argument is required
 - `<default>` Argument with default value (value description described at the end) (can be omitted)
 - `<inherit>` Argument with inherited/derived value from context (can be omitted)
 - *Exact value* Argument with exact default value (can be omitted)

##### Data Type
Value data type will specified before a description of each command or argument.

Some data types may allows only one choice of values, which will described at the end.

- `[type]` A data type without any limitation
- `[type A..B]` A data type with range from A to B (inclusive)

Data type can be the followings...

- `integer` A whole number
- `float` A decimal point number
- `string` A text or sequence of characters
- `boolean` A value of `true` or `false`
- `object` A key/value pairs or JavaScript object
- `function` A JavaScript function
- `color` A hexidecimal color value or web color name
- `css` A CSS-type value

#### Units
Units used in the engine are...

- Pixels
- Milliseconds

Unless specified by each command.

### Text Format
- `\n` = New line
- `[clr]` = Clear screen
- `[c=<Color>]...[/c]` = Text color [color]
- `[s=<Size>]...[/s]` = Text size [integer]
- `[i]...[/i]` = Italic text
- `[b]...[/b]` = Bold text
- `[u]...[/u]` = Underline text

### Animation Timing Script

Each timing separated by a `|` (pipe)

- `wait:<Time>` = Wait for specified time
- `hide:<Time>` = Hide the image for specified time
- `rand:<Time>..<Time>` = Wait randomly within a range of time
- `rand:<Time>` = Same as `rand:0..<Time>`

Example: `wait:8000|hide:500|rand:50|rand:5..100`

### VN Settings

Each command returns the object that has been set and must be use as a read-only object.

Only valid settings will be set to the game.

Example:

```javascript
// ...
var myscript = new VNWeScript();

var defaultSettings = myscript.game();

myscript.game({
	width: 800,
	height: 600,
	sfx: false,
	bgm: false,
	voices: false,
	another: "value" // This will not get set in the game
});
// ...
```

- `game` Game -- Should not be set once game starts
  - `border: "1px solid #ffffff"` [css] Border settings
  - `width: 800` [integer] Game width
  - `height: 600` [integer ] Game height
  - `sfx: true` [boolean] Use the sound effects
  - `bgm: true` [boolean] Use the background music
  - `voices: true` [boolean] Use the voices
- `texts` Text Box
  - `left: 50` [integer 0..100] Percentage offset from the left to right
  - `top: 50` [integer 0..100] Percentage offset from the top to bottom
  - `offset` [object]
     - `x: -275` [integer] Offset relative to left property
     - `y: -75` [integer] Offset relative to top property
  - `width: 550` [integer] Box width
  - `height: 150` [integer] Box height
  - `radius: 15` [integer] Box border radius
  - `opacity: 1` [float 0..1] Box opacity
  - `background: "#000000"` [color] Background color
  - `text: "#ffffff"` [color] Text color
  - `border: "1px solid #ffffff"` [css] Border settings
  - `visible: true` [boolean] Box Visibility
- `images` Images
  - `left: 0` [integer 0..100] Percentage offset from the left to right
  - `top: 0` [integer 0..100] Percentage offset from the top to bottom
  - `offset` [object]
     - `x: 0` [integer] Offset relative to left property
     - `y: 0` [integer] Offset relative to top property
- `prompter` Prompter (aka ender)
  - `fixed: false` [boolean] Show the prompter at the lower right corner instead of after the text
  - `image: "prompter.png"` [string] Prompter image
  - `interval: 200` [integer] The delay between each frame
  - `width: 13` [integer] The width for one frame
  - `height: 13` [integer] The height for one frame
  - `offset: 10` [integer] If fixed, offset from the lower right corner, otherwise, spacing after the text
- `sounds` Sound and Music
  - `sfx: 1` [float 0..1] Sound effect volume
  - `bgm: 1` [float 0..1] Background music volume
  - `voices: 1` [float 0..1] Voice volume
  - `minimum: 10` [integer 0..100] Minimum buffering percentage
- `paths` Asset Paths (must always include `/` at the end)
  - `images: "assets/images/"` [string] Images
  - `bgm: "assets/bgm/"` [string] Background music
  - `sfx: "assets/sfx/"` [string] Sound effects
  - `voices: "assets/voices/"` [string] Voices
- `notes` Note Text Box
  - `left: 50` [integer 0..100] Percentage offset from the left to right
  - `top: 100` [integer 0..100] Percentage offset from the top to bottom
  - `offset` [object]
     - `x: -275` [integer] Offset relative to left property
     - `y: -55` [integer] Offset relative to top property
  - `width: 550` [integer] Box width
  - `height: 50` [integer] Box height
  - `opacity: 0.5` [float 0..1] Box opacity
  - `color: "#ffffff"` [color] Note text color
- `debug` Debug Mode
  - `enable: false` [boolean] Enable debug mode
  - `border: "1px solid #777777"` [css] Debug mode border
- `callbacks` Event Callbacks
  - `start` [object] Each callback must receives a game script [VNWeScript] and a canvas render context (2D)
     - `game: null` [function] Callback to called when game starts
     - `text: null` [function] Callback to called before showing the current script line
  - `loading` [object] Each callback must receives a game script [VNWeScript], a canvas render context (2D) and loading progress [float 0..1]
     - `images: <default>` [function] Callback to called while loading images. Default callback is a text indicate loading progress in the center-middle of the game
     - `bgm: <default>` [function] Callback to called while loading background music. Default callback is a text indicate loading progress on the center-top of the game
  - `finish` [object] Each callback must receives a game script [VNWeScript] and a canvas render context (2D)
     - `game: <default>` [function] Callback to called after game ended. Default callback is a dialog box with the word "End!"
     - `images: null` [function] Callback to called after loading images
     - `bgm: null` [function] Callback to called after loading background music
     - `text: null` [function] Callback to called after finish the current script line
- `custom(<code>)` Custom Code
   - `code: <req>` [string] Custom code to add to the game

### Scripting
#### Story
- `align(<alignment>)` Text Alignment
  - `alignment: <req>` [string] Text alignment. Must be one of `left`, `center` or `right`
- `text(<text>, <speed>)` Story Text
  - `text: <req>` [string] Text to show
  - `speed: 30` [integer] Printing speed
- `note(<text>)` Note Test
  - `text: <req>` [string] Text to show
- `image(<image>, <duration>)` Background Image
  - `image: <req>` [string] Background Image
  - `duration: 100` [integer] Fading duration

#### Advanced Story
- `anim` Animation and Layer
  - `image: <req>` [string] Image
  - `code: ""` [string] Animation timing script (see *Animation Timing Script* section above)
  - `width: <inherit>` [integer] The width for one frame
  - `height: <inherit>` [integer] The height for one frame
- `anchor(<name>)` Anchor
  - `name: <req>` [string] Name of anchor
- `goto(<name>)` Go to Anchor
  - `name: <req>` Name of anchor
- `decision` Routing Decision Box
- `button` Button Styling?

#### Prompter
- `auto(<delay>)`
  - `delay: 0` [integer] Delay before continue
- `wait(<prompter>)`
  - `prompter: true` [boolean] Show prompter on wait

#### Sound, Music and Voices
- `sfx(<name>, <properties>)` Sound Effect
- `bgm(<name>, <properties>)` Background Music
- `voice(<name>, <properties>)` Voices

#### Effects
- `particle(<properties>)` Particle
- `shake(<properties>)` Shake Effect
- `panning(<properties>)` Panning Effect

#### Advanced Scripting
- `save(<name>)` --TODO
- `load(<name>)` --TODO
- `clear(<name>)` --TODO
- `set(<variable>, <value>)`
- `check(<variable>, <true anchor>, <false anchor>)`

### Debug Mode
Debug mode will allows you see all bounding box of each elements

### Legacy Scripting
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