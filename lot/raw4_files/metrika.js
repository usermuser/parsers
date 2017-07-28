jQuery(function() {
    var w = window,
        d = document,
        c = 'yandex_metrika_callbacks';

    (w[c] = w[c] || []).push(function() {
        try {
            w.yaCounter15627616 = new Ya.Metrika({id: 15627616, enableAll: true});
            w.Finch = w.Finch || {};
            w.Finch.metrika = w.yaCounter15627616;
        }
        catch(e) {}
    });
});


function metrikaGoal(goal){
	if(Finch.metrika)
		Finch.metrika.reachGoal(goal);
}