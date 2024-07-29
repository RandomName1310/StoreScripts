
        var CurrentPositionX = 5;
        var CurrentPositionY = 5;
        var LineCount = 0;
        var AllMemories = [];
        var AllDisplays = [];

        function AddMemory() {
            if (AllMemories.length < 30) {   
                // Create the memory   
                var target = document.getElementById('MemoryTemplate');
                var clone = target.cloneNode(true);
                clone.style.display = 'flex';
                clone.querySelector('p').textContent = "s";

                clone.addEventListener('click', function() {
                    var index = AllMemories.indexOf(clone);
                    if (index !== -1) {
                        AllDisplays[index].style.display = "flex";
                    }
                });

                // Finalize the process
                AllMemories.push(clone);
                document.body.appendChild(clone);

                // Create the display
                var DisplayTarget = document.getElementById('DisplayScripts');
                var Display = DisplayTarget.cloneNode(true);
                Display.querySelector('textarea').value = document.getElementById("TextToStore").value; // Set the value

                // Finalize the process
                AllDisplays.push(Display);
                document.body.appendChild(Display);

                // Change position
                clone.style.left = CurrentPositionX + "%";
                clone.style.top = CurrentPositionY + "%";
                CurrentPositionX += 10;
                LineCount++;
                if (LineCount >= 10) {
                    CurrentPositionY += 30;
                    CurrentPositionX = 5;
                    LineCount = 0;
                }
            }
        }

        function DeleteMemory() {
            if (AllMemories.length > 0) {
                var lastMemory = AllMemories.pop(); 
                var lastDisplay = AllDisplays.pop(); 
                lastMemory.remove();
                lastDisplay.remove();
                CurrentPositionX -= 10;
                if(CurrentPositionX < 5 || CurrentPositionX > 95) {
                    CurrentPositionX = 95;
                    CurrentPositionY -= 30;
                }
                LineCount--;

                // Also remove the corresponding display
                if (AllDisplays.length > 0) {
                    var lastDisplay = AllDisplays.pop();
                    lastDisplay.remove();
                }
            }
        }

        // Close all displays when click Backspace
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Backspace') {     
                AllDisplays.forEach(display => display.style.display = 'none');
            }
        });
   