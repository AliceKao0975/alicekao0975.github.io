function toggleContent(contentId){
    let contentElement = document.getElementById(contentId);

    if(contentElement){
        if(contentElement.classList.contains('hidden'))
            contentElement.classList.add('hidden');
        else
            contentElement.classList.remove('hidden');
    }
}

function updateInnerPage(contentId)
{
    // clear all children
    document.getElementById('show-frames').innerHTML = '';

    let contentHelp="";
    let contentFrame = "";
    
    if(contentId === 'godot_hexrun')
    {
        const newText = document.createElement("p");
        newText.textContent = "看youtube影片照著做的。";
        
        const newSource = document.createElement("a");
        newSource.textContent = "Click me to open new tab.";
        newSource.src = './godot_hexrun/';
        newSource.target = '_blank';

        const newIFrame = document.createElement("iframe");
        newIFrame.src = './godot_hexrun/';
        newIFrame.style='height:70vh;width:90%;border:none;';

        document.getElementById('show-frames').appendChild(newText);
        document.getElementById('show-frames').appendChild(newSource);
        document.getElementById('show-frames').appendChild(newIFrame);
    }
    else if(contentId === 'js_udemy_1')
    {
        const newText = document.createElement("p");
        newText.textContent = "Udemy 課程: Crash Course: Build a Full-Stack Web App in a Weekend!";
        
        const newIFrame = document.createElement("iframe");
        newIFrame.src = './20231017/';
        newIFrame.style='height:70vh;width:90%;border:none;';
        
        document.getElementById('show-frames').appendChild(newText);
        document.getElementById('show-frames').appendChild(newIFrame);
    }
    else
    {
        const newText = document.createElement("p");
        newText.textContent = "";
        
        document.getElementById('show-frames').appendChild(newText);
    }
}