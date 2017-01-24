///<reference path="../../typings/index.d.ts" />
let env = new nunjucks.Environment(new nunjucks.WebLoader(' templates', {
    'useCache': true
}));

$(document).ready(() => {
    renderPartial({value: { Name: "Ali Esmaeili", Birthday: 'June 20, 1992' , Email: 'a.esmaeili.sut@gmail.com', Website: 'designy.github.io'}}, 'content.html');
});

let renderPartial: (value:any, template:any) => String =
    function(value: any, template: any): String {
        $('#content').html(env.render(template, value));
        return 'ok';
    };