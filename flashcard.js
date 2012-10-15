(function() {
    if (!/print/.test(document.location)) return;

    function go() {
        $('head').append("<style>"+
                         "@page { size:8.5in 11in; margin: 0.5in }\n" +
                         ".card.title { text-align: center; font-size: 16pt; }\n" +
                         ".card>div { display: table; height: 100%; width: 100%; }\n" +
                         ".card>div>div { display: table-cell; vertical-align: middle; }\n" +
                         ".card { border: 1px dotted black; padding: 0.25in; width: 50%; float: left; height: 2.25in ; page-break-inside: avoid; font-size: 10pt;}\n"+
                         "* { box-sizing: border-box; }\n"+
                         "</style>");
        var cards = $('ol>li').detach();

        $('body').empty();

        var groups = [];

        cards.each(function(i) {
            var title = $(this).find('font').html();
            var body = $(this).detach();
            body.find('font').remove();
            var target = $('<div>');

            body.contents().each(function(n) {
                if (n === 0 && this.tagName == 'BR') return;
                target.append($(this).detach());
            });

            var group = Math.floor(i/8);
            if (!groups[group]) {
                groups[group] = [];
            }

            groups[group].push({title: title, body: target.html() });

        });

        $.each(groups, function(i, group) {
            $.each(group, function(j, card) {
                var c = $('<div>').html($("<div>").append(card.title));
                $('body').append($('<div>').addClass('card').addClass('title').append(c));
            });
            var held = [];
            $.each(group, function(j, card) {
                held.push(card);
                if (j % 2 === 1) {
                    while (held.length) {
                        card = held.pop();
                        var c = $('<div>').html($("<div>").append(card.body));
                        $('body').append($('<div>').addClass('card').append(c));
                    }
                }
            });
            $('body').append("<br>");
        });
    }

    var s = document.createElement('script');
    s.src= 'http://code.jquery.com/jquery-1.8.2.min.js';
    s.onload = function() {
        setTimeout(go, 200);
    };
    document.body.appendChild(s);
})();
