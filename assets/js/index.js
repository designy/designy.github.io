///<reference path="../../typings/index.d.ts" />
var env = new nunjucks.Environment(new nunjucks.WebLoader(' templates', {
    'useCache': true
}));
$(document).ready(function () {
    renderPartial({ value: { Name: "Ali Esmaeili", Birthday: 'June 20, 1992', Email: 'a.esmaeili.sut@gmail.com', Website: 'designy.github.io' } }, 'content.html');
});
var renderPartial = function (value, template) {
    $('#content').html(env.render(template, value));
    return 'ok';
};
//# sourceMappingURL=index.js.map