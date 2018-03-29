
jQuery(function($, undefined) {
    $('#terminal').terminal(function(command) {
        console.log(command);
        if (command == 'about'){
            var result = 'Online Treasure Hunt by FOSS CLUB GECT';
            this.echo(new String(result));
        }
        else{
            this.error(new String("Command not defined"));
        }
        // if (command !== '') {
        //     try {
        //         var result = window.eval(command);
        //         if (result !== undefined) {
        //             this.echo(new String(result));
        //         }
        //     } catch(e) {
        //         this.error(new String(e));
        //     }
        // } else {
        //    this.echo('');
        // }
    }, {
        greetings: 'FOSS ONLINE TREASURE HUNT',
        name: 'js_demo',
        height: $(document).width(),
        prompt: 'foss ~ '
    });
});