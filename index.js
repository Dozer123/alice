const { Alice, Scene, Stage, Reply, Markup } = require('yandex-dialogs-sdk')

const alice = new Alice()

const stage = new Stage();

const ADDRES = 'ADDRES';

const atADDRES= new Scene(ADDRES);

const { button, reply } = Alice

var fs = require('fs');

var http = require('http');

var privateKey  = fs.readFileSync('security/cert.key', 'utf8');
var certificate = fs.readFileSync('security/cert.pem', 'utf8');

var credentials = {key: privateKey, cert: certificate};

alice.command(['Привет', 'Здравствуйте', 'Добрый день', 'Здарова'], (ctx) => {
  return Reply.text('Добрый день! Меня зовут Алиса, я могу проконсультировать Вас по продуктам/услугам Банка! Чтобы выбрать интересующий Вас раздел, повторите, пожалуйста, его название за мной:',{
    buttons: [('Общая информация о банке'), ('Адреса режимы работы ОО'), ('Интернет-банк')
            , ('Мобильное приложение'), ('Кредитование'), ('Карты'), ('Вклады')]
  })
});

atADDRES.command('Выйти', async ctx => {
  ctx.leave();
  return Reply.text('Добрый день! Меня зовут Алиса, я могу проконсультировать Вас по продуктам/услугам Банка! Чтобы выбрать интересующий Вас раздел, повторите, пожалуйста, его название за мной:',
  { // Extra params are optional
    tts: 'Добрый день! Меня зовут Алиса- я могу проконсультировать Вас по продуктам/услугам Банка! Чтобы выбрать интересующий Вас раздел, повторите, пожалуйста, его название за мной:',
    buttons: ['one', Markup.button({
    title: 'two',
    url: '',
    payload: {},
    hide: false
  })],
    end_session: true
  });
});
 
atADDRES.any(ctx => Reply.text(`Не понимаю что Вы сказали. Чтобы выйти скажите "Выйти"`),
{
  tts: `Не понимаю что Вы сказали. Чтобы выйти скажите Выйти`
});

stage.addScene(atADDRES);

alice.use(stage.getMiddleware());

alice.command('Адреса режимы работы ОО', ctx => {
  ctx.enter(ADDRES);
  return Reply.text('Ниже приведены возможные вопросы: ', { tts:'Ниже приведены возможные вопросы: ',
    buttons: ['Назовите адрес отделения/банкомата/терминалов самообслуживания/ PoS-терминалов?', 'Где/ в каких магазинах я могу расплатиться Вашей картой?',
              'Куда я могу подойти для …', 'Назовите Адреса РНКБ', 'Где находится Головной/Главный офис РНКБ?', 'Режим работы','Режим работы Контактного центра /Колл-центра', 'Выйти'],
  });
});

alice.any(async ctx => Reply.text(`Не понимаю что Вы сказали`));

const server = alice.listen(8090, '/', credentials);

// Put a friendly message on the terminal

fs.readFile('./control.html', function (err, html) {
  if (err) {
      throw err; 
  }       
  http.createServer(function(request, response) {  
      response.writeHeader(200, {"Content-Type": "text/html"});  
      response.write(html);  
      response.end();  
  }).listen(80);
});

console.log('Server running at http://127.0.0.1:' + 8090 + '/');