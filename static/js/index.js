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
            var jq = $.get("/problems/")
            .done(function(response){
                term.echo(response);
            })
            .fail(function(){
                term.echo("connection failed");
            });
            term.resume();

        }
        else if( command == 'show'){
            // show the problem with specific id
            var len = actual_command.split(" ").length;
            if ( len != 2){
                term.error("invalid arguments try help for command details");
            }
            else{
                var p_id = actual_command.split(" ")[1];
                if( isNaN(p_id)){
                    term.error("second argument must be the problem id");
                }
                else{
                    if( p_id != ''){
                        term.pause();
                        var jq = $.post("/problems/",{p_id:p_id})
                        .done(function(response){
                            term.echo(response);
                        })
                        .fail(function(){
                            term.echo("connection failed");
                        });
                        term.resume();
                    }
                }
            }
            
        }
        else if ( command == 'help'){
            var help_text = "Usage: \n command [options] [value] \n\n commands : \n 1.help   : to see this help message\n 2.about   : displays event information\n 3.problems    : displays the pending problems to solve\n 4.show     : show the full problem with the specified id\n     show <problem_id>\n 5.submit    : submit the answer of a problem \n     submit <problem_id> <answer>"
            term.echo(help_text);
        }
        else if(command == 'submit'){
            len = actual_command.split(" ").length;
            if( len >= 3){
                
                option = actual_command.split(" ")[1];
                value = actual_command.split(" ").slice(2,len).join(" ").toLowerCase();
                if ( value.length == 0 ){
                    term.error("not enough parameters try help for command details");
                    return;
                }
                if( ! isNaN(option)){
                    // submit the answer of the question
                    term.pause();
                    var user = '{{ user.id}}';
                    term.echo(user);
                    var jq = $.post("/submit/",{p_id:option,answer:value,user:user})
                    .done(function(response){
                        var output;
                    
                        if ( response == '1'){
                            output = "\nYou have successfully solved the problem.\n\nGo on to next level";
                            term.echo(output);
                        }
                        else if(isNaN(response)){
                            output = response;
                            term.error(output);
                        }
                        else{
                            output = "\nIt was wrong\n Think better :) ";
                        }
                    })
                    .fail(function(){
                        term.error("Something went wrong");
                    });
                    term.resume();
                }
                else{
                    term.error("Second parameter should be a number");
                }
            }
            else{
                term.error("not enough parameters try help for command details");
    
            }
            
        }
        else if ( command == 'login'){
            // perform google authentication
        }
        else if (command == ''){
            // do nothing
        }
        else{
            this.error(new String("Command not defined"));
        }
        
        
    }, {
        greetings: 'use help for command details and usage',
        name: 'js_demo',
        height: $(document).height()-$(".ascii").outerHeight(),
        prompt: 'foss ~ '
    });
});



