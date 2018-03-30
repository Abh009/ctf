jQuery(function($, undefined) {
    $('#terminal').terminal(function(command, term) {
        if (command == 'about'){
            var result = 'Online Treasure Hunt by FOSS CLUB GECT';
            this.echo(new String(result));
        }
        else if ( command == 'problems'){
            term.pause();
            // $.post('http://localhost/script.php',{command:command},function(response){
            //     term.echo(response);
            //     term.resume();
            // });


            var jq = $.get("http://localhost:8000/problems/")
            .done(function(response){
                term.echo(response);
            })
            .fail(function(){
                term.echo("connection failed");
            });
            term.resume();

            // var result;
            // const url = 'http://localhost/script.php?command=' + command;
            // var xhr = new XMLHttpRequest();

            // xhr.open('GET',url, true);
            // xhr.setRequestHeader('Access-Control-Allow-Origin','*');
            // xhr.setRequestHeader('Content-type','application/json');
            // xhr.setRequestHeader('Access-Control-Allow-Methods','GET');
            // xhr.setRequestHeader('X-API-KEY', '/*API KEY*/');
            // xhr.send();


            // xhr.onreadystatechange = function() {
            //     if (this.readyState == 4 && this.status == 200) {
            //         result = xhr.responseType;
            //         console.log(result);
            //         term.echo(result);
            //     }
            // };
        }
        else{
            this.error(new String("Command not defined"));
        }
        
    }, {
        greetings: 'FOSS ONLINE TREASURE HUNT',
        name: 'js_demo',
        height: $(document).height(),
        prompt: 'foss ~ '
    });
});
