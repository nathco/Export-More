// Plugin: Export More
// Source: github.com/nathco/Export-More
// Author: Nathan Rutzky
// Update: 1.3

function GenerateGIF(context) {

    var doc = context.document
    var selection = context.selection
    var artboards
    
    if ([selection count] == 0) {
        artboards = [[doc currentPage] artboards]
    } else {
        artboards = context.selection
    }
    
    if ([artboards count] < 1) {
        
        var error = [[NSTask alloc] init]
        
        [error setLaunchPath:@"/bin/bash"]
        [error setArguments:["-c", "afplay /System/Library/Sounds/Basso.aiff"]]
        [error launch]
        [doc showMessage:"Error: Artboard Not Found"]
        return false
    }
    
    var menuItems = [[NSArray alloc] initWithObjects:'Frame Rate - No Delay','Frame Rate - 100 ms','Frame Rate - 200 ms','Frame Rate - 300 ms','Frame Rate - 400 ms','Frame Rate - 500 ms','Frame Rate - 600 ms','Frame Rate - 700 ms','Frame Rate - 800 ms','Frame Rate - 900 ms','Frame Rate - 1000 ms','Frame Rate - 1500 ms','Frame Rate - 2000 ms','Frame Rate - 3000 ms','Frame Rate - 4000 ms','Frame Rate - 5000 ms']
    var menuPopup = [[NSPopUpButton alloc] initWithFrame:NSMakeRect(0,0,300,25)]
        menuPopup.addItemsWithTitles(menuItems)
        
    var alert = NSAlert.alloc().init()
        alert.setMessageText('GIF Export Options')
        alert.setInformativeText('Generate animated GIF files from a sequence of artboards. Select playback and frame rate.')
        alert.addButtonWithTitle('Continue')
        alert.addButtonWithTitle('Cancel')
        alert.setAccessoryView(menuPopup)
        alert.setShowsSuppressionButton(true)
        alert.suppressionButton().setTitle('Loop Animation?')

    var response = alert.runModal()
    var menuItem = menuPopup.indexOfSelectedItem()
    var scriptPath = context.scriptPath
    var gifx = [scriptPath stringByDeletingLastPathComponent] + "/GIFX"
    var tempPath = NSTemporaryDirectory()
    var string = [[NSProcessInfo processInfo] globallyUniqueString]
    var gifsetPath = [tempPath stringByAppendingPathComponent: string + @".gifset"]
    var fileManager = [NSFileManager defaultManager]
    
    [fileManager createDirectoryAtPath:gifsetPath withIntermediateDirectories:true attributes:nil error:nil]
    
    for (var i=0; i < [artboards count]; i++) {
    
        var artboard = [artboards objectAtIndex:i]
        var artboardName = [artboard name]
        var fileName = [gifsetPath stringByAppendingPathComponent: artboardName + ".png"]
        
        if ([artboardName hasSuffix:@"Lock"]) continue
                            
        [doc saveArtboardOrSlice:artboard toFile:fileName]    
    }

    if (response === NSAlertFirstButtonReturn) {
    
        gifLoop = alert.suppressionButton().state() == NSOnState? '-l' : '';
        gifPath = savePath()
        
        if (menuItem == 0) generateFile(0)
        if (menuItem == 1) generateFile(10)
        if (menuItem == 2) generateFile(20)
        if (menuItem == 3) generateFile(30)
        if (menuItem == 4) generateFile(40)
        if (menuItem == 5) generateFile(50)
        if (menuItem == 6) generateFile(60)
        if (menuItem == 7) generateFile(70)
        if (menuItem == 8) generateFile(80)
        if (menuItem == 9) generateFile(90)
        if (menuItem == 10) generateFile(100)
        if (menuItem == 11) generateFile(150)
        if (menuItem == 12) generateFile(200)
        if (menuItem == 13) generateFile(300)
        if (menuItem == 14) generateFile(400)
        if (menuItem == 15) generateFile(500)
        
        function generateFile(option) {
            
            var convertTask = [[NSTask alloc] init]
            var createsTask = [[NSTask alloc] init]
            var convertGIF = "find \"" + gifsetPath + "\" -name '*.png' -exec sips -s format gif -o {}.gif {} \\;"
            var createsGIF = "find \"" + gifsetPath + "\" -name '*.png.gif' -execdir bash -c '\"" + gifx + "\" \"" + gifLoop + "\" -d \"" + option + "\" '*.png.gif' -o \"" + gifPath + "\"' \\;"
            
            [convertTask setLaunchPath:@"/bin/bash"]
            [convertTask setArguments:["-c", convertGIF]]
            [convertTask launch]
            [convertTask waitUntilExit]
            [createsTask setLaunchPath:@"/bin/bash"]
            [createsTask setArguments:["-c", createsGIF]]
            [createsTask launch]
            [createsTask waitUntilExit]
          
            if ([createsTask terminationStatus] == 0) {
                
                [doc showMessage:@"Export Complete..."]
                
            } else {
                
                var error = [[NSTask alloc] init]
                
                [error setLaunchPath:@"/bin/bash"]
                [error setArguments:["-c", "afplay /System/Library/Sounds/Basso.aiff"]]
                [error launch]
                [doc showMessage:@"Export Failed..."]
            } 
            
            [fileManager removeItemAtPath:gifsetPath error:nil]   
        }
        
        function savePath() {
            
            var filePath = [doc fileURL] ? [[[doc fileURL] path] stringByDeletingLastPathComponent] : @"~"
            var fileName = [[doc displayName] stringByDeletingPathExtension]
            var savePanel = [NSSavePanel savePanel]
            
            [savePanel setTitle:@"Export Animated GIF"]
            [savePanel setNameFieldLabel:@"Export As:"]
            [savePanel setPrompt:@"Export"]
            [savePanel setAllowedFileTypes: [NSArray arrayWithObject:@"gif"]]
            [savePanel setAllowsOtherFileTypes:false]
            [savePanel setCanCreateDirectories:true]
            [savePanel setDirectoryURL:[NSURL fileURLWithPath:filePath]]
            [savePanel setNameFieldStringValue:fileName]
        
            if ([savePanel runModal] != NSOKButton) exit
            
            return [[savePanel URL] path]
        }
        
        return [response, menuItem]
    }
};
    
function GenerateICNS(context) {
    
    var doc = context.document
    var artboards = [[doc currentPage] artboards]
    
    if ([artboards count] < 1) {
        
        var error = [[NSTask alloc] init]
        
        [error setLaunchPath:@"/bin/bash"]
        [error setArguments:["-c", "afplay /System/Library/Sounds/Basso.aiff"]]
        [error launch]
        [doc showMessage:"Error: Artboard Not Found"]
        return false
    }
    
    var menuItems = [[NSArray alloc] initWithObjects:'Automatically','From Sequence']
    var menuPopup = [[NSPopUpButton alloc] initWithFrame:NSMakeRect(0,0,300,25)]
        menuPopup.addItemsWithTitles(menuItems)

    var alert = NSAlert.alloc().init()
        alert.setMessageText('ICNS Export Options')
        alert.setInformativeText('Generate ICNS files from a sequence of artboards or automatically from a single artboard.')
        alert.addButtonWithTitle('Continue')
        alert.addButtonWithTitle('Cancel')
        alert.setAccessoryView(menuPopup)

    var response = alert.runModal()
    var menuItem = menuPopup.indexOfSelectedItem()
    var tempPath = NSTemporaryDirectory()
    var string = [[NSProcessInfo processInfo] globallyUniqueString]
    var iconsetPath = [tempPath stringByAppendingPathComponent: string + @".iconset"]
    var pngPath = [tempPath stringByAppendingPathComponent: string + @".png"]
    var fileManager = [NSFileManager defaultManager]

    [fileManager createDirectoryAtPath:iconsetPath withIntermediateDirectories:true attributes:nil error:nil]

    if (response === NSAlertFirstButtonReturn) {
    
        iconPath = savePath()
        
        if (menuItem == 0) {
        
            for (var i=0; i < [artboards count]; i++) {
                
                if ([[artboards objectAtIndex:i] isSelected]) {
                    
                    artboard = [artboards objectAtIndex:i]
                    break
                    
                } else {
                      
                    artboard = [artboards firstObject]      
                }
            }
        
            [doc saveArtboardOrSlice:artboard toFile:pngPath]
        
            var pngSize = [NSDictionary dictionaryWithObjectsAndKeys:
                    @" 16 16 ",     @"icon_16x16.png",
                    @" 32 32 ",     @"icon_16x16@2x.png",
                    @" 32 32 ",     @"icon_32x32.png",
                    @" 64 64 ",     @"icon_32x32@2x.png",
                    @" 128 128 ",   @"icon_128x128.png",
                    @" 256 256 ",   @"icon_128x128@2x.png",
                    @" 256 256 ",   @"icon_256x256.png",
                    @" 512 512 ",   @"icon_256x256@2x.png",
                    @" 512 512 ",   @"icon_512x512.png",
                    @" 1024 1024 ", @"icon_512x512@2x.png",
                    nil]
            var enumerator = [pngSize keyEnumerator]
            var png = nil
        
            while (png = [enumerator nextObject]) {
                var convertTask = [[NSTask alloc] init]
                var convertIcon  = "sips -z" + [pngSize valueForKey:png] + pngPath + " -o " + [iconsetPath stringByAppendingPathComponent:png]
        
                [convertTask setLaunchPath:"/bin/bash"]
                [convertTask setArguments:["-c", convertIcon]]
                [convertTask launch]
                [convertTask waitUntilExit]
            }
        
            generateIcon(iconsetPath, iconPath)
        }
        
        if (menuItem == 1) {

            for (var i=0; i < [artboards count]; i++) {
                
                var artboard = [artboards objectAtIndex:i]
                var artboardName = [artboard name]
                var fileName = [iconsetPath stringByAppendingPathComponent: artboardName + ".png"]
        
                if ([artboardName hasSuffix:@"Lock"]) continue
        
                [doc saveArtboardOrSlice:artboard toFile:fileName]
            }
        
            generateIcon(iconsetPath, iconPath)
        }
        
        function generateIcon(iconsetPath, iconPath) {
            
            var createTask = [[NSTask alloc] init]
            var createIcon = "iconutil -c icns \"" + iconsetPath + "\" -o \"" + iconPath + "\""
            
            [createTask setLaunchPath:@"/bin/bash"]
            [createTask setArguments:["-c", createIcon]]
            [createTask launch]
            [createTask waitUntilExit]
        
            if ([createTask terminationStatus] == 0) {
                
                [doc showMessage:@"Export Complete..."]
                
            } else {
                
                var error = [[NSTask alloc] init]

                [error setLaunchPath:@"/bin/bash"]
                [error setArguments:["-c", "afplay /System/Library/Sounds/Basso.aiff"]]
                [error launch]
                [doc showMessage:@"Export Failed..."]
            }
            
            [fileManager removeItemAtPath:iconsetPath error:nil]
            [fileManager removeItemAtPath:pngPath error:nil]
        }
        
        function savePath() {
            
            var filePath = [doc fileURL] ? [[[doc fileURL] path] stringByDeletingLastPathComponent] : @"~"
            var fileName = [[doc displayName] stringByDeletingPathExtension]
            var savePanel = [NSSavePanel savePanel]
            
            [savePanel setTitle:@"Export ICNS"]
            [savePanel setNameFieldLabel:@"Export As:"]
            [savePanel setPrompt:@"Export"]
            [savePanel setAllowedFileTypes: [NSArray arrayWithObject:@"icns"]]
            [savePanel setAllowsOtherFileTypes:false]
            [savePanel setCanCreateDirectories:true]
            [savePanel setDirectoryURL:[NSURL fileURLWithPath:filePath]]
            [savePanel setNameFieldStringValue:fileName]
        
            if ([savePanel runModal] != NSOKButton) exit
            
            return [[savePanel URL] path]
        }
        
        return [response, menuItem]
    }
};