/**
 * Created by Computadora on 06-Feb-17.
 */
/**
 * Created by Computadora on 04-Feb-17.
 */

app.factory('OrionDataPurifier', [
    '$q', '$rootScope',
    function($q, $rootScope){

        var clear = [
            ' – LaPatilla.com', '– LaPatilla.com',
            ' | Últimas Noticias', '| Últimas Noticias',
            ' - RunRun.es', '- RunRun.es',
            ' | El Pitazo', '| El Pitazo',
            ' - NotiTotal', '- NotiTotal'
        ];

        var htmlEntities = [
            //Accents
            {entity: '&Agrave;', result: 'À'},
            {entity: '&Egrave;', result: 'È'},
            {entity: '&Igrave;', result: 'Ì'},
            {entity: '&Ograve;', result: 'Ò'},
            {entity: '&Ugrave;', result: 'Ù'},

            {entity: '&agrave;', result: 'à'},
            {entity: '&egrave;', result: 'è'},
            {entity: '&igrave;', result: 'ì'},
            {entity: '&ograve;', result: 'ò'},
            {entity: '&ugrave;', result: 'ù'},

            {entity: '&Aacute;', result: 'Á'},
            {entity: '&Eacute;', result: 'É'},
            {entity: '&Iacute;', result: 'Í'},
            {entity: '&Oacute;', result: 'Ó'},
            {entity: '&Uacute;', result: 'Ú'},
            {entity: '&Yacute;', result: 'Ý'},

            {entity: '&aacute;', result: 'á'},
            {entity: '&eacute;', result: 'é'},
            {entity: '&iacute;', result: 'í'},
            {entity: '&oacute;', result: 'ó'},
            {entity: '&uacute;', result: 'ú'},
            {entity: '&yacute;', result: 'ý'},

            //Symbols && Others
            {entity: '&nbsp;', result: ' '},
            {entity: '&lt;', result: '<'},
            {entity: '&gt;', result: '>'},
            {entity: '&amp;', result: '&'},
            {entity: '&quot;', result: '"'},
            {entity: '&apos;', result: "'"},
            {entity: '&cent;', result: '¢'},
            {entity: '&pound;', result: '£'},
            {entity: '&yen;', result: '¥'},
            {entity: '&euro;', result: '€'},
            {entity: '&copy;', result: '©'},
            {entity: '&reg;', result: '®'}
        ];
        return{

            purify: function(element) {
                var purified = '';
                for (var i = 0; i < clear.length; i++) {
                    purified = element.replace(clear[i], '');
                }

                for (var i = 0; i < htmlEntities.length; i++) {
                    purified = purified.replace(htmlEntities[i].entity, htmlEntities[i].result);
                }

                return purified;
            }

        }
    }]);