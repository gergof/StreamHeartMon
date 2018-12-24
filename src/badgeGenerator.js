const fs=require("fs");
const path=require("path");

module.exports=(colorScheme, serverAddr, renderBPM=true, bg=null, fg=null) => {
    //set the colors
    var bgc, fgc;
    if(colorScheme==="blue"){
        bgc="black";
        fgc="blue";
    }
    else if(colorScheme==="red"){
        bgc="black";
        fgc="red";
    }
    else if(colorScheme==="white"){
        bgc="black";
        fgc="white";
    }
    else if(colorScheme==="custom"){
        bgc=bg;
        fgc=fg;
    }
    else{
        bgc="black";
        fgc="green";
    }


    //read the badge template
    var html=fs.readFileSync(path.join(__dirname, "badge.html"), "utf8");

    //fill in template
    html=html.replace(/{{server}}/g, serverAddr).replace(/{{bg}}/g, bgc).replace(/{{fg}}/g, fgc).replace(/{{renderBPM}}/g, renderBPM);

    //return html
    return html;
}