const { Alice, Scene, Stage, Reply, Markup } = require('yandex-dialogs-sdk')

 

const alice = new Alice()

const stage = new Stage();

const ADDRES = 'ADDRES';

const atADDRES= new Scene(ADDRES);

 

const { button, reply } = Alice

 

 

/*alice.command(async (ctx) => {

                const replyMsg = reply({

                               text: 'Добрый день! Меня зовут Алиса, я могу проконсультировать Вас по продуктам/услугам Банка! Чтобы выбрать интересующий Вас раздел, повторите, пожалуйста, его название за мной:',

    tts: 'Добрый день!- Меня зовут Алиса,- я могу проконсультировать Вас по продуктам/услугам Банка!- Чтобы выбрать интересующий Вас раздел, повторите, пожалуйста, его название за мной:',

                               buttons: [button('Общая информация о банке'), button('Адреса режимы работы ОО'), button('Интернет-банк')

              , button('Мобильное приложение'), button('Кредитование'), button('Карты'), button('Вклады')]

                })

                ctx.reply(replyMsg)

});*/

 

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

 

alice.any(async ctx => Reply.text(`I don't understand`));

 

const server = alice.listen(443, '/');

 

// Put a friendly message on the terminal

console.log('Server running at http://127.0.0.1:' + 443 + '/');