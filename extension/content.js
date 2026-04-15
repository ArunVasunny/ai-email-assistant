console.log("Working");

function getEmailContent()
{
    const selectors = ['.h7','.a3s.aiL','.gmail_quote','[role="presentation"]'];
    for(const selector of selectors)
    {
        const content = document.querySelector(selector);
        if(content) 
        {
            return content.innerText.trim();
        }
    }
    return '';
}

function findComposeToolbar()
{
    const selectors = ['.btC','.aDh', '[role="toolbar"]','.gU.Up'];
    for(const selector of selectors)
    {
        const toolbar = document.querySelector(selector);
        if(toolbar)
        {
            return toolbar;
        }
    }
    return null;
    
}

function CreateAIButton()
{   
    const button = document.createElement('div');
    button.className = 'T-I J-J5-Ji aoO v7 T-I-atl L3';
    button.style.marginRight = '8px';
    button.innerHTML = '✦ AI Reply';
    button.setAttribute('role', 'button');
    button.setAttribute('data-tooltip', 'Generate AI Reply');

    return button;
}

function createToggleButton() {
    const toggle = document.createElement('div');
    toggle.classList.add('ai-tone-toggle');
    toggle.innerHTML = '▾';
    toggle.style.cssText = `
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: 2px solid #38bdf8;
        background: #fff;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        margin-right: 6px;
        user-select: none;
    `;
    return toggle;
}

function createDropdownList(onSelect) {
    const dropdown = document.createElement('div');
    dropdown.classList.add('ai-tone-dropdown');
    dropdown.style.cssText = `
        display: none;
        position: absolute;
        bottom: 110%;
        left: 0;
        background: #fff;
        border: 1px solid #e0e0e0;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.12);
        overflow: hidden;
        z-index: 9999;
        min-width: 130px;
        padding: 4px;
    `;

    let selectedItem = null;
    const tones = ["Professional", "Casual", "Friendly"];

    tones.forEach(tone => {
        const item = document.createElement('div');
        item.textContent = tone;
        item.style.cssText = `
            padding: 7px 14px;
            font-size: 13px;
            font-family: 'Google Sans', Arial, sans-serif;
            color:rgb(0, 12, 41);
            cursor: pointer;
            border-radius: 6px;
        `;

        item.addEventListener('mouseenter', () => {
            item.style.background = '#f1f3f4';
        });
        item.addEventListener('mouseleave', () => {
            
            if(selectedItem === item)
            {
                item.style.background = '#79c9ff';
            }
            else{
                item.style.background = '#fff';
            }
        });

        item.addEventListener('click', (e) => {
            e.stopPropagation();
            if(selectedItem)
            {
                selectedItem.style.background = '#fff'
            }
            item.style.background = '#79c9ff';
            selectedItem = item;
            onSelect(tone.toLowerCase());
            dropdown.style.display = 'none';
        });

        dropdown.appendChild(item);
    });

    return dropdown;
}

function selectBtn() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('ai-tone-wrapper');
    wrapper.style.cssText = 'position:relative; display:inline-block;';

    // default tone 
    let selectedTone = 'professional';

    const dropdown = createDropdownList((tone) => {
        selectedTone = tone;
    });

    const toggle = createToggleButton();

    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
    });

    document.addEventListener('click', () => {
        dropdown.style.display = 'none';
    });

    wrapper.appendChild(toggle);
    wrapper.appendChild(dropdown);

    wrapper.getSelectedTone = () => selectedTone;

    return wrapper;
}

function injectButton()
{
    document.querySelector('.ai-reply-button')?.remove();
    document.querySelector('.ai-tone-wrapper')?.remove();

    const toolbar = findComposeToolbar();
    if(!toolbar)
    {
        console.log("Toolbar not found");
        return;
    }

    console.log("Toolbar found");
    const button = CreateAIButton();
    const select = selectBtn();
    button.classList.add('ai-reply-button');

    button.addEventListener('click', async () => {
        try 
        {
            button.innerHTML = "Generating...";
            button.classList.add('loading');  
            button.disabled = true;
            const emailContent = getEmailContent();

            const response = await fetch('http://localhost:8080/api/email/generate',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify({
                    emailContent: emailContent,
                    tone: select.getSelectedTone()
                })
            });

            if(!response.ok)
            {
                throw new Error("API Request Failed");
            }
            const generatedReply = await response.text();

            const composeBox = document.querySelector(
                '[role="textbox"][g_editable="true"]'
            );
            if(composeBox)
            {
                composeBox.innerHTML = '';
                composeBox.focus();
                document.execCommand('insertText',false, generatedReply);
            }
        } 
        catch (error) {
            console.error("Error:", error); 
        }
        finally{
            button.innerHTML = "✦ AI Reply";
            button.disabled = false;
            button.classList.remove('loading');  
        }
    })
    toolbar.insertBefore(button,toolbar.firstChild)
    toolbar.insertBefore(select, button.nextSibling);
}

const observer = new MutationObserver((mutations) => {
    for(const mutation of mutations)
    {
        const addedNodes = Array.from(mutation.addedNodes); 
        const hasComposeElements = addedNodes.some(node => 
            node.nodeType === Node.ELEMENT_NODE && 
            (node.matches('.aDh, .btC, [role="dialog"]') || node.querySelector('.aDh, .btC, [role="dialog"]'))
        );

        if(hasComposeElements)
        {
            console.log("Compose window detected")
            if(hasComposeElements) {
                console.log('Compose window detected');
                setTimeout(() => {
                    if(!document.querySelector('.ai-reply-button')) {
                        injectButton();
                    }
                }, 500);
            }
        }
    }
});

observer.observe(document.body,{
    childList: true,
    subtree: true
})

