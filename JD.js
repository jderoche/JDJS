_TOKEN_LIST_ = {
    "<": "blockstart",
    ">": "blockend"
};

function CodeElement(str, typ) {
    this.chaine = str;
    this.type = typ;
};


function Tokenizer(txt) {
    var idx = 0;
    var tokenelements = [];



    var tokenstate = "";
    var nextstate = "";
    var token = "";

    for (idx = 0; idx < txt.length; idx++) {
        // Get current char
        char = txt[idx];

        // Initialise next state precontrol
        nextstate = "";


        // Get the predefined token
        for (var i = 0; i < Object.keys(_TOKEN_LIST_).length; i++)
            if (_TOKEN_LIST_[char] != undefined) {
                nextstate = _TOKEN_LIST_[char];
                break;
            }

        switch (tokenstate) {
            case "":
                if (nextstate == _TOKEN_LIST_["<"]) {
                    if (token.length > 0) {
                        codeElement = new CodeElement(token, "undefined");
                        tokenelements.push(codeElement);
                        token = "";
                    }
                    tokenstate = nextstate;
                }
                else if (char == ">") {
                    if (token.length > 0) {
                        codeElement = new CodeElement(token, "balise");
                        tokenelements.push(codeElement);
                    }
                    token = "";
                }
                else
                    token += char;
                break;

            case _TOKEN_LIST_["<"]:
                if (char == '>') {
                    tokenstate = "";
                    if (token.length > 0) {
                        codeElement = new CodeElement(token, "balise");
                        tokenelements.push(codeElement);
                    }

                    token = "";
                }
                else {
                    token += char;
                }

                break;

            default:
                break;
        }

    }

    if (token.length > 0) {
        if (tokenstate == _TOKEN_LIST_["<"])
            codeElement = new CodeElement(token, _TOKEN_LIST_["<"]);
        else
            codeElement = new CodeElement(token, "undefined");
        tokenelements.push(codeElement);
    }

    return tokenelements;
}


window.onload = function()
{

    var elementsList = Tokenizer(document.body.innerHTML);
    if (elementsList != undefined)
        for (var i = 0; i < elementsList.length; i++) {
            if (elementsList[i].type == "balise")
            {
                if (elementsList[i].chaine == "jdbut") {
                var btn = document.createElement("BUTTON");
                var t = document.createTextNode("CLICK ME");
                btn.appendChild(t);
                document.body.appendChild(btn);}
            }
        }

}
