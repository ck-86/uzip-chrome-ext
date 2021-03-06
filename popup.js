/**********************************
    For Chrom extention
**********************************/
function copyToClipboard() {
    var text = $("#shortUrl").val(); 

    var copyDiv = document.createElement('div');
    copyDiv.contentEditable = true;
    document.body.appendChild(copyDiv);
    copyDiv.innerHTML = text;
    copyDiv.unselectable = "off";
    copyDiv.focus();
    document.execCommand('SelectAll');
    document.execCommand("Copy", false, null);
    document.body.removeChild(copyDiv);
    $('body').fadeOut('slow').queue( function(){ window.close(); } );
    //window.close(); //Close Chrome Extenstion Box
}


function shortenUrl(longUrl) {
    var apiURL = "http://uzip.org/create";

    var mydata = JSON.stringify({
        "url": longUrl
    });

    $.ajax({
        url: apiURL,
        type: "POST",
        data: mydata,
        contentType: "application/json;",
        dataType: "json",
        success: function(data) {
            
            if(data.code){
              $('#shortUrl').val("http://uzip.org/" + data.code);
              $(".btn").show();
              $("#copyButton").focus();
            } else {
              $('#shortUrl').val("Not valid url");
              $(".btn").hide();
            }
            
            
            //Adding Event Listener Becoz of Chrome Security Issue
            var copyBtn = document.getElementById("copyButton");
            copyBtn.addEventListener("click", copyToClipboard, false);

        }
    });
}


//Init
chrome.tabs.getSelected(null, function(tab) {
    shortenUrl(tab.url);
});
