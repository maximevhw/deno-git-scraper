const header = "Deno git-scraper by maxime_vhw\n-------------------------------\n";
const options = {
    1 : "Set target file",
    2 : "Scrape targets"
}
let targetFile = "urls.txt";

showMenu();

function showMenu(){
    console.clear();
    console.log(header + "Target file: " + targetFile + "\n");

    for (const [key, value] of Object.entries(options)) {
        console.log(key + ". " + value);
    }
    console.log("9. Exit");

    const option = getOption();

    proccessMenuInput(option);
}

function getOption(){
    let optionString = prompt("Option?") ?? "";
    let option = parseInt(optionString);

    while (isNaN(option) || option < 1 || option > Object.keys(options).length) {
        optionString = prompt("Option?") ?? "";
        option = parseInt(optionString);
    }

    return option;
}

function proccessMenuInput(option:number) {
    switch(option) { 
        case 1: { 
           //set file path;
           setFile();
           break; 
        }
        case 2: { 
            //scrape ; 
            scrape();
            break; 
         } 
         case 9: { 
            //statements; 
            console.clear();
            return; 
         }
        default: { 
           //statements; 
           showMenu();
           break; 
        } 
     }
}

function setFile(){
    console.clear();
    targetFile = prompt("path of targets file: ") ?? "";
    showMenu();
}

function scrape(){
    if(targetFile == ""){
        console.error("No target file set");
        return;
    }

    console.clear();
    console.log(header + "Scraping targets from " + targetFile + "\n");

    const text = Deno.readTextFileSync(targetFile).split("\n");

    text.forEach((baseUrl:string) => {
        
        getResponseCode(baseUrl + "/.git/index").then((code:number) => { 
            console.log("checking: " + baseUrl);
            const found = code == 200 ? ".git/index found" : "no .git/index found";
            console.log("result: " + found + "\n");
        });
    });

}

async function getResponseCode(url:string){
    const resp = await fetch(url);
    return resp.status;
}