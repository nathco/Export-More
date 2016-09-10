# Export More
Sketch.app plugin adding export support for Apple Icon Image ( .icns ) and Animated GIF ( .gif ) file formats. Based on my previous [Generate ICNS](http://github.com/nathco/Generate-ICNS) and [Generate GIF](http://github.com/nathco/Generate-GIF) plugins.       

## Installation
1. Download and open `Export-More-master.zip`  
2. Locate and double-click `Export-More.sketchplugin`
3. Locate the `GIFX` file in the bundle and double-click ( only if plugin fails after install )      

## GIF: Animated
Create your content on a sequence of artboards using a `Frame 01`, `Frame 02`, `Frame 03` naming convention. Each artboard acts as an animation keyframe and will play sequentially according to the naming structure. When ready, navigate to `Plugins ▸ Export More ▸ Artboards to GIF ` and select a playback method and frame animation delay ( see options below ). The file will export to the directory of your choosing. 

**Playback Options**  
`Play animation forever`    
`Play animation once`  

**Frame Delay Options**  
`100 ms` `00.1 sec`  
`200 ms` `00.2 sec`  
`500 ms` `00.5 sec`  
`1000 ms` `1.0 sec`  
`2000 ms` `2.0 sec`   
`5000 ms` `5.0 sec`    
`No Delay`

**Usage Notes**  
If you notice issues with transparency and / or antialiasing, try adding a solid background color to the artboard. You can prevent individual artboards from exporting by appending `Lock` to the name. Frame delay options can be modified by editing the plugin files.  

## ICNS: Automatically  
Create your icon on a single `1024x1024` sized artboard. When ready, navigate to `Plugins ▸ Export More ▸ Artboards to ICNS ` and select `Automatically` from the dropdown menu. The file will export to the directory of your choosing.  

**Sizes Generated**  
`16x16, 32x32, 128x128, 256x256, 512x512`  
`16x16@2x, 32x32@2x, 128x128@2x, 256x256@2x, 512x512@2x`  

**Usage Notes**  
The auto generator will scale-up artboards smaller than `1024x1024` to fulfill the maximum icon size of `512x512@2x`. Be sure to use `1024x1024` for the artboard size, otherwise the hi-res icons will appear blurry. If multiple artboards exist, and none are selected, the first artboard in the layer list will export.

## ICNS: From Sequence  
Create your icon using the **Mac App Icon** template from `File ▸ New From Template ▸ Mac App Icon` in the application menu bar. When ready, navigate to `Plugins ▸ Export More ▸ Artboards to ICNS ` and select `From Sequence` in the dropdown menu. The file will export to the directory of your choosing. 

**Usage Notes**  
The artboard naming structure, for example: `icon_32x32` and `icon_32x32@2x`, must remain intact for the generator to work properly. You can prevent individual artboards from exporting by appending `Lock` to the name.

## Release Notes  
**Export More 1.0**   
- Initial Release  
**Export More 1.1**      
- Fixed export options `Cancel` button    

## Feedback
If you discover any issues or have questions regarding usage, please send a message to [code@nath.co](mailto:code@nath.co) or find me on GitHub [@nathco](https://github.com/nathco).