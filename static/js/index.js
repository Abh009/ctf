jQuery(function($, undefined) {
    $('#terminal').terminal(function(command, term) {

        actual_command = command
        command = command.split(" ")[0];
        if (command == 'about'){
            var result = 'Online Treasure Hunt by FOSS CLUB GECT';
            this.echo(new String(result));
        }
        else if ( command == 'problems'){
            term.pause();
            var jq = $.get("http://localhost:8000/problems/")
            .done(function(response){
                term.echo(response);
            })
            .fail(function(){
                term.echo("connection failed");
            });
            term.resume();

        }
        else if ( command == 'help'){
            var help_text = "Usage: \n command [options] [value] \n\n commands : \n 1.help   : to see this help message\n 2.about   : displays event information\n 3.problems    : displays the pending problems to solve\n 4.submit    : submit the answer of a problem \n    submit <problem_id> <answer>"
            term.echo(help_text);
        }
        else if(command == 'submit'){
            len = actual_command.split(" ").length;
            if( len >= 3){
                
                option = actual_command.split(" ")[1];
                value = actual_command.split(" ").slice(2,len).join(" ");
                if( ! isNaN(option)){
                    // submit the answer of the question
                    term.pause();
                    var jq = $.post("http://localhost:8000/submit/",{p_id:option,answer:value})
                    .done(function(response){
                        var output;
                        if ( response == '1'){
                            output = "\nYou have successfully solved the problem.\n\nGo on to next level";
                        }
                        else{
                            output = "\nIt was wrong\n Think better :) ";
                        }
                        term.echo(output);
                    })
                    .fail(function(){
                        term.echo("connection failed");
                    });
                    term.resume();
                }
                else{
                    term.echo("Second parameter should be a number");
                }
            }
            else{
                term.echo("not enough parameters try help for command details");
    
            }
            
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
