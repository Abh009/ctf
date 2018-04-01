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
                if ( response == ''){
                    term.echo("Completed All the available questions...\nJust wait for what's more");
                }
                else{
                    term.echo(response);
                }
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
                            
                            term.echo('<p style="overflow-wrap: break-word">' + response.text + '</p>',{raw:true});
                            if ( response.url != null){
                                term.echo(response.url);
                            }
                            else{

                            }
                            
                            
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
            var help_text = "Usage: \n command [options] [value] \n\n commands : \n 1.help   : to see this help message\n 2.about   : displays event information\n 3.problems    : displays the pending problems to solve\n 4.show     : show the full problem with the specified id\n     show <problem_id>\n 5.submit    : submit the answer of a problem \n     submit <problem_id> <answer>\n 6.login    : for logging in\n 7.logout    : for logging out and quit"
            term.echo(help_text);
        }
        else if(command == 'submit'){
            len = actual_command.split(" ").length;
            if( len >= 3){
                
                option = actual_command.split(" ")[1];
                value = actual_command.split(" ").slice(2,len).join("").toLowerCase();
                console.log(value);
                if ( value.length == 0 ){
                    term.error("not enough parameters try help for command details");
                    return;
                }
                if( ! isNaN(option)){
                    // submit the answer of the question
                    term.pause();
                    var jq = $.post("/submit/",{p_id:option,answer:value})
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
                        else if( response == 0){
                            output = "\nIt was wrong\n Think better :) ";
                            term.echo(output);
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
            window.location.replace("/login/");
        }
        else if ( command == 'logout'){
            // perform google authentication
            window.location.replace("/logout/");
        }
        else if( command == 'leaderboard'){
            var jq = $.get("/leaderboard/");
            var count = Object.keys(jq).length;
            // $.each(jq, function () {
            //     console.log("First Name: " + this.username);
            //     console.log("Last Name: " + this.point);
            //     console.log(" ");
            // });
            
            var t;
            for ( var i = 0; i < count; i++){
                term.echo(jq.responseJSON[i].username);
                term.echo("    :    ");
                term.echo(jq.responseJSON[i].point);
            }
        }
        else if (command == ''){
            // do nothing
        }
        else{
            this.error(new String("Command not defined"));
        }
        
        
    }, {
        greetings: 'Login before start\nUse help for command details and usage.',
        name: 'js_demo',
        height: $(document).height()-$(".ascii").outerHeight(),
        width: $(document).outerWidth(),
        prompt: username
    });
});



